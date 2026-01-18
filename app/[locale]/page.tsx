import Ads from "@/components/pages/home/Ads";
import Categories from "@/components/pages/home/Categories";
import Feature from "@/components/pages/home/Feature";
import Hero from "@/components/pages/home/Hero";
import PopularServices from "@/components/pages/home/PopularServices";
import Providers from "@/components/pages/home/Providers";
import { ALL_CATEGORIES } from "@/graphql/queries";
import { getClient } from "@/lib/apollo/server";
import { getTranslations } from "next-intl/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");

  return (
    <main className="">
      <Hero />
      <Feature params={params} />
      <Categories params={params} />
      <PopularServices />
      <Providers />
      <Ads />
    </main>
  );
}
