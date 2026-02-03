"use client";

import Link from "next/link";
import { AnimatedTooltip } from "@/components/ui/animated-tooltip";
import { teamMembers, instructors, teamIntro } from "@/lib/data";

export function TeamSection() {
  const tooltipItems = teamMembers.map((member, index) => ({
    id: index + 1,
    name: member.name,
    designation: member.role
      ? `${member.role} · ${member.college}`
      : member.college,
    image: member.avatar,
  }));

  return (
    <section
      id="team"
      className="py-16 md:py-24 px-4 text-foreground"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          团队展示
        </h2>
        <p className="text-center text-foreground/80 mb-10">{teamIntro}</p>
        <div className="flex justify-center mb-10">
          <AnimatedTooltip items={tooltipItems} />
        </div>
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-hust mb-4">指导教师</h3>
          <ul className="flex flex-wrap gap-4">
            {instructors.map((p, i) => (
              <li
                key={i}
                className="px-4 py-2 rounded-lg bg-paper dark:bg-background border border-ink/10"
              >
                <span className="font-medium">{p.name}</span>
                <span className="text-sm text-foreground/70 ml-2">
                  {p.title}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
          {teamMembers.slice(0, 6).map((m, i) => (
            <div
              key={i}
              className="p-4 rounded-xl bg-paper dark:bg-background border border-ink/10 dark:border-ink-dark/20"
            >
              <div className="font-semibold">
                {m.name}
                {m.role && (
                  <span className="ml-2 text-xs text-hust">({m.role})</span>
                )}
              </div>
              <div className="text-sm text-foreground/70 mt-1">{m.college}</div>
              <div className="text-xs text-foreground/60 mt-1">{m.place}</div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <Link
            href="/team"
            className="inline-block px-8 py-3 rounded-lg bg-hust text-white hover:bg-hust-dark transition-colors"
          >
            查看全部成员
          </Link>
        </div>
      </div>
    </section>
  );
}
