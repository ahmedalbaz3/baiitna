"use client";
import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = ({
  className,
  type,
}: {
  className?: string;
  type?: "mobile" | "desktop" | "mobileHeader";
}) => {
  const t = useTranslations("Header");
  const router = useRouter();
  const pathname = usePathname();
  const pathSegments = pathname.split("/");

  const isRtl = pathSegments[1] === "ar" ? true : false;
  const newLocale = isRtl ? "en" : "ar";
  pathSegments[1] = newLocale;

  const togglePageDirection = () => {
    if (newLocale === "ar") {
      const newUrl = `/ar${pathname}`;
      router.push(newUrl);
      return;
    }
    router.push("/" + pathSegments.slice(1).join("/"));
  };
  return (
    <div
      className={`lang hover:text-primary cursor-pointer duration-200 flex gap-1.5 text-base items-center ${className}`}
      tabIndex={0}
      onClick={togglePageDirection}
    >
      {type === "desktop" ? (
        <span>{t("lang")}</span>
      ) : type === "mobile" ? (
        <span>{isRtl ? "اللغة" : "Language"}</span>
      ) : null}
      <Globe
        width={type === "mobile" ? 20 : 24}
        height={type === "mobile" ? 20 : 24}
      />
    </div>
  );
};

export default LanguageSwitcher;
