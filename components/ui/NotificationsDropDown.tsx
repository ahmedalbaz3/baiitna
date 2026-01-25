"use client";
import { Bell, BellRing } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const NotificationsDropDown = () => {
  const [dropDownOpen, setDropdownOpen] = useState(false);
  return (
    <div className="relative">
      <div
        className="hover:bg-white rounded-2xl p-3 cursor-pointer duration-150"
        onClick={() => setDropdownOpen(!dropDownOpen)}
      >
        <Bell className="" />
      </div>
      <div
        className={`absolute top-full right-0 mt-2 rounded-2xl bg-white p-6 w-md shadow-lg ${dropDownOpen ? "" : "hidden"}`}
      >
        <p className="text-xl font-semibold ">Notifications</p>
        <div className="py-10 text-center flex flex-col items-center justify-center">
          <Image
            src="/images/notifications.svg"
            alt=""
            width={104}
            height={104}
            className=""
          />
          <p className="text-xl font-semibold mt-3 mb-2">
            No notifications until now
          </p>
          <p className="text-sm ">Your notifications will appear here.</p>
        </div>
      </div>
    </div>
  );
};

export default NotificationsDropDown;
