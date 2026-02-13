import type { RefObject } from "react";

export interface Story {
  id: string;
  type: "image" | "video";
  src: string;
  duration?: number;
}

export interface StoryViewerProps {
  stories: Story[];
  username: string;
  avatar: string;
  timestamp?: string;
  onStoryView?: (storyId: string) => void;
  onAllStoriesViewed?: () => void;
  className?: string;
}

export interface StoryThumbnailProps {
  stories: Story[];
  username: string;
  avatar: string;
  viewedIndices: Set<number>;
  onClick: () => void;
  className?: string;
}

export interface ProgressBarProps {
  count: number;
  currentIndex: number;
  progress: number;
  viewedIndices: Set<number>;
}

export interface StoryContentProps {
  story: Story;
  isMuted: boolean;
  isInitialLoading: boolean;
  isBuffering: boolean;
  onVideoReady: (duration: number) => void;
  onVideoTimeUpdate: (currentTime: number, duration: number) => void;
  onVideoWaiting: () => void;
  onVideoPlaying: () => void;
  onVideoEnded: () => void;
  onImageLoad: () => void;
  videoRef: RefObject<HTMLVideoElement>;
}

export interface StoryViewerModalProps {
  stories: Story[];
  username: string;
  avatar: string;
  timestamp?: string;
  initialIndex: number;
  viewedIndices: Set<number>;
  onClose: () => void;
  onStoryChange: (index: number) => void;
}

export const DEFAULT_IMAGE_DURATION = 5000;

export const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? "100%" : "-100%",
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
  },
  exit: (dir: number) => ({
    x: dir > 0 ? "-100%" : "100%",
    opacity: 0,
  }),
};

export function formatTimestamp(timestamp: string): string {
  const date = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));

  if (diffHours < 1) {
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    return diffMinutes <= 1 ? "Just now" : `${diffMinutes}m ago`;
  }
  if (diffHours < 24) {
    return `${diffHours}h ago`;
  }
  return `${Math.floor(diffHours / 24)}d ago`;
}
