"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion, AnimatePresence } from "framer-motion";
import {
    X,
    ExternalLink,
    ShieldAlert,
    BookOpen,
    Quote,
    FileText,
    ArrowUp,
    List,
    ChevronRight,
} from "lucide-react";

/* ──────────────────────────────────────────────── */
/*  Types                                           */
/* ──────────────────────────────────────────────── */
import { SpotlightCard } from "@/components/ui/spotlight-card";
import { Chart1, Chart2, Chart3 } from "./AnimatedCharts";

interface OutlineItem {
    level: number;
    text: string;
    id: string;
}

interface ReportViewerProps {
    overviewText: string;
    title: string;
    authors: string;
    abstract: string;
    keywords: string;
    mainBody: string;
    references: Record<string, string>;
    outline: OutlineItem[];
}

/* ──────────────────────────────────────────────── */
/*  Component                                       */
/* ──────────────────────────────────────────────── */
export default function ReportViewer({
    overviewText,
    title,
    authors,
    abstract,
    keywords,
    mainBody,
    references,
    outline,
}: ReportViewerProps) {
    const [activeCite, setActiveCite] = useState<string | null>(null);
    const [showScrollTop, setShowScrollTop] = useState(false);
    const [activeHeadingId, setActiveHeadingId] = useState<string>("");
    const [tocOpen, setTocOpen] = useState(false);
    const articleRef = useRef<HTMLDivElement>(null);

    /* Track which heading index we are rendering */
    const headingCounterRef = useRef(0);

    // Escape to close
    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                setActiveCite(null);
                setTocOpen(false);
            }
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    // Scroll-to-top tracker + active heading tracker via IntersectionObserver
    useEffect(() => {
        const onScroll = () => setShowScrollTop(window.scrollY > 600);
        window.addEventListener("scroll", onScroll, { passive: true });

        // IntersectionObserver to track which heading is currently in view
        const headingEls = document.querySelectorAll("[data-heading-id]");
        if (headingEls.length === 0) {
            return () => window.removeEventListener("scroll", onScroll);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                // find the topmost visible heading
                const visible = entries
                    .filter((e) => e.isIntersecting)
                    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
                if (visible.length > 0) {
                    const el = visible[0].target as HTMLElement;
                    setActiveHeadingId(el.getAttribute("data-heading-id") || "");
                }
            },
            { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 }
        );

        headingEls.forEach((el) => observer.observe(el));

        return () => {
            window.removeEventListener("scroll", onScroll);
            observer.disconnect();
        };
    }, [mainBody]);

    const scrollToTop = useCallback(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

    const scrollToHeading = useCallback((id: string) => {
        const el = document.querySelector(`[data-heading-id="${id}"]`);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 100;
            window.scrollTo({ top: y, behavior: "smooth" });
        }
        setTocOpen(false);
    }, []);

    const scrollToReference = useCallback((citeId: string) => {
        const el = document.getElementById(`ref-${citeId}`);
        if (el) {
            const y = el.getBoundingClientRect().top + window.scrollY - 120;
            window.scrollTo({ top: y, behavior: "smooth" });
            // Flash highlight effect
            el.classList.add("ref-highlight");
            setTimeout(() => el.classList.remove("ref-highlight"), 2000);
        }
    }, []);

    /* Sorted reference keys */
    const refKeys = Object.keys(references).sort(
        (a, b) => Number(a) - Number(b)
    );

    // Reset heading counter every render
    headingCounterRef.current = 0;

    return (
        <div className="report-root relative min-h-screen bg-[#FAFBFD] dark:bg-[#0a0f1c] transition-colors duration-500 selection:bg-blue-600/20 dark:selection:bg-blue-400/20">
            {/* ===== OUTLINE TOC STYLES ===== */}
            <style
                dangerouslySetInnerHTML={{
                    __html: `
                        /* Reference flash highlight animation */
                        @keyframes refFlash {
                            0% { background-color: rgba(59,130,246,0.15); }
                            100% { background-color: transparent; }
                        }
                        .ref-highlight {
                            animation: refFlash 2s ease-out;
                            border-radius: 0.75rem;
                        }
                        /* TOC scrollbar */
                        .toc-scroll::-webkit-scrollbar { width: 3px; }
                        .toc-scroll::-webkit-scrollbar-track { background: transparent; }
                        .toc-scroll::-webkit-scrollbar-thumb { background: rgba(148,163,184,0.3); border-radius: 3px; }
                        .toc-scroll::-webkit-scrollbar-thumb:hover { background: rgba(148,163,184,0.5); }
                        /* Active TOC item indicator */
                        .toc-item-active {
                            color: rgb(37, 99, 235) !important;
                            font-weight: 600 !important;
                        }
                        .dark .toc-item-active {
                            color: rgb(96, 165, 250) !important;
                        }
                    `,
                }}
            />

            {/* ===== DESKTOP TOC (right sidebar, sticky) ===== */}
            <aside className="hidden xl:block fixed right-0 top-0 bottom-0 w-[280px] z-40 pointer-events-none">
                <div className="pointer-events-auto h-full pt-32 pb-12 pr-6 pl-2">
                    <nav className="h-full flex flex-col">
                        <div className="flex items-center gap-2 mb-4 pl-4">
                            <List size={15} className="text-slate-400 dark:text-slate-500" />
                            <span className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500">
                                大纲导航
                            </span>
                        </div>
                        <div className="flex-1 overflow-y-auto toc-scroll pr-1">
                            <ul className="space-y-0.5 pl-1">
                                {outline.map((item) => (
                                    <li key={item.id}>
                                        <button
                                            onClick={() => scrollToHeading(item.id)}
                                            className={`
                                                w-full text-left py-1.5 rounded-lg transition-all duration-200 text-[13px] leading-snug
                                                hover:bg-slate-100 dark:hover:bg-white/[0.04]
                                                ${item.level === 1
                                                    ? "pl-4 pr-2 font-semibold text-slate-700 dark:text-slate-300"
                                                    : item.level === 2
                                                        ? "pl-7 pr-2 text-slate-500 dark:text-slate-400"
                                                        : "pl-10 pr-2 text-slate-400 dark:text-slate-500 text-[12px]"
                                                }
                                                ${activeHeadingId === item.id ? "toc-item-active !bg-blue-50/80 dark:!bg-blue-900/20" : ""}
                                            `}
                                        >
                                            {activeHeadingId === item.id && (
                                                <span className="inline-block w-1.5 h-1.5 rounded-full bg-blue-500 mr-2 align-middle" />
                                            )}
                                            {item.text}
                                        </button>
                                    </li>
                                ))}
                                {/* Reference entry */}
                                <li>
                                    <button
                                        onClick={() => {
                                            const el = document.getElementById("references-section");
                                            if (el) {
                                                const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                                window.scrollTo({ top: y, behavior: "smooth" });
                                            }
                                        }}
                                        className={`
                                            w-full text-left py-1.5 pl-4 pr-2 rounded-lg transition-all duration-200 text-[13px] leading-snug
                                            font-semibold text-slate-700 dark:text-slate-300
                                            hover:bg-slate-100 dark:hover:bg-white/[0.04]
                                        `}
                                    >
                                        参考文献
                                    </button>
                                </li>
                            </ul>
                        </div>
                        {/* Progress indicator line */}
                        <div className="mt-3 pl-4">
                            <div className="h-px w-full bg-gradient-to-r from-slate-200 dark:from-slate-700 to-transparent" />
                            <p className="text-[11px] text-slate-400 dark:text-slate-600 mt-2">
                                共 {outline.length} 个章节
                            </p>
                        </div>
                    </nav>
                </div>
            </aside>

            {/* ===== MOBILE TOC FAB ===== */}
            <div className="xl:hidden fixed bottom-24 right-6 z-50">
                <button
                    onClick={() => setTocOpen(!tocOpen)}
                    className="w-12 h-12 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
                        shadow-xl text-slate-600 dark:text-slate-400
                        hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600
                        flex items-center justify-center transition-colors"
                >
                    <List size={20} />
                </button>
            </div>

            {/* ===== MOBILE TOC DRAWER ===== */}
            <AnimatePresence>
                {tocOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="xl:hidden fixed inset-0 z-[150] flex items-end justify-center"
                    >
                        <motion.div
                            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                            onClick={() => setTocOpen(false)}
                        />
                        <motion.div
                            initial={{ y: "100%" }}
                            animate={{ y: 0 }}
                            exit={{ y: "100%" }}
                            transition={{ type: "spring", stiffness: 400, damping: 34 }}
                            className="relative w-full max-w-lg max-h-[70vh] rounded-t-3xl bg-white dark:bg-[#141928] border-t border-slate-200/80 dark:border-white/[0.08] shadow-2xl overflow-hidden"
                        >
                            <div className="flex items-center justify-between p-5 border-b border-slate-100 dark:border-white/[0.06]">
                                <div className="flex items-center gap-2">
                                    <List size={16} className="text-blue-600 dark:text-blue-400" />
                                    <span className="font-bold text-slate-900 dark:text-white">大纲导航</span>
                                </div>
                                <button onClick={() => setTocOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06] text-slate-400">
                                    <X size={18} />
                                </button>
                            </div>
                            <div className="overflow-y-auto toc-scroll p-4 max-h-[calc(70vh-60px)]">
                                <ul className="space-y-1">
                                    {outline.map((item) => (
                                        <li key={item.id}>
                                            <button
                                                onClick={() => scrollToHeading(item.id)}
                                                className={`
                                                    w-full text-left py-2 px-3 rounded-xl transition-all duration-200 text-sm leading-snug
                                                    hover:bg-slate-50 dark:hover:bg-white/[0.04]
                                                    ${item.level === 1
                                                        ? "font-semibold text-slate-800 dark:text-slate-200"
                                                        : item.level === 2
                                                            ? "pl-6 text-slate-600 dark:text-slate-400"
                                                            : "pl-9 text-slate-400 dark:text-slate-500 text-[13px]"
                                                    }
                                                    ${activeHeadingId === item.id ? "!bg-blue-50 dark:!bg-blue-900/20 !text-blue-600 dark:!text-blue-400 font-bold" : ""}
                                                `}
                                            >
                                                {activeHeadingId === item.id && (
                                                    <ChevronRight size={14} className="inline mr-1.5 text-blue-500" />
                                                )}
                                                {item.text}
                                            </button>
                                        </li>
                                    ))}
                                    <li>
                                        <button
                                            onClick={() => {
                                                const el = document.getElementById("references-section");
                                                if (el) {
                                                    const y = el.getBoundingClientRect().top + window.scrollY - 100;
                                                    window.scrollTo({ top: y, behavior: "smooth" });
                                                }
                                                setTocOpen(false);
                                            }}
                                            className="w-full text-left py-2 px-3 rounded-xl font-semibold text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-white/[0.04]"
                                        >
                                            参考文献
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== HERO SECTION ===== */}
            <section className="relative w-full pt-36 pb-28 px-6 md:px-10 overflow-hidden">
                {/* Decorative blurs */}
                <div className="pointer-events-none absolute inset-0">
                    <div className="absolute -top-40 -left-32 w-[600px] h-[600px] rounded-full bg-blue-500/[0.07] dark:bg-blue-500/[0.12] blur-[140px]" />
                    <div className="absolute top-20 -right-40 w-[500px] h-[500px] rounded-full bg-emerald-500/[0.06] dark:bg-emerald-400/[0.10] blur-[120px]" />
                    <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-slate-300/60 dark:via-slate-700/60 to-transparent" />
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
                    className="relative z-10 max-w-[820px] mx-auto text-center xl:mr-[280px] xl:ml-auto xl:max-w-[820px]"
                    style={{ marginLeft: "auto", marginRight: "auto" }}
                >
                    {/* Badge */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-10 rounded-full text-sm font-medium
              bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-700/40"
                    >
                        <FileText size={14} />
                        实践调研报告
                    </motion.div>

                    {/* Title — 黑体 */}
                    <h1 className="report-heading text-[2.2rem] md:text-[2.8rem] lg:text-[3.4rem] font-black leading-[1.25] tracking-tight text-slate-900 dark:text-white mb-4">
                        {title.includes("：") ? (
                            <>
                                {title.split("：")[0]}
                                <span className="block text-[1.6rem] md:text-[2rem] lg:text-[2.4rem] mt-3 font-bold text-slate-600 dark:text-slate-300">
                                    {title.split("：")[1]}
                                </span>
                            </>
                        ) : (
                            title
                        )}
                    </h1>

                    {/* Authors */}
                    <p className="report-body text-base md:text-lg text-slate-500 dark:text-slate-400 mt-6 mb-14 tracking-wide">
                        {authors}
                    </p>

                    {/* Abstract Card — Glassmorphism */}
                    <div className="relative text-left rounded-[1.5rem] overflow-hidden shadow-[0_0_80px_-20px_rgba(59,130,246,0.12)] dark:shadow-[0_0_80px_-20px_rgba(59,130,246,0.20)]">
                        {/* Top accent line */}
                        <div className="h-[3px] w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />
                        <div className="bg-white/80 dark:bg-white/[0.04] backdrop-blur-2xl border border-white/40 dark:border-white/[0.06] p-8 md:p-10">
                            <h3 className="report-heading text-lg font-bold text-slate-900 dark:text-gray-100 flex items-center gap-2.5 mb-5">
                                <span className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                    <BookOpen size={16} />
                                </span>
                                摘要
                            </h3>
                            <p className="report-body text-[15px] md:text-base text-slate-700 dark:text-slate-300 leading-[2] text-justify">
                                {abstract}
                            </p>
                            <div className="mt-7 pt-6 border-t border-slate-200/70 dark:border-white/[0.06]">
                                <span className="report-heading text-sm font-bold text-slate-800 dark:text-gray-300 mr-3">
                                    关键词
                                </span>
                                <div className="inline-flex flex-wrap gap-2 mt-1">
                                    {keywords.split("；").map((kw) => (
                                        <span
                                            key={kw}
                                            className="px-3 py-1 rounded-full text-[13px] font-medium bg-slate-100 dark:bg-white/[0.06] text-slate-700 dark:text-slate-300 border border-slate-200/60 dark:border-white/[0.04] hover:bg-slate-200 dark:hover:bg-white/[0.10] transition-colors cursor-default"
                                        >
                                            {kw}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ===== OVERVIEW INSET ===== */}
            {overviewText && (
                <section className="relative px-6 md:px-10 -mt-6 mb-16 flex justify-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[820px] w-full"
                    >
                        <SpotlightCard
                            className="w-full bg-white/60 dark:bg-slate-900/40 border-slate-200/50 dark:border-slate-800/50 backdrop-blur-md shadow-xl text-slate-800 dark:text-slate-200"
                            spotlightColor="rgba(99, 102, 241, 0.12)"
                        >
                            <div className="flex items-center gap-3 mb-4">
                                <div className="p-2 rounded-xl bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" /><polyline points="14 2 14 8 20 8" /><path d="M16 13H8" /><path d="M16 17H8" /><path d="M10 9H8" /></svg>
                                </div>
                                <h2 className="report-heading text-xl font-bold text-slate-900 dark:text-white">
                                    调研概述
                                </h2>
                            </div>
                            <p className="report-body text-[15px] md:text-[16px] leading-[2.2] text-justify text-slate-600 dark:text-slate-300">
                                {overviewText}
                            </p>
                        </SpotlightCard>
                    </motion.div>
                </section>
            )}

            {/* ===== ARTICLE BODY ===== */}
            <section className="relative w-full pb-20 px-6 md:px-10 flex justify-center">
                <motion.article
                    ref={articleRef}
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true, margin: "-80px" }}
                    transition={{ duration: 0.8 }}
                    className="report-article max-w-[820px] w-full"
                >
                    <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        components={{
                            /* ── Headings (黑体) with IDs for TOC ── */
                            h1({ children }) {
                                const idx = headingCounterRef.current++;
                                const headingId = outline[idx]?.id || `heading-${idx}`;
                                return (
                                    <motion.h1
                                        data-heading-id={headingId}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5 }}
                                        className="report-heading text-[1.8rem] md:text-[2rem] font-black text-slate-900 dark:text-white mt-16 mb-6 pb-3 border-b-2 border-blue-600/20 dark:border-blue-400/20 scroll-mt-28"
                                    >
                                        {children}
                                    </motion.h1>
                                );
                            },
                            h2({ children }) {
                                const idx = headingCounterRef.current++;
                                const headingId = outline[idx]?.id || `heading-${idx}`;
                                return (
                                    <motion.h2
                                        data-heading-id={headingId}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5, delay: 0.1 }}
                                        className="report-heading text-[1.4rem] md:text-[1.6rem] font-bold text-slate-900 dark:text-white mt-14 mb-5 flex items-center gap-3 scroll-mt-28"
                                    >
                                        <span className="w-1 h-7 rounded-full bg-gradient-to-b from-blue-600 to-cyan-400 shrink-0" />
                                        {children}
                                    </motion.h2>
                                );
                            },
                            h3({ children }) {
                                const idx = headingCounterRef.current++;
                                const headingId = outline[idx]?.id || `heading-${idx}`;
                                return (
                                    <motion.h3
                                        data-heading-id={headingId}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5, delay: 0.15 }}
                                        className="report-heading text-[1.15rem] md:text-[1.25rem] font-bold text-slate-800 dark:text-slate-100 mt-10 mb-4 scroll-mt-28"
                                    >
                                        {children}
                                    </motion.h3>
                                );
                            },
                            /* ── Paragraph – smart image detection ── */
                            p({ children, node, ...props }) {
                                const hasImg = node?.children?.some(
                                    (child: any) =>
                                        child.tagName === "img" ||
                                        (child.type === "element" && child.tagName === "img")
                                );
                                if (hasImg) {
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, scale: 0.98 }}
                                            whileInView={{ opacity: 1, scale: 1 }}
                                            viewport={{ once: true, margin: "-60px" }}
                                            transition={{ duration: 0.6 }}
                                            className="my-8 text-center"
                                        >
                                            {children}
                                        </motion.div>
                                    );
                                }
                                return (
                                    <motion.p
                                        initial={{ opacity: 0, y: 15 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true, margin: "-40px" }}
                                        transition={{ duration: 0.5 }}
                                        className="report-body text-[15px] md:text-base text-slate-700 dark:text-slate-300 leading-[2] text-justify my-5 indent-[2em]"
                                    >
                                        {children}
                                    </motion.p>
                                );
                            },
                            /* ── Links & Citations ── */
                            a({ node, href, children, ...props }) {
                                if (href?.startsWith("cite:")) {
                                    const citeId = href.split(":")[1];
                                    return (
                                        <button
                                            onClick={() => {
                                                scrollToReference(citeId);
                                                setActiveCite(citeId);
                                            }}
                                            className="inline-flex items-center justify-center min-w-[1.6em] h-[1.4em] px-[0.35em] mx-[1px] text-[0.75em] font-bold
                        bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-800/40 dark:to-blue-900/30
                        text-blue-700 dark:text-blue-300 rounded-md
                        border border-blue-200/60 dark:border-blue-600/40
                        shadow-[0_1px_2px_rgba(59,130,246,0.08)]
                        hover:shadow-[0_2px_8px_rgba(59,130,246,0.18)] hover:-translate-y-[1px]
                        active:translate-y-0
                        transition-all duration-150 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-blue-500
                        align-super leading-none"
                                        >
                                            [{children}]
                                        </button>
                                    );
                                }
                                return (
                                    <a href={href} {...props}>
                                        {children}
                                    </a>
                                );
                            },
                            /* ── Images & Charts ── */
                            img({ src, alt }) {
                                if (src === "/chart1") return <Chart1 />;
                                if (src === "/chart2") return <Chart2 />;
                                if (src === "/chart3") return <Chart3 />;

                                return (
                                    // eslint-disable-next-line @next/next/no-img-element
                                    <img
                                        src={src}
                                        alt={alt || ""}
                                        className="w-full max-w-[640px] mx-auto rounded-2xl object-contain
                      shadow-[0_4px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_4px_30px_rgba(0,0,0,0.3)]
                      border border-slate-200/80 dark:border-white/[0.06]"
                                    />
                                );
                            },
                            /* ── Emphasis = figure captions ── */
                            em({ children }) {
                                return (
                                    <span className="block text-center text-sm text-slate-500 dark:text-slate-400 not-italic mt-3 mb-2 tracking-wide">
                                        {children}
                                    </span>
                                );
                            },
                            /* ── Blockquote ── */
                            blockquote({ children }) {
                                return (
                                    <blockquote className="my-6 pl-5 border-l-[3px] border-blue-400/60 dark:border-blue-500/40 text-slate-600 dark:text-slate-400 italic">
                                        {children}
                                    </blockquote>
                                );
                            },
                            /* ── Strong ── */
                            strong({ children }) {
                                return (
                                    <strong className="font-bold text-slate-900 dark:text-white">
                                        {children}
                                    </strong>
                                );
                            },
                        }}
                    >
                        {mainBody}
                    </ReactMarkdown>
                </motion.article>
            </section>

            {/* ===== REFERENCES SECTION ===== */}
            {refKeys.length > 0 && (
                <section id="references-section" className="relative px-6 md:px-10 pb-24 flex justify-center scroll-mt-28">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="max-w-[820px] w-full"
                    >
                        {/* Divider */}
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-slate-300 dark:via-slate-700 to-transparent mb-12" />

                        <h2 className="report-heading text-[1.4rem] font-bold text-slate-900 dark:text-white mb-8 flex items-center gap-3">
                            <span className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-white/[0.06] flex items-center justify-center text-slate-500 dark:text-slate-400">
                                <BookOpen size={18} />
                            </span>
                            参考文献
                        </h2>

                        <ol className="space-y-4 list-none pl-0">
                            {refKeys.map((key) => (
                                <li
                                    key={key}
                                    id={`ref-${key}`}
                                    className="group flex gap-3 items-start p-3 -mx-3 rounded-xl transition-colors duration-300"
                                >
                                    <span
                                        className="shrink-0 mt-[3px] w-7 h-7 rounded-lg bg-slate-100 dark:bg-white/[0.06] text-slate-600 dark:text-slate-400
                      text-xs font-bold flex items-center justify-center
                      border border-transparent group-hover:border-blue-300 dark:group-hover:border-blue-600
                      group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 group-hover:text-blue-700 dark:group-hover:text-blue-300
                      transition-all"
                                    >
                                        {key}
                                    </span>
                                    <div className="flex-1">
                                        <p className="report-body text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                                            {references[key]}
                                        </p>
                                        <a
                                            href={`https://xueshu.baidu.com/s?wd=${encodeURIComponent(references[key])}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1.5 mt-2 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors group/link"
                                        >
                                            前往检索
                                            <ExternalLink size={11} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                                        </a>
                                    </div>
                                </li>
                            ))}
                        </ol>
                    </motion.div>
                </section>
            )}

            {/* ===== CITATION TOAST (compact popup near bottom) ===== */}
            <AnimatePresence>
                {activeCite && (
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 40 }}
                        transition={{ type: "spring", stiffness: 400, damping: 28 }}
                        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[200] w-[calc(100%-2rem)] max-w-lg"
                    >
                        <div className="relative rounded-2xl overflow-hidden bg-white dark:bg-[#141928]
                            shadow-[0_20px_60px_-15px_rgba(0,0,0,0.25)] dark:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.6)]
                            border border-slate-200/80 dark:border-white/[0.08]"
                        >
                            {/* Top Accent */}
                            <div className="h-0.5 bg-gradient-to-r from-blue-600 via-cyan-500 to-emerald-400" />
                            <div className="p-5">
                                <div className="flex items-start justify-between gap-3">
                                    <div className="flex items-center gap-3 shrink-0">
                                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-800/30 dark:to-blue-900/20 flex items-center justify-center text-blue-600 dark:text-blue-400 border border-blue-200/60 dark:border-blue-700/30">
                                            <Quote size={14} />
                                        </div>
                                        <div>
                                            <span className="text-sm font-bold text-slate-900 dark:text-white">
                                                [{activeCite}]
                                            </span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => setActiveCite(null)}
                                        className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:text-slate-500 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/[0.06] transition-colors shrink-0"
                                    >
                                        <X size={16} />
                                    </button>
                                </div>
                                <p className="report-body text-[13px] text-slate-600 dark:text-slate-400 leading-relaxed mt-3 line-clamp-2">
                                    {references[activeCite] || "未找到该引用文献的详细信息。"}
                                </p>
                                <div className="flex items-center gap-3 mt-3">
                                    {references[activeCite] && (
                                        <a
                                            href={`https://xueshu.baidu.com/s?wd=${encodeURIComponent(references[activeCite])}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            onClick={() => setActiveCite(null)}
                                            className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                                        >
                                            前往检索
                                            <ExternalLink size={11} />
                                        </a>
                                    )}
                                    <button
                                        onClick={() => {
                                            scrollToReference(activeCite);
                                            setActiveCite(null);
                                        }}
                                        className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white transition-colors"
                                    >
                                        查看详情 ↓
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ===== SCROLL TO TOP ===== */}
            <AnimatePresence>
                {showScrollTop && (
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 20 }}
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-2xl
              bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700
              shadow-xl text-slate-600 dark:text-slate-400
              hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-300 dark:hover:border-blue-600
              flex items-center justify-center transition-colors"
                    >
                        <ArrowUp size={20} />
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
}
