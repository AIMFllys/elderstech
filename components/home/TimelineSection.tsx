"use client";

import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FeatureCarousel, type ImageSet, type Step } from "@/components/ui/animated-feature-carousel";
import { timelineModalImages } from "@/lib/data";

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
  step1img1:
    "https://images.unsplash.com/photo-1517048676732-d65bc937f952?q=80&w=1740&auto=format&fit=crop",
  step1img2:
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=1740&auto=format&fit=crop",
  step2img1:
    "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?q=80&w=1661&auto=format&fit=crop",
  step2img2:
    "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1674&auto=format&fit=crop",
  step3img:
    "https://images.unsplash.com/photo-1556761175-4b46a572b786?q=80&w=1740&auto=format&fit=crop",
  step4img:
    "https://images.unsplash.com/photo-1487014679447-9f8336841d58?q=80&w=1742&auto=format&fit=crop",
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
        <h2 className="text-3xl md:text-4xl font-bold mb-4">调研思路</h2>
      </div>

      <FeatureCarousel
        image={images}
        steps={steps}
        renderStepActions={(stepIndex) =>
          stepIndex === 0 ? (
            <div className="mt-6 flex flex-wrap gap-3">
              <Button size="lg" onClick={() => setModal("start")}>立即开始</Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => setModal("see")}
              >
                看如何运作
              </Button>
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
