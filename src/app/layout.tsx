import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import ConditionalHeader from "@/components/ConditionalHeader";
import ConditionalFooter from "@/components/ConditionalFooter";
import CookieBanner from "@/components/CookieBanner";
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
        {/* Silktide cookie banner replaced by the slim <CookieBanner /> component (mounted below).
            Keeping the consent-default-denied gtag block above so GA4 honours user choice on first load. */}
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
          <CookieBanner />
        </LanguageProvider>
      </body>
    </html>
  );
}
