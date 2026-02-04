"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/highlighter/index";

interface MagnetizeButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  particleCount?: number;
  particleColor?: string;
}

function MagnetizeButton({
  className,
  particleCount = 26,
  particleColor = "#555555",
  ...props
}: MagnetizeButtonProps) {
  return (
    <Button
      className={cn(
        "group relative min-w-40 h-10 md:h-11 px-5 md:px-7 overflow-hidden touch-none",
        "bg-white/10 dark:bg-white/5",
        "hover:bg-white/18 dark:hover:bg-white/10",
        "text-[#f4e7c6] dark:text-white",
        "border border-[#f0d89a]/70 dark:border-white/30",
        "shadow-[0_6px_20px_rgba(0,0,0,0.18)]",
        "backdrop-blur-[2px]",
        "transition-all duration-300",
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/20 blur-[90px]" />
        <Particles
          className="absolute inset-0"
          quantity={particleCount}
          color={particleColor}
          vy={-0.2}
        />
      </span>
      <span className="relative w-full flex items-center justify-center gap-2 text-base md:text-lg">
        {props.children}
      </span>
    </Button>
  );
}

export { MagnetizeButton };
