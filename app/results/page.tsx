import { BackLink } from "@/components/layout/back-link";
import { AnimatedGradient } from "@/components/ui/animated-gradient-with-svg";
import { Text_03 } from "@/components/ui/wave-text";
import { stats, site, statsIntro } from "@/lib/data";

const cardColors = [
  ["#B8860B", "#E6C875", "#F6E5B6"],
  ["#E1B84A", "#A0895C", "#F3E6CC"],
  ["#7A5E3A", "#B89B70", "#F3E6CC"],
  ["#C99C49", "#F1D79C", "#8A6B3F"],
  ["#A66B2A", "#E4B87A", "#F7E1B5"],
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">调研成果</h1>
        <p className="text-foreground/80 mb-12">
          {site.title}：优秀调研报告、优秀图文视频、优秀宣传报道等成果统计与展示。
        </p>
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-hust mb-2">
            核心数据（上一届实践基础）
          </h2>
          <p className="text-foreground/70 mb-6">{statsIntro}</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {stats.map((item, i) => (
              <div
                key={i}
                className={`relative overflow-hidden h-full rounded-2xl border border-ink/10 dark:border-ink-dark/20 bg-background/70 ${
                  i === 0 || i === 3 ? "md:col-span-2" : ""
                }`}
              >
                <AnimatedGradient
                  colors={cardColors[i % cardColors.length]}
                  speed={0.06}
                  blur="medium"
                />
                <div className="relative z-10 p-6 md:p-8 text-foreground">
                  <h3 className="text-sm md:text-base text-foreground/80">
                    {item.label}
                  </h3>
                  <div className="mb-2">
                    <Text_03
                      text={`${item.value}${item.suffix ?? ""}`}
                      className="text-left text-3xl md:text-4xl font-semibold text-black dark:text-foreground"
                    />
                  </div>
                  <p className="text-sm text-foreground/70">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-hust mb-4">成果类型</h2>
          <ul className="space-y-4">
            <li className="p-4 rounded-xl bg-background dark:bg-background border border-ink/10">
              <strong>优秀调研报告：</strong>围绕经济发展、文化传承、社会治理、乡村振兴等主题，形成调研报告，字数在15000字以内。
            </li>
            <li className="p-4 rounded-xl bg-background dark:bg-background border border-ink/10">
              <strong>优秀图文视频：</strong>摄影作品、视频作品、我的「返家乡」实践故事。
            </li>
            <li className="p-4 rounded-xl bg-background dark:bg-background border border-ink/10">
              <strong>优秀宣传报道：</strong>各类官方媒体报道的新闻标题和链接。
            </li>
          </ul>
        </section>
      </div>
    </main>
  );
}
