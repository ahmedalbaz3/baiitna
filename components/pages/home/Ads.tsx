import Image from "next/image";
import { getTranslations } from "next-intl/server";

const Ads = async () => {
  const t = await getTranslations("HomePage.Ads");

  return (
    <section className="bg-white py-section-py max-lg:px-5">
      <div className="container bg-black rounded-3xl flex max-md:flex-col-reverse items-center text-white lg:pt-12 ">
        <div className="text max-md:text-center p-10 lg:px-28 lg:pb-24 max-md:mt-2">
          <h3 className="md:text-[36px] text-2xl font-semibold">
            {t("title")}
          </h3>
          <p className="md:text-[20px] text-base mt-2 max-w-112.5 font-normal">
            {t("description")}
          </p>
        </div>
        <div className="image w-1/2 flex justify-center max-md:-mt-24 max-lg:-mt-5 -mt-24 ">
          <Image
            src="/images/ads.png"
            alt="Advertisement"
            width={470}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default Ads;
