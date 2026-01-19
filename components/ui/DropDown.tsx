"use client";

import { citiesSchema } from "@/graphql/queries";
import { GetCitiesQuery } from "@/types/citiesT";
import { useQuery } from "@apollo/client/react";
import { Check, ChevronDown } from "lucide-react";
import { useLocale } from "next-intl";
import { useEffect, useState } from "react";

const DropDown = ({ className }: { className?: string }) => {
  const locale = useLocale();
  const isRtl = locale === "ar";

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
      setSelectedPlace({
        name: citiesFetch.data.getCities.data[0].name,
        nameAr: citiesFetch.data.getCities.data[0].nameAr,
        id: citiesFetch.data.getCities.data[0].id,
      });
    }
  }, [citiesFetch.data]);

  return (
    <div
      className="inline-block relative"
      onClick={() => setDropdownOpen(!dropdownOpen)}
    >
      <span className={` cursor-pointer   ${className}`}>
        {isRtl ? selectedPlace.nameAr : selectedPlace.name}
        <ChevronDown className="inline-block size-9.5!" />
      </span>
      <div
        className={`dropdown absolute top-full max-md:left-0 md:right-0 mt-3 rounded-2xl z-20 text-xs md:text-base bg-white w-60 shadow-lg duration-250 ${
          dropdownOpen ? "min-h-60 " : "h-0 overflow-hidden opacity-0"
        } max-h-fit`}
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
              className="py-3 px-6 hover:text-primary cursor-pointer flex items-center justify-between gap-2 whitespace-nowrap"
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
                {selectedPlace.id === place.id && <Check />}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DropDown;
