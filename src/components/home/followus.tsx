import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import SocialIcon from "../SocialIcon";

const Followus = () => {
  const { t } = useLanguage();
  return (
    <div className="h-fit py-16 bg-white flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="flex items-center justify-center">
          <h2 className="text-3xl font-bold text-black">{t("home.follow.title")}</h2>
        </div>
        <div className="flex items-center justify-center gap-6 mt-6 text-black">
          <SocialIcon type="instagram" href="https://www.instagram.com/grit.motorcycles" className="h-7 w-7 hover:text-gray-700" />
          <SocialIcon type="facebook" href="https://www.facebook.com/gritmotorcycles" className="h-7 w-7 hover:text-gray-700" />
          <SocialIcon type="linkedin" href="https://www.linkedin.com/company/grit-motorcycles/" className="h-7 w-7 hover:text-gray-700" />
          <SocialIcon type="youtube" href="https://youtube.com/@gritmotors" className="h-7 w-7 hover:text-gray-700" />
        </div>
      </div>
    </div>
  );
};

export default Followus;
