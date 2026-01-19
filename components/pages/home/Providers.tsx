"use client";
import DropDown from "@/components/ui/DropDown";
import Button from "@/components/shared/Button";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { useQuery } from "@apollo/client/react";
import { SERVICES_QUERY } from "@/graphql/queries";
import { GetAllServicesData } from "@/types/servicesT";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Loader } from "lucide-react";
import ProviderList from "@/components/ui/ProviderList";
import { Skeleton } from "@/components/ui/Skeleton";

const Providers = () => {
  const t = useTranslations("HomePage.Services");
  const locale = useLocale();
  const isRtl = locale === "ar" ? true : false;

  const [focusedId, setFocusedId] = useState<string>("");

  const scrollBar = useRef<HTMLDivElement>(null);

  // handling focus on service
  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "SPAN") {
      console.log(target.id);
      setFocusedId(target.id);
    }
  };

  // get all services
  const { data, loading, error, fetchMore } = useQuery<GetAllServicesData>(
    SERVICES_QUERY,
    {
      variables: { limit: 9, page: 1 },
    },
  );

  // set first service as focused by default
  useEffect(() => {
    if (data && data.services.data.items.length > 0 && !focusedId) {
      setFocusedId(data.services.data.items[0].id);
    }
  }, []);

  // load more services on scroll
  const loadMore = () => {
    let page = 1;
    let limit = 9;
    const total = data?.services.data.pageInfo.totalCount;
    const loaded = data?.services.data.items.length;

    if (total && loaded && loaded >= total) {
      return;
    } else if (total && loaded && total - loaded < limit) {
      limit = total - loaded;
    }
    fetchMore({
      variables: {
        page: page + 1, // next page
        limit: limit,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;

        return {
          ...prev,
          services: {
            ...prev.services,
            data: {
              ...prev.services.data,
              items: [
                ...prev.services.data.items,
                ...fetchMoreResult.services.data.items,
              ],
            },
          },
        };
      },
    });
  };

  const handleScroll = (direction: "left" | "right") => {
    if (scrollBar.current && direction === "right") {
      scrollBar.current.scrollBy({ left: 500, behavior: "smooth" });
    } else if (scrollBar.current && direction === "left") {
      scrollBar.current.scrollBy({ left: -500, behavior: "smooth" });
    }
  };
  return (
    <section className="pb-sm-section-py bg-white ">
      <div className="container flex flex-col items-start gap-[25px] ">
        <h2 className="md:text-[38px] text-xl max-w-[335px] md:max-w-[550px] font-semibold ">
          {t("title")} <DropDown className="inline-block text-primary" />
        </h2>

        <div className="relative container provider-scroll px-0">
          <div
            ref={scrollBar}
            className=" flex gap-6 overflow-x-hidden w-full border-b border-gray-200 min-h-8.5"
            onClick={(e) => handleClick(e)}
          >
            {loading && !data ? (
              <>
                {[1, 2, 3, 4, 5, 6, 7, 8 ].map((_, i) => (
                  <Skeleton
                    key={i}
                    className="h-6 w-[calc(100vw/8)] min-w-[80px] mr-4"
                  />
                ))}
              </>
            ) : (
              data?.services.data.items.map((item, i) => (
                <span
                  className={`whitespace-nowrap text-base font-semibold border-b-2 border-transparent pb-2 hover:border-primary hover:text-primary cursor-pointer ${
                    focusedId === item.id ? "border-primary! text-primary" : ""
                  }`}
                  key={i}
                  id={item.id}
                >
                  {isRtl ? item.nameAr : item.nameEn}
                </span>
              ))
            )}
          </div>
          <div
            className="provider-icon left-0 "
            onClick={() => handleScroll("left")}
          >
            <ChevronLeft />
          </div>
          <div
            className="provider-icon  right-0 "
            onClick={() => {
              handleScroll("right");
              loadMore();
            }}
          >
            <ChevronRight />
          </div>
        </div>
        <ProviderList serviceId={focusedId} />
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

export default Providers;
