import { BackLink } from "@/components/layout/back-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { StoryViewer } from "@/components/ui/story-viewer";
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

  const storyImages = [
    "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=800&q=80",
  ];

  const storyUsers = [...orderedMembers, ...instructors].map((person, index) => ({
    username: person.name,
    avatar: person.avatar,
    timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000).toISOString(),
    stories: [
      {
        id: `${person.name}-story-1`,
        type: "image" as const,
        src: storyImages[index % storyImages.length],
      },
    ],
  }));

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

        <section className="mt-12 rounded-2xl border border-ink/10 dark:border-ink-dark/20 bg-background/80 dark:bg-background/60 p-6">
          <h2 className="text-xl font-semibold text-black dark:text-white mb-2">
            成员调研动态
          </h2>
          <p className="text-sm text-black/70 dark:text-white/70 mb-4">
            点击头像查看成员的调研记录与实践瞬间。
          </p>
          <div className="flex gap-4 overflow-x-auto py-2 px-1 [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
            {storyUsers.map((user) => (
              <StoryViewer
                key={user.username}
                stories={user.stories}
                username={user.username}
                avatar={user.avatar}
                timestamp={user.timestamp}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
