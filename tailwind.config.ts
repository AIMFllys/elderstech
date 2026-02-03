import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        hust: { DEFAULT: "#b8860b", dark: "#8a6608", light: "#e6c875" },
        ink: { DEFAULT: "#5a4b3c", dark: "#e8e6e3" },
        paper: { DEFAULT: "#f8f5f0", dark: "#1a1a1a" },
      },
      fontFamily: {
        xiaowei: ['"ZCOOL XiaoWei"', "STKaiti", "KaiTi", "Microsoft YaHei", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
