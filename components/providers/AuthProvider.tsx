"use client";

import { useAuthSync } from "@/hooks/useAuthSync";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useAuthSync(); // Runs the sync logic globally
  const path = usePathname();

  // Handle your sidebar/menu closing logic here once for the whole app
  useEffect(() => {
    // You can use a UI store for these instead of local state if needed
    // closeAllMenus();
  }, [path]);

  return <>{children}</>;
}
