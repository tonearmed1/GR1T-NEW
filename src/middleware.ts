import { NextRequest, NextResponse } from "next/server";

const LOCALES = new Set(["en", "it"]);

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  // Rewrite common icon paths to our assets to override framework defaults
  if (pathname === "/favicon.ico") {
    const url = req.nextUrl.clone();
    url.pathname = "/White_Logo.png";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/apple-touch-icon.png") {
    const url = req.nextUrl.clone();
    url.pathname = "/White_Logo.png";
    return NextResponse.rewrite(url);
  }
  if (pathname === "/manifest.json") {
    const url = req.nextUrl.clone();
    url.pathname = "/site.webmanifest";
    return NextResponse.rewrite(url);
  }
  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];

  if (first && LOCALES.has(first)) {
    const locale = first;
    const rest = segments.slice(1);
    const newPath = "/" + rest.join("/");

    const url = req.nextUrl.clone();
    url.pathname = newPath || "/";
    url.hash = req.nextUrl.hash || "";

    const res = NextResponse.rewrite(url);
    res.cookies.set("locale", locale, { path: "/" });
    return res;
  }

  // Ensure locale is visible in URL by redirecting to /{locale}/... when missing
  const current = req.cookies.get("locale")?.value;
  const accept = (req.headers.get("accept-language") || "").toLowerCase();
  const inferred = current && LOCALES.has(current) ? current : accept.includes("it") ? "it" : "en";
  // Skip redirect for API routes and static assets
  if (pathname.startsWith("/api") || /\.[a-zA-Z0-9]+$/.test(pathname)) {
    const res = NextResponse.next();
    res.cookies.set("locale", inferred, { path: "/" });
    return res;
  }
  const url = req.nextUrl.clone();
  url.pathname = `/${inferred}${pathname}`;
  url.hash = req.nextUrl.hash || "";
  const res = NextResponse.redirect(url);
  res.cookies.set("locale", inferred, { path: "/" });
  return res;
}

export const config = {
  matcher: ["/(.*)"],
};
