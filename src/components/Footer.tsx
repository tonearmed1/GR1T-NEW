"use client";
import Image from "next/image";
import Link from "next/link";
import SocialIcon from "./SocialIcon";
import { useLanguage } from "@/context/LanguageContext";
import { useCallback, useState } from "react";

const Footer = () => {
  const { t, language } = useLanguage();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [message, setMessage] = useState<string>("");

  const onEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value), []);

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
        body: JSON.stringify({ email: trimmed }),
      });

      let data: unknown = null;
      try {
        data = await res.json();
      } catch {
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
    } catch {
      setStatus("error");
      setMessage(t("footer.newsletter.networkError"));
    } finally {
      setLoading(false);
    }
  }, [email, loading]);
  // Navigation links data structure with translations
  // 3 link columns + contact column = 4 sections, evenly distributed at md+.
  // Order (per user preference): Bikes → Work With Us → About Us → Contact.
  // Privacy / Terms / Cookie Policy live exclusively in the bottom legal strip
  // (no longer a duplicate "Legal" column up here).
  const footerLinks = [
    {
      // Bikes — product-related links including Warranty + Reservation Terms,
      // which belong with the bike-buyer journey (moved from the bottom legal strip).
      title: language === "it" ? "Moto" : "Bikes",
      links: [
        { label: "G1S Street", href: "/G1S" },
        { label: "G1X Scrambler", href: "/G1X" },
        // /tech is deprecated — link points to the consolidated TechFeatures section on the homepage.
        { label: t("nav.tech"), href: "/#tech-features" },
        { label: t("footer.warranty"), href: "/quality/warranty" },
        { label: t("footer.reservationTerms"), href: "/legal/reservation-terms" },
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
      title: t("nav.about"),
      links: [
        { label: t("nav.quality"), href: "/quality" },
        { label: t("nav.news"), href: "/news" },
        { label: t("nav.events"), href: "/corporate/conferences" },
        { label: t("nav.corporate"), href: "/corporate" },
        { label: t("nav.sustainability"), href: "/quality/sustainablity" },
        { label: t("home.faq.title"), href: "/faqs" },
        { label: t("nav.contact"), href: "/contact" },
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

        {/* Footer columns — 3 link cols + 3 address cols, 6 across on desktop. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-x-6 gap-y-8 mb-12">
          {footerLinks.map((column, index) => (
            <div key={index}>
              <h3 className="text-grit-orange text-xs font-bold uppercase tracking-[0.1em] mb-4">{column.title}</h3>
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

          <div>
            <h3 className="text-grit-orange text-xs font-bold uppercase tracking-[0.1em] mb-4">Italy</h3>
            <address className="not-italic text-sm text-white space-y-1">
              <p>GR1T Motorcycles GmbH</p>
              <p>Piazza Gae Aulenti 1, Torre B</p>
              <p>20154 Milano</p>
              <p>+39 (0) 297 130 335</p>
            </address>
          </div>
          <div>
            <h3 className="text-grit-orange text-xs font-bold uppercase tracking-[0.1em] mb-4">Germany</h3>
            <address className="not-italic text-sm text-white space-y-1">
              <p>GR1T Motorcycles GmbH</p>
              <p>Goethestrasse 42</p>
              <p>16025 Berlin</p>
              <p>+49 (0) 30 300 139 603</p>
            </address>
          </div>
          <div>
            <h3 className="text-grit-orange text-xs font-bold uppercase tracking-[0.1em] mb-4">Cyprus</h3>
            <address className="not-italic text-sm text-white space-y-1">
              <p>GR1T Motorcycles (Holdings) Ltd</p>
              <p>Archbishop Makarios III, 133</p>
              <p>Limassol, 3085</p>
              <Link href="mailto:grit@gritmotorcycles.com" className="text-white hover:underline transition-all block mt-2">
                grit(at)gritmotorcycles.com
              </Link>
            </address>
          </div>
        </div>
      </div>
      {/* Copyright, legal links, and inline newsletter signup */}
      <div className="border-t border-gray-800 pt-8 mt-4">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0 flex flex-col md:flex-row justify-between items-end gap-8">
          <div className="text-sm text-gray-400">
            <p>
              © {new Date().getFullYear()} GR1T. {t("footer.rights")}
            </p>
            <div className="flex flex-wrap gap-x-6 gap-y-2 mt-4">
              <Link href="/legal/privacy-policy" className="hover:text-white">
                {t("common.privacyPolicy")}
              </Link>
              <Link href="/legal/terms-of-use" className="hover:text-white">
                {t("common.termsOfUse")}
              </Link>
              <Link href="/legal/cookie-policy" className="hover:text-white">
                Cookie Policy
              </Link>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <h3 className="font-medium mb-3 text-white">Stay up to date.</h3>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit();
              }}
              className="flex items-center bg-transparent border border-white/30 rounded-full overflow-hidden w-full md:w-80"
            >
              <input
                type="email"
                value={email}
                onChange={onEmailChange}
                placeholder="Email address"
                className="flex-1 bg-transparent px-4 py-2.5 text-white outline-none placeholder:text-white/50 text-sm"
                aria-label="Email address"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="m-1 inline-flex items-center gap-2 rounded-full bg-white text-black px-4 py-1.5 text-sm font-semibold hover:bg-grit-orange hover:text-white transition-colors disabled:opacity-60"
              >
                {loading ? "..." : "Join"}
                <svg width="12" height="12" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 8H13.5M13.5 8L9.5 4M13.5 8L9.5 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>
            {status !== "idle" && (
              <p className={`mt-2 text-xs ${status === "success" ? "text-emerald-400" : "text-red-400"}`}>{message}</p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
