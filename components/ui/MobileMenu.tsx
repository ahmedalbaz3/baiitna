"use client";
import { Menu, X, ChevronRight, Globe, ChevronLeft } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import Button from "../shared/Button";
import LanguageSwitcher from "./LanguageSwitcher";
import { usePathname } from "next/navigation";
import Image from "next/image";

const list = [
  { title: "About Us", href: "/about" },
  { title: "Baiitna for business", href: "/business" },
  { title: "Blog", href: "/blog" },
  { title: "Contact", href: "/contact" },
  { title: "FAQ", href: "/faq" },
];

const MobileMenu = () => {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const path = usePathname();

  useEffect(() => {
    setOpen(false);
    setServicesOpen(false);
  }, [path]);

  return (
    <div className="md:hidden">
      <Menu onClick={() => setOpen(true)} />

      <div
        className={`  absolute top-0 right-0 duration-150 h-dvh   ${
          open ? "z-40" : "opacity-0 -z-50 hidden"
        }`}
      >
        <div
          className={` absolute top-0 left-0 bg-black opacity-50  h-dvh w-dvw -translate-x-full duration-150 `}
          onClick={() => {
            setOpen(false);
            setServicesOpen(false);
          }}
        ></div>
        <div className="flex flex-col top-0 right-0 bg-white duration-150 h-dvh w-[75dvw] absolute overflow-y-auto">
          <div
            className={`head flex items-center justify-between px-4 py-6 ${
              servicesOpen ? "hidden" : ""
            }`}
          >
            <div className="w-27.5 md:w-37.5 pb-3">
              <Image
                src="/logo.svg"
                alt="Baiitna Logo"
                width={150}
                height={50}
                className="w-full h-auto"
              />
            </div>
            <X onClick={() => setOpen(false)} />
          </div>
          <div className="border-b border-b-gray-300">
            <div
              className="flex items-center text-sm font-semibold px-4 py-6  "
              onClick={() => setServicesOpen(!servicesOpen)}
            >
              <ChevronLeft
                width={20}
                height={20}
                className={`${servicesOpen ? "" : "hidden"}`}
              />

              <span>Services</span>
              <ChevronRight
                width={20}
                height={20}
                className={`${servicesOpen ? "hidden" : ""}`}
              />
            </div>
            <div
              className={`p-4  text-base font-medium flex flex-col gap-8 ${
                servicesOpen ? "" : "hidden"
              }`}
            >
              <ul className="flex flex-col gap-5">
                <li>service 1</li>
                <li>service 1</li>
                <li>service 1</li>
                <li>service 1</li>
                <li>service 1</li>
                <li>service 1</li>
                <li>service 1</li>
              </ul>
              <Link href="/services" className=" text-primary">
                Show All Services
              </Link>
            </div>
          </div>
          <ul className="text-sm font-semibold px-4 py-6 border-b border-b-gray-300 flex flex-col gap-5">
            {list.map((item, index) => (
              <li key={index}>
                <Link href={item.href}>{item.title}</Link>
              </li>
            ))}
          </ul>
          <div className="flex-1">
            <div className="h-full flex flex-col gap-8 items-center justify-between px-4 py-6 border-t border-t-gray-300 ">
              <div className="flex items-center justify-between w-full ">
                <div className="flex items-center gap-2 font-normal">
                  <LanguageSwitcher
                    className="flex-row-reverse"
                    type="mobile"
                  />
                </div>
                <p>العربيه</p>
              </div>
              <div className="actions flex flex-col gap-5 w-full">
                <Button
                  text="Join as a Provider"
                  className="w-full hover:bg-hover text-text-primary"
                />
                <Button
                  text="Sign Up"
                  className="w-full bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
                />
                <Button
                  text="Log in"
                  className="w-full bg-transparent border text-foreground hover:bg-foreground hover:text-text-primary border-foreground"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
