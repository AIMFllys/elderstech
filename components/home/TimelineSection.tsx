"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatedRoadmap } from "@/components/ui/animated-roadmap";
import { Button } from "@/components/ui/button";
import {
  timelineMilestones,
  timelineModalImages,
  timelineSummary,
  timelineMapImage,
} from "@/lib/data";

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
      <div className="container mx-auto max-w-5xl text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">调研时间线</h2>
        <p className="text-lg text-foreground/80 max-w-2xl mx-auto">
          {timelineSummary}
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <Button size="lg" onClick={() => setModal("start")}>
            立即开始
          </Button>
          <Button size="lg" variant="outline" onClick={() => setModal("see")}>
            看如何运作
          </Button>
        </div>
      </div>
      <AnimatedRoadmap
        milestones={timelineMilestones}
        mapImageSrc={timelineMapImage}
        aria-label="调研路线里程碑"
      />
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
            width={900}
            height={680}
            className="max-w-full max-h-full object-contain"
            unoptimized
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
