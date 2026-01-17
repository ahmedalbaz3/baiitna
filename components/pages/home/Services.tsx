import { getTranslations } from "next-intl/server";
import DropDown from "@/components/ui/DropDown";
import ServiceCard from "@/components/shared/ServiceCard";
import Button from "@/components/shared/Button";
import Link from "next/link";

const list = ["test"];

for (let i = 0; i < 50; i++) {
  list.push(`test-${i++}`);
}

const Services = async ({
  params,
}: {
  params: Promise<{ locale: string }>;
}) => {
  const t = await getTranslations("HomePage.Services");
  return (
    <section className="pb-sm-section-py bg-white ">
      <div className="container flex flex-col items-start gap-[50px]">
        <h2 className="md:text-[38px] text-xl max-w-[60dvw] md:max-w-[550px] font-semibold ">
          {t("title")} <DropDown className="inline-block text-primary" />
        </h2>
        <div className=" flex gap-6 overflow-x-auto w-full border-b border-gray-200">
          {list.map((item, i) => (
            <span
              className="whitespace-nowrap text-base font-semibold border-b-2 border-transparent pb-2 hover:border-primary hover:text-primary cursor-pointer"
              key={i}
            >
              {item}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 w-full">
          <ServiceCard params={params} />
          <ServiceCard params={params} />
          <ServiceCard params={params} />
          <ServiceCard params={params} />
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

export default Services;
