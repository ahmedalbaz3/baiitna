import { getTranslations, getLocale } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { getClient } from "@/lib/apollo/server";
import { GET_FEATURED_BOARD } from "@/graphql/queries";
import { FeaturedBoardQuery } from "@/types/featuredBoardT";

const Categories = async () => {
  const t = await getTranslations("HomePage.Categories");
  const locale = await getLocale();
  const isRtl = locale === "ar" ? true : false;

  // get all categories
  const { data } = await getClient().query<FeaturedBoardQuery>({
    query: GET_FEATURED_BOARD,
  });

  return (
    <section className="bg-white pb-sm-section-py">
      <div className="container flex flex-col items-start">
        <h2 className="text-3xl font-semibold mb-6 ">{t("title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 w-full">
          {data?.featuredBoard.data.categories.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href="/"
              className="flex flex-col items-center justify-between gap-3  mb-2  me-2 py-[30] px-6 bg-background hover:text-primary text-center rounded-2xl overflow-hidden"
            >
              <div className="image relative rounded-lg overflow-hidden w-[38px] h-[38px] md:w-[56px] md:h-[56px]">
                <div className="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer">
                  <Image
                    src={`https://staging-api.baiitna.com/${category.image.file}`}
                    alt={isRtl ? category.nameAr : category.nameEn}
                    fill
                    sizes="(max-width: 768px) 36px, 56px"
                    className="object-cover"
                  />
                </div>
              </div>
              <span className="hover:text-primary text-center font-medium text-sm md:text-base">
                {isRtl ? category.nameAr : category.nameEn}
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Categories;
