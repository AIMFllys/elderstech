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
}

const getStatusStyles = (status: TimelineItem["status"]): string => {
  switch (status) {
    case "completed":
      return "text-white bg-hust border-hust";
    case "in-progress":
      return "text-foreground bg-background border-ink/20 dark:border-ink-dark/20";
    case "pending":
      return "text-foreground/80 bg-background/60 border-ink/20 dark:border-ink-dark/20";
    default:
      return "text-foreground/80 bg-background/60 border-ink/20 dark:border-ink-dark/20";
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
}: OrbitalNodeProps) {
  const Icon = item.icon;

  const nodeStyle = {
    transform: `translate(${position.x}px, ${position.y}px)`,
    zIndex: isExpanded ? 200 : position.zIndex,
    opacity: isExpanded ? 1 : position.opacity,
  };

  return (
    <div
      className="absolute transition-all duration-700 cursor-pointer"
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

      <div
        className={`
          w-10 h-10 rounded-full flex items-center justify-center
          ${
            isExpanded
              ? "bg-background text-foreground"
              : isRelated
              ? "bg-foreground/10 text-foreground"
              : "bg-foreground text-background"
          }
          border-2
          ${
            isExpanded
              ? "border-ink/30 dark:border-ink-dark/30 shadow-lg shadow-black/10 dark:shadow-black/40"
              : isRelated
              ? "border-ink/30 dark:border-ink-dark/30 animate-pulse"
              : "border-ink/20 dark:border-ink-dark/20"
          }
          transition-all duration-300 transform
          ${isExpanded ? "scale-150" : ""}
        `}
      >
        <Icon size={16} />
      </div>

      <div
        className={`
          absolute top-12 whitespace-nowrap
          text-xs font-semibold tracking-wider
          transition-all duration-300
          ${isExpanded ? "text-foreground scale-125" : "text-foreground/70"}
        `}
      >
        {item.title}
      </div>

      {isExpanded && (
        <Card className="absolute top-20 left-1/2 -translate-x-1/2 w-64 bg-background/90 backdrop-blur-lg border-ink/20 dark:border-ink-dark/20 shadow-xl shadow-black/10 dark:shadow-black/40 overflow-visible">
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
              <span className="text-xs font-mono text-foreground/60">
                {item.date}
              </span>
            </div>
            <CardTitle className="text-sm mt-2">{item.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-foreground/80">
            <p>{item.content}</p>

            <div className="mt-4 pt-3 border-t border-ink/10 dark:border-ink-dark/10">
              <div className="flex justify-between items-center text-xs mb-1">
                <span className="flex items-center">
                  <Zap size={10} className="mr-1" />
                  关注强度
                </span>
                <span className="font-mono">{item.energy}%</span>
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
                  <LinkIcon size={10} className="text-foreground/70 mr-1" />
                  <h4 className="text-xs uppercase tracking-wider font-medium text-foreground/70">
                    关联节点
                  </h4>
                </div>
                <div className="flex flex-wrap gap-1">
                  {relatedItems.map((relatedItem) => (
                    <Button
                      key={relatedItem.id}
                      variant="outline"
                      size="sm"
                      className="flex items-center h-6 px-2 py-0 text-xs rounded-none border-ink/20 dark:border-ink-dark/20 bg-transparent hover:bg-ink/10 dark:hover:bg-ink-dark/10 text-foreground/80 hover:text-foreground transition-all"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggle(relatedItem.id);
                      }}
                    >
                      {relatedItem.title}
                      <ArrowRight size={8} className="ml-1 text-foreground/60" />
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
