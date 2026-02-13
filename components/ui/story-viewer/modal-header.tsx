"use client";

import * as React from "react";
import { X, Volume2, VolumeX, Pause } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatTimestamp } from "./types";
import type { Story } from "./types";
import { ProgressBar } from "./story-thumbnail";

interface ModalHeaderProps {
  stories: Story[];
  currentIndex: number;
  progress: number;
  viewedIndices: Set<number>;
  username: string;
  avatar: string;
  timestamp?: string;
  isPaused: boolean;
  isMuted: boolean;
  currentStoryType: "image" | "video";
  onToggleMute: () => void;
  onClose: () => void;
}

export function ModalHeader({
  stories,
  currentIndex,
  progress,
  viewedIndices,
  username,
  avatar,
  timestamp,
  isPaused,
  isMuted,
  currentStoryType,
  onToggleMute,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 pt-2 pb-4 bg-gradient-to-b from-black/60 to-transparent">
      <ProgressBar
        count={stories.length}
        currentIndex={currentIndex}
        progress={progress}
        viewedIndices={viewedIndices}
      />
      <div className="flex items-center justify-between px-4 mt-3">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full overflow-hidden">
            <img src={avatar} alt={username} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col">
            <span className="text-white text-sm font-medium">{username}</span>
            {timestamp && (
              <span className="text-white/60 text-xs">{formatTimestamp(timestamp)}</span>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {isPaused && (
            <div className="flex items-center gap-1 text-white/80">
              <Pause className="w-4 h-4" />
              <span className="text-xs">Paused</span>
            </div>
          )}
          {currentStoryType === "video" && (
            <button
              type="button"
              className={cn(
                "inline-flex items-center justify-center rounded-md",
                "h-8 w-8 text-white hover:bg-white/20 transition-colors",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
              )}
              onClick={(e) => { e.stopPropagation(); onToggleMute(); }}
              aria-label={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
          )}
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center rounded-md",
              "h-8 w-8 text-white hover:bg-white/20 transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            )}
            onClick={(e) => { e.stopPropagation(); onClose(); }}
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
