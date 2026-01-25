"use client";
import { Globe } from "lucide-react";
import { useTranslations } from "next-intl";
import { usePathname, useRouter } from "next/navigation";

const LanguageSwitcher = ({
  className,
  type,
}: {
  className?: string;
  type?: string;
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
      {type !== "mobile" ? <span>{t("lang")}</span> : <span>Language</span>}
      <Globe
        width={type === "mobile" ? 20 : 24}
        height={type === "mobile" ? 20 : 24}
      />
    </div>
  );
};

export default LanguageSwitcher;
