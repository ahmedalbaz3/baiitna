"use client";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { ALL_CATEGORIES } from "@/graphql/queries";
import { GetAllCategoriesQuery } from "@/types/categoriesT";
import { useLocale } from "next-intl";

const NavMenu = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  const [titleHover, setTitleHover] = useState(false);
  const locale = useLocale();
  const isRtl = locale === "ar" ? true : false;

  const { data } = useQuery<GetAllCategoriesQuery>(ALL_CATEGORIES, {
    variables: { limit: 8 },
  });

  return (
    <div
      className="xl:relative max-lg:hidden z-40 "
      onMouseEnter={() => {
        setOpen(true);
        setTitleHover(true);
      }}
      onMouseLeave={() => {
        setTimeout(() => {
          setOpen(false);
          setTitleHover(false);
        }, 200);
      }}
    >
      <div className="pb-2">
        <p
          className={
            "hover:bg-white py-3 px-5 rounded-2xl cursor-pointer duration-150 font-semibold" +
            (titleHover ? " bg-white" : "")
          }
        >
          {title}
          <ChevronDown className="inline-block ml-2" />
        </p>
      </div>
      <div
        className={`
           bg-white rounded-2xl w-7xl max-w-dvw xl:max-w-[80dvw] absolute min-w-fit top-[50%] xl:top-full p-8 flex flex-col gap-2 shadow-2xl ${
             isRtl ? "right-0" : "left-0"
           } z-30 duration-150 ${
             open ? "opacity-100 " : "opacity-0 pointer-events-none -z-30"
           }`}
      >
        <div className="header">
          <p className="text-2xl font-semibold whitespace-nowrap">
            Provider Categories
          </p>
        </div>
        <div className="body grid grid-cols-3 whitespace-nowrap gap-8 py-6">
          {data?.Allcategories.data.items.map((item, index) => (
            <ul key={index} className="flex flex-col gap-4">
              <li key={item.id} className="flex flex-col gap-2">
                <strong className="flex items-center gap-1.5">
                  <Image
                    src={`https://staging-api.baiitna.com/${item.image.file}`}
                    alt={item.nameEn}
                    width={30}
                    height={24}
                  />
                  {item.nameEn}
                </strong>
                <ul className="flex flex-col gap-1 text-sm">
                  {item.companyServices.map((service) => (
                    <li key={service.id}>
                      <Link href="/" className="hover:text-primary">
                        {service.nameEn}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          ))}
        </div>
        <div className="footer flex gap-8 whitespace-nowrap">
          <Link
            href="/"
            className="text-primary font-semibold underline flex gap-1"
          >
            <span>Explore all categories</span>
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </Link>
          <Link
            href="/"
            className="text-primary font-semibold underline flex gap-1"
          >
            <span>view all providers</span>
            {isRtl ? <ChevronLeft /> : <ChevronRight />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NavMenu;
