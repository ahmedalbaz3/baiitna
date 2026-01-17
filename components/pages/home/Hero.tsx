import React from "react";
import { getTranslations } from "next-intl/server";
import HeroSearch from "./HeroSearch";

const Hero = async () => {
  const t = await getTranslations("HomePage.Hero");

  return (
    <section className="mt-[112px]">
      <div className="container text-center flex flex-col items-center py-10 md:py-hero-py">
        <div className="text-center ">
          <h1 className=" text-[28px] md:text-[46px] font-semibold max-w-184 mx-auto">
            {t("title")}
          </h1>
          <p className="text-sm md:text-[18px] max-w-139.5 mx-auto mt-6">
            {t("description")}
          </p>
        </div>
        <div className="search mt-12 ">
          <HeroSearch />
        </div>
      </div>
    </section>
  );
};

export default Hero;
