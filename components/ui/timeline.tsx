"use client";
import {
    useScroll,
    useTransform,
    motion,
} from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
    title: string;
    subtitle?: string;
    content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
    const ref = useRef<HTMLDivElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        if (ref.current) {
            const rect = ref.current.getBoundingClientRect();
            setHeight(rect.height);
        }
    }, [ref]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 10%", "end 50%"],
    });

    const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
    const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

    return (
        <div
            className="w-full bg-white/0 dark:bg-neutral-950/0 font-sans md:px-10"
            ref={containerRef}
        >
            <div className="max-w-7xl mx-auto py-20 px-4 md:px-8 lg:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="max-w-3xl"
                >
                    <div className="inline-flex items-center gap-2 mb-6 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 border border-blue-100/50 dark:border-blue-800/50 text-blue-600 dark:text-blue-400 text-xs font-bold tracking-widest uppercase shadow-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 dark:bg-blue-400 animate-pulse"></span>
                        Records & Journey
                    </div>
                    <h2 className="text-4xl md:text-6xl lg:text-7xl font-extrabold mb-6 tracking-tight text-transparent bg-clip-text bg-gradient-to-br from-neutral-900 via-neutral-700 to-neutral-400 dark:from-white dark:via-neutral-200 dark:to-neutral-500 pb-2">
                        项目实践历程
                    </h2>
                    <p className="text-neutral-600 dark:text-neutral-400 text-base md:text-xl max-w-2xl leading-relaxed font-medium">
                        这是我们围绕智慧医养探索与老年群体需求调研的历程记录。
                    </p>
                </motion.div>
            </div>

            <div ref={ref} className="relative max-w-7xl mx-auto pb-20">
                {data.map((item, index) => (
                    <div
                        key={index}
                        className="flex justify-start pt-10 md:pt-40 md:gap-10"
                    >
                        <div className="sticky flex flex-col z-40 items-start top-40 self-start max-w-xs lg:max-w-sm md:w-full md:pl-20">
                            <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black flex items-center justify-center">
                                <div className="h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700 p-2" />
                            </div>
                            <h3 className="hidden md:block text-xl md:text-5xl font-bold text-neutral-500 dark:text-neutral-500 ">
                                {item.title}
                            </h3>
                            {item.subtitle && (
                                <p className="hidden md:block mt-2 text-sm md:text-base text-neutral-400 dark:text-neutral-400 font-medium whitespace-pre-wrap">
                                    {item.subtitle}
                                </p>
                            )}
                        </div>

                        <div className="relative pl-20 pr-4 md:pl-4 w-full">
                            <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-500">
                                {item.title}
                            </h3>
                            {item.content}{" "}
                        </div>
                    </div>
                ))}
                <div
                    style={{
                        height: height + "px",
                    }}
                    className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-neutral-200 dark:via-neutral-700 to-transparent to-[99%]  [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
                >
                    <motion.div
                        style={{
                            height: heightTransform,
                            opacity: opacityTransform,
                        }}
                        className="absolute inset-x-0 top-0  w-[2px] bg-gradient-to-t from-purple-500 via-blue-500 to-transparent from-[0%] via-[10%] rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};
