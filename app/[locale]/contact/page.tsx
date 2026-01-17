"use client";
import React from "react";
import { useSuspenseQuery } from "@apollo/client/react";
import { allCategories } from "@/graphql/queries";

const page = () => {
  const { data } = useSuspenseQuery(allCategories, { variables: { foo: 1 } });

  console.log("Categories data:", data);

  return <div>page</div>;
};

export default page;
