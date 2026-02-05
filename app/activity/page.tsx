import { BackLink } from "@/components/layout/back-link";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { activitySections, site } from "@/lib/data";

export default function ActivityPage() {
  return (
    <AuroraBackground
      className="items-stretch justify-start text-foreground"
      showRadialGradient={false}
    >
      <main className="py-12 px-4">
        <div className="container mx-auto max-w-3xl">
          <BackLink />
          <h1 className="text-3xl md:text-4xl font-bold mb-4">{site.title}</h1>
          <p className="text-foreground/80 mb-12">{site.projectIntro}</p>
          <div className="space-y-8">
            {activitySections.map((item, i) => (
              <section
                key={i}
                className="p-6 rounded-xl bg-background/80 backdrop-blur-sm border border-ink/10 dark:border-ink-dark/20"
              >
                <h2 className="text-xl font-semibold text-hust mb-2">
                  {item.title}
                </h2>
                <p className="text-foreground/80 text-sm leading-relaxed">
                  {item.desc}
                </p>
              </section>
            ))}
          </div>
        </div>
      </main>
    </AuroraBackground>
  );
}
