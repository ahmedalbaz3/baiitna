import Button from "@/components/shared/Button";
import { GET_FEATURED_BOARD } from "@/graphql/queries";
import { getClient } from "@/lib/apollo/server";
import { FeaturedBoardQuery } from "@/types/featuredBoardT";
import { getLocale, getTranslations } from "next-intl/server";
import Link from "next/dist/client/link";
import Image from "next/image";

const PopularServices = async () => {
  const t = await getTranslations("HomePage.PopularServices");
  const locale = await getLocale();
  const isRtl = locale === "ar" ? true : false;

  const { data } = await getClient().query<FeaturedBoardQuery>({
    query: GET_FEATURED_BOARD,
  });

  return (
    <section className="bg-white pb-sm-section-py">
      <div className="container flex flex-col items-start ">
        <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          {data?.featuredBoard.data.services.map((service) => (
            <div
              key={service.id}
              className="image rounded-2xl overflow-hidden relative h-[270px] w-full cursor-pointer"
            >
              <Image
                src="/images/services-1.png"
                alt={isRtl ? service.nameAr : service.nameEn}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="relative w-full h-[60%] top-[40%] bg-cover bg-center bg-[linear-gradient(to_top,rgba(0,0,0,0.6)_0%,rgba(255,255,255,0)_40%)]"></div>
              <p className="absolute bottom-0 p-4 text-white font-semibold text-base">
                {isRtl ? service.nameAr : service.nameEn}
              </p>
            </div>
          ))}
        </div>
        <Link href="/profile-setup" className="self-center mt-10">
          <Button
            text={t("viewAll")}
            className="hover:bg-hover text-text-primary"
          />
        </Link>
      </div>
    </section>
  );
};

export default PopularServices;
