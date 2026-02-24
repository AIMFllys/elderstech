"use client";

import { useEffect, useState } from "react";

interface MousePosition {
  x: number;
  y: number;
}

export default function useMousePosition(): MousePosition {
  const [mousePosition, setMousePosition] = useState<MousePosition>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    let rafId = 0;
    let nextX = 0;
    let nextY = 0;

    const handleMouseMove = (event: MouseEvent) => {
      nextX = event.clientX;
      nextY = event.clientY;

      if (rafId) {
        return;
      }

      rafId = window.requestAnimationFrame(() => {
        setMousePosition((prev) => {
          if (prev.x === nextX && prev.y === nextY) {
            return prev;
          }
          return { x: nextX, y: nextY };
        });
        rafId = 0;
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }
    };
  }, []);

  return mousePosition;
}
