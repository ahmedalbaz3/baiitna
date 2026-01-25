"use client";
import React from "react";
import SearchC from "../ui/Search";
import { usePathname } from "next/navigation";

const SearchHeader = () => {
  const pathname = usePathname();

  const isHomePage =
    pathname === "/" || pathname === "/en" || pathname === "/ar";

  return (
    <div>
      {isHomePage && (
        <SearchC className="max-xl:hidden max-w-[475px]" type="header" />
      )}
    </div>
  );
};

export default SearchHeader;
