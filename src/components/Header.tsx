"use client";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";

const Header = () => {
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileExpanded, setMobileExpanded] = useState<number | null>(null);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const navRef = useRef(null);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    // @ts-expect-error: navRef.current is of type HTMLElement | null
    const handleClickOutside = (e) => {
      // @ts-expect-error: e.target is of type EventTarget | null
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
  const toggleDropdown = (index: number, e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation(); // prevent closing immediately
    setOpenDropdown(openDropdown === index ? null : index);
  };
  const toggleDropdownbutton = (index: number, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.stopPropagation(); // prevent closing immediately
    setOpenDropdown(openDropdown === index ? null : index);
  };
  // Navigation links — simplified per conversion audit (May 2026).
  // - Removed: Home (logo handles it), Tech (content merged into product pages), FAQs (anchor jump on /),
  //   Quality top-level (folded under About). Corporate (B2B audiences) moved to footer only.
  // - Reserve is rendered separately as the primary CTA button (right side).
  const navigationLinks = [
    {
      label: t("nav.bikes"),
      children: [
        { label: t("founders.bikes.g1s.title"), href: "/G1S" },
        { label: t("founders.bikes.g1x.title"), href: "/G1X" },
      ],
    },
    {
      label: t("nav.about"),
      href: "/about-us",
      children: [
        { label: t("nav.quality"), href: "/quality" },
        { label: t("nav.sustainability"), href: "/quality/sustainablity" },
        { label: t("footer.warranty"), href: "/quality/warranty" },
      ],
    },
    { label: t("nav.news"), href: "/news" },
    { label: t("nav.contact"), href: "/contact" },
  ];

  const toggleMobileMenu = () => {
    const nextOpen = !mobileMenuOpen;
    setMobileMenuOpen(nextOpen);
    // Close language menu when mobile menu is toggled
    if (showLanguageMenu) setShowLanguageMenu(false);
    // Reset expanded mobile submenus when closing the drawer
    if (!nextOpen) setMobileExpanded(null);
  };

  const toggleMobileSubmenu = (index: number) => {
    setMobileExpanded((prev) => (prev === index ? null : index));
  };

  const toggleLanguage = () => {
    const nextLang = language === "en" ? "it" : "en";
    setLanguage(nextLang);
    try {
      document.cookie = `locale=${nextLang}; path=/`;
    } catch {}
    const segs = pathname.split("/").filter(Boolean);
    if (segs[0] === "en" || segs[0] === "it") {
      segs[0] = nextLang;
      router.replace("/" + segs.join("/"));
    } else {
      const newPath = "/" + nextLang + (pathname === "/" ? "" : pathname);
      router.replace(newPath);
    }
    setShowLanguageMenu(false);
  };

  return (
    <>
      {/* Background Video with Overlay */}
      {/* <div className="absolute inset-0 z-0 h-screen overflow-hidden"> */}
      {/* Dark overlay for better text visibility */}
      {/* <div className="absolute inset-0 bg-black opacity-40"></div> */}
      {/* </div> */}

      {/* Navigation */}
      <div className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
        <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-0 py-4 flex justify-between items-center">
          <div className="w-32">
            <Link href="/">
              <Image
                src="/GR1T_Logo.png"
                alt="GR1T Logo"
                width={120}
                height={40}
                className="object-contain"
                sizes="120px"
                priority
              />
            </Link>
          </div>

          {/* Desktop Navigation - Hidden on mobile */}
          <nav ref={navRef} className="hidden md:flex space-x-6 items-center">
            {navigationLinks.map((link, index) => (
              <div key={index} className="relative group" onClick={(e) => toggleDropdown(index, e)}>
                {link.href ? (
                  <Link
                    href={link.href}
                    scroll={link.href?.includes("#") ? false : true}
                    className="text-black hover:text-gray-600 text-base flex items-center"
                    onClick={(e) => {
                      if (link.href?.includes("#")) {
                        e.preventDefault();
                        const id = link.href.split("#")[1];
                        const targetPath = language === "it" ? "/it" : "/en";
                        if (pathname !== "/" && pathname !== "/it" && pathname !== "/en") {
                          router.push(targetPath);
                        }
                        setTimeout(() => {
                          const el = document.getElementById(id);
                          el?.scrollIntoView({ behavior: "smooth", block: "start" });
                        }, 100);
                        setOpenDropdown(null);
                      }
                    }}
                  >
                    {link.label}
                    {link.children && (
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </Link>
                ) : (
                  <button
                    onClick={(e) => toggleDropdownbutton(index, e)}
                    className="text-black hover:text-gray-600 text-base flex items-center"
                  >
                    {link.label}
                    {link.children && (
                      <svg
                        className="ml-1 w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    )}
                  </button>
                )}

                {link.children && (
                  <div
                    className={`  absolute left-0 top-full min-w-[220px] bg-white rounded-md shadow-lg z-50
                transition-opacity duration-150   py-2
                ${openDropdown === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}
                group-hover:opacity-100 group-hover:pointer-events-auto
              `}
                  >
                    <div className="py-2">
                      {link.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-base text-black hover:bg-gray-100"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            {/* Reserve CTA — primary action, visually prominent (orange) */}
            <Link
              href="/reserve"
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              {t("common.reserveNow")}
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-white text-orange-500">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </Link>

            {/* Language Toggle - Desktop */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageMenu(!showLanguageMenu)}
                className="flex items-center text-sm text-black hover:text-gray-600"
                aria-haspopup="menu"
                aria-expanded={showLanguageMenu}
              >
                {language === "en" ? "EN" : "IT"}
                <svg
                  className="ml-1 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div
                className={`absolute right-0 mt-2 w-32 bg-white rounded-md shadow-lg z-50 transform transition-all duration-200 ease-in-out ${
                  showLanguageMenu ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"
                }`}
                role="menu"
              >
                <div className="py-1">
                  <button
                    onClick={toggleLanguage}
                    className="block w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 flex items-center"
                  >
                    <img
                      src={language === "en" ? "/flags/italy-flag.svg" : "/flags/uk-flag.svg"}
                      alt={language === "en" ? "Italian Flag" : "UK Flag"}
                      className="w-5 h-3 mr-2"
                    />
                    {language === "en" ? t("language.italian") : t("language.english")}
                  </button>
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button - Visible only on mobile */}
          <button className="md:hidden text-black focus:outline-none" onClick={toggleMobileMenu} aria-label="Toggle mobile menu">
            {mobileMenuOpen ? (
              // X icon when menu is open
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              // Hamburger icon when menu is closed
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        <div
          className={`md:hidden absolute top-full left-0 right-0 bg-white shadow-md z-50 transform transition-all duration-300 ease-in-out overflow-hidden ${
            mobileMenuOpen ? "min-h-screen opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="mx-auto max-w-6xl lg:max-w-7xl px-4 md:px-8 flex flex-col py-2">
            {navigationLinks.map((link, index) => (
              <div key={index} className="px-0">
                <div className="flex items-center justify-between">
                  {link.href ? (
                    <Link
                      href={link.href}
                      scroll={link.href?.includes("#") ? false : true}
                      className="flex-1 text-black hover:bg-gray-100 px-4 py-3 text-base"
                      onClick={(e) => {
                        if (link.href?.includes("#")) {
                          e.preventDefault();
                          const id = link.href.split("#")[1];
                          const targetPath = language === "it" ? "/it" : "/en";
                          if (pathname !== "/" && pathname !== "/it" && pathname !== "/en") {
                            router.push(targetPath);
                          }
                          setTimeout(() => {
                            const el = document.getElementById(id);
                            el?.scrollIntoView({ behavior: "smooth", block: "start" });
                          }, 100);
                          setOpenDropdown(null);
                          setMobileMenuOpen(false);
                          return;
                        }
                        setMobileMenuOpen(false);
                      }}
                    >
                      {link.label}
                    </Link>
                  ) : (
                    <div className="flex-1 text-black px-4 py-3 text-base">{link.label}</div>
                  )}

                  {link.children && (
                    <button
                      type="button"
                      aria-label="Toggle submenu"
                      onClick={() => toggleMobileSubmenu(index)}
                      className="px-4 py-3 text-black"
                    >
                      <svg
                        className={`w-5 h-5 transition-transform duration-200 ${
                          mobileExpanded === index ? "rotate-180" : "rotate-0"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>
                  )}
                </div>

                {link.children && (
                  <div
                    className={`ml-4 overflow-hidden transition-[max-height] duration-300 ease-in-out ${
                      mobileExpanded === index ? "max-h-80" : "max-h-0"
                    }`}
                  >
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block text-black hover:bg-gray-100 px-4 py-2 text-base"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Reserve CTA — top of mobile drawer for visibility */}
            <Link
              href="/reserve"
              onClick={() => setMobileMenuOpen(false)}
              className="mx-4 my-3 inline-flex items-center justify-center gap-2 rounded-full bg-orange-500 px-5 py-3 text-base font-semibold text-white shadow-sm hover:bg-orange-600 transition-colors"
            >
              {t("common.reserveNow")}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>

            {/* Language Toggle - Mobile */}
            <button
              onClick={toggleLanguage}
              className="text-left px-4 py-3 text-sm text-black hover:bg-gray-100 flex items-center"
            >
              <span className="flex items-center">
                <img
                  src={language === "en" ? "/flags/italy-flag.svg" : "/flags/uk-flag.svg"}
                  alt={language === "en" ? "Italian Flag" : "UK Flag"}
                  className="w-5 h-3 mr-2"
                />
                {language === "en" ? t("language.italian") : t("language.english")}
              </span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5h12M9 3v4m1.5-2H21" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
