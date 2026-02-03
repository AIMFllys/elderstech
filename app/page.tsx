import { HeroSection } from "@/components/home/HeroSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { NavCardsSection } from "@/components/home/NavCardsSection";
import { TeamSection } from "@/components/home/TeamSection";
import { FooterSection } from "@/components/home/FooterSection";

export default function Home() {
  return (
    <main className="min-h-screen">
      <HeroSection />
      <TimelineSection />
      <AboutSection />
      <StatsSection />
      <NavCardsSection />
      <TeamSection />
      <FooterSection />
    </main>
  );
}
