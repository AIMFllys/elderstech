"use client";

import React, { useMemo, useRef } from "react";
import { cn } from "@/lib/utils";
import { useDimensions } from "@/components/hooks/use-debounced-dimensions";

interface AnimatedGradientProps {
  colors: string[];
  speed?: number;
  blur?: "light" | "medium" | "heavy";
}

const randomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const AnimatedGradient: React.FC<AnimatedGradientProps> = ({
  colors,
  speed = 5,
  blur = "light",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);

  const circleSize = useMemo(
    () => Math.max(dimensions.width, dimensions.height),
    [dimensions.width, dimensions.height]
  );
  const gradientSeeds = useMemo(
    () =>
      colors.map(() => ({
        top: Math.random() * 50,
        left: Math.random() * 50,
        tx1: Math.random() - 0.5,
        ty1: Math.random() - 0.5,
        tx2: Math.random() - 0.5,
        ty2: Math.random() - 0.5,
        tx3: Math.random() - 0.5,
        ty3: Math.random() - 0.5,
        tx4: Math.random() - 0.5,
        ty4: Math.random() - 0.5,
        sizeScale: randomInt(0.5, 1.5),
      })),
    [colors]
  );

  const blurClass =
    blur === "light"
      ? "blur-2xl"
      : blur === "medium"
      ? "blur-3xl"
      : "blur-[100px]";

  return (
    <div ref={containerRef} className="absolute inset-0 overflow-hidden">
      <div className={cn("absolute inset-0", blurClass)}>
        {colors.map((color, index) => {
          const seed = gradientSeeds[index];
          return (
          <svg
            key={index}
            className="absolute animate-background-gradient"
            style={
              {
                top: `${seed.top}%`,
                left: `${seed.left}%`,
                "--background-gradient-speed": `${1 / speed}s`,
                "--tx-1": seed.tx1,
                "--ty-1": seed.ty1,
                "--tx-2": seed.tx2,
                "--ty-2": seed.ty2,
                "--tx-3": seed.tx3,
                "--ty-3": seed.ty3,
                "--tx-4": seed.tx4,
                "--ty-4": seed.ty4,
              } as React.CSSProperties
            }
            width={circleSize * seed.sizeScale}
            height={circleSize * seed.sizeScale}
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="50"
              fill={color}
              className="opacity-30 dark:opacity-[0.15]"
            />
          </svg>
        );
        })}
      </div>
    </div>
  );
};

export { AnimatedGradient };
