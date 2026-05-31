"use client";

import { useLanguage } from "@/context/LanguageContext";
import { useState } from "react";
import Image from "next/image";
// import { ArrowRight } from "lucide-react";

export default function EicmaContact() {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: "",
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
      const response = await fetch("/api/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: `${formData.firstName} ${formData.lastName}`,
          email: formData.email,
          message: formData.message,
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
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
      } else {
        throw new Error(data.message || "Failed to send email");
      }
    } catch {
    setStatus({
      submitting: false,
      success: false,
      error: true,
      message: t("contact.errorMessage"),
    });
  }
  };

  return (
    <div className="relative min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Background Overlay */}
      <div className="absolute inset-0 bg-black/60 z-0"></div>
      <div
        className="absolute inset-0 bg-cover bg-center z-[10]"
        style={{ 
          backgroundImage: "url('/Home/EICMA-event.jpeg')" 
        }}
      ></div>
      <div
        className="absolute inset-0 bg-cover bg-center z-[10] hidden lg:block"
        style={{ 
          backgroundImage: "url('/Home/EICMA-event-lg-screen.jpeg')" 
        }}
      ></div>

      {/* Contact Section */}
      <section className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 py-16">
        <div className="bg-white text-black rounded-2xl shadow-lg p-8 md:p-12">
          <h2 className="text-4xl font-bold mb-6">{t("eicma.work.title")}</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side Text */}
            <div>
              <p className="text-lg mb-4">{t("eicma.work.description")}</p>
              <p className="font-semibold text-gray-800">partners(at)gritmotorcycles.com</p>
            </div>
            {/* Form */}
            <form className="space-y-4">
              {status.success && (
                <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">{status.message}</div>
              )}

              {status.error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">{status.message}</div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
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
                <div>
                  <label htmlFor="firstName" className="block text-black mb-1">
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
                {t("contact.form.email")}
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
                {t("contact.form.message")}

                <textarea
                  id="message"
                  rows={3}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-0 py-1 bg-transparent border-b border-black focus:outline-none resize-none"
                  required
                ></textarea>
              </div>

              <button
                type="button"
                // type="submit"
                onClick={handleSubmit}
                disabled={status.submitting}
                className="hover:cursor-pointer inline-flex items-center gap-2 rounded-full bg-black text-white px-5 py-2 text-sm sm:text-base hover:bg-gray-900 transition"
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
            </form>
          </div>
        </div>
      </section>

      {/* EICMA Section */}
      <section className="relative z-10 text-center mt-auto pb-20 px-4">
        <h3 className="text-4xl md:text-5xl font-bold mb-4">
          <a href="https://www.eicma.it" target="_blank" rel="noopener noreferrer" className="hover:underline underline-offset-4">
            {t("eicma.meetUsTitle")}
          </a>
        </h3>
        <p className="text-lg md:text-xl mb-8">{t("eicma.meetUsDetails")}</p>

        <div className="flex flex-col items-center">
          <Image
            src="/logos/EICMA.svg"
            alt="EICMA Logo"
            width={176}
            height={176}
            className="w-32 md:w-44 h-auto mb-2"
            sizes="(max-width: 768px) 128px, 176px"
          />
          <p className="text-sm md:text-base tracking-wide uppercase text-gray-300">{t("eicma.tagline")}</p>
        </div>
      </section>
    </div>
  );
}
