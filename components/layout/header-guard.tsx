"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";

export function HeaderGuard() {
  const pathname = usePathname();

  if (pathname === "/team") {
    return null;
  }

  return <Header />;
}