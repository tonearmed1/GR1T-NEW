"use client";

import { useEffect } from "react";
import { useLanguage } from "@/context/LanguageContext";

const LangAttr = () => {
  const { language } = useLanguage();

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = language;
    }
  }, [language]);

  return null;
};

export default LangAttr;
