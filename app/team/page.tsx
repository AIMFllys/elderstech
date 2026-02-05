import { BackLink } from "@/components/layout/back-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { teamMembers, instructors } from "@/lib/data";

export default function TeamPage() {
  const orderedMembers = [...teamMembers].sort((a, b) => {
    if (a.name === "杨佳怡") return -1;
    if (b.name === "杨佳怡") return 1;
    return 0;
  });

  const testimonials = [
    ...orderedMembers.map((m) => ({
      quote: `性别：${m.gender}\n实践地点：${m.place}`,
      name: m.name,
      designation: `${m.role ? `${m.role}｜` : ""}${m.college}`,
      src: m.avatar,
    })),
    ...instructors.map((p) => ({
      quote: `研究方向：${p.research}`,
      name: p.name,
      designation: p.title,
      src: p.avatar,
    })),
  ];

  return (
    <main className="min-h-screen bg-paper dark:bg-paper-dark text-foreground py-8 px-4">
      <div className="container mx-auto max-w-5xl">
        <div className="mb-6 flex items-start justify-between">
          <BackLink />
          <ThemeToggle />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
          团队成员
        </h1>
        <p className="text-foreground/70 dark:text-white/70 mb-6">
          指导教师与成员风采展示，点击左右箭头切换查看。
        </p>
        <AnimatedTestimonials testimonials={testimonials} />
      </div>
    </main>
  );
}
