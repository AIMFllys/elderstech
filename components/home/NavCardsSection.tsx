"use client";

import Link from "next/link";
import { navCards } from "@/lib/data";

const icons: Record<string, string> = {
  team: "👥",
  results: "📊",
  gallery: "📷",
  records: "📝",
  reflection: "💭",
};

export function NavCardsSection() {
  return (
    <section
      id="nav-cards"
      className="py-16 md:py-24 px-4 bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          功能导航
        </h2>
        <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          团队成员、调研成果、影像剪影、手抄报记录与反思感悟。
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {navCards.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="block p-6 rounded-xl bg-background dark:bg-background border border-ink/10 dark:border-ink-dark/20 shadow-sm hover:shadow-md hover:border-hust/30 transition-all"
            >
              <span className="text-3xl block mb-3">{icons[card.icon] ?? "•"}</span>
              <h3 className="text-xl font-semibold text-hust">{card.title}</h3>
              <p className="text-sm text-foreground/70 mt-1">{card.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
