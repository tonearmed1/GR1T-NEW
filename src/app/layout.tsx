import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import { LanguageProvider } from "@/context/LanguageContext";
import { cookies } from "next/headers";
import LangAttr from "@/components/LangAttr";
import Script from "next/script";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export async function generateMetadata(): Promise<Metadata> {
  const c = await cookies();
  const cookieLang = c.get("locale")?.value === "it" ? "it" : "en";
  const ogLocale = cookieLang === "it" ? "it_IT" : "en_US";
  const metadata: Metadata = {
    title: "GR1T Electric Motorcycles | Designed in Italy",
    description: "Electric motorcycles for the cities of tomorrow",
    metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN || "https://www.gritmotorcycles.com/"),
    alternates: {
      // Each page should override canonical in its own metadata export.
      // This root layout sets the homepage canonical as the fallback.
      canonical: process.env.NEXT_PUBLIC_DOMAIN || "https://www.gritmotorcycles.com/",
      languages: {
        en: "/",
        it: "/it",
        "x-default": "/",
      },
    },
    icons: {
      icon: [
        { url: "/FAVICON/FAVICON__white_32x32.svg", type: "image/svg+xml", sizes: "32x32" },
        { url: "/FAVICON/FAVICON__white_16x16.svg", type: "image/svg+xml", sizes: "16x16" },
      ],
      apple: [{ url: "/FAVICON/FAVICON__white_180x180.svg", sizes: "180x180" }],
    },
    openGraph: {
      title: "GR1T Electric Motorcycles | Designed in Italy",
      description: "Electric motorcycles for the cities of tomorrow",
      url: process.env.NEXT_PUBLIC_DOMAIN || "https://www.gritmotorcycles.com/",
      siteName: "GR1T Motorcycles",
      images: [
        {
          url: process.env.NEXT_PUBLIC_DOMAIN
            ? `${process.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, "")}/HERO_FAQ.jpg`
            : "https://www.gritmotorcycles.com/HERO_FAQ.jpg",
          width: 1200,
          height: 630,
          alt: "GR1T motorcycle preview",
        },
      ],
      locale: ogLocale,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "GR1T Electric Motorcycles | Designed in Italy",
      description: "Electric motorcycles for the cities of tomorrow",
      images: [
        process.env.NEXT_PUBLIC_DOMAIN
          ? `${process.env.NEXT_PUBLIC_DOMAIN.replace(/\/$/, "")}/HERO_FAQ.jpg`
          : "https://www.gritmotorcycles.com/HERO_FAQ.jpg",
      ],
    },
  };
  return metadata;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" sizes="32x32" href="/White_Logo.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/White_Logo.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/White_Logo.png" />
        <link rel="mask-icon" href="/LOGO_big_BLACK.svg" color="#000000" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="stylesheet" href="/silktide/silktide-consent-manager.css" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#000000" />
      </head>
      <body className={`${inter.variable} antialiased min-h-screen flex flex-col relative font-britti scroll-smooth`}>
        <Script
          id="ga-default-consent"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('consent', 'default', { analytics_storage: 'denied' });

              gtag('js', new Date());
              gtag('config', 'G-79JEY4LG0K');
            `,
          }}
        />
        <Script strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-79JEY4LG0K" />
        <Script strategy="afterInteractive" src="/silktide/silktide-consent-manager.js" />
        {/* Demote cookie banner h1 to h2 via aria-level — preserves visual style */}
        <style>{`#silktide-modal h1 { font-size: inherit; } #silktide-modal h1[role] { display: contents; }`}</style>
        <Script
          id="silktide-config"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  var getLang = function(){
    var m = (document.cookie.match(/(?:^|;\\s*)locale=(en|it)/) || [])[1];
    if (m) return m;
    try { var ls = localStorage.getItem('language'); if (ls) return ls; } catch(e){}
    var htmlLang = (document.documentElement && document.documentElement.lang) || '';
    if (htmlLang === 'it' || htmlLang === 'en') return htmlLang;
    return 'en';
  };
  var lang = getLang() === 'it' ? 'it' : 'en';
  window.dataLayer = window.dataLayer || [];
  var enConfig = {
    background: { showBackground: true },
    cookieIcon: { position: "bottomLeft" },
    position: { banner: "bottomLeft" },
    text: {
      banner: {
        description: "<p>We use cookies on our site to enhance your user experience, provide personalized content, and analyze our traffic. <a href=\\"/cookie-policy\\" target=\\"_blank\\">Cookie Policy.</a></p>",
        acceptAllButtonText: "Accept all",
        acceptAllButtonAccessibleLabel: "Accept all cookies",
        rejectNonEssentialButtonText: "Reject non-essential",
        rejectNonEssentialButtonAccessibleLabel: "Reject non-essential",
        preferencesButtonText: "Preferences",
        preferencesButtonAccessibleLabel: "Toggle preferences"
      },
      preferences: {
        title: "Customize your cookie preferences",
        description: "<p>We respect your right to privacy. You can choose not to allow some types of cookies. Your cookie preferences will apply across our website.</p>",

      }
    },
    cookieTypes: [
      {
        id: "necessary",
        name: "Necessary",
        description: "<p class=\\"p1\\">These cookies are essential for the operation and security of our website. They enable core functions such as secure checkout, payment processing via Stripe, fraud prevention, session management, and saving your cookie preferences.</p><p class=\\"p1\\">Without these cookies, the website and reservation process cannot function properly.</p>",
        required: true,
        onAccept: function() {}
      },
      {
        id: "analytics",
        name: "Analytics",
        description: "<p class=\\"p1\\">These cookies help us understand how visitors interact with our website. We use Google Analytics (GA4) to collect anonymised data such as page views, session duration, device type, and navigation patterns.</p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">This information allows us to improve website performance, usability, and content relevance.</span></p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">Analytics cookies are only activated if you give your consent.</span></p>",
        required: false,
        onAccept: function() {
          if (typeof gtag === 'function') { gtag('consent', 'update', { analytics_storage: 'granted' }); }
          try { window.dataLayer.push({ event: 'consent_accepted_analytics' }); } catch(e){}
        },
        onReject: function() {
          if (typeof gtag === 'function') { gtag('consent', 'update', { analytics_storage: 'denied' }); }
        }
      },
      {
        id: "marketing",
        name: "Marketing",
        description: "<p class=\\"p1\\">These cookies are used to measure the effectiveness of our marketing campaigns and to deliver relevant advertisements on platforms such as Facebook and Instagram.</p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">They may track your browsing behaviour across websites and enable conversion tracking, retargeting, and audience measurement through tools such as Meta Pixel.</span></p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">Marketing cookies are only activated if you give your consent.</span></p>",
        required: false,
        onAccept: function() {},
        onReject: function() {}
      },
      {
        id: "functional_cookies",
        name: "Functional Cookies",
        description: "<p class=\\"p1\\">These cookies enable enhanced website features and third-party integrations, such as embedded YouTube videos.</p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">If you disable these cookies, certain features may not function properly or may require additional consent before loading.</span></p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">Functional cookies are only activated if you give your consent.</span></p>",
        required: false,
        onAccept: function() {},
        onReject: function() {}
      }
    ],
    bannerSuffix: 'en'
  };
  var itConfig = {
    background: { showBackground: true },
    cookieIcon: { position: "bottomLeft" },
    position: { banner: "bottomLeft" },
    text: {
      banner: {
        description: "<p class=\\"p1\\">Utilizziamo i cookie sul nostro sito per migliorare la tua esperienza di navigazione, offrire contenuti personalizzati e analizzare il traffico. <a href=\\"/it/cookie-policy\\" target=\\"_blank\\">Cookie Policy.</a></p>",
        acceptAllButtonText: "Accetta tutti",
        acceptAllButtonAccessibleLabel: "Accetta tutti",
        rejectNonEssentialButtonText: "Rifiuta non-essenziali",
        rejectNonEssentialButtonAccessibleLabel: "Rifiuta non-essenziali",
        preferencesButtonText: "Gestisci preferenze",
        preferencesButtonAccessibleLabel: "Gestisci preferenze"
      },
      preferences: {
        title: "Personalizza le tue preferenze sui cookie",
        description: "<p class=\\"p1\\">Rispettiamo il tuo diritto alla privacy. Puoi scegliere di non consentire alcune categorie di cookie. Le tue preferenze sui cookie verranno applicate a tutto il nostro sito.</p>",
        creditLinkText: "Crea questo banner gratuitamente",

      }
    },
    cookieTypes: [
      {
        id: "cookie_strettamente_necessari",
        name: "Cookie strettamente necessari",
        description: "<p class=\\"p1\\">Questi cookie sono essenziali per il corretto funzionamento e la sicurezza del sito, inclusa la gestione della sessione, l’elaborazione dei pagamenti tramite Stripe e la memorizzazione delle preferenze sui cookie.</p><p class=\\"p2\\"><span style=\\"font-size: 1rem;\\">Non possono essere disattivati.</span></p>",
        required: true,
        onAccept: function() {}
      },
      {
        id: "cookie_analitici",
        name: "Cookie analitici",
        description: "<p class=\\"p1\\">Utilizziamo Google Analytics 4 (GA4) per raccogliere dati aggregati sull’utilizzo del sito, come pagine visitate, durata della sessione e tipo di dispositivo.</p><p class=\\"p1\\">Questi dati ci aiutano a migliorare le prestazioni e l’esperienza utente.</p>",
        required: false,
        onAccept: function() {
          if (typeof gtag === 'function') { gtag('consent', 'update', { analytics_storage: 'granted' }); }
          try { window.dataLayer.push({ event: 'consent_accepted_cookie_analitici' }); } catch(e){}
        },
        onReject: function() {
          if (typeof gtag === 'function') { gtag('consent', 'update', { analytics_storage: 'denied' }); }
        }
      },
      {
        id: "cookie_di_marketing",
        name: "Cookie di Marketing",
        description: "<p class=\\"p1\\">Utilizziamo strumenti come Meta Pixel per misurare l’efficacia delle campagne pubblicitarie e mostrare annunci pertinenti sulle piattaforme social.</p>",
        required: false,
        onAccept: function() {},
        onReject: function() {}
      },
      {
        id: "cookie_funzionali",
        name: "Cookie funzionali",
        description: "<p class=\\"p1\\">Consentono funzionalità avanzate come la visualizzazione di video YouTube incorporati nel sito.</p>",
        required: false,
        onAccept: function() {},
        onReject: function() {}
      }
    ],
    bannerSuffix: 'it'
  };
  var cfg = lang === 'it' ? itConfig : enConfig;
  if (window && window.silktideCookieBannerManager && typeof window.silktideCookieBannerManager.updateCookieBannerConfig === 'function') {
    window.silktideCookieBannerManager.updateCookieBannerConfig(cfg);
  } else {
    document.addEventListener('DOMContentLoaded', function(){
      if (window && window.silktideCookieBannerManager && typeof window.silktideCookieBannerManager.updateCookieBannerConfig === 'function') {
        window.silktideCookieBannerManager.updateCookieBannerConfig(cfg);
      }
    }, { once: true });
  }
})();`,
          }}
        />
        <LanguageProvider>
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[9999] focus:bg-white focus:text-black focus:px-4 focus:py-2 focus:rounded focus:font-bold"
          >
            Skip to content
          </a>
          <LangAttr />
          <ConditionalHeader />
          <main id="main-content" className="flex-grow">
            {children}
            <Analytics />
          </main>
          <ConditionalFooter />
        </LanguageProvider>
      </body>
    </html>
  );
}
