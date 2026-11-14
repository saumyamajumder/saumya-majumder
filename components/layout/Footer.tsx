"use client";

import { SocialLinks } from "@/components/shared/SocialLinks";
import { contactInfo, footer, navItems, siteConfig } from "@/data/site";
import { useCurrentYear } from "@/lib/hooks";
import { reveal, revealGroup, revealSelf } from "@/lib/reveal";
import { ArrowUp } from "lucide-react";
import { Logo } from "./Logo";

export function Footer() {
  const year = useCurrentYear();

  return (
    <footer {...revealGroup} className="relative mt-8 border-t border-transparent">
      {/* Animated 3px gradient line */}
      {/* The footer is the observed group: the line starts at scaleX(0),
          which has no area for an IntersectionObserver to see. */}
      <div
        aria-hidden
        {...reveal(0, { kind: "grow-x", base: 0, duration: 0.7 })}
        className="bg-brand-gradient absolute inset-x-0 top-0 h-[3px] origin-left"
      />

      <div className="container-page pt-20 pb-10">
        <p
          {...revealSelf({ kind: "up-lg", duration: 0.7 })}
          className="text-gradient font-heading text-[clamp(2.6rem,1rem+7.5vw,7.5rem)] leading-[0.92] font-bold tracking-[-0.04em] text-balance uppercase"
        >
          {footer.bigLine}
        </p>

        <div className="mt-16 grid gap-10 border-t border-border pt-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">{footer.intro}</p>
          </div>

          <nav aria-labelledby="footer-links-title">
            <h2 id="footer-links-title" className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
              Quick links
            </h2>
            <ul className="mt-4 grid grid-cols-2 gap-x-6 gap-y-2.5">
              {navItems.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    className="text-sm text-foreground/80 underline-offset-4 transition-colors hover:text-foreground hover:underline"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">Get in touch</h2>
            <a
              href={`mailto:${contactInfo.email}`}
              className="mt-4 inline-block font-heading text-lg font-semibold break-all underline-offset-4 hover:underline"
            >
              {contactInfo.email}
            </a>
            <SocialLinks size="sm" className="mt-4" />
          </div>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-6 border-t border-border pt-8 sm:flex-row sm:items-center">
          <p className="text-sm text-muted-foreground">
            ©{year ? ` ${year}` : ""} {siteConfig.name}. All rights reserved.
          </p>
          <a
            href="#home"
            aria-label="Back to top"
            className="group grid size-12 place-items-center rounded-full border border-border transition-colors hover:border-transparent hover:bg-foreground hover:text-background"
          >
            <ArrowUp aria-hidden className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
