import { ApolloProvider } from "@/components/providers/ApolloProvider";
import JsonLd from "@/components/seo/JsonLd";
import { getGlobalSchemas } from "@/lib/schemas/schema";
import { NextIntlClientProvider } from "next-intl";
import "./globals.css";

import {
  Geist,
  Geist_Mono,
  Noto_Sans,
  Noto_Sans_Arabic,
} from "next/font/google";
import GoogleProvider from "@/components/providers/GoogleProvider";
import AuthProvider from "@/components/providers/AuthProvider";

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

// app/[locale]/layout.tsx
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;
  const direction = locale === "ar" ? "rtl" : "ltr";
  const globalSchema = getGlobalSchemas(locale);

  return (
    <html lang={locale} dir={direction}>
      <head>
        <JsonLd data={globalSchema} />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <NextIntlClientProvider locale={locale}>
          <ApolloProvider>
            <AuthProvider>{children}</AuthProvider>
          </ApolloProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
