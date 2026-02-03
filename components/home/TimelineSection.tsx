"use client";

import { useState } from "react";
import Image from "next/image";
import { timelinePhases, timelineModalImages } from "@/lib/data";

const MAP_IMAGE =
  "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop";

export function TimelineSection() {
  const [modal, setModal] = useState<"see" | "start" | null>(null);

  const imgUrl =
    modal === "see"
      ? timelineModalImages.seeHowItWorks
      : modal === "start"
        ? timelineModalImages.getStarted
        : null;

  return (
    <section
      id="timeline"
      className="py-16 md:py-24 px-4 bg-background dark:bg-paper-dark text-foreground"
    >
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          调研时间线
        </h2>
        <p className="text-center text-lg text-foreground/80 mb-12 max-w-2xl mx-auto">
          集中指导、分散调研，成员返乡开展实地调研，开发组同步推进应用原型与产品设计。
        </p>
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            type="button"
            onClick={() => setModal("see")}
            className="px-6 py-3 rounded-lg bg-hust text-white hover:bg-hust-dark transition-colors"
          >
            看如何运作
          </button>
          <button
            type="button"
            onClick={() => setModal("start")}
            className="px-6 py-3 rounded-lg border-2 border-hust text-hust hover:bg-hust/10 transition-colors"
          >
            立即开始
          </button>
        </div>
        <ul className="space-y-6 mb-12">
          {timelinePhases.map((phase) => (
            <li
              key={phase.id}
              className="flex flex-col sm:flex-row sm:items-center gap-2 p-4 rounded-xl bg-paper dark:bg-background border border-ink/10 dark:border-ink-dark/20"
            >
              <span className="font-mono text-sm text-hust shrink-0">
                {phase.date}
              </span>
              <span className="font-semibold">{phase.name}</span>
              <span className="text-foreground/70 text-sm sm:ml-auto">
                {phase.desc}
              </span>
            </li>
          ))}
        </ul>
        <div className="relative w-full aspect-video rounded-xl overflow-hidden bg-ink/5">
          <Image
            src={MAP_IMAGE}
            alt="调研线路示意"
            fill
            className="object-cover"
            unoptimized
          />
        </div>
      </div>
      {imgUrl && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setModal(null)}
          role="dialog"
          aria-modal="true"
          aria-label="查看图片"
        >
          <button
            type="button"
            className="absolute top-4 right-4 text-white text-2xl"
            onClick={() => setModal(null)}
          >
            关闭
          </button>
          <Image
            src={imgUrl}
            alt="说明"
            width={800}
            height={600}
            className="max-w-full max-h-full object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
