import { BackLink } from "@/components/BackLink";

/** 记录页：调研手抄报/手账记录（来自社会实践具体安排：1-2页电子手账，时间地点内容意义） */
export default function RecordsPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-3xl">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-4">调研记录</h1>
        <p className="text-foreground/80 mb-12">
          调研手抄报与电子手账记录：形式为 1–2 页电子手账，需包括时间、地点、内容、意义。
        </p>
        <section className="space-y-6">
          <div className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10">
            <h2 className="text-lg font-semibold text-hust mb-2">提交要求</h2>
            <ul className="text-sm text-foreground/80 space-y-2 list-disc list-inside">
              <li>形式：1–2 页电子手账</li>
              <li>内容要素：时间、地点、内容、意义</li>
              <li>截止时间：2.10</li>
              <li>模板参考：小红书中后两页黑色底图风格</li>
            </ul>
          </div>
          <div className="p-6 rounded-xl bg-background dark:bg-background border border-ink/10">
            <p className="text-sm text-foreground/80">
              实地走访与采访记录将在此展示：所去地点的智能化建设与应用、带来的方便，以及采访问题与答案。程序设计在集中收集实践所得意见后展开。
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
