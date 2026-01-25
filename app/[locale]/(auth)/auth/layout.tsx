import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { getTranslations } from "next-intl/server";
import Image from "next/image";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// app/[locale]/(auth)/layout.tsx
export default async function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const t = await getTranslations("Header");
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (token) {
    redirect("/");
  }

  return (
    <>
      <header className="fixed top-0 left-0 w-full bg-background z-40 ">
        <div className="container py-7 flex items-center justify-between ">
          <Link
            href="/"
            rel="noopener noreferrer"
            className="w-27.5 md:w-37.5 pb-3"
            title={t("logoTitle")}
          >
            <Image
              src="/logo.svg"
              alt={t("logoAlt")}
              width={150}
              height={50}
              className="w-full h-auto"
            />
            <span className="sr-only">Baiitna Logo</span>
          </Link>
          <LanguageSwitcher />
        </div>
      </header>
      <main className="auth-container min-h-screen bg-background">
        {children}
      </main>
    </>
  );
}
