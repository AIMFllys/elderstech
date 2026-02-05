"use client";

import { useEffect, useRef } from "react";
import { motion, useInView, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import type { AboutSectionProps } from "@/components/ui/about/types";
import { ServiceItem } from "@/components/ui/about/ServiceItem";
import { MagnetizeButton } from "@/components/ui/magnetize-button";

export default function AboutUsSection({
  eyebrow,
  title,
  description,
  services,
  imageSrc,
  ctaLabel,
  ctaDescription,
  onCtaClick,
  ctaHref,
  stats,
  statsIntro,
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });
  const isStatsInView = useInView(statsRef, { once: false, amount: 0.3 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 50]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 20]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -20]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about-section"
      ref={sectionRef}
      className="w-full py-24 px-4 text-foreground overflow-hidden relative"
    >
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full bg-[#88734C]/5 blur-3xl"
        style={{ y: y1, rotate: rotate1 }}
      />
      <motion.div
        className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-[#A9BBC8]/5 blur-3xl"
        style={{ y: y2, rotate: rotate2 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/4 w-4 h-4 rounded-full bg-[#88734C]/30"
        animate={{ y: [0, -15, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/3 right-1/4 w-6 h-6 rounded-full bg-[#A9BBC8]/30"
        animate={{ y: [0, 20, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="container mx-auto max-w-6xl relative z-10"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={containerVariants}
      >
        <motion.div className="flex flex-col items-center mb-6" variants={itemVariants}>
          <motion.span
            className="text-hust font-medium mb-2 flex items-center gap-2"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Zap className="w-4 h-4" />
            {eyebrow}
          </motion.span>
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center text-black dark:text-white">
            {title}
          </h2>
          <motion.div
            className="w-24 h-1 bg-[#88734C]"
            initial={{ width: 0 }}
            animate={{ width: 96 }}
            transition={{ duration: 1, delay: 0.5 }}
          ></motion.div>
        </motion.div>

        <motion.p
          className="text-center max-w-2xl mx-auto mb-16 text-black/80 dark:text-white/80"
          variants={itemVariants}
        >
          {description}
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="space-y-16">
            {services
              .filter((service) => service.position === "left")
              .map((service, index) => (
                <ServiceItem
                  key={`left-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  position="left"
                />
              ))}
          </div>

          <div className="flex justify-center items-center order-first md:order-none mb-8 md:mb-0">
            <motion.div
              className="relative w-full max-w-sm aspect-[4/5]"
              variants={itemVariants}
            >
              <motion.div
                className="rounded-md overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img
                  src={imageSrc}
                  alt="调研现场"
                  className="w-full h-full object-cover"
                />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#202e44]/50 to-transparent flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {ctaHref ? (
                    <a
                      href={ctaHref}
                      className="bg-background text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    >
                      {ctaLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <motion.button
                      className="bg-background text-black dark:text-white px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={onCtaClick}
                    >
                      {ctaLabel} <ArrowRight className="w-4 h-4" />
                    </motion.button>
                  )}
                </motion.div>
              </motion.div>
              <motion.div
                className="absolute inset-0 border-4 border-black/20 dark:border-foreground/20 rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              ></motion.div>

              <motion.div
                className="absolute -top-4 -right-8 w-16 h-16 rounded-full bg-[#88734C]/10"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.9 }}
                style={{ y: y1 }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-6 -left-10 w-20 h-20 rounded-full bg-[#A9BBC8]/15"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 1.1 }}
                style={{ y: y2 }}
              ></motion.div>

              <motion.div
                className="absolute -top-10 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-[#88734C]"
                animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              ></motion.div>
              <motion.div
                className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[#A9BBC8]"
                animate={{ y: [0, 10, 0], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 0.5 }}
              ></motion.div>
            </motion.div>
          </div>

          <div className="space-y-16">
            {services
              .filter((service) => service.position === "right")
              .map((service, index) => (
                <ServiceItem
                  key={`right-${index}`}
                  icon={service.icon}
                  secondaryIcon={service.secondaryIcon}
                  title={service.title}
                  description={service.description}
                  variants={itemVariants}
                  delay={index * 0.2}
                  position="right"
                />
              ))}
          </div>
        </div>

        {stats && stats.length > 0 && (
          <motion.div
            ref={statsRef}
            className="mt-24"
            initial="hidden"
            animate={isStatsInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="text-center mb-10">
              <h3 className="text-2xl md:text-3xl font-semibold text-black dark:text-white mb-3">
                调研数据
              </h3>
              {statsIntro && (
                <p className="text-black/70 dark:text-white/70 max-w-2xl mx-auto">
                  {statsIntro}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {stats.map((stat, index) => (
                <StatCard
                  key={`${stat.label}-${index}`}
                  stat={stat}
                  delay={index * 0.08}
                />
              ))}
            </div>
          </motion.div>
        )}

        <motion.div
          className="mt-20 bg-background/70 backdrop-blur-sm border border-ink/10 dark:border-ink-dark/20 text-foreground p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2 text-black dark:text-white">
              {ctaLabel}
            </h3>
            <p className="text-black/80 dark:text-white/80">{ctaDescription}</p>
          </div>
          {ctaHref ? (
            <MagnetizeButton
              icon={ArrowRight}
              type="button"
              onClick={() => {
                window.location.href = ctaHref;
              }}
            >
              进入活动详情
            </MagnetizeButton>
          ) : (
            <MagnetizeButton icon={ArrowRight} onClick={onCtaClick}>
              进入活动详情
            </MagnetizeButton>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}

function StatCard({
  stat,
  delay,
}: {
  stat: {
    label: string;
    value: string;
    suffix?: string;
    desc?: string;
  };
  delay: number;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isCardInView = useInView(cardRef, { once: false, amount: 0.4 });
  const numericValue = Number.parseFloat(stat.value);
  const springValue = useSpring(0, { stiffness: 60, damping: 12 });
  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toString()
  );

  useEffect(() => {
    if (!Number.isFinite(numericValue)) return;
    if (isCardInView) {
      springValue.set(numericValue);
    } else {
      springValue.set(0);
    }
  }, [isCardInView, numericValue, springValue]);

  return (
    <motion.div
      ref={cardRef}
      className="bg-background/70 backdrop-blur-sm border border-ink/10 dark:border-ink-dark/20 p-6 rounded-xl text-center"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, delay } },
      }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
    >
      <div className="text-3xl font-semibold text-black dark:text-white">
        {Number.isFinite(numericValue) ? (
          <motion.span>{displayValue}</motion.span>
        ) : (
          <span>{stat.value}</span>
        )}
        {stat.suffix ? (
          <span className="text-base ml-1 text-black/70 dark:text-white/70">
            {stat.suffix}
          </span>
        ) : null}
      </div>
      <p className="mt-2 text-sm text-black/80 dark:text-white/80">
        {stat.label}
      </p>
      {stat.desc ? (
        <p className="mt-1 text-xs text-black/60 dark:text-white/60">
          {stat.desc}
        </p>
      ) : null}
    </motion.div>
  );
}
