"use client";

import type { ReactNode } from "react";
import { CheckCircle, Sparkles, Star } from "lucide-react";
import AboutUsSection from "@/components/ui/about-us-section";
import {
  aboutIntro,
  aboutServiceItems,
  aboutImage,
  aboutCta,
} from "@/lib/data";
import { stats, statsIntro } from "@/lib/data";

const iconMap: Record<string, ReactNode> = {
  survey: <Sparkles className="w-6 h-6" />,
  case: <CheckCircle className="w-6 h-6" />,
  prototype: <Star className="w-6 h-6" />,
  analysis: <Sparkles className="w-6 h-6" />,
  proposal: <CheckCircle className="w-6 h-6" />,
  impact: <Star className="w-6 h-6" />,
};

export function AboutSection() {
  const services = aboutServiceItems.map((item) => ({
    icon: iconMap[item.icon],
    secondaryIcon: (
      <Sparkles className="w-4 h-4 absolute -top-1 -right-1 text-[#A9BBC8]" />
    ),
    title: item.title,
    description: item.description,
    position: item.position as "left" | "right",
  }));

  return (
    <AboutUsSection
      eyebrow="调研背景与行动路径"
      title="关于活动"
      description={aboutIntro}
      services={services}
      imageSrc={aboutImage}
      ctaLabel={aboutCta.title}
      ctaDescription={aboutCta.description}
      ctaHref="/activity"
      stats={stats}
      statsIntro={statsIntro}
    />
  );
}
