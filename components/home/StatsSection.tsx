"use client";

import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { stats, statsIntro } from "@/lib/data";

const cardColors = [
  ["#B8860B", "#E6C875", "#F6E5B6"],
  ["#E1B84A", "#A0895C", "#F3E6CC"],
  ["#7A5E3A", "#B89B70", "#F3E6CC"],
  ["#C99C49", "#F1D79C", "#8A6B3F"],
  ["#A66B2A", "#E4B87A", "#F7E1B5"],
];

export function StatsSection() {
  return (
    <section
      id="stats"
      className="py-16 md:py-24 px-4 bg-background dark:bg-paper-dark text-foreground"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">调研数据</h2>
          <p className="text-foreground/80 max-w-2xl mx-auto">{statsIntro}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className={`relative overflow-hidden h-full rounded-2xl border border-ink/10 dark:border-ink-dark/20 bg-background/70 backdrop-blur-sm ${
                i === 0 || i === 3 ? "md:col-span-2" : ""
              }`}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <AnimatedGradient
                colors={cardColors[i % cardColors.length]}
                speed={0.06}
                blur="medium"
              />
              <div className="relative z-10 p-6 md:p-8 text-foreground">
                <h3 className="text-sm md:text-base text-foreground/80">
                  {item.label}
                </h3>
                <p className="text-3xl md:text-4xl font-semibold mb-2 text-foreground">
                  {item.value}
                  <span className="text-base ml-1">{item.suffix}</span>
                </p>
                <p className="text-sm text-foreground/70">{item.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
