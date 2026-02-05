"use client";

import { useEffect, useRef } from "react";

const WORDS = ["阅读", "思考", "陪伴", "医养", "调研", "共创", "温度", "连接"];

export function FloatingCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrame = 0;
    const dpr = window.devicePixelRatio || 1;
    const words = WORDS.map((word, index) => ({
      text: word,
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      speed: 0.2 + Math.random() * 0.4,
      size: 12 + (index % 4) * 4,
      opacity: 0.15 + Math.random() * 0.2,
    }));

    const resize = () => {
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
      words.forEach((word) => {
        ctx.font = `${word.size}px "ZCOOL XiaoWei", serif`;
        ctx.fillStyle = `rgba(90, 75, 60, ${word.opacity})`;
        ctx.fillText(word.text, word.x, word.y);
        word.y -= word.speed;
        if (word.y < -20) {
          word.y = window.innerHeight + 20;
          word.x = Math.random() * window.innerWidth;
        }
      });
      animationFrame = window.requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, []);

  return <canvas id="floatCanvas" ref={canvasRef} aria-hidden="true" />;
}
