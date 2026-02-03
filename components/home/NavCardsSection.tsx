"use client";

import {
  BookOpen,
  Camera,
  Lightbulb,
  Users,
  BarChart3,
} from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";
import { navTimelineIntro, navTimelineItems } from "@/lib/data";

export function NavCardsSection() {
  const iconMap = {
    users: Users,
    bar: BarChart3,
    camera: Camera,
    book: BookOpen,
    light: Lightbulb,
  };

  const navTimelineData = navTimelineItems.map((item) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap],
  }));

  return (
    <section id="nav-cards" className="py-20 bg-black text-white">
      <div className="container mx-auto max-w-4xl text-center mb-8 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">功能导航</h2>
        <p className="text-white/70">{navTimelineIntro}</p>
      </div>
      <RadialOrbitalTimeline timelineData={navTimelineData} />
    </section>
  );
}
