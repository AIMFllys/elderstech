"use client";

import ScrollExpandMedia from "@/components/ui/scroll-expansion-hero";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { useRouter } from "next/navigation";

const HERO_MEDIA =
  "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYuZ5R8ahEEZ4aQK56LizRdfBSqeDMsmUIrJN1";
const HERO_POSTER =
  "https://images.pexels.com/videos/5752729/space-earth-universe-cosmos-5752729.jpeg";
const HERO_BG =
  "https://me7aitdbxq.ufs.sh/f/2wsMIGDMQRdYMNjMlBUYHaeYpxduXPVNwf8mnFA61L7rkcoS";

export function HeroSection() {
  const router = useRouter();

  return (
    <section className="relative">
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={HERO_MEDIA}
        posterSrc={HERO_POSTER}
        bgImageSrc={HERO_BG}
        title="桑榆智护 心陪耆年"
        titleLines={["桑榆智护", "心陪耆年"]}
        titleOffsetVw={[-6, 3]}
        date="智慧医养赋能计划"
        scrollToExpand="向下滚动，展开调研故事"
        textBlend
      >
        <div className="max-w-4xl mx-auto text-center text-foreground dark:text-white">
          <div className="h-[80px] md:h-[110px] w-full flex items-center justify-center">
            <GooeyText
              texts={[
                "探索智慧工具赋能银龄",
                "走进机构、医院与家庭调研",
                "打造「智护银龄」健康导航原型",
                "为中国特色智慧医养建言",
              ]}
              morphTime={1}
              cooldownTime={0.7}
              className="font-semibold"
              textClassName="whitespace-nowrap text-[#201408] drop-shadow-[0_2px_10px_rgba(184,134,11,0.45)] dark:text-white dark:drop-shadow-none font-['YouYuan','Yuanti SC','Microsoft YaHei','sans-serif']"
            />
          </div>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <MagnetizeButton onClick={() => router.push("#about-section")}>
              进入项目介绍
            </MagnetizeButton>
            <MagnetizeButton onClick={() => router.push("#timeline")}>
              查看调研线路
            </MagnetizeButton>
          </div>
        </div>
      </ScrollExpandMedia>
    </section>
  );
}
