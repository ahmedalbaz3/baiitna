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
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

const UserDropDown = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = useUserAuth((state) => state.user);
  const { logout, updateUser } = useUserAuth((state) => state);
  const router = useRouter();
  const client = useApolloClient();

  const handleLogout = () => {
    setMenuOpen(false);
    client.clearStore();
    logout();
    router.push("/auth/");
  };

  return (
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
          <div className="text-xs">{userData?.email || "user@example.com"}</div>
        </div>
        <ul className="flex flex-col gap-4 mt-4 px-5 pb-4 border-b text-base">
          <Link href="/settings">
            <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
              <Settings />
              <span className="">Settings</span>
            </li>
          </Link>
          <Link href="/quotes">
            <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
              <MessageCircleMore />
              <span className="">My Quotation Requests</span>
            </li>
          </Link>
          <Link href="/support-tickets">
            <li className="flex items-center gap-3 hover:text-primary  rounded-lg cursor-pointer">
              <Ticket />
              <span className="">Support Tickets</span>
            </li>
          </Link>
        </ul>
        <div className="px-5 py-4 border-b flex flex-col gap-4 text-base">
          <Link href="/about" className="hover:text-primary ">
            About Us
          </Link>
          <Link href="/faq" className="hover:text-primary ">
            FAQ
          </Link>
        </div>
        <div
          className="pt-4 text-red-500 px-5 hover:text-red-800 text-base"
          onClick={handleLogout}
        >
          <LogOut className="inline-block size-4! mx-2 cursor-pointer" />
          <span className=" cursor-pointer">Logout</span>
        </div>
      </div>
    </div>
  );
};

export default UserDropDown;
