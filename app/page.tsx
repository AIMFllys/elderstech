import { HeroSection } from "@/components/home/HeroSection";
import { TimelineSection } from "@/components/home/TimelineSection";
import { AboutSection } from "@/components/home/AboutSection";
import { StatsSection } from "@/components/home/StatsSection";
import { NavCardsSection } from "@/components/home/NavCardsSection";
import { AppDownloadSection } from "@/components/home/AppDownloadSection";
import { TeamSection } from "@/components/home/TeamSection";
import { FooterSection } from "@/components/home/FooterSection";
import { AuroraBackground } from "@/components/ui/aurora-background";

export default function Home() {
  return (
    <AuroraBackground className="min-h-screen h-auto items-stretch justify-start text-foreground">
      <HeroSection />
      <TimelineSection />
      <AboutSection />
      <NavCardsSection />
      <AppDownloadSection />
      <StatsSection />
      <TeamSection />
      <FooterSection />
    </AuroraBackground>
  );
}
