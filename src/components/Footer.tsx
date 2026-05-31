"use client";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { useLanguage } from "@/context/LanguageContext";
import { useCallback, useState } from "react";

import { COUNTRIES } from "@/constants/country";
// import { SingleValue } from "react-select";

const Footer = () => {
  const { t } = useLanguage();
  const [showSelector, setShowSelector] = useState(false);

  const openSelector = useCallback(() => setShowSelector(true), []);
  const closeSelector = useCallback(() => setShowSelector(false), []);
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [country, setCountry] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const filteredCountries = COUNTRIES.filter((ctr) => (country ? ctr.toLowerCase().includes(country.toLowerCase()) : true));
  const [message, setMessage] = useState<string>("");

  // const onSignupClick = useCallback(() => setExpanded(true), []);
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
        body: JSON.stringify({ email: trimmed, name: name.trim(), country: country }),
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
      setMessage(t("footer.newsletter.success"));

      // Optionally collapse after success
      // setExpanded(false);
    } catch (err) {
      setStatus("error");
      setMessage(t("footer.newsletter.networkError"));
    } finally {
      setLoading(false);
    }
  }, [email, loading]);
  // Navigation links data structure with translations
  const footerLinks = [
    {
      title: t("nav.home"),
      links: [
        { label: "G1S Street", href: "/G1S" },
        { label: "G1X Scrambler", href: "/G1X" },
        { label: t("nav.tech"), href: "/tech" },
        // { label: t("nav.foundersCircle"), href: "/founders-circle" },
        // { label: "FAQs", href: "/faqs" },
      ],
    },
    {
      title: t("nav.about"),
      links: [
        { label: t("nav.quality"), href: "/quality" },
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.events"), href: "/corporate/conferences" },
        { label: t("nav.corporate"), href: "/corporate" },
        { label: t("nav.sustainability"), href: "/quality/sustainablity" },
        // Help Center / FAQ — added per FAQ structure overhaul (May 2026).
        { label: t("home.faq.title"), href: "/faqs" },
        { label: t("nav.contact"), href: "/contact" },
      ],
    },
    {
      title: t("footer.workWithUs"),
      links: [
        { label: t("corporate.distributors.link"), href: "/corporate/distributors" },
        { label: t("corporate.investors.link"), href: "/corporate/investors" },
        { label: t("corporate.fleetSales.link"), href: "/corporate/fleet-sales" },
      ],
    },
    {
      title: t("footer.legal"),
      links: [
        { label: t("common.privacyPolicy"), href: "/legal/privacy-policy" },
        { label: t("common.termsOfUse"), href: "/legal/terms-of-use" },
        { label: t("footer.warranty"), href: "/quality/warranty" },
        { label: t("footer.reservationTerms"), href: "/legal/reservation-terms" },
      ],
    },
  ];

  // Social media links
  const socialLinks: { type: "instagram" | "facebook" | "linkedin" | "youtube"; href: string }[] = [
    { type: "instagram", href: "https://www.instagram.com/grit.motorcycles" },
    { type: "facebook", href: "https://www.facebook.com/gritmotorcycles" },
    { type: "linkedin", href: "https://www.linkedin.com/company/grit-motorcycles/" },
    { type: "youtube", href: "https://www.youtube.com/@GR1TMotorcycles" },
  ];

  return (
    <footer className="w-full bg-black text-white py-12">
      {/* Main Footer Content */}
      <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0">
        {/* Top band — Logo (left), Round social icons (right) above the divider line */}
        <div className="mb-8">
          <div className="flex flex-row items-center justify-between gap-4">
            <div className="flex flex-row items-center">
              <Image
                src="/LOGO_big_WHITE.svg"
                alt="GR1T Motorcycles logo"
                width={200}
                height={70}
                sizes="(max-width: 768px) 150px, 200px"
                loading="lazy"
              />
            </div>

            {/* Round social icons — 40px circles, white border, white icon, orange on hover */}
            <div className="flex items-center gap-2 sm:gap-3" aria-label="GR1T on social media">
              {socialLinks.map((social) => (
                <a
                  key={social.type}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.type}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white text-white hover:bg-white hover:text-black hover:border-white transition-colors duration-200"
                >
                  <SocialIcon type={social.type} asChild className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>
          <div className="w-full h-px bg-white my-8"></div>
        </div>

        {/* Navigation Columns — 12-col grid that rebalances at large screens so the contact
            block has enough room for full-width phone numbers without wrapping.
            md (tablet): link cols span 2, contact spans 4 → labels readable, phones still tight.
            lg+ (desktop): link cols span 1, contact spans 8 → phones fit on one line. */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-3 gap-y-8 mb-12">
          {/* Navigation Link Columns */}
          {footerLinks.map((column, index) => (
            <div key={index} className="md:col-span-2 lg:col-span-1">
              <h3 className="font-medium mb-4 text-white">{column.title}</h3>
              <ul className="space-y-2 text-sm text-white">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link href={link.href} className="text-white hover:underline transition-all">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Newsletter Signup */}
          {/* <div>
            <div className="bg-white rounded-[21] py-4 px-3 max-w-md -mt-4">
              <h3 className="font-bold mb-4 text-black">{t("footer.newsletter.title")}</h3>
              <p className="text-sm text-black mb-4">{t("footer.newsletter.description")}</p>
              <div className="flex justify-end">
                <button
                  // href="/newsletter"
                  onClick={openSelector}
                  className="inline-flex items-center bg-black text-white rounded-full px-3 py-1 text-sm font-medium border border-gray-300"
                >
                  {t("footer.newsletter.joinNow")}
                  <svg className="ml-2 w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M5 12H19M19 12L12 5M19 12L12 19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}

          {/* Contact Info — md spans 4 (matches link cols), lg+ spans 8 so the three address
              blocks have enough room for phone numbers without wrapping. */}
          <div className="md:col-span-4 lg:col-span-8">
            <h3 className="font-medium mb-4">{t("contact.title")}</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <address className="not-italic text-sm text-white space-y-1">
                <p>GR1T Motorcycles GmbH</p>
                <p>Piazza Gae Aulenti 1, Torre B</p>
                <p>Milano, 20154</p>
                <p>Italy</p>
                <p className="mt-2">Tel +39 (0) 297130335</p>
              </address>
              <address className="not-italic text-sm text-white space-y-1">
                <p>GR1T Motorcycles GmbH</p>
                <p>Goethestrasse 42</p>
                <p>16025 Berlin</p>
                <p>Germany</p>
                <p className="mt-2">Tel +49 (0) 30 300 139 603</p>
              </address>
              <address className="not-italic text-sm text-white space-y-1">
                <p>GR1T Motorcycles (Holdings) Ltd</p>
                <p>Archbishop Makarios III, 133</p>
                <p>Limassol, 3085</p>
                <p>Cyprus</p>
              </address>
            </div>
            {/* Email */}
            <div className="text-sm text-gray-400 mt-4">
              <Link href="mailto:grit@gritmotorcycles.com" className="text-white hover:underline transition-all">
                grit(at)gritmotorcycles.com
              </Link>
            </div>
          </div>
        </div>
      </div>
      {/* Copyright and Legal */}
      <div className="border-t border-gray-800 pt-8 mt-12 text-sm text-gray-400">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0 flex flex-col md:flex-row justify-between items-center">
          <p>
            © {new Date().getFullYear()} GR1T. {t("footer.rights")}
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/legal/privacy-policy" className="hover:text-white">
              {t("common.privacyPolicy")}
            </Link>
            <Link href="/legal/terms-of-use" className="hover:text-white">
              {t("common.termsOfUse")}
            </Link>
            <Link href="/quality/warranty" className="hover:text-white">
              {t("footer.warranty")}
            </Link>
            <Link href="/legal/reservation-terms" className="hover:text-white">
              {t("footer.reservationTerms")}
            </Link>
          </div>
        </div>
      </div>
      {showSelector && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60" onClick={closeSelector} />
          <div
            role="dialog"
            aria-modal="true"
            className="relative mx-4 w-full max-w-lg md:max-w-xl  rounded-2xl bg-white shadow-xl p-5 md:p-8 lg:p-10 max-h-[85vh] overflow-y-auto overscroll-contain"
          >
            <button
              aria-label="Close"
              onClick={closeSelector}
              className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-700 hover:bg-gray-200"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
            <h4 className="text-xl md:text-2xl lg:text-3xl font-semibold text-black text-center">{t("cta.modal.title")}</h4>
            <p className="mt-2 text-sm md:text-base lg:text-lg text-gray-600 text-center">{t("cta.modal.subtitle")}</p>
            <div className="w-full max-w-none mx-auto">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  onSubmit();
                }}
                className="space-y-3 transition-all duration-300 w-full mx-auto"
              >
                <input
                  type="text"
                  value={name}
                  onChange={onNameChange}
                  placeholder={t("cta.form.namePlaceholder")}
                  className="border border-gray-300 w-full bg-white rounded-full shadow-sm px-4 py-2.5 md:py-3 text-black outline-none placeholder:text-zinc-500"
                  aria-label="Name"
                />
                <div className="relative w-full mx-auto">
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

                {/* <input type="text" value={country} onChange={onCountryChange} placeholder="Country" aria-label="Country" /> */}
                <input
                  type="email"
                  value={email}
                  onChange={onEmailChange}
                  placeholder={t("cta.form.emailPlaceholder")}
                  className="hidden"
                  aria-label="Email address"
                  required
                />
                <div className="border border-gray-300 flex items-center justify-center bg-white rounded-full shadow-sm overflow-hidden w-full mx-auto">
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
                <p className={`mt-2 text-lg text-center ${status === "success" ? "text-green-600" : "text-red-500"}`}>
                  {message}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
