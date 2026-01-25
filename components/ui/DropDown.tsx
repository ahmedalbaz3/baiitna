"use client";

import { citiesSchema } from "@/graphql/queries";
import { useFilterStore } from "@/store/useFilter";
import { CitiesResponseData, GetCitiesQuery } from "@/types/citiesT";
import { useQuery } from "@apollo/client/react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const DropDown = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

  const { place, setPlace } = useFilterStore((state) => state);

  const [selectedPlace, setSelectedPlace] = useState<{
    name: string;
    nameAr: string;
    id: number;
  }>({ name: "Abu Dhabi", nameAr: "أبو ظبي", id: 1 });
  const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

  const [cities, setCities] = useState<
    Array<GetCitiesQuery["getCities"]["data"][0]>
  >([]);

  const citiesFetch = useQuery(citiesSchema);

  useEffect(() => {
    if (citiesFetch.data && citiesFetch.data.getCities) {
      setCities(citiesFetch.data.getCities.data);
      setPlace({
        name: citiesFetch.data.getCities.data[0].name,
        nameAr: citiesFetch.data.getCities.data[0].nameAr,
        id: citiesFetch.data.getCities.data[0].id,
      });
      setSelectedPlace({
        name: citiesFetch.data.getCities.data[0].name,
        nameAr: citiesFetch.data.getCities.data[0].nameAr,
        id: citiesFetch.data.getCities.data[0].id,
      });
    }
  }, [citiesFetch.data]);

  const handleSelect = (selectedPlace: {
    name: string;
    nameAr: string;
    id: number;
  }) => {
    console.log("Selected category:", selectedPlace.name);
    setDropdownOpen(false);
    setPlace({
      name: selectedPlace.name,
      nameAr: selectedPlace.nameAr,
      id: selectedPlace.id,
    });
  };

  return (
    <div
      className="inline-block relative"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <span className={` cursor-pointer   ${className}`}>
        {isRtl ? place.nameAr : place.name}
        <ChevronDown className="inline-block size-9.5!" />
      </span>
      <div
        className={`dropdown absolute top-full max-md:start-0 md:end-0 mt-3 rounded-2xl z-20 text-xs md:text-base bg-white w-60 shadow-lg duration-250 ${
          dropdownOpen ? "min-h-60 " : "h-0 overflow-hidden opacity-0"
        } max-h-fit`}
      >
        <ul className="py-3">
          {cities.map((item) => (
            <li
              tabIndex={0}
              key={item.id}
              onClick={() => handleSelect(item)}
              className="py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
              onFocus={() => handleSelect(item)}
            >
              {isRtl ? item.nameAr : item.name}
              <span className="text-primary">
                {item.id === place.id && <Check />}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
