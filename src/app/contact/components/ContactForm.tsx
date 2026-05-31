"use client";

import React, { useState } from "react";
import SocialIcon from "../../../components/SocialIcon";
import { useLanguage } from "../../../context/LanguageContext";

const socialLinks: { type: "instagram" | "facebook" | "linkedin" | "youtube"; href: string }[] = [
  { type: "instagram", href: "https://www.instagram.com/grit.motorcycles" },
  { type: "facebook", href: "https://www.facebook.com/gritmotorcycles" },
  { type: "linkedin", href: "https://www.linkedin.com/company/grit-motorcycles/" },
  { type: "youtube", href: "https://youtube.com/@gritmotors" },
];
const ContactForm = () => {
  const { t } = useLanguage();
  const [captcha, setCaptcha] = useState("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
    token: captcha, // IMPORTANT
  });
  const [status, setStatus] = useState({
    submitting: false,
    success: false,
    error: false,
    message: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: false, message: "" });

    try {
      // Ensure captcha is completed before submitting
      // if (!captcha) {
      //   setStatus({ submitting: false, success: false, error: true, message: t("contact.errorMessage") });
      //   return;
      // }

      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
          token: captcha,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({
          submitting: false,
          success: true,
          error: false,
          message: t("contact.successMessage"),
        });
        setFormData({ firstName: "", lastName: "", email: "", message: "", token: "" });
        setCaptcha("");
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch (error) {
      // console.log("error -> ", error);

      setStatus({
        submitting: false,
        success: false,
        error: true,
        message: t("contact.errorMessage"),
      });
    }
  };

  return (
    <div className="py-8 sm:py-16 bg-white">
      <div className="container mx-auto px-4 md:px-0 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-6 sm:gap-8">
          {/* Left Column - Contact Information */}
          <div className="w-full md:w-1/2 pr-0 md:pr-8">
            <h2 className="text-3xl sm:text-4xl font-normal mb-6 sm:mb-8 text-black font-britti">{t("contact.workTogether")}</h2>

            <div className="mb-6 sm:mb-8 text-black">
              <h3 className="font-bold mb-2">{t("contact.generalEnquiries")}</h3>
              <p className="text-gray-800">grit(at)gritmotorcycles.com</p>
            </div>

            <div className="mb-6 sm:mb-8 text-black">
              <h3 className="font-bold mb-2">{t("contact.pressEnquiries")}</h3>
              <p className="text-gray-800">press(at)gritmotorcycles.com</p>
            </div>

            <div className="mb-6 sm:mb-8 text-black">
              <p className="text-gray-800">{t("contact.pressDescription")}</p>
            </div>

            <div className="text-black">
              <h3 className="font-bold mb-2">{t("contact.socialMedia")}</h3>
              <div className="flex space-x-4">
                <SocialIcon type="instagram" href={socialLinks[0].href} />
                <SocialIcon type="facebook" href={socialLinks[1].href} />
                <SocialIcon type="linkedin" href={socialLinks[2].href} />
                <SocialIcon type="youtube" href={socialLinks[3].href} />
              </div>
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="w-full md:w-1/2">
            <div className="bg-[#f7913e] p-6 sm:p-8 rounded-lg">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-black font-britti">{t("contact.getInTouch")}</h2>

              {status.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{status.message}</div>
              )}

              {status.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{status.message}</div>
              )}

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <label htmlFor="firstName" className="block text-black mb-1">
                      {t("contact.form.firstName")}
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none"
                      required
                    />
                  </div>

                  <div className="flex-1">
                    <label htmlFor="lastName" className="block text-black mb-1">
                      {t("contact.form.lastName")}
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-black mb-1">
                    {t("contact.form.email")}
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-black mb-1">
                    {t("contact.form.message")}
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none resize-none"
                    required
                  ></textarea>
                </div>
                {/* <ReCAPTCHA sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY!} onChange={(value) => setCaptcha(value || "")} /> */}
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={status.submitting}
                    className="bg-black text-white py-2 px-6 rounded-full flex items-center space-x-2 hover:bg-gray-800 transition-colors disabled:opacity-50"
                  >
                    <span>{status.submitting ? t("contact.form.sending") : t("contact.form.send")}</span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path
                        fillRule="evenodd"
                        d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;
