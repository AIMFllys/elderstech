"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { StoryThumbnailProps, ProgressBarProps } from "./types";

export function StoryThumbnail({
  stories,
  username,
  avatar,
  viewedIndices,
  onClick,
  className,
}: StoryThumbnailProps) {
  const segmentCount = stories.length;
  const gapDegrees = segmentCount > 1 ? 12 : 0;
  const segmentDegrees = (360 - gapDegrees * segmentCount) / segmentCount;
  const allViewed = viewedIndices.size === stories.length;

  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-center gap-2 group cursor-pointer",
        "bg-transparent border-none outline-none",
        "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-lg",
        className
      )}
      aria-label={`View ${username}'s stories`}
    >
      <div className="relative w-[68px] h-[68px] md:w-[72px] md:h-[72px]">
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
          {stories.map((_, index) => {
            const startAngle = -90 + index * (segmentDegrees + gapDegrees);
            const endAngle = startAngle + segmentDegrees;
            const isViewed = viewedIndices.has(index);

            const startRad = (startAngle * Math.PI) / 180;
            const endRad = (endAngle * Math.PI) / 180;
            const radius = 46;
            const x1 = 50 + radius * Math.cos(startRad);
            const y1 = 50 + radius * Math.sin(startRad);
            const x2 = 50 + radius * Math.cos(endRad);
            const y2 = 50 + radius * Math.sin(endRad);
            const largeArc = segmentDegrees > 180 ? 1 : 0;

            return (
              <path
                key={index}
                d={`M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArc} 1 ${x2} ${y2}`}
                fill="none"
                strokeWidth="5"
                strokeLinecap="round"
                className={cn(
                  "transition-colors duration-300",
                  isViewed || allViewed
                    ? "stroke-muted-foreground/30"
                    : "stroke-sky-300"
                )}
              />
            );
          })}
        </svg>

        <div className="absolute inset-[5px] rounded-full bg-background p-[2px]">
          <div className="w-full h-full rounded-full overflow-hidden bg-muted">
            <img
              src={avatar}
              alt={username}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          </div>
        </div>
      </div>

      <span className="text-xs text-muted-foreground truncate max-w-[80px]">
        {username}
      </span>
    </button>
  );
}

export function ProgressBar({
  count,
  currentIndex,
  progress,
  viewedIndices,
}: ProgressBarProps) {
  return (
    <div className="flex gap-1 w-full px-2">
      {Array.from({ length: count }).map((_, index) => {
        const isActive = index === currentIndex;
        const isCompleted = viewedIndices.has(index) && index < currentIndex;
        const isPast = index < currentIndex;

        return (
          <div
            key={index}
            className="flex-1 h-0.5 bg-white/30 rounded-full overflow-hidden"
          >
            <motion.div
              className="h-full bg-white rounded-full"
              initial={{ width: isPast || isCompleted ? "100%" : "0%" }}
              animate={{
                width: isActive ? `${progress}%` : isPast ? "100%" : "0%",
              }}
              transition={{ duration: 0.1, ease: "linear" }}
            />
          </div>
        );
      })}
    </div>
  );
}
