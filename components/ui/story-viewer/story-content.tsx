"use client";

import * as React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import type { StoryContentProps } from "./types";

export function StoryContent({
  story,
  isMuted,
  isInitialLoading,
  isBuffering,
  onVideoReady,
  onVideoTimeUpdate,
  onVideoWaiting,
  onVideoPlaying,
  onVideoEnded,
  onImageLoad,
  videoRef,
}: StoryContentProps) {
  const [imageSrc, setImageSrc] = React.useState(story.src);
  const showSpinner = isInitialLoading || isBuffering;

  React.useEffect(() => {
    setImageSrc(story.src);
  }, [story.src]);

  return (
    <>
      {showSpinner && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="w-10 h-10 text-white animate-spin" />
        </div>
      )}
      {story.type === "video" ? (
        <video
          ref={videoRef}
          src={story.src}
          className={cn(
            "w-full h-full object-contain transition-opacity duration-200",
            isInitialLoading ? "opacity-0" : "opacity-100"
          )}
          autoPlay
          playsInline
          muted={isMuted}
          onCanPlay={(e) => {
            const video = e.currentTarget;
            onVideoReady(video.duration * 1000);
          }}
          onTimeUpdate={(e) => {
            const video = e.currentTarget;
            onVideoTimeUpdate(video.currentTime, video.duration);
          }}
          onWaiting={onVideoWaiting}
          onPlaying={onVideoPlaying}
          onEnded={onVideoEnded}
        />
      ) : (
        <img
          src={imageSrc}
          alt=""
          className={cn(
            "w-full h-full object-contain transition-opacity duration-200",
            isInitialLoading ? "opacity-0" : "opacity-100"
          )}
          onLoad={onImageLoad}
          onError={() => {
            if (imageSrc.endsWith(".png")) {
              setImageSrc(imageSrc.replace(/\.png$/i, ".jpg"));
            }
          }}
        />
      )}
    </>
  );
}
