"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Particles } from "@/components/ui/highlighter/index";

import { type LucideIcon } from "lucide-react";

interface MagnetizeButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  particleCount?: number;
  particleColor?: string;
  icon?: LucideIcon;
}

function MagnetizeButton({
  className,
  particleCount = 26,
  particleColor = "#555555",
  icon: Icon,
  onMouseEnter,
  onMouseLeave,
  onFocus,
  onBlur,
  onTouchStart,
  onTouchEnd,
  ...props
}: MagnetizeButtonProps) {
  const [showParticles, setShowParticles] = React.useState(false);

  const handleMouseEnter: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(true);
    onMouseEnter?.(event);
  };

  const handleMouseLeave: React.MouseEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(false);
    onMouseLeave?.(event);
  };

  const handleFocus: React.FocusEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(true);
    onFocus?.(event);
  };

  const handleBlur: React.FocusEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(false);
    onBlur?.(event);
  };

  const handleTouchStart: React.TouchEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(true);
    onTouchStart?.(event);
  };

  const handleTouchEnd: React.TouchEventHandler<HTMLButtonElement> = (event) => {
    setShowParticles(false);
    onTouchEnd?.(event);
  };

  return (
    <Button
      className={cn(
        "group relative min-w-44 h-12 md:h-14 px-6 md:px-8 overflow-hidden touch-none rounded-2xl",
        "bg-white/90 dark:bg-white/10",
        "hover:bg-white dark:hover:bg-white/15",
        "text-black dark:text-white font-semibold",
        "border border-black/5 dark:border-white/10",
        "shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_15px_45px_rgb(0,0,0,0.1)]",
        "backdrop-blur-xl",
        "transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      {...props}
    >
      <span className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
        <span className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-lime-500/20 blur-[90px]" />
        {showParticles ? (
          <Particles
            className="absolute inset-0"
            quantity={particleCount}
            color={particleColor}
            vy={-0.2}
          />
        ) : null}
      </span>
      <span className="relative w-full flex items-center justify-center gap-2.5 text-base md:text-lg">
        {Icon && (
          <Icon className="w-5 h-5 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-12" />
        )}
        {props.children}
      </span>
    </Button>
  );
}

export { MagnetizeButton };
