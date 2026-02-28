import { BackLink } from "@/components/layout/back-link";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { AnimatedTestimonials } from "@/components/ui/animated-testimonials";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { StoryViewer } from "@/components/ui/story-viewer";
import { teamMembers, instructors } from "@/lib/data";
import { FooterSection } from "@/components/home/FooterSection";

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

  const storyImageUrlsFor = (name: string): { src: string; type: "image" | "video" }[] => {
    const imagesMap: Record<string, { src: string; type: "image" | "video" }[]> = {
      "杨佳怡": [
        { src: "/实践成果/照片 视频/杨佳怡_6-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨佳怡_6-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨佳怡_6-3.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨佳怡_6-4.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨佳怡_6-5.jpg", type: "image" },
      ],
      "何佳欢": [
        { src: "/实践成果/照片 视频/何佳欢_8-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/何佳欢_8-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/何佳欢_8-3.jpg", type: "image" },
      ],
      "丁文轩": [],
      "赵梓舒": [
        { src: "/实践成果/照片 视频/赵梓舒_2-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/赵梓舒_2-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/赵梓舒_2-3.jpg", type: "image" },
      ],
      "李文龙": [
        { src: "/实践成果/照片 视频/李文龙_4-1.jpg", type: "image" },
      ],
      "张星睿": [
        { src: "/实践成果/照片 视频/张星睿_3-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/张星睿_3-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/张星睿_3-3.jpg", type: "image" },
        { src: "/实践成果/照片 视频/张星睿_3-4 老年人照片.jpg", type: "image" },
        { src: "/实践成果/照片 视频/张星睿_3-5 老年人照片.jpg", type: "image" },
      ],
      "罗宇然": [
        { src: "/实践成果/照片 视频/罗宇然_5-1.png", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-2.png", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-3.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-4 地点.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-5.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-6.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-7.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-8 开头.mp4", type: "video" },
        { src: "/实践成果/照片 视频/罗宇然_5-9.jpg", type: "image" },
        { src: "/实践成果/照片 视频/罗宇然_5-10 门口.jpg", type: "image" },
      ],
      "周嘉琦": [
        { src: "/实践成果/照片 视频/周嘉琪_1-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/周嘉琪_1-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/周嘉琪_1-3.jpg", type: "image" },
        { src: "/实践成果/照片 视频/周嘉琪_1-4.jpg", type: "image" },
        { src: "/实践成果/照片 视频/周嘉琪_1-5 地点照片.jpg", type: "image" },
        { src: "/实践成果/照片 视频/周嘉琪_1-6 医院门口照片.jpg", type: "image" },
      ],
      "孔德羽": [
        { src: "/实践成果/照片 视频/孔德羽开发记录1.png", type: "image" },
        { src: "/实践成果/照片 视频/孔德羽开发记录2.png", type: "image" },
        { src: "/实践成果/照片 视频/孔德羽开发记录3.png", type: "image" },
        { src: "/实践成果/照片 视频/孔德羽开发记录4.png", type: "image" },
        { src: "/实践成果/照片 视频/孔德羽开发记录5.png", type: "image" },
      ],
      "杨静萱": [
        { src: "/实践成果/照片 视频/杨静萱_7-1.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨静萱_7-2.jpg", type: "image" },
        { src: "/实践成果/照片 视频/杨静萱_7-3 视频.mp4", type: "video" },
      ]
    };
    return imagesMap[name] || [];
  };

  const storyUsers = orderedMembers
    .map((person, index) => {
      const items = storyImageUrlsFor(person.name);
      return {
        username: person.name,
        avatar: person.avatar,
        timestamp: new Date(Date.now() - (index + 1) * 60 * 60 * 1000).toISOString(),
        stories: items.map((item, i) => ({
          id: `${person.name}-story-${i + 1}`,
          type: item.type,
          src: item.src,
        })),
      };
    })
    .filter((user) => user.stories.length > 0);

  return (
    <AuroraBackground
      className="min-h-screen h-auto items-stretch justify-start bg-sky-50/70 dark:bg-slate-950/40 text-foreground py-8 px-4 [--aurora:repeating-linear-gradient(100deg,#dbeafe_10%,#c7d2fe_15%,#bae6fd_20%,#eff6ff_25%,#93c5fd_30%)]"
    >
      <div className="w-full">
        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="mb-6 flex items-start justify-between relative z-[1100] py-2">
            <div className="relative z-[1101]">
              <BackLink />
            </div>
            <div className="relative z-[1101]">
              <ThemeToggle />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-black dark:text-white">
            团队成员
          </h1>
          <p className="text-foreground/70 dark:text-white/70 mb-6 font-sans">
            指导教师与成员风采展示，点击左右箭头切换查看。
          </p>
          <AnimatedTestimonials testimonials={testimonials} />

          <section className="mt-12 mb-20 rounded-2xl border border-ink/10 dark:border-ink-dark/20 bg-background/80 dark:bg-background/60 p-6 mx-auto w-full md:w-fit md:min-w-[600px] md:max-w-[95%] lg:max-w-none md:px-8 flex flex-col items-center shadow-lg backdrop-blur-sm relative z-20">
            <h2 className="text-xl font-semibold text-black dark:text-white mb-1 self-start w-full">
              成员调研动态
            </h2>
            <p className="text-sm text-black/70 dark:text-white/70 mb-5 self-start w-full">
              点击头像查看成员的调研记录与实践瞬间。
            </p>
            <div className="flex gap-3 md:gap-5 overflow-x-auto py-2 px-1 w-full justify-start md:justify-center [&::-webkit-scrollbar]:hidden md:[&::-webkit-scrollbar]:block md:[&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-muted-foreground/30">
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
        <FooterSection compact />
      </div>
    </AuroraBackground>
  );
}
