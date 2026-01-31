"use client";
import { ChevronRight, ChevronLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";

interface ServiceCardProps {
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  imageUrl: string;
  providerLogo: string;
  phone: string;
  whatsapp: string;
  email: string;
  profileLink: string;
}

const ServiceCard = ({
  titleEn,
  titleAr,
  descriptionEn,
  descriptionAr,
  imageUrl,
  providerLogo,
  phone,
  whatsapp,
  email,
  profileLink,
}: ServiceCardProps) => {
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("HomePage.Card");

  return (
    <div className="service-card flex flex-col shadow-md rounded-xl overflow-hidden bg-white min-h[456px]">
      <Link href="/" className="relative block h-[264px] w-full">
        <div className="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer">
          <Image
            src={`https://staging-api.baiitna.com/${imageUrl}`}
            alt="Home Smart System"
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 360px"
          />
        </div>
      </Link>

      <div className="desc flex flex-col justify-between flex-1 p-4 pb-0 relative">
        <div className=" absolute top-[-30px] left-4 border-2 border-background rounded-2xl overflow-hidden size-[60px]">
          <div className="relative w-full h-full overflow-hidden bg-[#f6f7f8] animate-shimmer">
            <Image
              src={`https://staging-api.baiitna.com/${providerLogo}`}
              alt="Service Provider"
              width={60}
              height={60}
              className="rounded-lg object-cover"
            />
          </div>
        </div>
        <div className="text space-y-1 pt-7">
          <Link
            href={profileLink}
            className="text-base font-semibold text-gray-900 cursor-pointer hover:text-primary duration-150"
          >
            {isRtl ? titleAr : titleEn}
          </Link>
          <p className="text-sm text-gray-500">
            {isRtl
              ? descriptionAr?.length > 40
                ? descriptionAr.slice(0, 40) + "..."
                : descriptionAr
              : descriptionEn?.length > 40
                ? descriptionEn.slice(0, 40) + "..."
                : descriptionEn}
          </p>
        </div>

        <div className="bottom flex justify-between items-center ">
          <ul className="flex gap-3 py-5 ">
            <Link href="tel:+1234567890">
              <li className="service-card-icons">
                <Phone />
                <span className="sr-only">phone</span>
              </li>
            </Link>
            <Link
              href="https://wa.me/1234567890"
              target="_blank"
              rel="noopener noreferrer"
            >
              <li className="service-card-icons">
                <svg
                  viewBox="0 0 32 32"
                  className="whatsapp-ico w-7.5"
                  fill="currentColor"
                >
                  <path
                    d=" M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.13-.33.244-.73.244-1.088 0-.058 0-.144-.03-.215-.1-.172-2.434-1.39-2.678-1.39zm-2.908 7.593c-1.747 0-3.48-.53-4.942-1.49L7.793 24.41l1.132-3.337a8.955 8.955 0 0 1-1.72-5.272c0-4.955 4.04-8.995 8.997-8.995S25.2 10.845 25.2 15.8c0 4.958-4.04 8.998-8.998 8.998zm0-19.798c-5.96 0-10.8 4.842-10.8 10.8 0 1.964.53 3.898 1.546 5.574L5 27.176l5.974-1.92a10.807 10.807 0 0 0 16.03-9.455c0-5.958-4.842-10.8-10.802-10.8z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">whatsapp</span>
              </li>
            </Link>
            <Link href="mailto:example@example.com">
              <li className="service-card-icons">
                <Mail />
                <span className="sr-only">email</span>
              </li>
            </Link>
          </ul>

          <Link
            href="/profile"
            className=" profile-link text-primary font-semibold flex items-center gap-1 cursor-pointer xl:text-sm opacity-0 hover:opacity-100 duration-200"
          >
            {t("viewProfile")}
            {isRtl ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
