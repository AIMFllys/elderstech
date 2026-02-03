import { BackLink } from "@/components/BackLink";
import { stats, site } from "@/lib/data";

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
          <h2 className="text-xl font-semibold text-hust mb-6">核心数据（上一届实践基础）</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {stats.map((item, i) => (
              <div key={i} className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10 text-center">
                <div className="text-2xl font-bold text-hust">
                  {item.value}
                  <span className="text-base">{item.suffix}</span>
                </div>
                <div className="text-sm font-medium mt-1">{item.label}</div>
                <div className="text-xs text-foreground/60 mt-1">{item.desc}</div>
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
