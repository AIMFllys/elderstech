"use client";

import * as React from "react";
import { motion, AnimatePresence, PanInfo } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { DEFAULT_IMAGE_DURATION, slideVariants } from "./types";
import type { StoryViewerModalProps } from "./types";
import { ModalHeader } from "./modal-header";
import { StoryContent } from "./story-content";

export function StoryViewerModal({
  stories,
  username,
  avatar,
  timestamp,
  initialIndex,
  viewedIndices,
  onClose,
  onStoryChange,
}: StoryViewerModalProps) {
  const [currentIndex, setCurrentIndex] = React.useState(initialIndex);
  const [progress, setProgress] = React.useState(0);
  const [isPaused, setIsPaused] = React.useState(false);
  const [isMuted, setIsMuted] = React.useState(true);
  const [duration, setDuration] = React.useState(DEFAULT_IMAGE_DURATION);
  const [localViewedIndices, setLocalViewedIndices] = React.useState(
    () => viewedIndices
  );
  const [direction, setDirection] = React.useState(0);
  const [isVideoReady, setIsVideoReady] = React.useState(false);
  const [isVideoBuffering, setIsVideoBuffering] = React.useState(false);

  const videoRef = React.useRef<HTMLVideoElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const progressIntervalRef = React.useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = React.useRef<number>(0);
  const elapsedRef = React.useRef<number>(0);

  const currentStory = stories[currentIndex];

  const goToNext = React.useCallback(() => {
    if (currentIndex < stories.length - 1) {
      setDirection(1);
      setCurrentIndex((prev) => prev + 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      onClose();
    }
  }, [currentIndex, stories.length, onClose]);

  const goToPrevious = React.useCallback(() => {
    if (currentIndex > 0) {
      setDirection(-1);
      setCurrentIndex((prev) => prev - 1);
      setProgress(0);
      elapsedRef.current = 0;
    } else {
      setProgress(0);
      elapsedRef.current = 0;
    }
  }, [currentIndex]);

  React.useEffect(() => {
    setLocalViewedIndices((prev) => {
      const next = new Set(prev);
      next.add(currentIndex);
      return next;
    });
    onStoryChange(currentIndex);
  }, [currentIndex, onStoryChange]);

  React.useEffect(() => {
    if (currentStory.type === "image") {
      setDuration(currentStory.duration || DEFAULT_IMAGE_DURATION);
    }
  }, [currentStory]);

  React.useEffect(() => {
    if (currentStory.type === "video") {
      if (isPaused) {
        if (videoRef.current && !videoRef.current.paused) {
          videoRef.current.pause();
        }
      } else if (isVideoReady && !isVideoBuffering) {
        if (videoRef.current && videoRef.current.paused) {
          videoRef.current.play().catch(() => {});
        }
      }
      return;
    }

    if (isPaused || !isVideoReady) {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
      return;
    }

    startTimeRef.current = Date.now() - elapsedRef.current;

    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      elapsedRef.current = elapsed;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        goToNext();
      }
    }, 50);

    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [isPaused, duration, goToNext, currentStory.type, isVideoReady, isVideoBuffering]);

  React.useEffect(() => {
    setProgress(0);
    elapsedRef.current = 0;
    startTimeRef.current = Date.now();
    setIsVideoReady(false);
    setIsVideoBuffering(false);
  }, [currentIndex]);

  const handleVideoReady = React.useCallback((videoDuration: number) => {
    setDuration(videoDuration);
    setIsVideoReady(true);
    setIsVideoBuffering(false);
  }, []);

  const handleVideoTimeUpdate = React.useCallback(
    (currentTime: number, videoDuration: number) => {
      if (videoDuration > 0) {
        setProgress((currentTime / videoDuration) * 100);
      }
    },
    []
  );

  const handleVideoWaiting = React.useCallback(() => setIsVideoBuffering(true), []);
  const handleVideoPlaying = React.useCallback(() => setIsVideoBuffering(false), []);
  const handleVideoEnded = React.useCallback(() => goToNext(), [goToNext]);
  const handleImageLoad = React.useCallback(() => setIsVideoReady(true), []);

  const handlePointerDown = React.useCallback(() => setIsPaused(true), []);
  const handlePointerUp = React.useCallback(() => setIsPaused(false), []);

  const handleTap = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const clientX = "touches" in e ? e.changedTouches[0].clientX : e.clientX;
      if (clientX - rect.left < rect.width / 2) goToPrevious();
      else goToNext();
    },
    [goToNext, goToPrevious]
  );

  const handleDragEnd = React.useCallback(
    (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
      const { offset, velocity } = info;
      if (Math.abs(offset.x) > 50 || Math.abs(velocity.x) > 500) {
        if (offset.x > 0) goToPrevious();
        else goToNext();
      }
      if (offset.y > 100 || velocity.y > 500) onClose();
    },
    [goToNext, goToPrevious, onClose]
  );

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowLeft": goToPrevious(); break;
        case "ArrowRight": goToNext(); break;
        case "Escape": onClose(); break;
        case " ": e.preventDefault(); setIsPaused((prev) => !prev); break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrevious, onClose]);

  React.useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        ref={containerRef}
        className="relative w-full h-full max-w-lg mx-auto flex flex-col overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
        drag="x"
        dragConstraints={{ left: 0, right: 0 }}
        dragElastic={0.1}
        onDragEnd={handleDragEnd}
        onPointerDown={handlePointerDown}
        onPointerUp={handlePointerUp}
        onPointerLeave={handlePointerUp}
      >
        <ModalHeader
          stories={stories}
          currentIndex={currentIndex}
          progress={progress}
          viewedIndices={localViewedIndices}
          username={username}
          avatar={avatar}
          timestamp={timestamp}
          isPaused={isPaused}
          isMuted={isMuted}
          currentStoryType={currentStory.type}
          onToggleMute={() => setIsMuted((prev) => !prev)}
          onClose={onClose}
        />

        {/* Story content area */}
        <div
          className="flex-1 flex items-center justify-center overflow-hidden select-none relative"
          onClick={handleTap}
        >
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={currentStory.id}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <StoryContent
                story={currentStory}
                isMuted={isMuted}
                isInitialLoading={!isVideoReady}
                isBuffering={isVideoBuffering}
                onVideoReady={handleVideoReady}
                onVideoTimeUpdate={handleVideoTimeUpdate}
                onVideoWaiting={handleVideoWaiting}
                onVideoPlaying={handleVideoPlaying}
                onVideoEnded={handleVideoEnded}
                onImageLoad={handleImageLoad}
                videoRef={videoRef}
              />
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Desktop navigation arrows */}
        <div className="hidden md:flex absolute inset-y-0 left-0 right-0 items-center justify-between pointer-events-none px-4">
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center",
              "h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors pointer-events-auto",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50",
              "disabled:pointer-events-none disabled:opacity-50",
              currentIndex === 0 && "opacity-50 cursor-not-allowed"
            )}
            onClick={(e) => { e.stopPropagation(); goToPrevious(); }}
            disabled={currentIndex === 0}
            aria-label="Previous story"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            type="button"
            className={cn(
              "inline-flex items-center justify-center",
              "h-10 w-10 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors pointer-events-auto",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50"
            )}
            onClick={(e) => { e.stopPropagation(); goToNext(); }}
            aria-label={currentIndex === stories.length - 1 ? "Close" : "Next story"}
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
