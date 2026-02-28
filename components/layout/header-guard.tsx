"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";

export function HeaderGuard() {
  const pathname = usePathname();

  if (/^\/(team|app-download|reports|gallery|records)(\/)?$/.test(pathname)) {
    return null;
  }

  return <Header />;
}