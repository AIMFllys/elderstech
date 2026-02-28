"use client";

import { useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { activitySections } from "@/lib/data";
import { ArrowLeft, FileText } from "lucide-react";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin", "cyrillic"] });

function ReportsContent() {
    const searchParams = useSearchParams();
    const fileParam = searchParams.get("file") || activitySections[0]?.link || "";
    const [markdown, setMarkdown] = useState<string>("");
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!fileParam) return;
        setLoading(true);
        const url = `/实践成果/采访提纲/${fileParam}`;
        fetch(url)
            .then((res) => {
                if (!res.ok) throw new Error("Not found");
                return res.text();
            })
            .then((text) => {
                setMarkdown(text);
                setLoading(false);
            })
            .catch(() => {
                setMarkdown("# 文件未找到\n\n请从左侧导航选择一份报告查看。");
                setLoading(false);
            });
    }, [fileParam]);

    return (
        <div className={`min-h-screen bg-slate-50 dark:bg-neutral-950 text-foreground flex flex-col ${inter.className}`}>
            <div className="flex flex-col md:flex-row max-w-7xl mx-auto w-full flex-1 border-x border-neutral-200 dark:border-neutral-800 relative">
                {/* Sidebar */}
                <aside className="w-full md:w-64 lg:w-80 shrink-0 border-b md:border-b-0 md:border-r border-neutral-200 dark:border-neutral-800 bg-white/50 dark:bg-black/50 p-6 flex flex-col gap-6 md:sticky md:top-0 md:h-screen overflow-y-auto">
                    <div className="flex items-center gap-2 mb-2">
                        <Link
                            href="/activity"
                            className="p-1 rounded-md hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors text-neutral-600 dark:text-neutral-400 cursor-pointer flex items-center justify-center mr-1"
                            title="返回报告首页"
                        >
                            <ArrowLeft className="w-5 h-5" />
                        </Link>
                        <h2 className="text-xl font-bold text-black dark:text-white">
                            调研报告
                        </h2>
                    </div>
                    <nav className="flex flex-col gap-2">
                        {activitySections.map((sec, i) => {
                            if (!sec.link) return null;
                            const isActive = sec.link === fileParam;
                            return (
                                <Link
                                    key={i}
                                    href={`/reports?file=${encodeURIComponent(sec.link)}`}
                                    className={`p-3 rounded-lg transition-all duration-200 border ${isActive
                                        ? "bg-blue-50 border-blue-200 dark:bg-blue-900/30 dark:border-blue-700/50 shadow-sm"
                                        : "bg-transparent border-transparent hover:bg-neutral-100 dark:hover:bg-neutral-800/60"
                                        }`}
                                >
                                    <div className="flex items-center gap-2">
                                        <FileText
                                            className={`w-4 h-4 shrink-0 ${isActive
                                                ? "text-blue-600 dark:text-blue-400"
                                                : "text-neutral-400"
                                                }`}
                                        />
                                        <span
                                            className={`font-semibold text-sm ${isActive
                                                ? "text-blue-700 dark:text-blue-400"
                                                : "text-neutral-700 dark:text-neutral-300"
                                                }`}
                                        >
                                            {sec.title}
                                        </span>
                                    </div>
                                    <div
                                        className={`text-xs mt-1 pl-6 ${isActive
                                            ? "text-blue-600/80 dark:text-blue-400/80"
                                            : "text-neutral-400 dark:text-neutral-500"
                                            }`}
                                    >
                                        {sec.subtitle}
                                    </div>
                                </Link>
                            );
                        })}
                    </nav>
                </aside>

                {/* Content Area */}
                <main className="flex-1 p-6 md:p-10 lg:p-16 max-w-full overflow-hidden bg-white dark:bg-neutral-950">
                    <div className="max-w-3xl mx-auto">
                        {loading ? (
                            <div className="flex items-center justify-center py-20">
                                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                            </div>
                        ) : (
                            <article className="prose prose-slate dark:prose-invert max-w-none prose-headings:font-bold prose-a:text-blue-500 hover:prose-a:text-blue-600 prose-img:rounded-xl prose-p:leading-relaxed prose-li:leading-relaxed">
                                <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                    {markdown}
                                </ReactMarkdown>
                            </article>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default function ReportsPage() {
    return (
        <Suspense
            fallback={
                <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-neutral-950">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
                </div>
            }
        >
            <ReportsContent />
        </Suspense>
    );
}
