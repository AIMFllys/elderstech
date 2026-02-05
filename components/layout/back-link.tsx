"use client";

import Link from "next/link";

export function BackLink() {
  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-hust hover:text-hust-dark transition-colors mb-8"
    >
      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
      </svg>
      返回首页
    </Link>
  );
}
