"use client";
import { Search, SearchIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { useState, useEffect, useRef, use } from "react";
import { ChevronDown } from "lucide-react";
import { Check } from "lucide-react";
import { useParams } from "next/navigation";
import { citiesSchema, SEARCH_QUERY } from "@/graphql/queries";
import Link from "next/link";
import Image from "next/image";
import { useQuery } from "@apollo/client/react";

const SearchC = ({ className }: { className?: string }) => {
  const params = useParams();
  const { locale } = params;
  const isRtl = locale === "ar";
  const inputRef = useRef(null);
  const t = useTranslations("HomePage.Hero");

  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    nameAr: string;
    id: number;
  }>({ name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 });
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [searchInput, setSearchInput] = useState<string>("");
  const [searchResults, setSearchResults] = useState<{}>({
    services: [],
    providers: [],
  });
  const [cities, setCities] = useState<Array<any>>([]);

  const handleEnterKey = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter") {
      const target = e.target as HTMLLIElement;
      setSelectedCategory(target.textContent || "");
      setSearchInput(target.textContent || "");
      inputRef.current?.focus();
    }
  };

  const citiesFetch = useQuery(citiesSchema);

  useEffect(() => {
    if (citiesFetch.data && citiesFetch.data.getCities) {
      setCities(citiesFetch.data.getCities.data);
      setSelectedPlace({
        name: citiesFetch.data.getCities.data[0].name,
        nameAr: citiesFetch.data.getCities.data[0].nameAr,
        id: citiesFetch.data.getCities.data[0].id,
      });
    }
  }, [citiesFetch.data]);

  // ============== SEARCH LOGIC ==============

  const [resultType, setResultType] = useState<"services" | "providers">(
    "services",
  );

  const [debouncedTerm, setDebouncedTerm] = useState("");
  // debouncing  logic
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedTerm(searchInput), 400);
    return () => clearTimeout(timer);
  }, [searchInput]);

  const { data, loading, error } = useQuery(SEARCH_QUERY, {
    variables: {
      searchKey: debouncedTerm,
      limit: 10.0,
      cityId: selectedPlace.id,
    },
  });

  useEffect(() => {
    if (data && data.search) {
      setSearchResults({
        services: data.search.data.services,
        providers: data.search.data.providers,
      });
    }
  }, [data]);

  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const position = window.pageYOffset;
      setScrollPosition(position);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [componentHidden, setComponentHidden] = useState(true);
  useEffect(() => {
    if (scrollPosition > 400) {
      setComponentHidden(false);
    } else {
      setComponentHidden(true);
      setSearchInput("");
    }
  }, [scrollPosition]);

  return (
    <div
      className={`search-component  ${className} ${
        componentHidden ? "hidden" : ""
      }`}
    >
      {" "}
      <form
        action=""
        className="flex items-center border rounded-xl bg-cream w-full relative "
        onSubmit={(e) => e.preventDefault()}
      >
        <button type="submit" className="p-2">
          <Search width={20} height={20} />
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
              {isRtl ? selectedPlace.nameAr : selectedPlace.name}
              <ChevronDown className="inline-block ml-1" />
            </span>
            <div
              className={`dropdown absolute top-full  mt-3 rounded-2xl bg-white w-60 shadow-lg duration-250 ${
                isRtl ? "left-0" : "right-0"
              } ${
                dropdownOpen ? "" : "h-0 overflow-hidden hidden"
              } max-h-fit min-h-fit`}
            >
              <ul className="py-3">
                {cities.map((place) => (
                  <li
                    tabIndex={0}
                    key={place.id}
                    onClick={() =>
                      setSelectedPlace({
                        name: place.name,
                        nameAr: place.nameAr,
                        id: place.id,
                      })
                    }
                    className="text-xs md:text-sm py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
                    onFocus={() =>
                      setSelectedPlace({
                        name: place.name,
                        nameAr: place.nameAr,
                        id: place.id,
                      })
                    }
                  >
                    {isRtl ? place.nameAr : place.name}
                    <span className="text-primary">
                      {selectedPlace ===
                        (isRtl ? place.nameAr : place.name) && <Check />}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div
          className={`search-screen absolute top-full left-1/2 -translate-x-1/2 xl:translate-x-0 xl:left-auto xl:right-0 mt-3 duration-200 shadow-2xl z-30 rounded-2xl bg-white w-4xl max-w-[96vw] max-h-[408px] overflow-hidden  ${
            searchInput
              ? "opacity-100 h-[408px]"
              : "h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="md:hidden flex items-center text-sm gap-4 px-6  border-b border-b-gray-300 ">
            <span
              className={`result-card py-3  ${
                resultType === "services" ? "result-card focused" : ""
              } `}
              onClick={() =>
                resultType !== "services" ? setResultType("services") : null
              }
            >
              Services
            </span>
            <span
              className={`result-card  ${
                resultType === "providers" ? "result-card focused" : ""
              } `}
              onClick={() =>
                resultType !== "providers" ? setResultType("providers") : null
              }
            >
              Providers
            </span>
          </div>

          {searchResults.services.length > 0 ||
          searchResults.providers.length > 0 ? (
            <div className="grid md:grid-cols-2 h-[450px] ">
              <div
                className={`col flex flex-col overflow-hidden p-6 h-full max-md:pb-25  ${
                  resultType === "services" ? "" : "max-md:hidden"
                }`}
              >
                <div className="title ">
                  <h3 className="text-start text-xl font-bold max-md:hidden">
                    Services
                  </h3>
                  <div className="flex gap-1 mt-2 text-sm">
                    <span className="text-primary font-semibold">
                      {searchResults.services.length}
                    </span>
                    <p>Results in services</p>
                  </div>
                </div>
                <div
                  className={`results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar `}
                >
                  {searchResults.services.length > 0 ? (
                    searchResults.services.map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="text-sm flex items-center hover:text-primary shrink-0"
                      >
                        <SearchIcon width={16} height={16} className="mr-1.5" />
                        <span>{service.nameEn}</span>
                      </Link>
                    ))
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
              </div>

              <div
                className={`col flex flex-col overflow-hidden p-6 h-full max-md:pb-25  ${
                  resultType === "providers" ? "" : "max-md:hidden"
                }`}
              >
                <div className="title ">
                  <h3 className="text-start text-xl font-bold max-md:hidden">
                    Providers
                  </h3>
                  <div className="flex gap-1 mt-2 text-sm">
                    <span className="text-primary font-semibold">
                      {searchResults.providers.length}
                    </span>
                    <p>Results in providers</p>
                  </div>
                </div>

                <div
                  className={`results flex-1 mt-6 overflow-y-auto flex flex-col gap-4 pr-2 custom-scrollbar  `}
                >
                  {searchResults.providers.map((provider) => (
                    <Link
                      key={provider.id}
                      href={`/companies/${provider.slug.slice(19)}`}
                      className="text-sm flex items-center hover:text-primary gap-3 shrink-0"
                    >
                      <div className="border border-gray-200 rounded-md overflow-hidden shrink-0">
                        <Image
                          src={"/images/test-provider.png"}
                          width={30}
                          height={30}
                          className="object-cover"
                          alt={provider.nameEn}
                          loading="lazy"
                        />
                      </div>
                      <span className="truncate">{provider.nameEn}</span>
                    </Link>
                  ))}
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
    </div>
  );
};

export default SearchC;
