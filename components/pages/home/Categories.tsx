import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Image from "next/image";
import { getClient } from "@/lib/apollo/server";
import { ALL_CATEGORIES } from "@/graphql/queries";
import { GetAllCategoriesQuery } from "@/types/categoriesT";

const Categories = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const t = await getTranslations("HomePage.Categories");
  const { locale } = await params;
  const isRtl = locale === "ar" ? true : false;

  const { data } = await getClient().query<GetAllCategoriesQuery>({
    query: ALL_CATEGORIES,
    variables: { limit: 8 },
  });

  return (
    <section className="bg-white pb-sm-section-py">
      <div className="container flex flex-col items-start">
        <h2 className="text-3xl font-semibold mb-6 ">{t("title")}</h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 xl:grid-cols-8 w-full">
          {data?.Allcategories.data.items.slice(0, 8).map((category) => (
            <Link
              key={category.id}
              href="/"
              className="flex flex-col items-center gap-3  mb-2  me-2 py-[30] px-6 bg-background rounded-2xl hover:text-primary text-center"
            >
              <Image
                src={`https://staging-api.baiitna.com/${category.image.file}`}
                alt={isRtl ? category.nameAr : category.nameEn}
                width={56}
                height={56}
                className="max-md:hidden"
              />
              <Image
                src={`https://staging-api.baiitna.com/${category.image.file}`}
                alt={isRtl ? category.nameAr : category.nameEn}
                width={36}
                height={36}
                className="md:hidden"
              />
              <span className="hover:text-primary text-center">
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
