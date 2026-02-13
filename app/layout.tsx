import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { HeaderGuard } from "@/components/layout/header-guard";

export const metadata: Metadata = {
  title: "智慧医养赋能计划",
  description: "桑梓智护，心驿耆年——智慧医养赋能计划",
  icons: {
    icon: '/favicon.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.loli.net/css2?family=ZCOOL+XiaoWei&display=swap"
          rel="stylesheet"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(!t&&d))document.documentElement.classList.add('dark');else document.documentElement.classList.remove('dark');})();`,
          }}
        />
      </head>
      <body className="antialiased bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark">
        <ThemeProvider>
          <HeaderGuard />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
