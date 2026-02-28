import { BackLink } from "@/components/layout/back-link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { activitySections } from "@/lib/data";
import { Timeline } from "@/components/ui/timeline";
import { Activity, HeartPulse, ShieldCheck, Map } from "lucide-react";
import { FooterSection } from "@/components/home/FooterSection";

import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function ActivityPage() {
  const imagesForSections = [
    [
      "/实践成果/照片%20视频/杨佳怡_6-1.jpg",
      "/实践成果/照片%20视频/杨佳怡_6-4.jpg",
      "/实践成果/照片%20视频/杨佳怡_6-5.jpg"
    ],
    [
      "/实践成果/照片%20视频/赵梓舒_2-1.jpg",
      "/实践成果/照片%20视频/赵梓舒_2-2.jpg",
      "/实践成果/照片%20视频/赵梓舒_2-3.jpg",
    ],
    [
      "/实践成果/照片%20视频/罗宇然_5-4%20地点.jpg",
      "/实践成果/照片%20视频/罗宇然_5-10%20门口.jpg",
      "/实践成果/照片%20视频/罗宇然_5-6.jpg"
    ],
    [
      "/实践成果/照片%20视频/杨静萱_7-1.jpg",
      "/实践成果/照片%20视频/杨静萱_7-2.jpg"
    ],
    [
      // 丁文轩没图片，所以留空或者用默认图
      "/实践成果/照片%20视频/周嘉琪_1-1.jpg",
      "/实践成果/照片%20视频/周嘉琪_1-5%20地点照片.jpg",
    ],
    [
      "/实践成果/照片%20视频/张星睿_3-1.jpg",
      "/实践成果/照片%20视频/张星睿_3-4%20老年人照片.jpg",
      "/实践成果/照片%20视频/张星睿_3-5%20老年人照片.jpg"
    ],
    [
      "/实践成果/照片%20视频/李文龙_4-1.jpg",
      "/实践成果/照片%20视频/周嘉琪_1-6%20医院门口照片.jpg"
    ]
  ];

  const iconsForSections = [
    <Activity key="1" className="w-4 h-4 text-rose-500 shrink-0" />,
    <HeartPulse key="2" className="w-4 h-4 text-blue-500 shrink-0" />,
    <Map key="3" className="w-4 h-4 text-orange-500 shrink-0" />,
    <ShieldCheck key="4" className="w-4 h-4 text-green-500 shrink-0" />,
    <Activity key="5" className="w-4 h-4 text-indigo-500 shrink-0" />,
    <HeartPulse key="6" className="w-4 h-4 text-pink-500 shrink-0" />,
    <Map key="7" className="w-4 h-4 text-cyan-500 shrink-0" />
  ];

  const data = activitySections.map((item, i) => ({
    title: item.title,
    subtitle: item.subtitle,
    content: (
      <div key={i}>
        <div className="text-neutral-800 dark:text-neutral-200 text-sm md:text-base font-normal mb-8 p-4 rounded-xl bg-white/50 dark:bg-black/20 border border-neutral-200 dark:border-neutral-800 group relative">
          <div className="flex items-start gap-4">
            <div className="mt-1">{iconsForSections[i]}</div>
            <p className="leading-relaxed flex-1">
              {item.desc}
            </p>
          </div>
          {item.link && (
            <div className="mt-4 flex justify-end">
              <Link
                href={`/reports?file=${encodeURIComponent(item.link)}`}
                className="inline-flex items-center gap-2 text-sm text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                查看完整报告 <ExternalLink className="w-4 h-4" />
              </Link>
            </div>
          )}
        </div>
        <div className="grid grid-cols-2 gap-4">
          {imagesForSections[i]?.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`${item.title} image ${idx + 1}`}
              width={500}
              height={500}
              className="rounded-lg object-cover h-24 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          ))}
        </div>
      </div>
    )
  }));

  return (
    <AuroraBackground
      className="items-stretch justify-start text-foreground min-h-screen h-auto"
      showRadialGradient={false}
    >
      <main className="py-12 px-4 w-full">
        <div className="container mx-auto max-w-7xl z-50 relative pointer-events-auto">
          <BackLink />
        </div>
        <div className="z-10 relative pointer-events-auto">
          <Timeline data={data} />
        </div>
      </main>
      <div className="z-50 relative pointer-events-auto w-full">
        <FooterSection compact />
      </div>
    </AuroraBackground>
  );
}
