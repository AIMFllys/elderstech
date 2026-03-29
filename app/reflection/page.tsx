import fs from "fs/promises";
import path from "path";
import ReportViewer from "@/components/reflection/ReportViewer";
import { BackLink } from "@/components/layout/back-link";
import { FooterSection } from "@/components/home/FooterSection";

export const metadata = {
  title: "调研报告 · 智慧医养赋能计划",
  description:
    '从"智能"到"适老"：医养结合数字化的现实困境与青年方案——调研报告全文',
};

export default async function ReflectionPage() {
  /* ── 1. Read raw markdown ── */
  const filePath = path.join(
    process.cwd(),
    "public",
    "实践成果",
    "最终调研报告.md"
  );

  let rawText = "";
  try {
    rawText = await fs.readFile(filePath, "utf-8");
  } catch {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-slate-500">
        <h1 className="text-2xl font-bold mb-2">文献读取失败</h1>
        <p>找不到「最终调研报告.md」源文件</p>
      </div>
    );
  }

  const text = rawText.replace(/\r/g, "");

  /* ── 2. Extract overview ── */
  let overviewText = "";
  if (text.includes("【调研概述】")) {
    const start = text.indexOf("【调研概述】") + "【调研概述】".length;
    const end = text.indexOf("\n\n", start);
    overviewText = text.substring(start, end !== -1 ? end : undefined).trim();
  }

  /* ── 3. Title & authors ── */
  const titleMatch = text.match(/从"智能"到"适老"[^\n]+/);
  const title = titleMatch
    ? titleMatch[0].trim()
    : "从智能到适老：智慧医养调研实践";

  const authorsMatch = text.match(/张星睿[^\n]+/);
  const authors = authorsMatch ? authorsMatch[0].trim() : "团队成员";

  /* ── 4. Abstract & keywords ── */
  const abstractMatch = text.match(/摘要：([\s\S]*?)关键词：/);
  const abstract = abstractMatch ? abstractMatch[1].trim() : "";

  const keywordsMatch = text.match(/关键词：([^\n]+)/);
  const keywords = keywordsMatch ? keywordsMatch[1].trim() : "";

  /* ── 5. References ── */
  const refSplit = text.split("参考文献：");
  const referencesRaw = refSplit[1] || "";

  const refRegex = /\[(\d+)\]\s*([^\n]+)/g;
  let m: RegExpExecArray | null;
  const references: Record<string, string> = {};
  while ((m = refRegex.exec(referencesRaw)) !== null) {
    references[m[1]] = m[2].trim();
  }

  /* ── 6. Main body ── */
  let mainBody = refSplit[0];
  const bodyStart = mainBody.indexOf("一、绪论");
  if (bodyStart !== -1) mainBody = mainBody.substring(bodyStart);

  // Normalize newlines to double newlines to ensure paragraphs are split
  mainBody = mainBody
    .split(/\n+/)
    .map((line) => line.trim())
    .filter(Boolean)
    .join("\n\n");

  // Format Headings
  mainBody = mainBody.replace(
    /^(一|二|三|四|五|六|七|八|九|十)、([^\n]+)/gm,
    "# $1、$2"
  );
  mainBody = mainBody.replace(
    /^（(一|二|三|四|五|六|七|八|九|十)）([^\n]+)/gm,
    "## （$1）$2"
  );
  mainBody = mainBody.replace(/^(\d+)\.([\u4e00-\u9fa5].*)/gm, "### $1.$2");

  /* ── 6b. Extract outline for TOC ── */
  const outlineRegex = /^(#{1,3})\s+(.+)$/gm;
  let om: RegExpExecArray | null;
  const outline: { level: number; text: string; id: string }[] = [];
  while ((om = outlineRegex.exec(mainBody)) !== null) {
    const level = om[1].length; // 1, 2, or 3
    const text = om[2].trim();
    const id = `heading-${outline.length}`;
    outline.push({ level, text, id });
  }

  // Convert [n] bracket citations to clickable links
  mainBody = mainBody.replace(/\[(\d+)\]/g, (full, id) => {
    if (references[id]) return `[${id}](cite:${id})`;
    return full;
  });

  // Inject animated interactive charts instead of static images
  mainBody = mainBody.replace(
    /图1 智能手机使用的熟练程度/g,
    `![图1 智能手机使用的熟练程度](/chart1)\n*图1 智能手机使用的熟练程度*`
  );
  mainBody = mainBody.replace(
    /图2 现有智慧医疗产品的使用体验/g,
    `![图2 现有智慧医疗产品的使用体验](/chart2)\n*图2 现有智慧医疗产品的使用体验*`
  );
  mainBody = mainBody.replace(
    /图3 理想产品需求/g,
    `![图3 理想产品需求](/chart3)\n*图3 理想产品需求*`
  );

  /* ── 7. Render ── */
  return (
    <>
      {/* Google Fonts for 黑体 (Noto Sans SC) and 宋体 (Noto Serif SC) — loaded once */}
      {/* eslint-disable-next-line @next/next/no-page-custom-font */}
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;500;700;900&family=Noto+Serif+SC:wght@400;500;600;700&display=swap"
      />

      {/* Page-scoped font override styles */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
            .report-root { font-family: "Noto Serif SC", "SimSun", "STSong", "Songti SC", serif; }
            .report-heading { font-family: "Noto Sans SC", "SimHei", "STHeiti", "Heiti SC", sans-serif !important; }
            .report-body { font-family: "Noto Serif SC", "SimSun", "STSong", "Songti SC", serif; }
            .report-article h1,
            .report-article h2,
            .report-article h3,
            .report-article h4 { font-family: "Noto Sans SC", "SimHei", "STHeiti", "Heiti SC", sans-serif !important; }
          `,
        }}
      />

      <div className="absolute top-8 left-8 z-[100]">
        <BackLink />
      </div>

      <ReportViewer
        overviewText={overviewText}
        title={title}
        authors={authors}
        abstract={abstract}
        keywords={keywords}
        mainBody={mainBody}
        references={references}
        outline={outline}
      />

      <FooterSection compact />
    </>
  );
}
