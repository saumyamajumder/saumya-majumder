import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFab } from "@/components/layout/WhatsAppFab";
import { AboutSection } from "@/components/sections/AboutSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { CtaBand } from "@/components/sections/CtaBand";
import { EducationSection } from "@/components/sections/EducationSection";
import { ExperienceTimeline } from "@/components/sections/ExperienceTimeline";
import { FaqSection } from "@/components/sections/FaqSection";
import { HeroSection } from "@/components/sections/HeroSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { StructuredData } from "@/components/StructuredData";
import type { ReactNode } from "react";

/**
 * Wrapper for every below-the-fold section: `cv-auto` (content-visibility:
 * auto) lets the browser skip its layout and paint until it nears the
 * viewport, so the first frame only renders the hero.
 *
 * Deliberately no <Suspense> here: boundaries make React stream each section
 * as an out-of-order segment, and a boundary that is still pending when an
 * update arrives gets client-rendered (its server DOM replaced).
 */
function Deferred({ children }: { children: ReactNode }) {
  return <div className="cv-auto">{children}</div>;
}

export default function Home() {
  return (
    <>
      <StructuredData />
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-foreground focus:px-5 focus:py-3 focus:text-background"
      >
        Skip to content
      </a>
      <Header />
      <main id="main">
        <HeroSection />
        <Deferred>
          <AboutSection />
        </Deferred>
        <Deferred>
          <ServicesSection />
        </Deferred>
        <Deferred>
          <ProjectsSection />
        </Deferred>
        <Deferred>
          <ExperienceTimeline />
        </Deferred>
        <Deferred>
          <SkillsSection />
        </Deferred>
        <Deferred>
          <EducationSection />
        </Deferred>
        <Deferred>
          <CtaBand />
        </Deferred>
        <Deferred>
          <FaqSection />
        </Deferred>
        <Deferred>
          <ContactSection />
        </Deferred>
      </main>
      <Deferred>
        <Footer />
      </Deferred>
      {/* position: fixed, so not inside a content-visibility (paint-contained) wrapper. */}
      <WhatsAppFab />
    </>
  );
}
