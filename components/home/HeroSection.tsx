"use client";

import Link from "next/link";
import { site } from "@/lib/data";
import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { ThemeToggle } from "@/components/ThemeToggle";

const HERO_MEDIA =
  "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?auto=format&fit=crop&w=1200&q=80";
const HERO_BG =
  "https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?auto=format&fit=crop&w=1920&q=80";

export function HeroSection() {
  return (
    <section className="relative">
      <div className="absolute top-6 right-6 z-30">
        <ThemeToggle />
      </div>
      <ScrollExpandMedia
        mediaType="image"
        mediaSrc={HERO_MEDIA}
        bgImageSrc={HERO_BG}
        title="桑梓智护 心驿耆年"
        date="智慧医养赋能计划"
        scrollToExpand="向下滚动，展开调研故事"
        textBlend
      >
        <div className="max-w-4xl mx-auto text-center text-foreground dark:text-white">
          <p className="text-lg md:text-xl text-foreground/80 dark:text-white/90">
            {site.projectIntro}
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link
              href="#about-section"
              className="px-6 py-3 rounded-full bg-hust text-white hover:bg-hust-dark transition-colors shadow-lg"
            >
              进入项目介绍
            </Link>
            <Link
              href="#timeline"
              className="px-6 py-3 rounded-full border border-foreground/30 text-foreground hover:bg-foreground/10 dark:border-white/60 dark:text-white dark:hover:bg-white/10 transition-colors"
            >
              查看调研线路
            </Link>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
