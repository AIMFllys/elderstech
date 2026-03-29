"use client";

import { motion } from "framer-motion";

// --- Chart 1: Donut Chart for Smartphone Proficiency ---
export const Chart1 = () => {
    // Data matched to 图1
    // 基础 30%, 进阶 50%, 熟练使用 20%
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    const items = [
        { label: "基础", value: 30, color: "#0ea5e9" },    // Blue
        { label: "进阶", value: 50, color: "#22c55e" },    // Green
        { label: "熟练使用", value: 20, color: "#9ca3af" } // Grey
    ];

    let offsetAcum = 0;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8 px-4 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm max-w-[640px] mx-auto w-full">
            <h4 className="absolute top-4 text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">智能手机使用的熟练程度</h4>
            <div className="relative w-48 h-48 drop-shadow-xl mt-6">
                <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    {items.map((item, i) => {
                        const dasharray = `${(item.value / 100) * circumference} ${circumference}`;
                        const offset = offsetAcum;
                        offsetAcum -= (item.value / 100) * circumference;

                        return (
                            <motion.circle
                                key={i}
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="24"
                                strokeDasharray={dasharray}
                                strokeDashoffset={circumference} // Start from empty
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.5, delay: i * 0.4, ease: "easeOut" }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200">50%</span>
                    <span className="text-xs text-slate-500 font-medium">进阶用户占主体</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                {items.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="text-[15px] font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                        <span className="text-[15px] font-bold text-slate-900 dark:text-white ml-2">{item.value}%</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Chart 2: Donut Chart for User Experience/Satisfaction ---
export const Chart2 = () => {
    // Data matched to 图2
    // 操作步骤复杂 40%, 视觉设计不适老 30%, 功能冗余/不实用 20%, 误报/不准确 10%
    const radius = 60;
    const circumference = 2 * Math.PI * radius;

    const data = [
        { label: "操作步骤复杂", value: 40, color: "#eab308" },    // Yellow
        { label: "视觉设计不适老", value: 30, color: "#ef4444" }, // Red
        { label: "功能冗余/不实用", value: 20, color: "#22c55e" },// Green
        { label: "误报/不准确", value: 10, color: "#9ca3af" }     // Grey
    ];

    let offsetAcum = 0;

    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-8 px-4 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm max-w-[640px] mx-auto w-full">
            <h4 className="absolute top-4 text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">现有智慧医疗产品的使用体验</h4>
            <div className="relative w-48 h-48 drop-shadow-xl mt-6">
                <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
                    {data.map((item, i) => {
                        const dasharray = `${(item.value / 100) * circumference} ${circumference}`;
                        const offset = offsetAcum;
                        offsetAcum -= (item.value / 100) * circumference;

                        return (
                            <motion.circle
                                key={i}
                                cx="80"
                                cy="80"
                                r={radius}
                                fill="transparent"
                                stroke={item.color}
                                strokeWidth="24"
                                strokeDasharray={dasharray}
                                strokeDashoffset={circumference}
                                animate={{ strokeDashoffset: offset }}
                                transition={{ duration: 1.5, delay: i * 0.4, ease: "easeOut" }}
                            />
                        );
                    })}
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-xl font-bold text-slate-800 dark:text-slate-200">40%</span>
                    <span className="text-xs text-slate-500 font-medium">最高痛点</span>
                </div>
            </div>

            <div className="flex flex-col gap-3 mt-6">
                {data.map((item, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.5 + i * 0.2 }}
                        viewport={{ once: true }}
                        className="flex items-center gap-3"
                    >
                        <span className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                        <span className="flex-1 text-[15px] font-medium text-slate-700 dark:text-slate-300">{item.label}</span>
                        <span className="text-[15px] font-bold text-slate-900 dark:text-white ml-2">{item.value}%</span>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

// --- Chart 3: Vertical Bar Chart for Ideal Product Requirements ---
export const Chart3 = () => {
    // Data matched to 图3 (Out of 5)
    // 语音交互: 5, 大字体/大图标: 5, 一键直达: 5, 低维护成本: 4, 远程代操作: 4
    const data = [
        { label: "语音交互", value: 5 },
        { label: "大字体/大图标", value: 5 },
        { label: "一键直达", value: 5 },
        { label: "低维护成本", value: 4 },
        { label: "远程代操作", value: 4 }
    ];

    return (
        <div className="flex flex-col py-8 px-4 bg-white/50 dark:bg-slate-900/30 rounded-2xl border border-slate-100 dark:border-slate-800 backdrop-blur-sm max-w-[640px] mx-auto w-full h-[320px] justify-between relative">
            <h4 className="absolute top-4 left-0 right-0 text-sm font-bold text-slate-500 mb-2 uppercase tracking-wider text-center">理想产品需求</h4>
            <div className="flex justify-between items-end h-[200px] w-full px-2 md:px-8 gap-2 mt-8">
                {data.map((item, i) => (
                    <div key={i} className="flex flex-col items-center gap-2 flex-1">
                        <span className="text-xs md:text-sm font-bold text-blue-600 dark:text-blue-400">{item.value}/5</span>
                        <div className="w-full max-w-[40px] h-[160px] bg-slate-200 dark:bg-slate-800 rounded-t-lg relative flex items-end justify-center overflow-hidden">
                            <motion.div
                                className="w-full bg-gradient-to-t from-blue-600 to-cyan-400 rounded-t-lg"
                                initial={{ height: "0%" }}
                                whileInView={{ height: `${(item.value / 5) * 100}%` }}
                                viewport={{ once: true, margin: "-50px" }}
                                transition={{ duration: 1, delay: i * 0.15, ease: "easeOut" }}
                            />
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-between items-start w-full px-2 md:px-8 mt-4 gap-2 border-t border-slate-200 dark:border-slate-800 pt-3">
                {data.map((item, i) => (
                    <div key={i} className="flex flex-col items-center flex-1">
                        <span className="text-[11px] md:text-[13px] font-medium text-slate-600 dark:text-slate-400 text-center leading-tight">
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};
