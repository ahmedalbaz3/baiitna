"use client";

import { notFound } from "next/navigation";
import { useEffect } from "react";

export default function CatchAllPage() {
  useEffect(() => {
    notFound();
  }, []);

  return null;
}
