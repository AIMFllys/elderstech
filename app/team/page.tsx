import { BackLink } from "@/components/layout/back-link";
import { teamMembers, instructors } from "@/lib/data";

export default function TeamPage() {
  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-ink dark:text-ink-dark py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <BackLink />
        <h1 className="text-3xl md:text-4xl font-bold mb-8">团队成员</h1>
        <section className="mb-12">
          <h2 className="text-xl font-semibold text-hust mb-4">指导教师</h2>
          <ul className="grid sm:grid-cols-3 gap-4">
            {instructors.map((p, i) => (
              <li key={i} className="p-4 rounded-xl bg-background dark:bg-background border border-ink/10">
                <div className="font-medium">{p.name}</div>
                <div className="text-sm text-foreground/70">{p.title}</div>
                <div className="text-xs text-foreground/60">{p.research}</div>
              </li>
            ))}
          </ul>
        </section>
        <section>
          <h2 className="text-xl font-semibold text-hust mb-4">成员名单（共{teamMembers.length}人）</h2>
          <ul className="grid sm:grid-cols-2 gap-4">
            {teamMembers.map((m, i) => (
              <li key={i} className="p-4 rounded-xl bg-background dark:bg-background border border-ink/10">
                <div className="font-semibold">
                  {m.name}
                  {m.role && <span className="ml-2 text-sm text-hust">({m.role})</span>}
                </div>
                <div className="text-sm text-foreground/70 mt-1">{m.college}</div>
                <div className="text-sm text-foreground/70 mt-1">实践地点：{m.place}</div>
                <div className="text-xs text-foreground/60 mt-1">联系电话：{m.phone}</div>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
}
