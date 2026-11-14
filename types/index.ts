import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";

/** Accepts both Lucide and react-icons components. */
export type AnyIcon = LucideIcon | IconType;

export interface NavItem {
  id: string;
  label: string;
}

export interface Highlight {
  icon: LucideIcon;
  /** Short emphasised part, e.g. "7+ Years". */
  title: string;
  label: string;
}

export interface Stat {
  /** Numeric value animates with a counter; omit for text-only cards. */
  value?: number;
  suffix?: string;
  icon?: LucideIcon;
  title: string;
  description: string;
}

export interface Service {
  id: string;
  number: string;
  title: string;
  icon: LucideIcon;
  summary: string;
  description: string;
  features: string[];
}

export interface Project {
  id: string;
  /** True while this card is a placeholder awaiting real content. */
  placeholder: boolean;
  title: string;
  category: string;
  description: string;
  tech: string[];
  image: { src: string; alt: string; width: number; height: number };
  /** Leave `null` until a real URL exists — buttons render as disabled. */
  liveUrl: string | null;
  caseStudyUrl: string | null;
}

export interface Experience {
  company: string;
  companyUrl?: string;
  title: string;
  period: string;
  /** ISO dates for structured data / <time>. */
  start: string;
  end?: string;
  responsibilities: string[];
  tech: string[];
  current: boolean;
}

export interface Skill {
  name: string;
  icon: AnyIcon;
}

export interface SkillCategory {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
}

export interface Education {
  title: string;
  institution: string;
}

export interface Faq {
  question: string;
  answer: string;
}

export interface Social {
  label: string;
  href: string;
  icon: IconType;
  /** Brand colour used on hover. */
  color: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: string;
  location: string;
  linkedin: string; facebook: string;instagram:string;

}
