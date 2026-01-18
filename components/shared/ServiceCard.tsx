"use client";
import { ChevronRight, ChevronLeft, Phone, Mail } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

interface ServiceCardProps {
  title?: string;
  description?: string;
  imageUrl?: string;
  providerLogo?: string;
  phone?: string;
  whatsapp?: string;
  email?: string;
  profileLink?: string;
}

const ServiceCard = ({
  title,
  description,
  imageUrl,
  providerLogo,
  phone,
  whatsapp,
  email,
  profileLink,
}: ServiceCardProps) => {
  const params = useParams();

  const isRtl = params.locale === "ar";
  const t = useTranslations("HomePage.Card");
  return (
    <div className="service-card shadow-xl rounded-xl overflow-hidden bg-white min-h[456px]">
      <Link href="/" className="relative block h-[264px] w-full">
        <Image
          src="/images/service-card-1.jpeg"
          alt="Home Smart System"
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 360px"
        />
      </Link>

      <div className="desc flex flex-col  p-4 relative">
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
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">
            {description?.length > 40
              ? description.substring(0, 40) + "..."
              : description}
          </p>
        </div>

        <div className="bottom flex justify-between items-cente mt-2">
          <ul className="flex gap-3 py-4">
            <li className="w-[45px] h-[40px] rounded-xl border hover:border-white flex items-center justify-center transition-colors hover:bg-black hover:text-white duration-300">
              <Link href="tel:+1234567890">
                <Phone />
              </Link>
            </li>
            <li className="w-[45px] h-[40px] rounded-xl border hover:border-white flex items-center justify-center transition-colors hover:bg-black hover:text-white duration-300">
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
            <li className="w-[45px] h-[40px] rounded-xl border hover:border-white flex items-center justify-center transition-colors hover:bg-black hover:text-white duration-300">
              <Link href="mailto:example@example.com">
                <Mail />
              </Link>
            </li>
          </ul>

          <Link
            href="/profile"
            className="text-primary font-semibold flex items-center gap-1  cursor-pointer text-sm"
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
