import type { Metadata } from "next";

const BASE = "https://www.gritmotorcycles.com";

export const metadata: Metadata = {
  title: "Cookie Policy | GR1T Motorcycles",
  description:
    "How GR1T Motorcycles uses cookies — strictly necessary cookies for payments and language, optional analytics cookies you can accept or reject. Updated May 2026.",
  alternates: {
    canonical: `${BASE}/legal/cookie-policy`,
    languages: {
      en: `${BASE}/legal/cookie-policy`,
      it: `${BASE}/it/legal/cookie-policy`,
      "x-default": `${BASE}/legal/cookie-policy`,
    },
  },
  robots: { index: true, follow: true },
};

/**
 * Cookie Policy
 *
 * Bilingual DE + EN to match the existing privacy-policy page style (German is the
 * primary jurisdiction since GR1T Motorcycles GmbH is registered in Berlin).
 *
 * This is a working draft — review with counsel before relying on it for compliance.
 * It accurately reflects what the site does today:
 *   - Strictly necessary: Stripe (payment), locale (cookie), consent (localStorage)
 *   - Analytics: Google Analytics 4 (G-79JEY4LG0K) + Vercel Analytics
 *   - Marketing/functional: none currently active
 */
export default function CookiePolicyPage() {
  return (
    <div className="min-h-screen bg-white text-black mt-10">
      <div className="mx-auto max-w-3xl px-6 py-12">
        <h1 className="text-3xl font-semibold">Cookie-Richtlinie / Cookie Policy</h1>
        <p className="mt-3 text-sm text-black/60">
          Stand / Last updated: 31 May 2026
        </p>

        <section className="mt-10 space-y-8">
          {/* 1. Verantwortlicher */}
          <div>
            <h2 className="text-xl font-semibold">1. Verantwortlicher / Data Controller</h2>
            <div className="mt-3 text-black/80 leading-relaxed">
              <p>GR1T Motorcycles GmbH</p>
              <p>Goethestrasse 42, 10625 Berlin, Deutschland</p>
              <p>Handelsregister B des Amtsgerichts München, HRB 288034</p>
              <p>E-Mail: grit@gritmotorcycles.com</p>
            </div>
          </div>

          {/* 2. Was sind Cookies */}
          <div>
            <h2 className="text-xl font-semibold">2. Was sind Cookies? / What are cookies?</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Website besuchen.
              Sie ermöglichen grundlegende Funktionen, helfen uns, die Website zu verbessern, und können Informationen über
              Ihren Besuch enthalten. Verwandte Technologien wie lokaler Browserspeicher (localStorage) werden in dieser
              Richtlinie gleichbedeutend behandelt.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              Cookies are small text files stored on your device when you visit our website. They enable basic functions, help us
              improve the site, and may contain information about your visit. Related technologies such as browser local storage
              are treated equivalently in this policy.
            </p>
          </div>

          {/* 3. Rechtsgrundlage */}
          <div>
            <h2 className="text-xl font-semibold">3. Rechtsgrundlage / Legal Basis</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Die Verwendung technisch notwendiger Cookies erfolgt auf Grundlage unseres berechtigten Interesses an einer
              funktionsfähigen Website gemäß § 25 Abs. 2 TTDSG sowie Art. 6 Abs. 1 lit. f DSGVO. Optionale Cookies
              (Analyse, Marketing) werden ausschließlich mit Ihrer ausdrücklichen Einwilligung gemäß § 25 Abs. 1 TTDSG und
              Art. 6 Abs. 1 lit. a DSGVO gesetzt.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              Strictly necessary cookies are set on the basis of our legitimate interest in providing a functional website
              (§ 25(2) TTDSG and Art. 6(1)(f) GDPR). Optional cookies (analytics, marketing) are only set with your explicit
              consent (§ 25(1) TTDSG and Art. 6(1)(a) GDPR).
            </p>
          </div>

          {/* 4. Welche Cookies */}
          <div>
            <h2 className="text-xl font-semibold">4. Welche Cookies wir verwenden / Cookies we use</h2>

            <h3 className="mt-5 font-semibold">a) Technisch notwendige Cookies / Strictly necessary</h3>
            <p className="mt-2 text-black/80 leading-relaxed">
              Diese Cookies sind für den Betrieb der Website unerlässlich und können nicht abgelehnt werden.
            </p>
            <p className="mt-2 text-black/80 leading-relaxed">
              These cookies are essential for the website to function and cannot be rejected.
            </p>
            <ul className="mt-3 list-disc pl-6 text-black/80 leading-relaxed space-y-1">
              <li>
                <strong>locale</strong> — speichert Ihre Sprachauswahl (EN / IT). Anbieter: GR1T. Laufzeit: 1 Jahr.
                <br />
                <em>Stores your language preference (EN / IT). Provider: GR1T. Duration: 1 year.</em>
              </li>
              <li>
                <strong>gr1t.cookie-consent.v1</strong> — speichert Ihre Cookie-Auswahl, damit das Banner nicht erneut
                erscheint. Anbieter: GR1T (localStorage). Laufzeit: bis zur manuellen Löschung.
                <br />
                <em>Stores your cookie-banner choice so the banner does not reappear. Provider: GR1T (localStorage).
                Duration: until manually cleared.</em>
              </li>
              <li>
                <strong>Stripe-Cookies</strong> (__stripe_mid, __stripe_sid u. a.) — werden während des Reservierungsvorgangs
                gesetzt, um Zahlungsbetrug zu verhindern und die Sitzung abzusichern. Anbieter: Stripe Payments Europe Ltd.
                Laufzeit: bis zu 1 Jahr.
                <br />
                <em>Stripe cookies (__stripe_mid, __stripe_sid, etc.) — set during the reservation flow to prevent payment fraud
                and secure the session. Provider: Stripe Payments Europe Ltd. Duration: up to 1 year.</em>
              </li>
            </ul>

            <h3 className="mt-6 font-semibold">b) Analyse-Cookies / Analytics (optional)</h3>
            <p className="mt-2 text-black/80 leading-relaxed">
              Werden nur mit Ihrer Einwilligung aktiviert. Sie helfen uns zu verstehen, wie Besucher die Website nutzen.
            </p>
            <p className="mt-2 text-black/80 leading-relaxed">
              Only activated with your consent. These help us understand how visitors use the site.
            </p>
            <ul className="mt-3 list-disc pl-6 text-black/80 leading-relaxed space-y-1">
              <li>
                <strong>Google Analytics 4</strong> (_ga, _ga_*) — anonymisierte Messung von Seitenaufrufen, Sitzungsdauer,
                Gerätetyp und Navigationsmustern. Anbieter: Google Ireland Ltd. Laufzeit: bis zu 2 Jahre.
                Tracking-ID: G-79JEY4LG0K.
                <br />
                <em>Anonymised tracking of page views, session duration, device type and navigation patterns. Provider:
                Google Ireland Ltd. Duration: up to 2 years. Tracking ID: G-79JEY4LG0K.</em>
              </li>
              <li>
                <strong>Vercel Analytics</strong> — datenschutzfreundliche, anonymisierte Besuchermessung ohne Cookies, gehostet
                in der EU. Anbieter: Vercel Inc.
                <br />
                <em>Privacy-friendly, anonymised visitor measurement that does not set cookies, hosted in the EU. Provider:
                Vercel Inc.</em>
              </li>
            </ul>

            <h3 className="mt-6 font-semibold">c) Marketing / Funktional / Marketing / Functional</h3>
            <p className="mt-2 text-black/80 leading-relaxed">
              Wir setzen aktuell keine Marketing- oder Funktionscookies (z. B. Werbe-Pixel, eingebettete Videos mit Tracking).
              Sollte sich dies ändern, aktualisieren wir diese Richtlinie und holen Ihre Einwilligung erneut ein.
            </p>
            <p className="mt-2 text-black/80 leading-relaxed">
              We do not currently set marketing or functional cookies (e.g. advertising pixels, embedded videos with tracking).
              If this changes, we will update this policy and request your consent again.
            </p>
          </div>

          {/* 5. Einwilligung verwalten */}
          <div>
            <h2 className="text-xl font-semibold">5. Einwilligung ändern oder widerrufen / Manage or withdraw consent</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Sie können Ihre Einwilligung jederzeit ändern oder widerrufen. Löschen Sie hierzu den Eintrag
              <em> gr1t.cookie-consent.v1 </em> in den Speichereinstellungen Ihres Browsers — beim nächsten Seitenaufruf erscheint
              das Cookie-Banner erneut, und Sie können eine neue Auswahl treffen. Alternativ können Sie alle Cookies in den
              Einstellungen Ihres Browsers blockieren oder löschen.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              You can change or withdraw your consent at any time. To do so, clear the
              <em> gr1t.cookie-consent.v1 </em> entry in your browser&rsquo;s storage settings — the cookie banner will reappear on
              your next visit, and you can choose again. You can also block or delete cookies in your browser settings.
            </p>
          </div>

          {/* 6. Drittlandübermittlung */}
          <div>
            <h2 className="text-xl font-semibold">6. Drittlandübermittlung / Transfers outside the EU</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Google Analytics 4 wird von Google Ireland Ltd. betrieben; eine Datenübermittlung in die USA kann nicht
              ausgeschlossen werden. Google ist nach dem EU-U.S. Data Privacy Framework zertifiziert. Stripe verarbeitet
              Zahlungsdaten in der EU und in den USA auf Grundlage von Standardvertragsklauseln gemäß Art. 46 DSGVO.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              Google Analytics 4 is operated by Google Ireland Ltd.; transfers to the US cannot be excluded. Google is certified
              under the EU-U.S. Data Privacy Framework. Stripe processes payment data in the EU and the US on the basis of
              standard contractual clauses (Art. 46 GDPR).
            </p>
          </div>

          {/* 7. Ihre Rechte */}
          <div>
            <h2 className="text-xl font-semibold">7. Ihre Rechte / Your rights</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Ihnen stehen die in Art. 15 bis 21 DSGVO geregelten Rechte zu (Auskunft, Berichtigung, Löschung, Einschränkung,
              Datenübertragbarkeit, Widerspruch) sowie das Recht auf Beschwerde bei einer Aufsichtsbehörde.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              You have the rights set out in Art. 15 to 21 GDPR (access, rectification, erasure, restriction, data portability,
              objection) as well as the right to lodge a complaint with a supervisory authority.
            </p>
          </div>

          {/* 8. Kontakt */}
          <div>
            <h2 className="text-xl font-semibold">8. Kontakt / Contact</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Bei Fragen zu dieser Cookie-Richtlinie oder zur Verarbeitung Ihrer personenbezogenen Daten erreichen Sie uns unter
              <a className="underline ml-1" href="mailto:grit@gritmotorcycles.com">grit@gritmotorcycles.com</a>.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              For questions about this Cookie Policy or how we process your personal data, please contact us at
              <a className="underline ml-1" href="mailto:grit@gritmotorcycles.com">grit@gritmotorcycles.com</a>.
            </p>
          </div>

          {/* 9. Änderungen */}
          <div>
            <h2 className="text-xl font-semibold">9. Änderungen dieser Richtlinie / Changes to this policy</h2>
            <p className="mt-3 text-black/80 leading-relaxed">
              Wir können diese Cookie-Richtlinie anpassen, wenn sich unsere Praktiken oder die rechtlichen Anforderungen ändern.
              Die jeweils aktuelle Fassung ist immer auf dieser Seite verfügbar.
            </p>
            <p className="mt-3 text-black/80 leading-relaxed">
              We may update this Cookie Policy if our practices or legal requirements change. The current version will always be
              available on this page.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
