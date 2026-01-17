import Ads from "@/components/pages/home/Ads";
import Categories from "@/components/pages/home/Categories";
import Feature from "@/components/pages/home/Feature";
import Hero from "@/components/pages/home/Hero";
import PopularServices from "@/components/pages/home/PopularServices";
import Services from "@/components/pages/home/Services";
import { allCategories } from "@/graphql/queries";
import { getClient } from "@/lib/apollo/server";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");

  const { data } = await getClient().query<any>({ query: allCategories });
  console.log("Categories data:", data.Allcategories.data.items);
  return (
    <main className="">
      <Hero />
      <Feature params={params} />
      <Categories />
      <PopularServices />
      <Services params={params} />
      <Ads />
    </main>
  );
}
