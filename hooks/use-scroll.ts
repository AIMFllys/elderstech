"use client";

import React from "react";

export function useScroll(threshold: number) {
  const [scrolled, setScrolled] = React.useState(false);
  const rafIdRef = React.useRef<number | null>(null);

  const onScroll = React.useCallback(() => {
    if (rafIdRef.current !== null) {
      return;
    }

    rafIdRef.current = window.requestAnimationFrame(() => {
      const next = window.scrollY > threshold;
      setScrolled((prev) => (prev === next ? prev : next));
      rafIdRef.current = null;
    });
  }, [threshold]);

  React.useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafIdRef.current !== null) {
        window.cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [onScroll]);

  React.useEffect(() => {
    onScroll();
  }, [onScroll]);

  return scrolled;
}
