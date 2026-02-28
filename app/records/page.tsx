"use client";

import { InteractiveSelector } from "@/components/ui/interactive-selector";
import Testimonials from "@/components/ui/testimonials-columns-1";
import { Image as ImageIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { FooterSection } from "@/components/home/FooterSection";
import { ThemeToggle } from "@/components/layout/theme-toggle";

export default function RecordsPage() {
  const router = useRouter();

  const bottomOptions = [
    {
      title: "活动纪实",
      description: "成员何佳欢",
      image: encodeURI("/实践成果/日志/何佳欢_8-1.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员何佳欢",
      image: encodeURI("/实践成果/日志/何佳欢_8-2.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员周嘉琪",
      image: encodeURI("/实践成果/日志/周嘉琪_1.png"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员张星睿",
      image: encodeURI("/实践成果/日志/张星睿_3-1.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员张星睿",
      image: encodeURI("/实践成果/日志/张星睿_3-2.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员张星睿",
      image: encodeURI("/实践成果/日志/张星睿_3-3.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员李文龙",
      image: encodeURI("/实践成果/日志/李文龙_4.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员杨佳怡",
      image: encodeURI("/实践成果/日志/杨佳怡_6.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员杨静萱",
      image: encodeURI("/实践成果/日志/杨静萱_7.png"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员罗宇然",
      image: encodeURI("/实践成果/日志/罗宇然_5.png"),
      icon: <ImageIcon size={24} className="text-white" />
    },
    {
      title: "活动纪实",
      description: "成员赵梓舒",
      image: encodeURI("/实践成果/日志/赵梓舒_2.jpg"),
      icon: <ImageIcon size={24} className="text-white" />
    }
  ];

  return (
    <main className="min-h-screen bg-[#222] dark:bg-[#111] relative w-full overflow-hidden">
      <button
        onClick={() => router.back()}
        className="absolute top-6 left-6 z-50 p-2 rounded-full bg-black/30 backdrop-blur-md text-white hover:bg-black/50 transition-colors"
      >
        <ArrowLeft size={24} />
      </button>
      <div className="absolute top-6 right-6 z-50">
        <ThemeToggle />
      </div>

      <Testimonials />

      <div className="pb-20">
        <InteractiveSelector
          title="实践日志合影"
          description="团队走访记录，每一张留影都映出智爱相聚的美好片段"
          options={bottomOptions}
          className="mt-6 border-t border-white/10"
        />
      </div>

      <FooterSection compact />
    </main>
  );
}
