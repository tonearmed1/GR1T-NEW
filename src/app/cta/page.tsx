"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { COUNTRIES } from "@/constants/country";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";

export default function CTAPage() {
  const { t } = useLanguage();
  const router = useRouter();
  type Mode = "home" | "signup";
  const [mode, setMode] = useState<Mode>("home");

  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const [showSelector, setShowSelector] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const filteredCountries = COUNTRIES.filter((ctr) => (country ? ctr.toLowerCase().includes(country.toLowerCase()) : true));
  const initialValuesRef = useRef<{ email: string; name: string; country: string }>({ email: "", name: "", country: "" });
  const valuesRef = useRef<{ email: string; name: string; country: string }>({ email: "", name: "", country: "" });
  const timerRef = useRef<number | null>(null);
  const interactedRef = useRef(false);

  const reserveNow = useCallback(() => {
    router.push("/checkout?model=G1S&kiosk=1");
  }, [router]);

  const openSignup = useCallback(() => {
    setShowSelector(true);
  }, []);

  const closeSignup = useCallback(() => {
    if (timerRef.current) window.clearTimeout(timerRef.current);
    setShowSelector(false);
    setMode("home");
    setEmail("");
    setName("");
    setCountry("");
    setLoading(false);
    setStatus("idle");
    setMessage("");
    setIsOpen(false);
  }, []);

  const markInteraction = useCallback(() => {
    interactedRef.current = true;
  }, []);

  const onEmailChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
      markInteraction();
    },
    [markInteraction]
  );

  const onNameChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setName(e.target.value);
      markInteraction();
    },
    [markInteraction]
  );

  const onCountryChange = useCallback(
    (ctry: string) => {
      setCountry(ctry);
      setIsOpen(false);
      markInteraction();
    },
    [markInteraction]
  );

  const submitSignup = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      if (loading) return;
      if (!email) {
        setStatus("error");
        setMessage(t("cta.form.emailRequired"));
        return;
      }
      try {
        setLoading(true);
        const res = await fetch("/api/mailchimp", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, name, country, tags: ["newsletter", "kiosk"] }),
        });
        if (!res.ok) {
          const text = await res.text();
          throw new Error(text || t("cta.error.generic"));
        }
        setStatus("success");
        setMessage(t("cta.success"));
        window.setTimeout(() => closeSignup(), 2000);
      } catch (err) {
        setStatus("error");
        setMessage(err instanceof Error ? err.message : t("common.error"));
      } finally {
        setLoading(false);
      }
    },
    [email, name, country, closeSignup, loading, t]
  );

  useEffect(() => {
    valuesRef.current = { email, name, country };
  }, [email, name, country]);

  useEffect(() => {
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <section className="relative h-screen bg-white text-black flex items-center justify-center">
      {/* Side images anchored to viewport edges, full-height */}
      <div className="hidden md:block absolute left-0 top-0 h-screen w-[28vw] max-w-[560px] pointer-events-none select-none z-0">
        <Image
          src="/founders_circle/LEFT.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-contain h-full object-bottom"
        />
      </div>
      <div className="hidden md:block absolute right-0 top-0 h-screen w-[28vw] max-w-[560px] pointer-events-none select-none z-0">
        <Image
          src="/founders_circle/RIGHT.png"
          alt=""
          fill
          priority
          aria-hidden="true"
          className="object-contain h-full object-bottom"
        />
      </div>
      <div className="relative z-10 max-w-6xl w-full px-6">
        {mode === "home" && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {/* Left: Reserve */}
            <div className="text-center flex flex-col items-center h-full rounded-2xl bg-white/60 backdrop-blur-xs border border-white/30 shadow-lg p-6 md:p-8">
              <h1 className="text-3xl md:text-4xl font-semibold">
                Be First.
                <br />
                Reserve yours today!
              </h1>
              <p className="mt-6 text-lg">
                Secure your <span className="font-bold">priority build slot</span> for the GR1T G1. Be among the first to ride.
              </p>
              <p className="mt-8 text-sm text-black/60 md:min-h-[24px]">€100 fully refundable. No commitment.</p>
              <div className="flex justify-center">
                <button
                  onClick={reserveNow}
                  className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-orange-400 bg-white text-orange-400 font-semibold shadow-sm hover:bg-gray-100 transition-all duration-300 transform"
                >
                  Reserve Now
                  <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8  rounded-full bg-orange-400 text-white">
                    {/* arrow */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12h12M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
            </div>

            {/* Right: Newsletter */}
            <div className="text-center flex flex-col items-center h-full rounded-2xl bg-white/60 backdrop-blur-xs border border-white/30 shadow-lg p-6 md:p-8">
              <h2 className="text-3xl md:text-4xl font-semibold">
                {t("cta.hero.title")}
              </h2>
              <p className="mt-6 text-lg">
                {t("cta.hero.subtitle")}
              </p>
              <div className="mt-14 flex justify-center">
                {/* <button
                  onClick={openSignup}
                  className="rounded-xl border-2 border-orange-400 bg-white text-orange-600 font-semibold px-8 py-4 shadow min-w-[220px]"
                >
                  Sign Up
                </button> */}

                <button
                  onClick={openSignup}
                  className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full border border-orange-400 bg-white text-orange-400 font-semibold shadow-sm hover:bg-gray-100 transition-all duration-300 transform"
                >
                  {t("cta.hero.button")}
                  <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8  rounded-full bg-orange-400 text-white">
                    {/* arrow */}
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M5 12h12M12 5l7 7-7 7"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </button>
              </div>
              <p className="mt-4 text-sm text-black/60 invisible md:min-h-[24px]">placeholder</p>
            </div>
          </div>
        )}

        {/* Footer-style newsletter popup overlay */}
        {showSelector && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="absolute inset-0 bg-black/60" onClick={closeSignup} />
            <div
              role="dialog"
              aria-modal="true"
              className="relative mx-4 w-full max-w-lg md:max-w-xl rounded-2xl bg-white shadow-xl p-5 md:p-8 lg:p-10 max-h-[85vh] overflow-y-auto overscroll-contain text-black"
            >
              <button
                aria-label="Close"
                onClick={closeSignup}
                className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
              <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-center">{t("cta.modal.title")}</h4>
              <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 text-center">{t("cta.modal.subtitle")}</p>
              <div className="w-full max-w-md mx-auto mt-4">
                <form onSubmit={submitSignup} className="space-y-3 transition-all duration-300">
                  <input
                    type="text"
                    value={name}
                    onChange={onNameChange}
                    placeholder={t("cta.form.namePlaceholder")}
                    className="border border-gray-300 w-full bg-white rounded-full shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500"
                    aria-label="Name"
                  />
                  <div className="relative w-full">
                    <input
                      type="text"
                      value={country}
                      onChange={(e) => {
                        setCountry(e.target.value);
                        setIsOpen(true);
                        markInteraction();
                      }}
                      onFocus={() => setIsOpen(true)}
                      placeholder={t("cta.form.countryPlaceholder")}
                      className={`w-full bg-white shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500 ${
                        isOpen ? "rounded-t-xl" : "rounded-full border border-gray-300"
                      }`}
                    />
                    {isOpen && (
                      <ul
                        className={`absolute z-10 min-w-full bg-white max-h-20 overflow-y-auto shadow-lg ${
                          isOpen ? "rounded-b-xl" : "rounded-md"
                        }`}
                      >
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((c) => (
                            <li
                              key={c}
                              onClick={() => onCountryChange(c)}
                              className="p-2 hover:bg-blue-100 cursor-pointer text-black"
                            >
                              {c}
                            </li>
                          ))
                        ) : (
                          <li className="p-2 text-gray-400">{t("cta.form.noResults")}</li>
                        )}
                      </ul>
                    )}
                  </div>

                  <div className="border border-gray-300 flex items-center bg-white rounded-full shadow-sm overflow-hidden">
                    <input
                      type="email"
                      value={email}
                      onChange={onEmailChange}
                      placeholder={t("cta.form.emailPlaceholder")}
                      className="flex-1 px-4 py-2.5 md:py-3 text-black outline-none bg-transparent placeholder:text-zinc-500"
                      aria-label="Email address"
                      required
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="px-5 md:px-6 py-2.5 md:py-3 bg-orange-500 text-white font-bold hover:cursor-pointer hover:bg-orange-600 disabled:opacity-60 disabled:cursor-not-allowed"
                      aria-live="polite"
                    >
                      {loading ? t("cta.form.submitting") : t("cta.form.submit")}
                    </button>
                  </div>
                </form>
                {status !== "idle" && (
                  <p className={`mt-2 text-sm text-center ${status === "success" ? "text-emerald-600" : "text-red-600"}`}>
                    {message}
                  </p>
                )}
                <p className="mt-3 text-center text-black/60 text-xs">
                  By subscribing you agree to our{" "}
                  <a href="/legal/privacy-policy" target="_blank" className="underline">
                    Privacy Policy
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
