"use client";

import { useState } from "react";
import Image from "next/image";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { FeatureCarousel, type ImageSet, type Step } from "@/components/ui/animated/animated-feature-carousel";
import { Typewriter } from "@/components/ui/typewriter";
import { Text_03 } from "@/components/ui/wave-text";
import { timelineModalImages } from "@/lib/data";
import { Eye, Rocket } from "lucide-react";

const steps: Step[] = [
  {
    id: "1",
    name: "第 1 步",
    title: "准备启动（1.25-1.27）",
    description:
      "组内分工、制定访谈提纲，明确走访点位（养老机构、医院老年科室等），为调研全面铺开做准备。",
  },
  {
    id: "2",
    name: "第 2 步",
    title: "分散调研与同步开发（1.27-2.17）",
    description:
      "成员返乡实地走访与访谈，开发组同步推进「智护银龄」轻应用原型与产品设计。",
  },
  {
    id: "3",
    name: "第 3 步",
    title: "集中分析（2.17-2.20）",
    description:
      "汇总调研数据与案例，梳理典型问题与需求，完成阶段性分析与报告撰写。",
  },
  {
    id: "4",
    name: "第 4 步",
    title: "成果总结（2.21-2.22）",
    description:
      "完成报告统稿、润色排版，完善应用原型与成果展示，形成可落地的智慧医养方案建议。",
  },
];

const images: ImageSet = {
  alt: "调研过程展示",
  step1img1: "/assets/timeline/step1-img1.jpg",
  step1img2: "/assets/timeline/step1-img2.jpg",
  step2img1: "/assets/timeline/step2-img1.jpg",
  step2img2: "/assets/timeline/step2-img2.jpg",
  step3img: "/assets/timeline/step3-img.jpg",
  step4img: "/assets/timeline/step4-img.jpg",
};

export function TimelineSection() {
  const [modal, setModal] = useState<"see" | "start" | null>(null);

  const imgUrl =
    modal === "see"
      ? timelineModalImages.seeHowItWorks
      : modal === "start"
        ? timelineModalImages.getStarted
        : null;

  return (
    <section id="timeline" className="py-16 md:py-24 px-4 text-foreground">
      <div className="container mx-auto max-w-5xl text-center mb-10">
        <h2 className="text-4xl md:text-5xl font-bold mb-3 text-black dark:text-white">
          <Text_03 text="- 调研思路 -" className="text-black dark:text-white" />
        </h2>
        <p className="text-base md:text-lg text-black/70 dark:text-white/70">
          <Typewriter
            text={steps.map((step) => step.title)}
            speed={70}
            waitTime={1400}
            deleteSpeed={40}
            cursorChar="_"
            className="text-black dark:text-white"
          />
        </p>
      </div>

      <FeatureCarousel
        image={images}
        steps={steps}
        renderStepActions={(stepIndex) =>
          stepIndex === 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <MagnetizeButton icon={Rocket} onClick={() => setModal("start")}>
                立即开始
              </MagnetizeButton>
              <MagnetizeButton icon={Eye} onClick={() => setModal("see")}>
                看如何运作
              </MagnetizeButton>
            </div>
          ) : null
        }
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
