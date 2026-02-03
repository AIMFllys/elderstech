"use client";

import Link from "next/link";
import { aboutActivities } from "@/lib/data";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-16 md:py-24 px-4 bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          关于活动
        </h2>
        <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          本次活动背景、目的和意义：深入老龄化健康领域实践调研，探索智慧医养服务新模式。
        </p>
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {aboutActivities.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10 dark:border-ink-dark/20 shadow-sm"
            >
              <h3 className="text-xl font-semibold text-hust mb-2">
                {item.title}
              </h3>
              <p className="text-foreground/80 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/activity"
            className="inline-block px-8 py-3 rounded-lg bg-hust text-white hover:bg-hust-dark transition-colors"
          >
            了解活动详情
          </Link>
        </div>
      </div>
    </section>
  );
}
