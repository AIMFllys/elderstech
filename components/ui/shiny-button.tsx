"use client";

import React from "react";
import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface ShinyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const ShinyButton: React.FC<ShinyButtonProps> = ({
  children,
  className,
  onClick,
}) => {
  return (
    <motion.button
      initial={{ scale: 0.8 }}
      animate={{ scale: 1 }}
      whileTap={{ scale: 0.95 }}
      transition={{
        scale: {
          type: "spring",
          stiffness: 200,
          damping: 5,
          mass: 0.5,
        },
      }}
      onClick={onClick}
      className={cn(
        "shiny-button relative rounded-lg px-6 py-2 font-medium backdrop-blur-xl transition-shadow duration-300 ease-in-out hover:shadow dark:bg-[radial-gradient(circle_at_50%_0%,hsl(var(--primary)/10%)_0%,transparent_60%)] dark:hover:shadow-[0_0_20px_hsl(var(--primary)/10%)]",
        className
      )}
    >
      <span
        className="relative block size-full text-sm uppercase tracking-wide text-[rgb(0,0,0,65%)] dark:font-light dark:text-[rgb(255,255,255,90%)]"
        style={{
          maskImage:
            "linear-gradient(-75deg,hsl(var(--primary)) calc(var(--x) + 20%),transparent calc(var(--x) + 30%),hsl(var(--primary)) calc(var(--x) + 100%))",
        }}
      >
        {children}
      </span>
      <span
        style={{
          mask: "linear-gradient(rgb(0,0,0), rgb(0,0,0)) content-box,linear-gradient(rgb(0,0,0), rgb(0,0,0))",
          maskComposite: "exclude",
        }}
        className="absolute inset-0 z-10 block rounded-[inherit] bg-[linear-gradient(-75deg,hsl(var(--primary)/10%)_calc(var(--x)+20%),hsl(var(--primary)/50%)_calc(var(--x)+25%),hsl(var(--primary)/10%)_calc(var(--x)+100%))] p-px"
      ></span>
      <style jsx>{`
        @keyframes shiny-sweep {
          0% { --x: 100%; }
          100% { --x: -100%; }
        }
        @property --x {
          syntax: '<percentage>';
          inherits: false;
          initial-value: 100%;
        }
        .shiny-button {
          animation: shiny-sweep 4s cubic-bezier(0.445, 0.05, 0.55, 0.95) infinite;
          animation-delay: 1s;
        }
      `}</style>
    </motion.button>
  );
};
