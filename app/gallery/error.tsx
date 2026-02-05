"use client";

import { useEffect } from "react";
import { BackLink } from "@/components/layout/back-link";

export default function GalleryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <BackLink />
        <h1 className="text-2xl font-bold mb-2">加载剪影页时出错</h1>
        <p className="text-foreground/80 mb-4">{error.message}</p>
        <button
          type="button"
          onClick={reset}
          className="rounded-lg bg-hust text-white px-4 py-2 hover:bg-hust-dark"
        >
          重试
        </button>
      </div>
    </main>
  );
}
