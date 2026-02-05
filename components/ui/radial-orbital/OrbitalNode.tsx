"use client";

import { ArrowRight, Link as LinkIcon, Zap } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { TimelineItem } from "@/components/ui/radial-orbital/types";

interface OrbitalNodeProps {
  item: TimelineItem;
  position: { x: number; y: number; zIndex: number; opacity: number };
  isExpanded: boolean;
  isRelated: boolean;
  isPulsing: boolean;
  relatedItems: TimelineItem[];
  onToggle: (id: number) => void;
  nodeRef?: (el: HTMLDivElement | null) => void;
}

const getStatusStyles = (status: TimelineItem["status"]): string => {
  switch (status) {
    case "completed":
      return "text-black bg-white border-black/20 dark:text-white dark:bg-hust dark:border-hust";
    case "in-progress":
      return "text-black bg-white border-black/20 dark:text-white dark:bg-background dark:border-ink-dark/20";
    case "pending":
      return "text-black/80 bg-white/70 border-black/20 dark:text-white/80 dark:bg-background/60 dark:border-ink-dark/20";
    default:
      return "text-black/80 bg-white/70 border-black/20 dark:text-white/80 dark:bg-background/60 dark:border-ink-dark/20";
  }
};

export function OrbitalNode({
  item,
  position,
  isExpanded,
  isRelated,
  isPulsing,
  relatedItems,
  onToggle,
  nodeRef,
}: OrbitalNodeProps) {
  const Icon = item.icon;

  const nodeStyle = {
    left: "50%",
    top: "50%",
    transform: `translate(-50%, -50%) translate(${position.x}px, ${position.y}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity,
  };
  const nodeFill = item.color ?? "#E2E8F0";

  return (
    <div
      ref={nodeRef}
      className="absolute cursor-pointer will-change-transform"
      style={nodeStyle}
      onClick={(e) => {
        e.stopPropagation();
        onToggle(item.id);
      }}
    >
      <div
        className={`absolute rounded-full -inset-1 ${
          isPulsing ? "animate-pulse duration-1000" : ""
        }`}
        style={{
          background:
            "radial-gradient(circle, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
          width: `${item.energy * 0.5 + 40}px`,
          height: `${item.energy * 0.5 + 40}px`,
          left: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
          top: `-${(item.energy * 0.5 + 40 - 40) / 2}px`,
        }}
      ></div>
      {isExpanded && (
        <div className="absolute -inset-3 rounded-full border border-black/30 dark:border-white/40 animate-ping" />
      )}

      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${
            isExpanded
              ? "bg-background text-black dark:text-white"
              : isRelated
              ? "text-black dark:text-white"
              : "text-black dark:text-white"
          }
          border-2
          ${
            isExpanded
              ? "border-ink/30 dark:border-ink-dark/30 shadow-lg shadow-black/10 dark:shadow-black/40"
              : isRelated
              ? "border-black/30 dark:border-ink-dark/30 animate-pulse"
              : "border-black/20 dark:border-ink-dark/20"
          }
          transition-all duration-300 transform
          ${isExpanded ? "scale-150" : ""}
        `}
        style={
          isExpanded
            ? undefined
            : { backgroundColor: nodeFill }
        }
      >
        <Icon size={16} />
      </div>

      <div
        className={`
          absolute top-12 whitespace-nowrap
          text-xs font-semibold tracking-wider
          transition-all duration-300
          ${
            isExpanded
              ? "text-black dark:text-white scale-125"
              : "text-black/70 dark:text-white/70"
          }
        `}
      >
        {item.title}
      </div>

      {isExpanded && (
        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-white dark:bg-[#0b0b0b] text-black dark:text-white border-ink/40 dark:border-white/20 shadow-2xl shadow-black/30 dark:shadow-black/80 overflow-visible">
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-px h-3 bg-ink/30 dark:bg-ink-dark/30"></div>
          <CardHeader className="pb-2">
            <div className="flex justify-between items-center">
              <Badge className={`px-2 text-xs ${getStatusStyles(item.status)}`}>
                {item.status === "completed"
                  ? "完成"
                  : item.status === "in-progress"
                  ? "进行中"
                  : "待启动"}
              </Badge>
              <span className="text-xs font-mono text-black/80 dark:text-white/80">
                {item.date}
              </span>
            </div>
            <CardTitle className="text-sm mt-2 text-black dark:text-white font-semibold">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-black/90 dark:text-white/90 leading-relaxed">
            <p>{item.content}</p>

            <div className="mt-4 pt-3 border-t border-ink/10 dark:border-ink-dark/10">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center">
                  <Zap size={10} className="mr-1" />
                  关注强度
                </span>
                <span className="font-mono text-black/85 dark:text-white/85">
                  {item.energy}%
                </span>
              </div>
              <div className="w-full h-1 bg-ink/10 dark:bg-ink-dark/10 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-lime-300"
                  style={{ width: `${item.energy}%` }}
                ></div>
              </div>
            </div>

            {relatedItems.length > 0 && (
              <div className="mt-4 pt-3 border-t border-ink/10 dark:border-ink-dark/10">
                <div className="flex items-center mb-2">
                  <LinkIcon size={10} className="text-black/80 dark:text-white/80 mr-1" />
                  <h4 className="text-xs uppercase tracking-wider font-medium text-black/80 dark:text-white/80">
                    关联节点
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {relatedItems.map((relatedItem) => (
                    <Button
                      key={relatedItem.id}
                      variant="outline"
                      size="sm"
                      className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-black/30 dark:border-ink-dark/30 bg-transparent hover:bg-black/5 dark:hover:bg-ink-dark/10 text-black/90 dark:text-white/90 hover:text-black dark:hover:text-white transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(relatedItem.id);
                      }}
                    >
                      {relatedItem.title}
                      <ArrowRight size={8} className="ml-1 text-black/70 dark:text-white/80" />
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
