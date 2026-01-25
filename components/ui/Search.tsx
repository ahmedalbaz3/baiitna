"use client";
import { Search, SearchIcon } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { useState, useEffect, useRef, use, useMemo } from "react";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { citiesSchema, SEARCH_QUERY } from "@/graphql/queries";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";
import { SearchResultsSkeleton } from "./skeletons/SearchResultSkeleton";
import { useFilterStore } from "@/store/useFilter";
import { gql } from "@apollo/client";
import { GetCitiesQuery } from "@/types/citiesT";
import { SuggestItemsResponse } from "@/types/suggestedServices";
import { SearchResponse } from "@/types/SearchRequest";
import { Skeleton } from "./Skeleton";

const suggestItems = gql`
  query Services {
    services(paginate: { limit: 3, page: 1 }) {
      code
      success
      message
      data {
        items {
          id
          nameEn
          nameAr
          code
          isFeatured
          isActive
          numberOfCompanies
          categoryId
          clicks
          slug
          createdAt
          updatedAt
          getClickCount
        }
      }
    }
  }
`;

const SearchC = ({
  className,
  type,
}: {
  className?: string;
  type: "hero" | "header";
}) => {
  // language and translation
  const locale = useLocale();
  const isRtl = locale === "ar";
  const t = useTranslations("HomePage.Hero");
  const inputRef = useRef<HTMLInputElement | null>(null);

  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    nameAr: string;
    id: number;
  }>({ name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 });

  //  ui states
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [searchInput, setSearchInput] = useState<string>("");
  const [resultType, setResultType] = useState<"services" | "providers">(
    "services",
  );
  const [debouncedTerm, setDebouncedTerm] = useState("");
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  const { place, setPlace } = useFilterStore((state) => state);

  // handle keyboard navigation for suggested categories
  const handleEnterKey = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLLIElement;
      setSelectedCategory(target.textContent || "");
      setSearchInput(target.textContent || "");
      inputRef.current?.focus();
    }
  };

  // ============== FETCH ==============
  const { data: citiesFetch } = useQuery<GetCitiesQuery>(citiesSchema);
  const { data: suggestedServices, loading: suggestedServicesLoading } =
    useQuery<SuggestItemsResponse>(suggestItems);
  // fetch search results
  const {
    data: searchData,
    loading,
    error,
  } = useQuery<SearchResponse>(SEARCH_QUERY, {
    variables: {
      searchKey: debouncedTerm,
      limit: 10.0,
      cityId: place.id,
    },
    skip: !debouncedTerm,
  });

  // ============== SEARCH LOGIC ==============

  // debouncing  logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  // track scroll position
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 400);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSelectCity = (place: {
    name: string;
    nameAr: string;
    id: number;
  }) => {
    setSelectedPlace(place);
    setPlace(place);
    setDropdownOpen(false);
  };

  const cities = citiesFetch?.getCities?.data || [];
  const services = searchData?.search?.data?.services || [];
  const providers = searchData?.search?.data?.providers || [];
  const searchSuggestions = useMemo(() => {
    return (
      suggestedServices?.services?.data?.items?.map((item: any) =>
        isRtl ? item.nameAr : item.nameEn,
      ) || []
    );
  }, [suggestedServices, isRtl]);

  if (type === "header" && !isScrolled) return null;
  return (
    <div className={`search-component  ${className} `}>
      <form
        action=""
        className="flex items-center border rounded-xl bg-cream w-full relative "
        onSubmit={(e) => e.preventDefault()}
      >
        <button type="submit" className="p-2">
          <Search width={20} height={20} />
          <span className="sr-only">{t("searchButton")}</span>
        </button>
        <input
          ref={inputRef}
          type="text"
          placeholder={t("searchPlaceholder")}
          className="md:w-[320px] h-11.5 outline-0 flex-1 text-xs md:text-base relative z-30"
          value={selectedCategory}
          onChange={(e) => {
            setSelectedCategory(e.target.value);
            setSearchInput(e.target.value);
          }}
        />
        <div className="select flex">
          <span>|</span>
          <div className="" onClick={() => setDropdownOpen(!dropdownOpen)}>
            <span className="text-xs md:text-sm p-2 cursor-pointer font-medium">
              {isRtl ? place.nameAr : place.name}
              <ChevronDown className="inline-block ml-1" />
            </span>
            <div
              className={`dropdown absolute top-full mt-3 rounded-2xl bg-white w-60 shadow-lg duration-250 ${
                isRtl ? "left-0" : "right-0"
              } ${
                dropdownOpen ? "z-20" : "h-0 overflow-hidden hidden"
              } max-h-fit min-h-fit`}
            >
              <ul className="py-3">
                {cities.map((item) => (
                  <li
                    tabIndex={0}
                    key={item.id}
                    onClick={() => handleSelectCity(item)}
                    className="text-xs md:text-sm py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
                    onFocus={() => handleSelectCity(item)}
                  >
                    {isRtl ? item.nameAr : item.name}
                    <span className="text-primary">
                      {place.name === (isRtl ? item.nameAr : item.name) && (
                        <Check />
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`search-screen absolute top-full left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-auto xl:right-0 mt-3 duration-300 shadow-2xl z-30 rounded-2xl bg-white w-4xl max-w-[96vw] overflow-hidden  ${
            searchInput ? "opacity-100 " : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`md:hidden flex items-center text-sm gap-4 px-6  border-b border-b-gray-300 `}
          >
            <span
              className={`result-card py-3  ${
                resultType === "services" ? "result-card focused" : ""
              } `}
              onClick={() =>
                resultType !== "services" ? setResultType("services") : null
              }
            >
              {t("search.service")}
            </span>
            <span
              className={`result-card  ${
                resultType === "providers" ? "result-card focused" : ""
              } `}
              onClick={() =>
                resultType !== "providers" ? setResultType("providers") : null
              }
            >
              {t("search.provider")}
            </span>
          </div>

          {loading ? (
            <SearchResultsSkeleton />
          ) : services.length > 0 || providers.length > 0 ? (
            <div className="grid md:grid-cols-2 h-[408px] overflow-hidden border border-gray-100 rounded-xl bg-white shadow-sm">
              <div
                className={`col flex flex-col p-6 h-full min-h-0 border-e border-gray-50 ${
                  resultType === "services" ? "" : "max-md:hidden"
                }`}
              >
                <div className="title shrink-0">
                  <h3 className="text-start text-xl font-bold max-md:hidden">
                    {t("search.service")}
                  </h3>
                  <div className="flex gap-1 mt-2 text-sm">
                    <span className="text-primary font-semibold">
                      {services.length}
                    </span>
                    <p>{t("search.results") + " " + t("search.service")}</p>
                  </div>
                </div>

                <div className="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
                  {services.length > 0 ? (
                    services.map((service: any) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="text-sm flex items-center hover:text-primary shrink-0 transition-colors"
                      >
                        <SearchIcon size={16} className="me-1.5" />
                        <span>{isRtl ? service.nameAr : service.nameEn}</span>
                      </Link>
                    ))
                  ) : (
                    <div className="py-10 text-center flex flex-col items-center justify-center">
                      <Image
                        src="/images/search-404.svg"
                        width={100}
                        height={80}
                        alt="no results"
                        className="mx-auto h-auto opacity-60"
                      />
                      <p className="text-xs mt-4 text-gray-500">
                        {t("search.noResults")} "{searchInput}"
                      </p>
                    </div>
                  )}
                </div>
              </div>

              <div
                className={`col flex flex-col p-6 h-full min-h-0 ${
                  resultType === "providers" ? "" : "max-md:hidden"
                }`}
              >
                <div className="title shrink-0">
                  <h3 className="text-start text-xl font-bold max-md:hidden">
                    {t("search.provider")}
                  </h3>
                  <div className="flex gap-1 mt-2 text-sm">
                    <span className="text-primary font-semibold">
                      {providers.length}
                    </span>
                    <p>{t("search.results") + " " + t("search.provider")}</p>
                  </div>
                </div>

                <div className="results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 custom-scrollbar">
                  {providers.length > 0 ? (
                    providers.map((provider: any) => (
                      <Link
                        key={provider.id}
                        href={`/companies/${provider.slug.slice(19)}`}
                        className="text-sm flex items-center hover:text-primary gap-3 shrink-0 group transition-colors"
                      >
                        <div className="border border-gray-200 rounded-md overflow-hidden shrink-0 group-hover:border-primary transition-colors">
                          <Image
                            src={"/images/test-provider.png"}
                            width={32}
                            height={32}
                            className="object-cover"
                            alt={
                              isRtl
                                ? provider.nameAr || "شعار المزود"
                                : provider.nameEn || "Provider Logo"
                            }
                            loading="lazy"
                          />
                        </div>
                        <span className="truncate">
                          {isRtl ? provider.nameAr : provider.nameEn}
                        </span>
                      </Link>
                    ))
                  ) : (
                    <div className="py-10 text-center flex flex-col items-center justify-center">
                      <p className="text-xs text-gray-400 italic">
                        No providers found
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div className="p-10 text-center">
              <Image
                src="/images/search-404.svg"
                width={100}
                height={80}
                alt="no results"
                className="mx-auto h-auto"
              />
              <p className="text-xs mt-4">
                No search results for "{searchInput}"
              </p>
            </div>
          )}
        </div>
      </form>
      <div
        className={`mt-6 flex gap-4 items-center justify-center max-md:flex-col text-sm ${type === "hero" ? "" : "hidden"}`}
      >
        <p>{t("searchSuggest")}</p>
        <ul className={`flex gap-1.5 md:gap-3 `}>
          {suggestedServicesLoading
            ? [1, 2, 3].map((el) => (
                <Skeleton key={el} className="w-23 h-6 rounded-lg" />
              ))
            : searchSuggestions.map((item) => (
                <li
                  tabIndex={0}
                  key={item}
                  className={` text-xs  font-semibold border rounded-lg py-1.5 max-md:px-1 px-3 cursor-pointer ${
                    selectedCategory === item
                      ? "bg-black text-white border"
                      : "bg-transparent text-foreground border-border"
                  } whitespace-nowrap`}
                  onClick={(e) => {
                    setSelectedCategory(item);
                    setSearchInput(item);
                    inputRef.current?.focus();
                  }}
                  onKeyDown={(e) => handleEnterKey(e)}
                >
                  {item}
                </li>
              ))}
        </ul>
      </div>
      <div
        className={` absolute top-0 left-0 z-20 w-dvw h-dvh bg-black opacity-0 ${
          searchInput ? "" : "hidden"
        }`}
        onClick={() => setSearchInput("")}
      ></div>
    </div>
  );
};

export default SearchC;
