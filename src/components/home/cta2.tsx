"use client";
import React, { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { COUNTRIES } from "@/constants/country";
import { useLanguage } from "@/context/LanguageContext";

const CTATwoSection = () => {
  const [expanded, setExpanded] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [modalStep, setModalStep] = useState<1 | 2>(1);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const filteredCountries = COUNTRIES.filter((ctr) => (country ? ctr.toLowerCase().includes(country.toLowerCase()) : true));
  const { t } = useLanguage();

  const onSignupClick = useCallback(() => setExpanded(true), []);
  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);
  const onNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value), []);
  const onCountryChange = useCallback((ctry: string) => {
    setCountry(ctry);
    setIsOpen(false);
  }, []);
  const onSubmit = useCallback(async () => {
    if (loading) return;
    setStatus("idle");
    setMessage("");

    const trimmed = email.trim();
    const isEmail = /.+@.+\..+/.test(trimmed);
    if (!isEmail) {
      setStatus("error");
      setMessage(t("cta.form.emailInvalid"));
      return;
    }

    try {
      setLoading(true);
      const res = await fetch("/api/mailchimp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, name: name.trim(), country: country.trim() }),
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch (_) {
        // Fallback to text when response isn't JSON (e.g., 404 HTML)
        const text = await res.text();
        data = { error: text };
      }
      if (!res.ok) {
        setStatus("error");
        const payload = (data ?? {}) as Record<string, unknown>;
        const fallback = typeof payload.error === "string" ? (payload.error as string) : t("cta.error.generic");
        setMessage(fallback);
        return;
      }

      setStatus("success");
      setMessage(t("cta.success"));
      setShowSuccess(true);
      setModalStep(1);
      // Optionally collapse after success
      // setExpanded(false);
    } catch (err) {
      setStatus("error");
      setMessage(t("common.error"));
    } finally {
      setLoading(false);
    }
  }, [email, loading, t]);

  return (
    <section className="bg-white">
      <div className="w-full">
        <div className="relative w-full h-[20rem] md:h-[30rem] lg:h-[36rem] overflow-hidden">
          <Image
            src="/Home/cta-2-bg.png"
            alt="GR1T Founder's Club CTA background"
            fill
            priority
            sizes="100vw"
            className="object-cover"
            quality={90}
          />

          {/* Centered overlay panel */}
          <div className="absolute inset-0 flex items-center justify-center p-4 md:p-6">
            <div className="bg-black/25 md:bg-black/40  rounded-xl shadow-xl px-6 py-8 md:px-10 md:py-10 max-w-3xl w-full">
              <h3 className="text-white text-xl md:text-3xl lg:text-4xl font-semibold leading-tight text-center">
                {t("cta.hero.title")}
              </h3>
              <p className="text-white text-center text-sm md:text-base lg:text-lg font-medium leading-relaxed">
                {t("cta.hero.subtitle")}
              </p>

              <div className="mt-6 md:mt-8 flex items-center justify-center">
                {!expanded ? (
                  <button
                    onClick={onSignupClick}
                    className="inline-flex items-center gap-3 px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-white text-black font-semibold shadow-sm hover:bg-gray-100 transition-all duration-300 transform"
                  >
                    {t("cta.hero.button")}
                    <span className="inline-flex items-center justify-center w-7 h-7 md:w-8 md:h-8 rounded-full bg-black text-white">
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
                ) : (
                  <div className="w-full max-w-md">
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        onSubmit();
                      }}
                      className="space-y-3 transition-all duration-300"
                    >
                      <input
                        type="text"
                        value={name}
                        onChange={onNameChange}
                        placeholder={t("cta.form.namePlaceholder")}
                        className="w-full bg-white rounded-full shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500"
                        aria-label="Name"
                      />
                      <div className="relative w-full">
                        <input
                          type="text"
                          value={country}
                          onChange={(e) => {
                            setCountry(e.target.value);
                            setIsOpen(true);
                          }}
                          onFocus={() => setIsOpen(true)}
                          placeholder={t("cta.form.countryPlaceholder")}
                          className={` w-full bg-white  shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500 ${
                            isOpen ? "rounded-t-xl" : "rounded-full border border-gray-300"
                          }`}
                        />
                        {isOpen && (
                          <ul
                            className={`absolute z-10 min-w-full bg-white  max-h-20 overflow-y-auto shadow-lg ${
                              isOpen ? "rounded-b-xl" : "rounded-md "
                            }`}
                          >
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <li
                                  key={country}
                                  onClick={() => onCountryChange(country)}
                                  className="p-2 hover:bg-blue-100 cursor-pointer text-black"
                                >
                                  {country}
                                </li>
                              ))
                            ) : (
                              <li className="p-2 text-gray-400">{t("cta.form.noResults")}</li>
                            )}
                          </ul>
                        )}
                      </div>

                      <input
                        type="email"
                        value={email}
                        onChange={onEmailChange}
                        placeholder={t("cta.form.emailPlaceholder")}
                        className="hidden"
                        aria-label="Email address"
                        required
                      />
                      <div className="flex items-center bg-white rounded-full shadow-sm overflow-hidden">
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
                      <p className={`mt-2 text-sm text-center ${status === "success" ? "text-emerald-300" : "text-red-300"}`}>
                        {message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={() => setShowSuccess(false)} />
          <div
            role="dialog"
            aria-modal="true"
            className="relative mx-4 w-full max-w-sm md:max-w-2xl lg:max-w-3xl rounded-2xl bg-white shadow-xl p-6 md:p-8 lg:p-10"
          >
            <button
              aria-label="Close"
              onClick={() => setShowSuccess(false)}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            {modalStep === 1 ? (
              <div>
                <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black">{t("cta.success.title")}</h4>
                <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600">{t("cta.success.description")}</p>
                <div className="mt-6 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setShowSuccess(false)}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200"
                  >
                    {t("cta.success.notNow")}
                  </button>
                  <button
                    onClick={() => setModalStep(2)}
                    className="px-5 md:px-6 py-2.5 md:py-3 rounded-full bg-orange-500 text-white font-bold hover:cursor-pointer hover:bg-orange-600 "
                  >
                    {t("cta.success.reserveNowCta")}
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black text-center">{t("cta.choose.title")}</h4>
                <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 text-center">{t("cta.choose.description")}</p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <button
                    type="button"
                    aria-label="Choose G1S"
                    className="group rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 p-4 shadow-sm hover:shadow-md transition"
                    onClick={() => router.push("/checkout?model=G1S")}
                  >
                    <div className="relative w-full h-48 md:h-64 lg:h-80">
                      <Image
                        src="/Home/bikes/G1S.png"
                        alt="G1S"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-base md:text-lg lg:text-xl font-semibold text-black">G1S</span>
                    </div>
                  </button>
                  <button
                    type="button"
                    aria-label="Choose G1X"
                    className="group rounded-xl border border-gray-200 hover:border-orange-500 bg-gray-50 hover:bg-gray-100 p-4 shadow-sm hover:shadow-md transition"
                    onClick={() => router.push("/checkout?model=G1X")}
                  >
                    <div className="relative w-full h-48 md:h-64 lg:h-80">
                      <Image
                        src="/Home/bikes/G1X.png"
                        alt="G1X"
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                        className="object-contain"
                        priority
                      />
                    </div>
                    <div className="mt-3 text-center">
                      <span className="text-base md:text-lg lg:text-xl font-semibold text-black">G1X</span>
                    </div>
                  </button>
                </div>
                <div className="mt-6 flex items-center justify-end">
                  <button
                    onClick={() => setModalStep(1)}
                    className="px-4 py-2 rounded-full bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200"
                  >
                    {t("cta.choose.back")}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default CTATwoSection;
