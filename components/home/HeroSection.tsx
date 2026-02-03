"use client";

import Image from "next/image";
import { site } from "@/lib/data";
import { ThemeToggle } from "@/components/ThemeToggle";

const BG_IMAGE =
  "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=1920&auto=format&fit=crop";

export function HeroSection() {
  const [first, second] = site.teamName.split(/\s{2,}/);
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark">
      <div className="absolute inset-0 z-0">
        <Image
          src={BG_IMAGE}
          alt=""
          fill
          className="object-cover"
          priority
          unoptimized
        />
        <div className="absolute inset-0 bg-black/40 dark:bg-black/60" />
      </div>
      <div className="absolute top-6 right-6 z-20">
        <ThemeToggle />
      </div>
      <div className="relative z-10 container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
          <span className="block" style={{ transform: "translateX(-0.05em)" }}>
            {first}
          </span>
          <span className="block mt-2" style={{ transform: "translateX(0.05em)" }}>
            {second || ""}
          </span>
        </h1>
        <p className="mt-8 max-w-2xl mx-auto text-lg md:text-xl text-white/95 drop-shadow">
          {site.projectIntro}
        </p>
      </div>
    </section>
  );
}
