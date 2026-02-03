"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap } from "lucide-react";
import type { AboutSectionProps } from "@/components/ui/about/types";
import { ServiceItem } from "@/components/ui/about/ServiceItem";

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
}: AboutSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: false, amount: 0.1 });

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
          <h2 className="text-4xl md:text-5xl font-light mb-4 text-center">
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
          className="text-center max-w-2xl mx-auto mb-16 text-foreground/80"
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
            <motion.div className="relative w-full max-w-xs" variants={itemVariants}>
              <motion.div
                className="rounded-md overflow-hidden shadow-xl"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                whileHover={{ scale: 1.03, transition: { duration: 0.3 } }}
              >
                <img src={imageSrc} alt="调研现场" className="w-full h-full object-cover" />
                <motion.div
                  className="absolute inset-0 bg-gradient-to-t from-[#202e44]/50 to-transparent flex items-end justify-center p-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.8, delay: 0.9 }}
                >
                  {ctaHref ? (
                    <a
                      href={ctaHref}
                      className="bg-background text-foreground px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
                    >
                      {ctaLabel} <ArrowRight className="w-4 h-4" />
                    </a>
                  ) : (
                    <motion.button
                      className="bg-background text-foreground px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium"
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
                className="absolute inset-0 border-4 border-foreground/20 rounded-md -m-3 z-[-1]"
                initial={{ opacity: 0, scale: 1.1 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
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

        <motion.div
          className="mt-20 bg-background/70 backdrop-blur-sm border border-ink/10 dark:border-ink-dark/20 text-foreground p-8 rounded-xl flex flex-col md:flex-row items-center justify-between gap-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <div className="flex-1">
            <h3 className="text-2xl font-medium mb-2">{ctaLabel}</h3>
            <p className="text-foreground/80">{ctaDescription}</p>
          </div>
          {ctaHref ? (
            <a
              href={ctaHref}
              className="bg-hust hover:bg-hust-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
            >
              进入活动详情 <ArrowRight className="w-4 h-4" />
            </a>
          ) : (
            <motion.button
              className="bg-hust hover:bg-hust-dark text-white px-6 py-3 rounded-lg flex items-center gap-2 font-medium transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onCtaClick}
            >
              进入活动详情 <ArrowRight className="w-4 h-4" />
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </section>
  );
}
