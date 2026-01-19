import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Button from "../shared/Button";

import NavMenu from "../ui/NavMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import MobileMenu from "../ui/MobileMenu";
import SearchC from "../ui/Search";
import Image from "next/image";

const Header = async () => {
  const t = await getTranslations("Header");

  return (
    <header className=" fixed top-0 left-0 w-full bg-background z-40 ">
      <div className="container py-7">
        <div className="left flex items-center  gap-9">
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
          </Link>
          <NavMenu title={t("findProvider")} />
        </div>
        <SearchC className="max-xl:hidden max-w-[475px]" type="header" />
        <div className="right hidden md:flex items-center gap-4">
          <LanguageSwitcher />
          <Link href="/auth/sign-up">
            <Button
              text={t("signup")}
              className="bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
            />
          </Link>
          <Link href="/profile-setup">
            <Button
              text={t("join")}
              className="hover:bg-hover text-text-primary"
            />
          </Link>
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
