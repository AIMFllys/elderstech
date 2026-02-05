"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

export function AppDownloadSection() {
  return (
    <section id="app-download" className="py-12 md:py-16 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="rounded-3xl border border-ink/10 dark:border-ink-dark/20 bg-background/80 dark:bg-background/60 backdrop-blur-sm p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-black/50 dark:text-white/60">
                APP 下载
              </p>
              <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mt-2">
                智护银龄轻应用
              </h3>
              <p className="text-sm md:text-base text-black/70 dark:text-white/70 mt-2 max-w-2xl">
                支持用药提醒、健康导航与适老化图标包，面向老年群体优化操作路径。
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link href="/app-download">
                <MagnetizeButton icon={ArrowRight}>查看详情</MagnetizeButton>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}