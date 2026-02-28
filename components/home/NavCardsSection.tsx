"use client";

import { FocusRail, type FocusRailItem } from "@/components/ui/focus-rail";
import { navTimelineIntro, navTimelineItems } from "@/lib/data";

const imageUrls = [
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?q=80&w=1000&auto=format&fit=crop", // Team
  "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?q=80&w=1000&auto=format&fit=crop", // Activity (was Results)
  "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?q=80&w=1000&auto=format&fit=crop", // Gallery
  "https://images.unsplash.com/photo-1517842645767-c639042777db?q=80&w=1000&auto=format&fit=crop", // Records
  "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?q=80&w=1000&auto=format&fit=crop", // Reflection
];

const titleHrefMap: Record<string, string> = {
  "团队": "/team",
  "活动": "/activity",
  "剪影": "/gallery",
  "记录": "/records",
  "反思": "/reflection",
};

export function NavCardsSection() {
  const focusRailItems: FocusRailItem[] = navTimelineItems.map((item, index) => ({
    id: item.id,
    title: item.title,
    description: item.content,
    meta: item.date,
    imageSrc: imageUrls[index % imageUrls.length],
    href: titleHrefMap[item.title],
  }));

  return (
    <section id="nav-cards" className="w-full py-20 flex flex-col items-center justify-center">
      {/* Title */}
      <div className="mb-12 text-center px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          功能导航
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          {navTimelineIntro}
        </p>
      </div>

      {/* The Component */}
      <FocusRail
        items={focusRailItems}
        autoPlay={false}
        loop={true}
      />
    </section>
  );
}

