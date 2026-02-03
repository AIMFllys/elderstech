import Link from "next/link";
import { BackLink } from "@/components/BackLink";
import { aboutActivities, site } from "@/lib/data";

export default function ActivityPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{site.title}</h1>
        <p className="text-foreground/80 mb-12">{site.projectIntro}</p>
        <div className="space-y-8">
          {aboutActivities.map((item, i) => (
            <section key={i} className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10">
              <h2 className="text-xl font-semibold text-hust mb-2">{item.title}</h2>
              <p className="text-foreground/80 text-sm leading-relaxed">{item.desc}</p>
            </section>
          ))}
        </div>
        <p className="mt-12 text-center">
          <Link href="/#about" className="text-hust hover:underline">
            返回首页 · 关于活动
          </Link>
        </p>
      </div>
    </main>
  );
}
