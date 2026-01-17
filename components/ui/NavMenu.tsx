"use client";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";

const categoriesData = [
  {
    column: 1,
    categories: [
      {
        id: "cat-1",
        title: "Design and Furnishing",
        image: "/images/category_image-1.png",
        subcategories: [
          "Interior design",
          "Bespoke furniture",
          "Upholstery",
          "Ready made furniture",
          "Curtains",
          "Lighting & chandeliers",
        ],
      },
      {
        id: "cat-2",
        title: "Kitchens and Bathrooms",
        image: "/images/category_image-1.png",
        subcategories: [
          "Kitchen cabinets",
          "Bathroom fixtures",
          "Bathroom vanities",
        ],
      },
      {
        id: "cat-3",
        title: "Lifestyle and Entertainment",
        image: "/images/category_image-1.png",
        subcategories: [
          "Home gym",
          "Smart home setup",
          "Home theater",
          "Kids playroom",
          "Sport courts",
          "Home safes",
        ],
      },
    ],
  },
  {
    column: 2,
    categories: [
      {
        id: "cat-4",
        title: "Doors and Windows",
        image: "/images/category_image-1.png",
        subcategories: [
          "Indoor doors",
          "Outdoor doors",
          "Glass & glazing",
          "Windows",
        ],
      },
      {
        id: "cat-5",
        title: "Walls and Ceilings",
        image: "/images/category_image-1.png",
        subcategories: ["Wallpaper", "Paint finishes", "Gypsum ceiling works"],
      },
      {
        id: "cat-6",
        title: "Flooring and Surfaces",
        image: "/images/category_image-1.png",
        subcategories: [
          "Hardwood flooring",
          "Porcelain & ceramic flooring",
          "Carpets",
          "Marble flooring",
          "Vinyl flooring",
          "Bathroom tiles",
        ],
      },
    ],
  },
  {
    column: 3,
    categories: [
      {
        id: "cat-7",
        title: "Construction and Carpentry",
        image: "/images/category_image-1.png",
        subcategories: [
          "Metalwork (Stair railings, gates, balconies)",
          "Lifts",
          "Custom carpentry",
          "Renovation & remodeling",
          "Home extensions",
        ],
      },
      {
        id: "cat-8",
        title: "Outdoor and Landscaping",
        image: "/images/category_image-1.png",
        subcategories: ["Landscaping", "Swimming pools", "Outdoor furniture"],
      },
    ],
  },
];

const NavMenu = ({ title }: { title: string }) => {
  const [open, setOpen] = useState(false);
  const [titleHover, setTitleHover] = useState(false);
  const pathname = usePathname();
  const isRtl = pathname.split("/")[1] === "ar" ? true : false;

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
          <h3 className="text-2xl font-semibold whitespace-nowrap">
            Provider Categories
          </h3>
        </div>
        <div className="body grid grid-cols-3 whitespace-nowrap gap-8 py-6">
          {categoriesData.map((col, index) => (
            <ul key={index} className="flex flex-col gap-4">
              {col.categories.map((cat) => (
                <li key={cat.id} className="flex flex-col gap-2">
                  <strong className="flex items-center gap-1.5">
                    <Image
                      src={cat.image}
                      alt={cat.title}
                      width={30}
                      height={24}
                    />
                    {cat.title}
                  </strong>
                  <ul className="flex flex-col gap-1 text-sm">
                    {cat.subcategories.map((sub, i) => (
                      <li key={i}>
                        <Link href="/" className="hover:text-primary">
                          {sub}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
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
