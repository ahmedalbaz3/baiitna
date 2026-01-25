"use client";
import useUserAuth from "@/store/useUserAuth";
import { useApolloClient } from "@apollo/client/react";
import {
  CircleUserRound,
  ChevronDown,
  Settings,
  MessageCircleMore,
  Ticket,
  LogOut,
} from "lucide-react";
import { useTranslations } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const UserDropDown = () => {
  const t = useTranslations("Header.userMenu");

  const [menuOpen, setMenuOpen] = useState(false);
  const userData = useUserAuth((state) => state.user);
  const { logout, updateUser } = useUserAuth((state) => state);
  const router = useRouter();
  const client = useApolloClient();
  const pathname = usePathname();

  const handleLogout = () => {
    setMenuOpen(false);
    client.clearStore();
    logout();
    router.push("/auth/");
  };

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="relative">
        <div
          className={`p-3 hover:bg-white rounded-2xl duration-150 flex items-center gap-1 cursor-pointer  ${menuOpen ? "bg-white" : ""}`}
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <CircleUserRound />
          <ChevronDown className="inline-block size-4!" />
        </div>
        <div
          className={`absolute top-full end-0 text-black py-6 w-70 mt-2 bg-white rounded-2xl shadow-lg z-20 overflow-hidden transition-all duration-200 ${menuOpen ? "block" : "hidden"}`}
        >
          <div className="px-5 pb-4 border-b">
            <div className="text-base font-semibold mb-0.5">
              {userData?.fullName || "User Name"}
            </div>
            <div className="text-xs">
              {userData?.email || "user@example.com"}
            </div>
          </div>
          <ul className="flex flex-col gap-4 mt-4 px-5 pb-4 border-b text-base">
            <Link href="/settings">
              <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
                <Settings />
                <span className="">{t("settings")}</span>
              </li>
            </Link>
            <Link href="/quotes">
              <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
                <MessageCircleMore />
                <span className="">{t("quote")}</span>
              </li>
            </Link>
            <Link href="/support-tickets">
              <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
                <Ticket />
                <span className="">{t("ticket")}</span>
              </li>
            </Link>
          </ul>
          <div className="px-5 py-4 border-b flex flex-col gap-4 text-base">
            <Link href="/about" className="hover:text-primary ">
              {t("about")}
            </Link>
            <Link href="/faq" className="hover:text-primary ">
              {t("faq")}
            </Link>
          </div>
          <div
            className="pt-4 text-red-500 px-5 hover:text-red-800 text-base"
            onClick={handleLogout}
          >
            <LogOut className="inline-block size-4! mx-2 cursor-pointer" />
            <span className=" cursor-pointer">{t("logout")}</span>
          </div>
        </div>
      </div>
      {menuOpen && (
        <div
          className="absolute top-full left-0 w-full h-screen bg-transparent z-10"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </>
  );
};

export default UserDropDown;
