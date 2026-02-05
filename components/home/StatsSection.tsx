"use client";

import { motion } from "framer-motion";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Text_03 } from "@/components/ui/wave-text";
import { stats, statsIntro } from "@/lib/data";

const cardColors = [
  ["#3B82F6", "#60A5FA", "#93C5FD"],
  ["#60A5FA", "#34D399", "#93C5FD"],
  ["#F59E0B", "#A78BFA", "#FCD34D"],
  ["#3B82F6", "#A78BFA", "#FBCFE8"],
  ["#EC4899", "#F472B6", "#3B82F6"],
];

function BentoCard({
  title,
  value,
  subtitle,
  colors,
  delay,
}: {
  title: string;
  value: string | number;
  subtitle?: string;
  colors: string[];
  delay: number;
}) {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: delay + 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { duration: 0.5 } },
  };

  return (
    <motion.div
      className="relative overflow-hidden h-full bg-background dark:bg-background/50 text-black dark:text-white"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay }}
    >
      <AnimatedGradient colors={colors} speed={0.05} blur="medium" />
      <motion.div
        className="relative z-10 p-3 sm:p-5 md:p-8 text-foreground backdrop-blur-sm"
        variants={container}
        initial="hidden"
        animate="show"
      >
        <motion.h3
          className="text-sm sm:text-base md:text-lg text-black dark:text-white"
          variants={item}
        >
          {title}
        </motion.h3>
        <motion.div variants={item}>
          <Text_03
            text={String(value)}
            className="text-left text-2xl sm:text-4xl md:text-5xl font-medium mb-4 text-black dark:text-white"
          />
        </motion.div>
        {subtitle && (
          <motion.p
            className="text-sm text-black/80 dark:text-white/80"
            variants={item}
          >
            {subtitle}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
}

export function StatsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="stats"
      className="py-16 md:py-24 px-4 text-foreground"
    >
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            调研数据
          </h2>
          <p className="text-black/80 dark:text-white/80 max-w-2xl mx-auto">
            {statsIntro}
          </p>
        </div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 grow h-full gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, amount: 0.3 }}
        >
          {stats.map((item, i) => {
            const colors = cardColors[i % cardColors.length];
            const spans = ["md:col-span-2", "", "", "md:col-span-2", "md:col-span-3"];
            const value = `${item.value}${item.suffix ?? ""}`;

            return (
              <div key={i} className={spans[i] ?? ""}>
                <BentoCard
                  title={item.label}
                  value={value}
                  subtitle={item.desc}
                  colors={colors}
                  delay={0.2 + i * 0.2}
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
