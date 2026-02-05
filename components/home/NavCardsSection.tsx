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

  const pastelPalette = [
    "#A5D8FF",
    "#C3FAE8",
    "#FFE3E3",
    "#FFF3BF",
    "#EAD5FF",
  ];

  const navTimelineData = navTimelineItems.map((item, index) => ({
    ...item,
    icon: iconMap[item.icon as keyof typeof iconMap],
    color: pastelPalette[index % pastelPalette.length],
  }));

  return (
    <section id="nav-cards" className="py-16 text-foreground">
      <div className="container mx-auto max-w-4xl text-center mb-4 px-4">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
          功能导航
        </h2>
        <p className="text-black/70 dark:text-white/70">
          {navTimelineIntro}
        </p>
      </div>
      <RadialOrbitalTimeline timelineData={navTimelineData} />
    </section>
  );
}
