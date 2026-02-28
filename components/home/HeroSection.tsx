"use client";

import { AnimatedMarqueeHero } from "@/components/ui/hero-3";
import { GooeyText } from "@/components/ui/gooey-text-morphing";
import { useRouter } from "next/navigation";

const HERO_IMAGES = [
  "/实践成果/照片 视频/周嘉琪_1-1.jpg",
  "/实践成果/照片 视频/周嘉琪_1-5 地点照片.jpg",
  "/实践成果/照片 视频/罗宇然_5-10 门口.jpg",
  "/实践成果/照片 视频/罗宇然_5-3.jpg",
  "/实践成果/照片 视频/杨静萱_7-1.jpg",
  "/实践成果/照片 视频/杨佳怡_6-1.jpg",
  "/实践成果/照片 视频/李文龙_4-1.jpg",
  "/实践成果/照片 视频/何佳欢_8-1.jpg",
  "/实践成果/照片 视频/赵梓舒_2-1.jpg",
];

export function HeroSection() {
  const router = useRouter();

  return (
    <AnimatedMarqueeHero
      bgImage="/assets/hero/hero-poster.jpg"
      title={
        <div className="relative inline-block z-10 pt-4 pb-6">
          {/* 浅淡通透的水彩蓝色泼墨背景特效 */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] h-[140%] -z-10 pointer-events-none mix-blend-normal opacity-50">
            {/* 核心水蓝色晕染 */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[80%] bg-[#82c8fa] blur-[50px] rounded-full opacity-60 scale-x-125" />
            {/* 底部深蓝色沉淀过渡 */}
            <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-[80%] h-[60%] bg-[#5ba4e5] blur-[40px] rounded-full opacity-50" />
            {/* 顶部青蓝色轻透亮部 */}
            <div className="absolute top-[10%] left-[20%] w-[60%] h-[70%] bg-[#a8e6ff] blur-[60px] rounded-full opacity-60" />
          </div>

          <span className="relative text-transparent bg-clip-text bg-gradient-to-r from-teal-600 via-emerald-500 to-green-600 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)] font-extrabold tracking-wider">
            桑榆智护
            <br />
            心驿耆年
          </span>
        </div>
      }
      tagline="智慧医养赋能计划"
      textAnimationNode={
        <div className="h-[60px] md:h-[80px] w-full flex items-center justify-center">
          <GooeyText
            texts={[
              "探索智慧工具赋能银龄",
              "走进机构、医院与家庭调研",
              "打造「智护银龄」健康导航原型",
              "为中国特色智慧医养建言",
            ]}
            morphTime={1.8}
            cooldownTime={1.0}
            className="font-semibold"
            textClassName="whitespace-nowrap text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)] font-['YouYuan','Yuanti SC','Microsoft YaHei','sans-serif'] text-3xl md:text-4xl lg:text-5xl"
          />
        </div>
      }
      images={HERO_IMAGES}
    />
  );
}
