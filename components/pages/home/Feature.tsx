import { getLocale, getTranslations } from "next-intl/server";
import Image from "next/image";

const Feature = async () => {
  const t = await getTranslations("HomePage.Feature");
  const locale = await getLocale();
  const direction = locale === "ar" ? "rtl" : "ltr";

  const steps = [
    {
      altText: t("step1").replace("<br/>", " "),
      title: t("step1"),
      image: "/images/step-1.svg",
      color: "bg-secondary",
    },
    {
      altText: t("step1").replace("<br/>", " "),
      title: t("step2"),
      image: "/images/step-2.svg",
      color: "bg-muted",
    },
    {
      altText: t("step1").replace("<br/>", " "),
      title: t("step3"),

      image: "/images/step-3.svg",
      color: "bg-accent",
    },
  ];

  return (
    <section
      className="bg-white py-sm-section-py md:py-section-py"
      dir={direction}
    >
      <div className="container w-full">
        <div className="text w-full text-start">
          <h2 className="text-[22px] md:text-[46px] max-w-207 font-semibold">
            {t("title")}
          </h2>
          <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`relative font-semibold p-6 flex h-[300px] rounded-2xl ${step.color}`}
              >
                <div className="flex flex-col justify-between relative z-10 items-start">
                  <span className="pb-10 md:pb-21 w-full text-2xl md:text-5xl">
                    0{index + 1}
                  </span>
                  <h3 className="max-w-56.25 text-2xl md:text-[32px] leading-tight">
                    {step.title}
                  </h3>
                </div>
                <Image
                  src={step.image}
                  alt={step.altText}
                  width={400}
                  height={540}
                  className={`max-h-[90%] max-w-[60%] absolute bottom-0 object-contain ${
                    direction === "rtl" ? "left-0 -scale-x-100" : "right-0"
                  }`}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
