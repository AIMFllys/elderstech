"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface GooeyTextProps {
  texts: string[];
  morphTime?: number;
  cooldownTime?: number;
  className?: string;
  textClassName?: string;
}

export function GooeyText({
  texts,
  morphTime = 1,
  cooldownTime = 0.25,
  className,
  textClassName,
}: GooeyTextProps) {
  const text1Ref = React.useRef<HTMLSpanElement>(null);
  const text2Ref = React.useRef<HTMLSpanElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    let textIndex = 0;
    let time = new Date();
    let morph = 0;
    let cooldown = cooldownTime;
    let rafId = 0;
    let isVisible = true;

    const setMorph = (fraction: number) => {
      const safeFraction = Math.max(0.0001, Math.min(1, fraction));
      const inverse = Math.max(0.0001, 1 - safeFraction);
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = `blur(${Math.min(
          8 / safeFraction - 8,
          100
        )}px)`;
        text2Ref.current.style.opacity = `${Math.pow(safeFraction, 0.4) * 100}%`;

        text1Ref.current.style.filter = `blur(${Math.min(
          8 / inverse - 8,
          100
        )}px)`;
        text1Ref.current.style.opacity = `${Math.pow(inverse, 0.4) * 100}%`;
      }
    };

    const setTexts = (index: number) => {
      if (text1Ref.current && text2Ref.current) {
        text1Ref.current.textContent = texts[index % texts.length];
        text2Ref.current.textContent = texts[(index + 1) % texts.length];
      }
    };

    const doCooldown = () => {
      morph = 0;
      if (text1Ref.current && text2Ref.current) {
        text2Ref.current.style.filter = "";
        text2Ref.current.style.opacity = "0%";
        text1Ref.current.style.filter = "";
        text1Ref.current.style.opacity = "100%";
      }
    };

    function animate() {
      if (!isVisible) {
        rafId = 0;
        return;
      }
      rafId = requestAnimationFrame(animate);
      const newTime = new Date();
      const dt = (newTime.getTime() - time.getTime()) / 1000;
      time = newTime;

      const isCooling = cooldown > 0;
      if (isCooling) {
        cooldown -= dt;
        doCooldown();
        if (cooldown <= 0) {
          morph = 0;
        }
        return;
      }

      morph += dt;
      let fraction = morph / morphTime;

      if (fraction >= 1) {
        fraction = 1;
        morph = 0;
        cooldown = cooldownTime;
        textIndex = (textIndex + 1) % texts.length;
        setTexts(textIndex);
        doCooldown();
        return;
      }

      setMorph(fraction);
    }

    setTexts(textIndex);
    doCooldown();

    // IntersectionObserver to pause animation when off-screen
    const el = containerRef.current;
    let observer: IntersectionObserver | undefined;
    if (el) {
      observer = new IntersectionObserver(
        ([entry]) => {
          isVisible = entry.isIntersecting;
          if (isVisible && !rafId) {
            time = new Date();
            animate();
          }
        },
        { threshold: 0.1 }
      );
      observer.observe(el);
    }

    animate();

    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      rafId = 0;
      observer?.disconnect();
    };
  }, [texts, morphTime, cooldownTime]);

  return (
    <div ref={containerRef} className={cn("relative", className)}>
      <svg className="absolute h-0 w-0" aria-hidden="true" focusable="false">
        <defs>
          <filter id="threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0
                      0 1 0 0 0
                      0 0 1 0 0
                      0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="flex items-center justify-center"
        style={{ filter: "url(#threshold)" }}
      >
        <span
          ref={text1Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
        <span
          ref={text2Ref}
          className={cn(
            "absolute inline-block select-none text-center text-6xl md:text-[60pt]",
            "text-foreground",
            textClassName
          )}
        />
      </div>
    </div>
  );
}
