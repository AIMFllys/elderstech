"use client";

import * as React from "react";
import { createPortal } from "react-dom";
import type { StoryViewerProps } from "./types";
import { StoryThumbnail } from "./story-thumbnail";
import { StoryViewerModal } from "./story-viewer-modal";

export type { Story, StoryViewerProps } from "./types";

const StoryViewer = React.forwardRef<HTMLDivElement, StoryViewerProps>(
  (
    {
      stories,
      username,
      avatar,
      timestamp,
      onStoryView,
      onAllStoriesViewed,
      className,
    },
    ref
  ) => {
    const [isOpen, setIsOpen] = React.useState(false);
    const [mounted, setMounted] = React.useState(false);
    const [viewedIndices, setViewedIndices] = React.useState<Set<number>>(
      () => new Set()
    );

    React.useEffect(() => {
      setMounted(true);
    }, []);

    const firstUnviewedIndex = React.useMemo(() => {
      for (let i = 0; i < stories.length; i += 1) {
        if (!viewedIndices.has(i)) return i;
      }
      return 0;
    }, [stories.length, viewedIndices]);

    const handleOpen = React.useCallback((e?: React.MouseEvent) => {
      e?.stopPropagation();
      setIsOpen(true);
    }, []);

    const handleClose = React.useCallback(() => {
      setIsOpen(false);
    }, []);

    const handleStoryChange = React.useCallback(
      (index: number) => {
        setViewedIndices((prev) => {
          const next = new Set(prev);
          next.add(index);

          if (next.size === stories.length && onAllStoriesViewed) {
            onAllStoriesViewed();
          }

          return next;
        });

        if (onStoryView) {
          onStoryView(stories[index].id);
        }
      },
      [stories, onStoryView, onAllStoriesViewed]
    );

    return (
      <>
        <div ref={ref} className={className} onClick={(e) => e.stopPropagation()}>
          <StoryThumbnail
            stories={stories}
            username={username}
            avatar={avatar}
            viewedIndices={viewedIndices}
            onClick={handleOpen}
          />
        </div>

        {mounted &&
          isOpen &&
          createPortal(
            <StoryViewerModal
              stories={stories}
              username={username}
              avatar={avatar}
              timestamp={timestamp}
              initialIndex={firstUnviewedIndex}
              viewedIndices={viewedIndices}
              onClose={handleClose}
              onStoryChange={handleStoryChange}
            />,
            document.body
          )}
      </>
    );
  }
);

StoryViewer.displayName = "StoryViewer";

export { StoryViewer };
