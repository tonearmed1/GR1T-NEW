import React from "react";
import { useLanguage } from "@/context/LanguageContext";

const Events = () => {
  const { t } = useLanguage();
  const TERMS = [
    {
      title: t("conferences.events.sifted.title"),
      description: (
        <div className="space-y-2">
          {t("conferences.events.sifted.p1")
            .split("\n\n")
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          <p>
            <a href={t("conferences.events.sifted.link")} target="_blank" rel="noopener noreferrer" className="underline mt-4">
              {t("conferences.events.sifted.link")}
            </a>
          </p>
        </div>
      ),
    },
    {
      title: t("conferences.events.sevenstar.title"),
      description: <p>{t("conferences.events.sevenstar.p1")}</p>,
    },
    {
      title: t("conferences.events.k2match.title"),
      description: (
        <div className="space-y-2">
          {t("conferences.events.k2match.p1")
            .split("\n\n")
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          <p>
            <a href={t("conferences.events.k2match.link")} target="_blank" rel="noopener noreferrer" className="underline mt-4">
              {t("conferences.events.k2match.link")}
            </a>
          </p>
        </div>
      ),
    },
    {
      title: t("conferences.events.eicma.title"),
      description: (
        <div className="space-y-2">
          {t("conferences.events.eicma.p1")
            .split("\n\n")
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          <p>
            <a href={t("conferences.events.eicma.link")} target="_blank" rel="noopener noreferrer" className="underline mt-4">
              {t("conferences.events.eicma.link")}
            </a>
          </p>
        </div>
      ),
    },
    {
      title: t("conferences.events.websummit.title"),
      description: (
        <div className="space-y-2">
          {t("conferences.events.websummit.p1")
            .split("\n\n")
            .map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          <p>
            <a href={t("conferences.events.websummit.link")} target="_blank" rel="noopener noreferrer" className="underline mt-4">
              {t("conferences.events.websummit.link")}
            </a>
          </p>
        </div>
      ),
    },
  ];
  return (
    <section className=" bg-white text-black">
      {/* <div className="container mx-auto px-4 max-w-6xl"> */}

      <div className="bg-white py-8 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 md:px-0 mb-8">
          {TERMS.map((item, index) => (
            <div
              key={index}
              className=" flex flex-col md:flex-row gap-6 sm:gap-12 last:mb-0 border-b border-gray-900 pb-6 sm:pb-8 mb-6 sm:mb-8"
            >
              <div className="w-full md:w-1/3">
                <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">{item.title}</h2>
              </div>

              <div className="w-full md:w-4/6 text-lg sm:text-xl font-medium text-gray-600">{item.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Events;
