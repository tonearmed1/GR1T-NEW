"use client";

import Image from "next/image";
import Script from "next/script";
import { useRouter } from "next/navigation";
import { Suspense, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";

import Link from "next/link";
import { COUNTRIES } from "@/constants/country";
import { useLanguage } from "@/context/LanguageContext";

type OrderForm = {
  email: string;
  phone: string;
  fullName: string;
  companyName: string;
  address: string;
  address2?: string;
  city?: string;
  tshirtSize?: string;
  subscribe: boolean;
  agree: boolean;
};

type CardForm = {
  cardNumber: string;
  exp: string; // MM/YY
  cvc: string;
  country: string;
  postCode: string;
};

// Minimal Stripe.js typings used locally without @stripe/stripe-js package
type StripeConfirmCardPaymentResult = {
  error?: { message?: string };
  paymentIntent?: { id: string; status: string };
};

type CardElement = {
  mount: (domIdOrElement: string | HTMLElement) => void;
};

type PaymentElement = {
  mount: (domIdOrElement: string | HTMLElement) => void;
};

type ExpressCheckoutElement = {
  mount: (domIdOrElement: string | HTMLElement) => void;
};

type ElementsInstance = {
  create: (
    type: "card" | "payment" | "expressCheckout",
    options?: unknown,
  ) => CardElement | PaymentElement | ExpressCheckoutElement;
  submit?: () => Promise<{ error?: { message?: string } }>; // present on Payment Element; harmless if undefined
};

type StripeInstance = {
  elements: (options?: {
    clientSecret?: string;
    locale?: string;
    mode?: "payment" | "setup" | "subscription";
    amount?: number;
    currency?: string;
  }) => ElementsInstance;
  confirmPayment: (options: {
    elements: ElementsInstance;
    clientSecret: string;
    confirmParams?: {
      receipt_email?: string;
      return_url?: string;
      payment_method_data?: {
        billing_details?: {
          email?: string;
          name?: string;
          phone?: string;
          address?: { line1?: string; line2?: string; city?: string; postal_code?: string; country?: string };
        };
      };
      payment_method?: string;
    };
    redirect?: "if_required" | "always";
  }) => Promise<StripeConfirmCardPaymentResult>;
  confirmCardPayment: (
    clientSecret: string,
    data: {
      payment_method: { card: CardElement; billing_details?: { email?: string; name?: string } };
      receipt_email?: string;
    },
  ) => Promise<StripeConfirmCardPaymentResult>;
};

declare global {
  interface Window {
    Stripe: (key: string) => StripeInstance;
  }
}

function CheckoutContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t } = useLanguage();
  const rawModel = searchParams.get("model");
  const model = useMemo(() => {
    const m = (rawModel || "").trim();
    // simple guard: limit to reasonable characters
    return m && /^[A-Za-z0-9_-]{2,20}$/.test(m) ? m : "G1S/G1X";
  }, [rawModel]);
  const [selectedModal, setSelectedModal] = useState<string>(model == "G1S" ? "G1S Street" : "G1X Scrambler");

  const [form, setForm] = useState<OrderForm>({
    email: "",
    phone: "",
    fullName: "",
    companyName: "",
    address: "",
    address2: "",
    city: "",
    // Default-checked: production-journal updates is what most reservers want and reduces a
    // post-conversion re-engagement gap. Visitor can opt out before confirming.
    subscribe: true,
    agree: false,
  });

  // Deposit today and estimated purchase price (non-binding UI copy)
  const depositToday = 100; // Due today
  const estimatedPrice = selectedModal.toUpperCase() === "G1S STREET" ? 7000 : 8000; // Est. purchase price (excluding fees)

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [nameFirst, setNameFirst] = useState("");
  const [nameLast, setNameLast] = useState("");
  const [countryQuery, setCountryQuery] = useState("");
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countryNameSelected, setCountryNameSelected] = useState("");
  const EU_COUNTRY_CODES: Record<string, string> = {
    Austria: "AT",
    Belgium: "BE",
    Bulgaria: "BG",
    Croatia: "HR",
    Cyprus: "CY",
    "Czech Republic": "CZ",
    Czechia: "CZ",
    Denmark: "DK",
    Estonia: "EE",
    Finland: "FI",
    France: "FR",
    Germany: "DE",
    Greece: "GR",
    Hungary: "HU",
    Ireland: "IE",
    Italy: "IT",
    Latvia: "LV",
    Lithuania: "LT",
    Luxembourg: "LU",
    Malta: "MT",
    Netherlands: "NL",
    Poland: "PL",
    Portugal: "PT",
    Romania: "RO",
    Slovakia: "SK",
    Slovenia: "SI",
    Spain: "ES",
    Sweden: "SE",
  };

  const [card, setCard] = useState<CardForm>({
    cardNumber: "",
    exp: "",
    cvc: "",
    country: "",
    postCode: "",
  });

  useEffect(() => {
    const full = [nameFirst.trim(), nameLast.trim()].filter(Boolean).join(" ");
    setForm((prev) => ({ ...prev, fullName: full }));
  }, [nameFirst, nameLast]);

  // Stripe Elements state
  const [stripeReady, setStripeReady] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeInstance, setStripeInstance] = useState<StripeInstance | null>(null);
  const [elementsInstance, setElementsInstance] = useState<ElementsInstance | null>(null);
  const [paymentIntentId, setPaymentIntentId] = useState<string | null>(null);

  const emailValid = useMemo(() => /\S+@\S+\.\S+/.test(form.email), [form.email]);
  const phoneValid = useMemo(() => /^[+]?[\d\s\-()]{7,}$/.test(form.phone.trim()), [form.phone]);
  const nameFirstValid = useMemo(() => nameFirst.trim().length > 0, [nameFirst]);
  const nameLastValid = useMemo(() => nameLast.trim().length > 0, [nameLast]);
  const nameValid = nameFirstValid && nameLastValid;
  const addressValid = useMemo(() => form.address.trim().length > 5, [form.address]);
  const cityValid = useMemo(() => (form.city || "").trim().length > 0, [form.city]);
  const zipValid = useMemo(() => (card.postCode || "").trim().length > 0, [card.postCode]);
  const tshirtValid = useMemo(() => (form.tshirtSize || "").trim().length > 0, [form.tshirtSize]);
  const countryFilled = useMemo(() => !!(card.country || countryQuery.trim()), [card.country, countryQuery]);
  const formValid =
    emailValid && nameValid && phoneValid && addressValid && cityValid && zipValid && tshirtValid && countryFilled;
  const headingRef = useRef<HTMLHeadingElement | null>(null); // ✅ create

  useEffect(() => {
    const isMobile = window.innerWidth < 1024; // lg breakpoint
    if (isMobile && headingRef.current) {
      setTimeout(() => {
        headingRef.current?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }, 800); // small delay ensures layout is ready
    }
  }, []);

  const onChange = useCallback(
    (key: keyof OrderForm) => (e: React.ChangeEvent<HTMLInputElement>) => {
      setForm((prev) => ({ ...prev, [key]: e.target.value }));
    },
    [],
  );
  const onInput = useCallback(
    (key: keyof OrderForm) => (e: React.FormEvent<HTMLInputElement>) => {
      const v = (e.currentTarget as HTMLInputElement).value;
      setForm((prev) => ({ ...prev, [key]: v }));
    },
    [],
  );
  useEffect(() => {
    const q = countryQuery.trim();
    if (!q) return;
    const direct =
      EU_COUNTRY_CODES[q] || EU_COUNTRY_CODES[q.replace("Republic", "").trim()] || (q.length === 2 ? q.toUpperCase() : "");
    if (direct) {
      setCard((prev) => ({ ...prev, country: direct }));
    }
  }, [countryQuery]);

  const onToggleSubscribe = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, subscribe: e.target.checked }));
  }, []);

  const onToggleAgree = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, agree: e.target.checked }));
  }, []);

  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
  // console.log("publishableKey -> ", publishableKey);

  const setupPaymentElements = useCallback(async () => {
    if (!stripeReady) return null;
    if (!publishableKey) {
      setError("Missing NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY in environment.");
      return null;
    }

    try {
      const res = await fetch("/api/checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: depositToday,
          email: form.email.trim() || undefined,
          name: form.fullName.trim() || undefined,
          phone: form.phone.trim() || undefined,
          address: form.address.trim() || undefined,
          address2: (form.address2 || "").trim() || undefined,
          city: (form.city || "").trim() || undefined,
          postalCode: (card.postCode || "").trim() || undefined,
          country: (card.country || "").toUpperCase() || undefined,
          company: form.companyName.trim() || undefined,
          tshirtSize: (form.tshirtSize || "").trim() || undefined,

          model,
        }),
      });
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to initialize payment");
      }
      const data = (await res.json()) as { clientSecret?: string; id?: string };
      if (!data.clientSecret) throw new Error("Missing client secret from server");
      setClientSecret(data.clientSecret);
      if (data.id) setPaymentIntentId(data.id);

      // Initialize Stripe.js from global
      const stripe = window.Stripe(publishableKey);
      const elements = stripe.elements({ clientSecret: data.clientSecret });
      // const pe = elements.create("payment") as PaymentElement;

      // const elements = stripe.elements({ clientSecret });

      const paymentElement = elements.create("payment");
      paymentElement.mount("#payment-element");

      // const expressCheckout = elements.create("expressCheckout", {
      //   buttonType: {
      //     applePay: "order",
      //     googlePay: "order",
      //   },
      // });
      // expressCheckout.mount("#express-checkout-element");
      paymentElement.mount("#payment-element");

      // Persist to state for subsequent renders
      setStripeInstance(stripe);
      setElementsInstance(elements);

      // Express Checkout Element (deferred flow) for wallet buttons
      const locale = (typeof document !== "undefined" && document.cookie.match(/(?:^|;\\s*)locale=(en|it)/)?.[1]) || "en";
      // console.log("locale -> ", locale);
      // const expressElements = stripe.elements({
      //   locale,
      //   mode: "payment",
      //   amount: Math.round(depositToday * 100),
      //   currency: "eur",
      // });
      // const expressCheckoutOptions = {
      //   buttonType: {
      //     applePay: "order",
      //     googlePay: "order",
      //     paypal: "buynow",
      //     klarna: "pay",
      //   },
      // };
      // const ec = expressElements.create("expressCheckout", expressCheckoutOptions) as ExpressCheckoutElement;
      // ec.mount("#express-checkout-element");

      // Also return immediate references for the current call
      return { stripe, elements, clientSecret: data.clientSecret };
    } catch (e) {
      setError(e instanceof Error ? e.message : "Unexpected error initializing Stripe");
      return null;
    }
  }, [stripeReady, publishableKey, depositToday, form.email, form.fullName, form.phone, form.address, form.companyName, model]);

  useEffect(() => {
    const ready = !!publishableKey && stripeReady && !elementsInstance;
    if (ready) {
      (async () => {
        await setupPaymentElements();
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [publishableKey, stripeReady, elementsInstance]);

  const placeOrder = useCallback(async () => {
    setError(null);
    if (!emailValid) {
      setError("Please enter a valid email address.");
      return;
    }
    if (!nameFirstValid || !nameLastValid) {
      setError("Please enter your name and surname.");
      return;
    }
    if (!phoneValid) {
      setError("Please enter a valid phone number.");
      return;
    }
    if (!addressValid) {
      setError("Please enter your address.");
      return;
    }
    // if (!form.agree) {
    //   setError("Please agree to the privacy policy and Commercial Terms of Use.");
    //   return;
    // }
    try {
      setSubmitting(true);

      // We'll call elements.submit() on the actual Elements instance we use below.

      let localStripe = stripeInstance;
      let localElements = elementsInstance;
      let localClientSecret = clientSecret;

      if (!localElements || !localStripe || !localClientSecret) {
        const setup = await setupPaymentElements();
        if (!setup) {
          throw new Error("Payment form not ready. Check Stripe publishable key.");
        }
        localStripe = setup.stripe;
        localElements = setup.elements;
        localClientSecret = setup.clientSecret;
      }
      if (!localStripe || !localElements || !localClientSecret) {
        setError("Payment form not ready. Please wait a moment and try again.");
        return;
      }
      // Validate and capture data before confirming payment (required for deferred flows)
      if (typeof localElements.submit === "function") {
        const { error: submitError } = await localElements.submit();
        if (submitError) {
          setError(submitError.message || "Please check your payment details.");
          setSubmitting(false);
          return;
        }
      }
      // Update intent metadata with latest form values before confirming payment
      try {
        await fetch("/api/checkout-session", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: paymentIntentId || undefined,
            clientSecret: paymentIntentId ? undefined : localClientSecret,
            email: form.email || undefined,
            name: form.fullName || undefined,
            phone: form.phone || undefined,
            address: form.address || undefined,
            address2: form.address2 || undefined,
            city: form.city || undefined,
            postalCode: card.postCode || undefined,
            country: (card.country || "").toUpperCase() || undefined,
            company: form.companyName || undefined,
            tshirtSize: form.tshirtSize || undefined,
            model,
          }),
        });
      } catch {}
      const result = await localStripe.confirmPayment({
        elements: localElements,
        clientSecret: localClientSecret,
        confirmParams: {
          return_url: typeof window !== "undefined" ? `${window.location.origin}/success` : undefined,
          receipt_email: form.email,
          payment_method_data: {
            billing_details: {
              email: form.email,
              name: form.fullName,
              phone: form.phone || undefined,
              address: {
                line1: form.address || undefined,
                line2: form.address2 || "" || undefined,
                city: form.city || "" || undefined,
                postal_code: card.postCode || undefined,
                country: (card.country || "").toUpperCase() || undefined,
              },
            },
          },
        },
        redirect: "if_required",
      });

      // 3️⃣ Handle result
      if (result.error) {
        setError(result.error.message || "Payment failed. Please try again.");
      } else if (result.paymentIntent && result.paymentIntent.status === "succeeded") {
        // ✅ Payment successful — redirect or show success message
        // console.log("Payment succeeded:", result.paymentIntent.id);
      }

      // if (result.error) {
      //   throw new Error(result.error.message || "Payment failed");
      // }
      const intent = result.paymentIntent;
      if (intent && intent.status === "succeeded") {
        // On successful payment, add user to Mailchimp with 'paid_deposit' tag
        try {
          await fetch("/api/mailchimp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            // keepalive helps the browser continue the request even if navigation occurs
            // but we delay redirect explicitly to improve reliability
            keepalive: true,
            body: JSON.stringify({
              email: form.email,
              name: form.fullName,
              company: form.companyName || undefined,
              country: card.country || undefined,
              phone: form.phone || undefined,
              address: form.address || undefined,
              tshirtSize: form.tshirtSize || undefined,
              tags: form.subscribe ? ["paid_deposit", "newsletter"] : ["paid_deposit"],
            }),
          });
        } catch (_) {
          // Proceed regardless if tagging fails
        }
        // Delay redirect a bit after payment to let tagging complete
        setTimeout(() => {
          window.location.href = `/success?payment_intent=${intent.id}`;
        }, 2000);
      } else {
        throw new Error(`Payment status: ${intent?.status ?? "unknown"}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unexpected error");
    } finally {
      setSubmitting(false);
    }
  }, [
    emailValid,
    setupPaymentElements,
    elementsInstance,
    stripeInstance,
    clientSecret,
    form.email,
    form.agree,
    form.subscribe,
    form.fullName,
    form.companyName,
    card.country,
    phoneValid,
    nameValid,
    addressValid,
  ]);
  const goBack = useCallback(
    (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      e.preventDefault();
      if (typeof window !== "undefined" && window.history.length > 1) {
        router.back();
      } else {
        router.push("/");
      }
    },
    [router],
  );

  return (
    <div className="min-h-screen w-full bg-white lg:overflow-hidden">
      <div className="mx-auto max-w-7xl p-6 lg:px-12">
        <div className="flex flex-row items-center">
          <button
            onClick={goBack}
            className="p-2 text-xl mr-4 border-2 border-gray-600 text-gray-600 bg-white rounded-sm h-full hover:cursor-pointer hover:bg-gray-100"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M5 12h14M12 5l-7 7  7 7-7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <Image src={"/LOGO_big_BLACK.svg"} width={200} height={100} alt="GR1T" />
        </div>
        <div ref={headingRef} className="mt-6">
          <div className="text-base text-black mb-6">{t("checkout.breadcrumb")}</div>

          <h1 className="text-2xl font-semibold text-black">{selectedModal}</h1>
          {/* <p className="text-sm text-black/80">Est. delivery: February 3, 2026</p> */}

          {/* Model selector */}
          <div className="grid grid-cols-2 gap-3 mt-4">
            <button
              onClick={() => setSelectedModal("G1S Street")}
              className={`relative h-36 md:h-48 rounded-md border ${
                selectedModal.includes("G1S") ? "border-2 border-orange-500" : "border-zinc-300"
              } bg-white`}
            >
              <Image
                src="/Home/bikes/G1S.png"
                alt="G1S"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="p-1 object-contain"
              />
            </button>
            <button
              onClick={() => setSelectedModal("G1X Scrambler")}
              className={`relative h-36 md:h-48 rounded-md border ${
                selectedModal.includes("G1X") ? "border-2 border-orange-500" : "border-zinc-300"
              } bg-white`}
            >
              <Image
                src="/Home/bikes/G1X.png"
                alt="G1X"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="p-1 object-contain"
              />
            </button>
          </div>

          {/* Reservation reassurance banner — shown above the form so the visitor sees
              the offer, the price, and the refundability before being asked for data. */}
          <div className="mt-6 rounded-lg bg-zinc-50 border border-zinc-200 p-4 md:p-5">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 text-sm md:text-base text-black">
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-orange-500 text-white font-bold">€</span>
                <div>
                  <div className="font-semibold">€{depositToday} today</div>
                  <div className="text-zinc-500 text-xs md:text-sm">Estimated balance €{(estimatedPrice - depositToday).toLocaleString()} on delivery</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-white font-bold">↻</span>
                <div>
                  <div className="font-semibold">100% refundable</div>
                  <div className="text-zinc-500 text-xs md:text-sm">5 business days · no forms</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-black text-orange-400 font-bold">★</span>
                <div>
                  <div className="font-semibold">Priority build slot</div>
                  <div className="text-zinc-500 text-xs md:text-sm">First batch · early 2027 delivery</div>
                </div>
              </div>
            </div>
          </div>

          {/* TODO: Re-enable Stripe Express Checkout Element (Apple Pay / Google Pay)
              once tested on the new client_secret flow — adds ~10–30% lift on mobile.
              See setupPaymentElements() above; the expressCheckout creation lines exist
              but are commented out.
          <div className="mt-6">
            <h2 className="text-base font-semibold text-black">{t("checkout.express.title")}</h2>
            <div id="express-checkout-element" className="mt-2 w-full rounded-md border border-zinc-300 px-3 py-2 text-base text-black" />
          </div> */}

          {/* Two-column layout */}
          <div className="mt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-1">
              <h2 className="text-base font-semibold text-black">{t("checkout.orderSummary.title")}</h2>

              <label className="block text-base text-black">
                {t("checkout.placeholder.email")} <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={onChange("email")}
                onInput={onInput("email")}
                placeholder={t("checkout.placeholder.email")}
                autoComplete="email"
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
              />

              <label className="block text-base text-black">
                {t("checkout.placeholder.phone")} <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                value={form.phone}
                onChange={onChange("phone")}
                onInput={onInput("phone")}
                placeholder={t("checkout.placeholder.phone")}
                autoComplete="tel"
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-base text-black">
                    {t("checkout.placeholder.firstName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nameFirst}
                    onChange={(e) => setNameFirst(e.target.value)}
                    placeholder={t("checkout.placeholder.firstName")}
                    autoComplete="given-name"
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-base text-black">
                    {t("checkout.placeholder.lastName")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={nameLast}
                    onChange={(e) => setNameLast(e.target.value)}
                    placeholder={t("checkout.placeholder.lastName")}
                    autoComplete="family-name"
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
                  />
                </div>
              </div>
              <label className="block text-base text-black">{t("checkout.placeholder.company")}</label>

              <input
                type="text"
                value={form.companyName}
                onChange={onChange("companyName")}
                onInput={onInput("companyName")}
                placeholder={t("checkout.placeholder.company")}
                autoComplete="organization"
                className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
              />

              <label className="block text-base text-black">
                {t("checkout.placeholder.country")} <span className="text-red-500">*</span>
              </label>
              <div className="relative w-full mx-auto">
                <input
                  type="text"
                  value={countryQuery}
                  onChange={(e) => {
                    setCountryQuery(e.target.value);
                    setCountryDropdownOpen(true);
                  }}
                  onFocus={() => setCountryDropdownOpen(true)}
                  placeholder={t("cta.form.countryPlaceholder")}
                  className={` w-full bg-white  shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500 ${
                    countryDropdownOpen ? "rounded-t-xl" : "rounded-md border border-gray-300"
                  }`}
                  required
                />
                {countryDropdownOpen && (
                  <ul
                    className={`absolute z-10 min-w-full bg-white  max-h-40 overflow-y-auto shadow-lg ${
                      countryDropdownOpen ? "rounded-b-xl" : "rounded-md "
                    }`}
                  >
                    {COUNTRIES.filter((ctr: string) =>
                      countryQuery ? ctr.toLowerCase().includes(countryQuery.toLowerCase()) : true,
                    ).map((ctr: string) => (
                      <li
                        key={ctr}
                        onClick={() => {
                          setCountryNameSelected(ctr);
                          setCountryQuery(ctr);
                          setCountryDropdownOpen(false);
                          const code = EU_COUNTRY_CODES[ctr] || EU_COUNTRY_CODES[ctr.replace("Republic", "").trim()] || "";
                          setCard((prev) => ({ ...prev, country: code }));
                        }}
                        className="p-2 hover:bg-blue-100 cursor-pointer text-black"
                      >
                        {ctr}
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <label className="block text-base text-black">
                {t("checkout.placeholder.address1")} <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={form.address}
                onChange={onChange("address")}
                onInput={onInput("address")}
                placeholder={t("checkout.placeholder.address1")}
                autoComplete="address-line1"
                required
                className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
              />
              <input
                type="text"
                value={form.address2 || ""}
                onChange={(e) => setForm((prev) => ({ ...prev, address2: e.target.value }))}
                // onInput={(e) => setForm((prev) => ({ ...prev, address2: (e.currentTarget as HTMLInputElement).value }))}
                placeholder={t("checkout.placeholder.address2")}
                autoComplete="address-line2"
                className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
              />
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-base text-black">
                    ZIP <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={card.postCode}
                    onChange={(e) => setCard((prev) => ({ ...prev, postCode: e.target.value }))}
                    placeholder="ZIP"
                    autoComplete="postal-code"
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
                  />
                </div>
                <div>
                  <label className="block text-base text-black">
                    {t("checkout.placeholder.city")} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={form.city || ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, city: e.target.value }))}
                    placeholder={t("checkout.placeholder.city")}
                    autoComplete="address-level2"
                    required
                    className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black placeholder:text-zinc-400"
                  />
                </div>
              </div>
              {/* Founder&rsquo;s gift — explained so the visitor doesn't wonder why their bike
                  reservation is asking for clothing size. */}
              <div className="mt-4 rounded-md bg-orange-50 border border-orange-200 p-3 md:p-4">
                <div className="text-xs md:text-sm font-semibold text-orange-700 uppercase tracking-wider mb-2">
                  Founder&rsquo;s gift
                </div>
                <p className="text-xs md:text-sm text-zinc-700 mb-3">
                  Every reservation includes a welcome gift, shipped within 7 days. Pick your size below.
                </p>
                <label className="block text-base text-black">
                  {t("checkout.placeholder.tshirt") || "T‑shirt size"} <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.tshirtSize || ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, tshirtSize: e.target.value }))}
                  required
                  className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black outline-none focus:border-black bg-white"
                >
                  <option value="">{t("checkout.placeholder.tshirt") || "T‑shirt size"}</option>
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  <option value="XL">XL</option>
                  <option value="XXL">XXL</option>
                </select>
              </div>
            </div>

            {/* Payment section */}
            <div className="space-y-4">
              <h2 className="text-base font-semibold text-black">{t("checkout.card.title")}</h2>

              <div className="grid grid-cols-1 gap-3">
                <div
                  id="payment-element"
                  className="w-full rounded-md border border-zinc-300 px-3 py-3 text-base text-black"
                ></div>
                {!publishableKey && (
                  <div className="text-sm text-red-600">Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY to enable payments.</div>
                )}
              </div>
            </div>
          </div>
          {/* end two-column */}

          {/* Order summary and CTA */}
          <div className="mt-10 space-y-3">
            <h2 className="text-base font-semibold text-black">{t("checkout.orderSummary.title")}</h2>
            <div className="text-base text-black">
              {selectedModal} <span className="text-zinc-500">{t("checkout.summary.estimateLabel")}</span> €
              {estimatedPrice.toLocaleString()}
            </div>
            <div className="mt-2 text-base text-black">
              <div>
                <span className="font-medium">{t("checkout.summary.dueToday")}</span>
              </div>
              <div className="text-black">
                1 × {selectedModal} {t("checkout.summary.reservationLabel")}
              </div>
              <div className="font-semibold">€{depositToday.toFixed(2)}</div>
            </div>
            <div className="mt-2 text-xs text-black/70 leading-relaxed">{t("checkout.legal.note")}</div>
          </div>

          {/* Newsletter opt-in */}
          <div className="mt-6 flex items-center gap-3">
            <input
              id="subscribe-newsletter"
              type="checkbox"
              checked={form.subscribe}
              onChange={onToggleSubscribe}
              className="h-5 w-5 rounded border border-zinc-300"
            />
            <label htmlFor="subscribe-newsletter" className="text-base text-black">
              {t("checkout.newsletter.label")}
            </label>
          </div>

          {/* Legal agreement */}
          <div className="mt-4 flex items-start gap-3">
            <input
              id="agree-legal"
              type="checkbox"
              checked={form.agree}
              onChange={onToggleAgree}
              className="mt-1 h-5 w-5 rounded border border-zinc-300"
            />
            <label htmlFor="agree-legal" className="text-base text-black">
              {t("checkout.agree.prefix")}{" "}
              <Link
                href="/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {t("common.privacyPolicy")}
              </Link>{" "}
              {t("cta.andConnector")}{" "}
              <Link
                href="/legal/reservation-terms"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:no-underline"
              >
                {t("footer.reservationTerms")}
              </Link>
              .
            </label>
          </div>

          {/* CTA Row */}
          <div className="mt-8 flex items-center justify-between">
            {/* <a href="/cart" onClick={goBack} className="text-base text-black hover:underline">
              &lt; Return
            </a> */}
            <button
              onClick={placeOrder}
              disabled={submitting || !formValid}
              className="group inline-flex items-center gap-3 rounded-full bg-black px-6 py-3 text-white shadow-sm hover:bg-black/90 disabled:opacity-60"
            >
              <span className="text-base">{t("checkout.placeOrder")}</span>
              <span className="grid h-8 w-8 place-items-center rounded-full bg-white text-black transition-transform group-hover:scale-105">
                {/* simple arrow icon */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M7 17L17 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M9 7H17V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </span>
            </button>
          </div>

          {error && (
            <div className="mt-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-base text-red-700">{error}</div>
          )}
          {/* Load Stripe.js from CDN for quick local testing */}
          <Script src="https://js.stripe.com/v3" strategy="lazyOnload" onLoad={() => setStripeReady(true)} />
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen w-full bg-white">
          <div className="mx-auto max-w-7xl p-6 text-black">Loading checkout…</div>
        </div>
      }
    >
      <CheckoutContent />
    </Suspense>
  );
}
