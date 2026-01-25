import { getTranslations } from "next-intl/server";
import Link from "next/link";
import Button from "../shared/Button";
import { cookies } from "next/headers";
import { Bookmark } from "lucide-react";

import NavMenu from "../ui/NavMenu";
import LanguageSwitcher from "../ui/LanguageSwitcher";
import MobileMenu from "../ui/MobileMenu";
import SearchC from "../ui/Search";
import Image from "next/image";
import UserDropDown from "../ui/UserDropDown";
import SearchHeader from "./SearchHeader";
import NotificationsDropDown from "../ui/NotificationsDropDown";

const Header = async () => {
  const t = await getTranslations("Header");
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token")?.value;

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
            <span className="sr-only">Baiitna Logo</span>
          </Link>
          <NavMenu title={t("findProvider")} />
        </div>
        <SearchHeader />
        <div className="right hidden md:flex items-center gap-4">
          {token && (
            <div className="py-3 px-5 rounded-2xl hover:bg-white cursor-pointer duration-150 font-semibold">
              Request a quote
            </div>
          )}
          <LanguageSwitcher />
          {token ? (
            <>
              <Link
                href="/favorites"
                className="p-3 hover:bg-white rounded-2xl duration-150"
              >
                <Bookmark />
              </Link>
              <NotificationsDropDown />
              <UserDropDown />
            </>
          ) : (
            <>
              <Link href="/auth/sign-up">
                <Button
                  text={t("signup")}
                  className="bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
                />
              </Link>
              <Link href="/auth/profile-setup">
                <Button
                  text={t("join")}
                  className="hover:bg-hover text-text-primary bg-primary"
                />
              </Link>
            </>
          )}
        </div>
        <MobileMenu />
      </div>
    </header>
  );
};

export default Header;
