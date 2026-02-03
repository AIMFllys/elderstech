"use client";

import { stats } from "@/lib/data";

export function StatsSection() {
  return (
    <section
      id="stats"
      className="py-16 md:py-24 px-4 bg-background dark:bg-paper-dark text-foreground"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          调研数据
        </h2>
        <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          上一届实践基础：走访多地机构，完成问卷与访谈，形成报告与建议。
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {stats.map((item, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-paper dark:bg-background border border-ink/10 dark:border-ink-dark/20 text-center"
            >
              <div className="text-2xl md:text-3xl font-bold text-hust">
                {item.value}
                <span className="text-lg">{item.suffix}</span>
              </div>
              <div className="text-sm font-medium mt-1">{item.label}</div>
              <div className="text-xs text-foreground/60 mt-1">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
