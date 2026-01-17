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

export const metadata: Metadata = {
  title: "Home - For every beautiful home | baiitna",
  description:
    "Discover baiitna platform that connects homeowners with service providers for construction, decor, and maintenance. Find the best quotes and get your service.",
};

export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = (await params) || { locale: "en" };

  const direction = locale === "ar" ? "rtl" : "ltr";
  return (
    <html lang={locale} dir={direction}>
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
