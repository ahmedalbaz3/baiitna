import Button from "@/components/shared/Button";
import { getTranslations } from "next-intl/server";
import Link from "next/dist/client/link";
import Image from "next/image";
import React from "react";

const PopularServices = async () => {
  const t = await getTranslations("HomePage.PopularServices");
  return (
    <section className="bg-white pb-sm-section-py">
      <div className="container flex flex-col items-start ">
        <h2 className="text-2xl font-semibold mb-6">{t("title")}</h2>
        <div className="w-full grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-7 gap-3">
          <div className="image rounded-2xl overflow-hidden relative h-[270px] w-full cursor-pointer">
            <Image
              src="/images/services-1.png"
              alt="Interior Design"
              fill // This makes the image fill the relative container
              className="object-cover" // Ensures the aspect ratio is maintained while filling
              sizes="(max-width: 768px) 100vw, 33vw" // Helps Next.js optimize loading
            />
            <div className="absolute inset-0 bg-black/5 " />{" "}
            <p className="absolute bottom-0 p-4 text-white font-semibold text-base">
              Interior Design
            </p>
          </div>
          <div className="image rounded-2xl overflow-hidden relative h-[270px] w-full cursor-pointer">
            <Image
              src="/images/services-2.png"
              alt="Interior Design"
              fill // This makes the image fill the relative container
              className="object-cover" // Ensures the aspect ratio is maintained while filling
              sizes="(max-width: 768px) 100vw, 33vw" // Helps Next.js optimize loading
            />
            <div className="absolute inset-0 bg-black/5 " />{" "}
            <p className="absolute bottom-0 p-4 text-white font-semibold text-base">
              Interior Design
            </p>
          </div>
        </div>
        <Link href="/profile-setup" className="self-center mt-10">
          <Button
            text={t("viewAll")}
            className="hover:bg-hover text-text-primary"
          />
        </Link>
      </div>
    </section>
  );
};

export default PopularServices;
