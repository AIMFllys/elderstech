import type { ReactNode } from "react";

export interface AboutService {
  icon: ReactNode;
  secondaryIcon?: ReactNode;
  title: string;
  description: string;
  position: "left" | "right";
}

export interface AboutSectionProps {
  eyebrow: string;
  title: string;
  description: string;
  services: AboutService[];
  imageSrc: string;
  ctaLabel: string;
  ctaDescription: string;
  onCtaClick?: () => void;
  ctaHref?: string;
}
