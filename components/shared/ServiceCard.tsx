"use client";
import { ChevronRight, ChevronLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import { getLocale } from "next-intl/server";

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
        <Image
          src="/images/service-card-1.jpeg"
          alt="Home Smart System"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </Link>

      <div className="desc flex flex-col justify-between flex-1 p-4 pb-0 relative">
        <div className=" absolute top-[-30px] left-4 border-2 border-background rounded-2xl overflow-hidden">
          <Image
            src="/images/provider-logo.png"
            alt="Service Provider"
            width={60}
            height={60}
            className="rounded-lg"
          />
        </div>
        <div className="text space-y-1 pt-7">
          <h3 className="text-lg font-semibold text-gray-900">
            {isRtl ? titleAr : titleEn}
          </h3>
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
            <li className="service-card-icons">
              <Link href="tel:+1234567890">
                <Phone />
              </Link>
            </li>
            <li className="service-card-icons">
              <Link
                href="https://wa.me/1234567890"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Image
                  src="/images/whatsapp.svg"
                  alt="WhatsApp"
                  width={24}
                  height={24}
                />
              </Link>
            </li>
            <li className="service-card-icons">
              <Link href="mailto:example@example.com">
                <Mail />
              </Link>
            </li>
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
