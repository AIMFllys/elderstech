"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedMarqueeHeroProps {
    tagline?: React.ReactNode;
    title: React.ReactNode;
    description?: React.ReactNode;
    actionButton?: React.ReactNode;
    images: string[];
    className?: string;
    textAnimationNode?: React.ReactNode;
    bgImage?: string;
}

export const AnimatedMarqueeHero: React.FC<AnimatedMarqueeHeroProps> = ({
    tagline,
    title,
    description,
    actionButton,
    images,
    className,
    textAnimationNode,
    bgImage
}) => {
    // Animation variants for the text content
    const FADE_IN_ANIMATION_VARIANTS = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 100, damping: 20 } },
    };

    // Duplicate images for a seamless loop
    const duplicatedImages = [...images, ...images];

    return (
        <section
            className={cn(
                "relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-between text-center",
                className
            )}
        >
            {/* Background Image Setup */}
            {bgImage ? (
                <>
                    <div
                        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                        style={{ backgroundImage: `url(${bgImage})` }}
                    />
                    {/* Light airy overlay to ensure it's not depressing */}
                    <div className="absolute inset-0 z-0 bg-white/10" />
                    {/* Bottom gradient to blend into page background */}
                    <div className="absolute inset-x-0 bottom-0 h-1/2 z-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                </>
            ) : (
                <div className="absolute inset-0 z-0 bg-background" />
            )}

            {/* Top Main Content Section */}
            <div className="z-10 flex flex-col items-center justify-center w-full pt-20 md:pt-28 gap-6 px-4">
                {/* Tagline Badge */}
                {tagline && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        className="inline-block rounded-full border border-white/40 bg-white/60 px-5 py-2 text-sm md:text-base font-bold text-teal-800 shadow-sm backdrop-blur-md tracking-wide"
                    >
                        {tagline}
                    </motion.div>
                )}

                {/* Main Title */}
                <motion.h1
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: {},
                        show: {
                            transition: {
                                staggerChildren: 0.1,
                            },
                        },
                    }}
                    className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-foreground drop-shadow-sm"
                >
                    {typeof title === 'string' ? (
                        title.split(" ").map((word, i) => (
                            <motion.span
                                key={i}
                                variants={FADE_IN_ANIMATION_VARIANTS}
                                className="inline-block"
                            >
                                {word}&nbsp;
                            </motion.span>
                        ))
                    ) : (
                        title
                    )}
                </motion.h1>

                {/* Optional Description */}
                {description && (
                    <motion.p
                        initial="hidden"
                        animate="show"
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        transition={{ delay: 0.3 }}
                        className="max-w-2xl text-base md:text-xl text-muted-foreground mt-2"
                    >
                        {description}
                    </motion.p>
                )}

                {/* Call to Action Button */}
                {actionButton && (
                    <motion.div
                        initial="hidden"
                        animate="show"
                        variants={FADE_IN_ANIMATION_VARIANTS}
                        transition={{ delay: 0.4 }}
                        className="mt-6"
                    >
                        {actionButton}
                    </motion.div>
                )}
            </div>

            {/* Bottom Section (Text Animation + Marquee) */}
            <div className="absolute inset-x-0 bottom-0 z-10 w-full flex flex-col items-center justify-end pb-8">
                {/* Text Animation Node right above Marquee */}
                {textAnimationNode && (
                    <div className="w-full flex items-center justify-center mb-6 md:mb-10 pointer-events-none drop-shadow-md">
                        {textAnimationNode}
                    </div>
                )}

                {/* Animated Image Marquee */}
                <div className="relative w-full h-[30vh] md:h-[35vh] lg:h-[40vh] [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)]">
                    <motion.div
                        className="flex gap-4 items-center"
                        animate={{
                            x: ["-100%", "0%"],
                            transition: {
                                ease: "linear",
                                duration: 50,
                                repeat: Infinity,
                            },
                        }}
                    >
                        {duplicatedImages.map((src, index) => (
                            <div
                                key={index}
                                className="relative aspect-[3/4] h-48 md:h-64 lg:h-72 flex-shrink-0"
                                style={{
                                    rotate: `${(index % 2 === 0 ? -2 : 5)}deg`,
                                }}
                            >
                                <img
                                    src={src}
                                    alt={`Hero show ${index}`}
                                    className="w-full h-full object-cover rounded-2xl shadow-lg border border-border/40"
                                    loading="lazy"
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
