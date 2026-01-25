import Ads from "@/components/pages/home/Ads";
import Categories from "@/components/pages/home/Categories";
import Feature from "@/components/pages/home/Feature";
import Hero from "@/components/pages/home/Hero";
import PopularServices from "@/components/pages/home/PopularServices";
import Providers from "@/components/pages/home/Providers";
import JsonLd from "@/components/seo/JsonLd";
import { cookies } from "next/headers";

import {
  getBreadcrumbSchema,
  getImageObjectSchema,
  getWebPageSchema,
} from "@/lib/schemas/schema";
import { getTranslations } from "next-intl/server";
import { ME_QUERY } from "@/graphql/queries";
import { query } from "@/lib/apollo/server";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const t = await getTranslations("HomePage");

  const webPAgeSchema = getWebPageSchema();
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: t("breadcrumb"), url: "https://baiitna.com" },
  ]);
  const imageObjectSchema = getImageObjectSchema();
  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [
      // Use @graph to bundle multiple schemas neatly
      webPAgeSchema,
      breadcrumbSchema,
      imageObjectSchema,

      {
        "@type": "WebSite",
        name: "Baiitna",
        url: "https://baiitna.com",
      },
    ],
  };

  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (token) {
    const { data } = await query({
      query: ME_QUERY,
      // If you need to pass the token from cookies:
      context: {
        headers: {
          Authorization: `Bearer ${token.value}`,
        },
      },
    });
  }

  return (
    <>
      <JsonLd data={combinedSchema} />
      <main className="">
        <Hero />
        <Feature />
        <Categories />
        <PopularServices />
        <Providers />
        <Ads />
      </main>
    </>
  );
}
