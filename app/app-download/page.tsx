"use client";

import React from "react";
import { motion } from "framer-motion";
import { BackLink } from "@/components/layout/back-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { MagnetizeButton } from "@/components/ui/magnetize-button";
import { site } from "@/lib/data";
import { 
  Smartphone, 
  Globe, 
  MapPin, 
  Search, 
  Layout, 
  Database, 
  Download, 
  ArrowRight 
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AppDownloadPage() {
  return (
    <AuroraBackground 
      className="min-h-screen h-auto items-stretch justify-start bg-green-50/70 dark:bg-emerald-950/40 transition-colors duration-500 [--aurora:repeating-linear-gradient(100deg,#d1fae5_10%,#a7f3d0_15%,#6ee7b7_20%,#f0fdf4_25%,#86efac_30%)]"
      showRadialGradient={true}
    >
      <div 
        className="relative z-10 flex flex-col min-h-screen w-full text-foreground overflow-y-auto overflow-x-hidden"
      >
        {/* Navigation Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-7xl mx-auto p-6 flex justify-between items-center z-50 pointer-events-none"
        >
          <div className="pointer-events-auto">
            <BackLink />
          </div>
          <div className="pointer-events-auto">
            <ThemeToggle />
          </div>
        </motion.div>

        <div className="flex-1 flex flex-col justify-center w-full max-w-7xl mx-auto px-4 md:px-6 py-10 lg:py-20 lg:flex-row lg:items-center gap-12 lg:gap-20">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex-1 flex flex-col items-start space-y-8 text-center lg:text-left"
          >
            <div className="space-y-4">
              <motion.div 
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="inline-block px-3 py-1 rounded-full bg-emerald-600/10 text-emerald-700 dark:text-emerald-400 text-sm font-semibold border border-emerald-600/20 backdrop-blur-md mx-auto lg:mx-0"
              >
                v1.0.0 Public Beta
              </motion.div>
              <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-ink dark:text-white drop-shadow-sm font-xiaowei">
                智护银龄
                <span className="block text-2xl md:text-3xl mt-2 font-light opacity-80 font-sans">
                  Smart Care for Elders
                </span>
              </h1>
              <p className="text-lg md:text-xl text-ink/70 dark:text-white/70 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sans">
                面向老年群体的智能用药与健康导航轻应用。
                <br className="hidden md:block" />
                连接科技与关怀，打造适老化的数字生活新体验。
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center lg:justify-start">
              <a href={site.appDownloadUrl} target="_blank" rel="noopener noreferrer">
                <MagnetizeButton
                  icon={Download}
                  className="min-w-[200px] bg-emerald-600/90 hover:bg-emerald-600 text-white dark:bg-emerald-600/80 dark:hover:bg-emerald-500 border-emerald-500/20 shadow-emerald-500/10"
                  particleColor="#ffffff"
                >
                  下载 Android 版
                </MagnetizeButton>
              </a>
              <a href={site.webUrl} target="_blank" rel="noopener noreferrer">
                <MagnetizeButton
                  icon={Globe}
                  className="min-w-[200px] bg-white/80 dark:bg-white/10 text-emerald-800 dark:text-emerald-50 border-emerald-900/10 hover:bg-white dark:hover:bg-white/20"
                  particleColor="#10b981"
                >
                  访问网页版
                </MagnetizeButton>
              </a>
            </div>

            {/* Feature Grid - Compact */}
            <div className="grid grid-cols-2 gap-4 mt-8 w-full">
               <FeatureItem 
                 icon={<MapPin className="w-5 h-5" />}
                 title="实地调研"
                 desc="百余份问卷与访谈"
               />
               <FeatureItem 
                 icon={<Search className="w-5 h-5" />}
                 title="痛点挖掘"
                 desc="跨越数字鸿沟"
               />
               <FeatureItem 
                 icon={<Layout className="w-5 h-5" />}
                 title="适老交互"
                 desc="大字号与高对比度"
               />
               <FeatureItem 
                 icon={<Database className="w-5 h-5" />}
                 title="数据洞察"
                 desc="科学的服务建议"
               />
            </div>
          </motion.div>

          {/* Right Visual - Phone Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 50, rotate: 10 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ duration: 1, type: "spring", bounce: 0.2 }}
            className="flex-1 flex justify-center items-center relative"
          >
            <div className="relative group">
              {/* Glow Effect behind */}
              <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-[3rem] blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              
              {/* Phone Frame */}
              <div className="relative w-[300px] h-[600px] bg-zinc-950 rounded-[2.5rem] border-[8px] border-zinc-900 shadow-2xl overflow-hidden flex flex-col">
                {/* Dynamic Island / Notch area */}
                <div className="w-full h-8 bg-zinc-900 absolute top-0 left-0 z-20 flex justify-center">
                  <div className="w-32 h-6 bg-black rounded-b-2xl" />
                </div>
                
                {/* Screen Content */}
                <div className="flex-1 bg-paper dark:bg-zinc-900 overflow-hidden relative flex flex-col">
                  {/* Status Bar Placeholder */}
                  <div className="h-8 w-full flex justify-between px-6 items-center text-[10px] text-zinc-500 font-medium pt-2">
                    <span>9:41</span>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-current rounded-full opacity-20"/>
                      <div className="w-3 h-3 bg-current rounded-full opacity-20"/>
                      <div className="w-3 h-3 bg-current rounded-full"/>
                    </div>
                  </div>

                  {/* App Header */}
                  <div className="px-6 pt-6 pb-4">
                    <h3 className="text-2xl font-bold font-xiaowei text-ink dark:text-white">早安，张爷爷</h3>
                    <p className="text-xs text-muted-foreground mt-1">今天也要保持好心情哦</p>
                  </div>

                  {/* App Card 1: Medication */}
                  <div className="mx-4 mt-2 p-4 rounded-2xl bg-white dark:bg-white/10 shadow-sm border border-black/5 dark:border-white/5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" /></svg>
                      </div>
                      <div>
                        <div className="font-bold text-ink dark:text-white text-base">吃药提醒</div>
                        <div className="text-xs text-muted-foreground">08:30 降压药 (饭后)</div>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                       <div className="bg-hust h-full w-2/3" />
                    </div>
                  </div>

                  {/* App Card 2: Navigation */}
                  <div className="mx-4 mt-4 p-4 rounded-2xl bg-gradient-to-br from-hust/10 to-transparent border border-hust/20 relative overflow-hidden">
                    <div className="flex items-center justify-between z-10 relative">
                        <div>
                           <div className="font-bold text-hust dark:text-hust-light text-xl">一键回家</div>
                           <div className="text-xs text-hust/70 mt-1">当前位置: 中山公园</div>
                        </div>
                        <div className="w-12 h-12 bg-hust rounded-full flex items-center justify-center text-white shadow-lg">
                           <MapPin className="w-6 h-6" />
                        </div>
                    </div>
                  </div>

                  {/* App Card 3: Health Stats */}
                  <div className="mx-4 mt-4 grid grid-cols-2 gap-3">
                     <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-2xl flex flex-col items-center justify-center py-6">
                        <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">98</span>
                        <span className="text-xs text-blue-600/60 dark:text-blue-400/60">心率 (bpm)</span>
                     </div>
                     <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-2xl flex flex-col items-center justify-center py-6">
                        <span className="text-2xl font-bold text-green-600 dark:text-green-400">120/80</span>
                        <span className="text-xs text-green-600/60 dark:text-green-400/60">血压</span>
                     </div>
                  </div>

                  {/* Bottom Navigation Mock */}
                  <div className="absolute bottom-0 w-full h-16 bg-white/80 dark:bg-black/80 backdrop-blur border-t border-black/5 dark:border-white/5 flex items-center justify-around px-2">
                       <div className="p-2 text-hust"><svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/></svg></div>
                       <div className="p-2 text-muted-foreground"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg></div>
                       <div className="p-2 text-muted-foreground"><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg></div>
                  </div>
                  
                  {/* Home Indicator */}
                  <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-32 h-1 bg-black/20 dark:bg-white/20 rounded-full" />
                </div>
              </div>
            </div>
            
            {/* Decorative circles */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-400/20 rounded-full blur-[100px] -z-10" />
          </motion.div>
        </div>
      </div>
    </AuroraBackground>
  );
}

function FeatureItem({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="group flex items-center gap-3 p-3 rounded-xl bg-white/40 dark:bg-black/20 backdrop-blur-sm border border-ink/5 dark:border-white/5 hover:bg-white/60 dark:hover:bg-black/40 transition-colors">
      <div className="p-2 rounded-lg bg-white/60 dark:bg-white/10 text-emerald-600 dark:text-emerald-400 shadow-sm group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <div>
        <div className="font-semibold text-sm text-ink dark:text-white">{title}</div>
        <div className="text-xs text-ink/60 dark:text-white/60">{desc}</div>
      </div>
    </div>
  )
}