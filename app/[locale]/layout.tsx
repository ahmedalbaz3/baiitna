import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Noto_Sans_Arabic,
} from "next/font/google";
import "./globals.css";
import { ApolloProvider } from "@/components/providers/ApolloProvider";
import { NextIntlClientProvider } from "next-intl";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { getGlobalSchemas } from "@/lib/schemas/schema";
import JsonLd from "@/components/seo/JsonLd";
import { getTranslations } from "next-intl/server";

const notoSans = Noto_Sans({ subsets: ["latin"], weight: ["400", "700"] });
const notoArabic = Noto_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["400", "700"],
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const baseUrl = "http://localhost:3000/";
  const localePath = locale === "en" ? "" : `/${locale}`;
  const t = await getTranslations("HomePage");

  return {
    metadataBase: new URL(baseUrl),
    title: t("title"),
    description: t("description"),
    icons: {
      icon: [{ url: "/icon-dark.svg", type: "image/svg+xml" }],
    },
    alternates: {
      canonical: `${baseUrl}${localePath}`,
      languages: {
        en: `${baseUrl}`,
        ar: `${baseUrl}/ar`,
      },
    },
    robots: {
      index: true,
      follow: true,
      nocache: true,
    },
  };
}

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = (await params) || { locale: "en" };
  const globalSchema = getGlobalSchemas(locale);

  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={direction}>
      <head>
        <JsonLd data={globalSchema} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased relative`}
      >
        <NextIntlClientProvider>
          <ApolloProvider>
            <Header />
            {children}
            <Footer />
          </ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
