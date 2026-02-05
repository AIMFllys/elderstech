"use client";

import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated/animated-tooltip";
import { ShinyButton } from "@/components/ui/shiny-button";
import { teamMembers, instructors, teamIntro } from "@/lib/data";

export function TeamSection() {
  // 合并指导老师和团队成员为统一的展示列表
  const allMembers = [
    ...instructors.map((instructor, index) => ({
      id: index + 1,
      name: instructor.name,
      designation: `${instructor.title} · ${instructor.research}`,
      image: instructor.avatar,
    })),
    ...teamMembers.map((member, index) => ({
      id: instructors.length + index + 1,
      name: member.name,
      designation: member.role
        ? `${member.role} · ${member.college}`
        : member.college,
      image: member.avatar,
    })),
  ];

  return (
    <section
      id="team"
      className="py-16 md:py-24 px-4 text-foreground"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          团队展示
        </h2>
        <p className="text-center text-foreground/80 mb-12">{teamIntro}</p>
        <div className="flex justify-center mb-12">
          <AnimatedTooltip items={allMembers} />
        </div>
        <div className="text-center">
          <Link href="/team" className="inline-flex">
            <ShinyButton className="bg-background/80 text-foreground border border-ink/20 dark:border-ink-dark/20">
              查看团队详情
            </ShinyButton>
          </Link>
        </div>
      </div>
    </section>
  );
}
