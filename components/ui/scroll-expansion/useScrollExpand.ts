"use client";

import { useEffect, useRef, useState, type TouchEvent, type WheelEvent } from "react";

export function useScrollExpand(mediaType: "video" | "image") {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] =
    useState<boolean>(false);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [, setAllowScrollOverride] = useState<boolean>(false);

  const mediaFullyExpandedRef = useRef(false);
  const allowScrollOverrideRef = useRef(false);
  const touchStartYRef = useRef(0);
  const allowScrollTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    mediaFullyExpandedRef.current = false;
  }, [mediaType]);

  useEffect(() => {
    const handleHashChange = () => {
      allowScrollOverrideRef.current = true;
      setAllowScrollOverride(true);

      if (allowScrollTimerRef.current) {
        clearTimeout(allowScrollTimerRef.current);
      }

      allowScrollTimerRef.current = setTimeout(() => {
        allowScrollOverrideRef.current = false;
        setAllowScrollOverride(false);
      }, 1200);
    };

    const handleWheel = (e: WheelEvent) => {
      if (allowScrollOverrideRef.current) {
        return;
      }

      const atTop = window.scrollY <= 5;
      if (!mediaFullyExpandedRef.current && !atTop) {
        return;
      }

      if (mediaFullyExpandedRef.current && e.deltaY < 0 && atTop) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
        return;
      }

      if (mediaFullyExpandedRef.current) {
        return;
      }

      e.preventDefault();
      const scrollDelta = e.deltaY * 0.0009;

      setScrollProgress((prev) => {
        const newProgress = Math.min(Math.max(prev + scrollDelta, 0), 1);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        return newProgress;
      });
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0].clientY;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (allowScrollOverrideRef.current || touchStartYRef.current === 0) {
        return;
      }

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartYRef.current - touchY;
      const atTop = window.scrollY <= 5;

      if (!mediaFullyExpandedRef.current && !atTop) {
        touchStartYRef.current = touchY;
        return;
      }

      if (mediaFullyExpandedRef.current && deltaY < -20 && atTop) {
        setMediaFullyExpanded(false);
        mediaFullyExpandedRef.current = false;
        e.preventDefault();
        return;
      }

      if (mediaFullyExpandedRef.current) {
        touchStartYRef.current = touchY;
        return;
      }

      e.preventDefault();
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      const scrollDelta = deltaY * scrollFactor;

      setScrollProgress((prev) => {
        const newProgress = Math.min(Math.max(prev + scrollDelta, 0), 1);

        if (newProgress >= 1) {
          setMediaFullyExpanded(true);
          mediaFullyExpandedRef.current = true;
          setShowContent(true);
        } else if (newProgress < 0.75) {
          setShowContent(false);
        }

        return newProgress;
      });

      touchStartYRef.current = touchY;
    };

    const handleTouchEnd = (): void => {
      touchStartYRef.current = 0;
    };

    window.addEventListener("wheel", handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener("hashchange", handleHashChange as EventListener);
    window.addEventListener(
      "touchstart",
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      "touchmove",
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener("touchend", handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        "wheel",
        handleWheel as unknown as EventListener
      );
      window.removeEventListener(
        "hashchange",
        handleHashChange as EventListener
      );
      window.removeEventListener(
        "touchstart",
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        "touchmove",
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener("touchend", handleTouchEnd as EventListener);

      if (allowScrollTimerRef.current) {
        clearTimeout(allowScrollTimerRef.current);
        allowScrollTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener("resize", checkIfMobile);

    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return { scrollProgress, showContent, mediaFullyExpanded, isMobileState };
}
