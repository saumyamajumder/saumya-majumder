import { SocialLinks } from "@/components/shared/SocialLinks";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { hero, siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";
import { Code, Download, Rocket } from "lucide-react";
import Image from "next/image";
import type { CSSProperties, ReactNode } from "react";

/*
 * The above-the-fold entrance is plain CSS (see `animate-*` in globals.css),
 * not Framer Motion: the server-rendered HTML animates in as soon as it is
 * painted instead of sitting at opacity 0 until hydration. That keeps the
 * hero text (the mobile LCP element) fast. The timings reproduce the old
 * stagger: children every 80ms from 100ms, title words every 45ms.
 */
const STEP = 0.08;
const START = 0.1;
const delay = (i: number): CSSProperties => ({ animationDelay: `${START + i * STEP}s` });
const RISE = "motion-safe:animate-rise-in";

/** Word-by-word reveal; the text stays a single readable string for AT. */
function AnimatedWords({ text, className, from = 0 }: { text: string; className?: string; from?: number }) {
  return (
    <>
      {text.split(" ").map((w, i) => (
        <span
          key={`${w}-${i}`}
          className={cn("inline-block motion-safe:animate-word-in", className)}
          style={{ animationDelay: `${START + STEP + (from + i) * 0.045}s` }}
        >
          {w}
          {" "}
        </span>
      ))}
    </>
  );
}

function Float({
  children,
  className,
  delay = 0,
  distance = 10,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  distance?: number;
}) {
  // CSS keyframes (globals.css `animate-float`) run on the compositor; the
  // old JS-driven loop did main-thread work on every frame.
  return (
    <div
      className={cn("motion-safe:animate-float", className)}
      style={{ "--float-distance": `${-distance}px`, animationDelay: `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}

function FloatingCard({ icon, title, label }: { icon: ReactNode; title: string; label: string }) {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-border bg-surface/90 px-4 py-3 shadow-xl shadow-black/20 backdrop-blur-sm sm:px-5 sm:py-4">
      <span className="bg-brand-gradient grid size-10 shrink-0 place-items-center rounded-xl text-brand-ink">
        {icon}
      </span>
      <span className="flex flex-col">
        <span className="font-heading text-lg leading-none font-bold tracking-tight sm:text-xl">{title}</span>
        <span className="mt-1 text-xs text-muted-foreground">{label}</span>
      </span>
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative scroll-mt-24 overflow-hidden pt-10 pb-20 md:pt-16"
    >
      {/* Background texture + glow */}
      <div
        aria-hidden
        className="bg-grid pointer-events-none absolute inset-0 mask-[radial-gradient(ellipse_at_top,black_30%,transparent_75%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] size-[560px] rounded-full bg-brand-start/15 blur-[120px]"
      />

      <div className="container-page relative grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12">
        {/* Copy */}
        <div className="flex flex-col items-start">
          <p
            style={delay(0)}
            className="motion-safe:animate-rise-in inline-flex items-center gap-2.5 rounded-full border border-border bg-surface px-3.5 py-2 text-[0.68rem] font-semibold tracking-[0.1em] whitespace-nowrap uppercase sm:px-4 sm:text-xs sm:tracking-[0.14em]"
          >
            <span className="relative flex size-2.5" aria-hidden>
              <span className="absolute inline-flex size-full rounded-full bg-emerald-500 opacity-75 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-500" />
            </span>
            {hero.badge}
          </p>

          <h1 id="hero-title" className="heading-1 mt-7 text-balance">
            <AnimatedWords text={hero.titleLead} />
            <em className="italic">
              <AnimatedWords
                text={hero.titleAccent}
                className="text-gradient"
                from={hero.titleLead.split(" ").length}
              />
            </em>
          </h1>

          <p
            style={delay(2)}
            className={cn(RISE, "mt-6 max-w-xl text-base leading-relaxed text-muted-foreground md:text-lg")}
          >
            {hero.intro}
          </p>

          <div style={delay(3)} className={cn(RISE, "mt-9 flex w-full flex-col gap-3 sm:w-auto sm:flex-row")}>
            <AnimatedButton href="#contact" size="lg" arrow wrapperClassName="w-full sm:w-auto">
              Let&apos;s Discuss Your Project
            </AnimatedButton>
            <AnimatedButton
              href={siteConfig.cvHref}
              download
              variant="secondary"
              size="lg"
              icon={<Download aria-hidden className="size-4" />}
              wrapperClassName="w-full sm:w-auto"
            >
              Download My CV
            </AnimatedButton>
          </div>

          <ul
            style={delay(4)}
            aria-label="Highlights"
            className={cn(RISE, "mt-10 grid w-full gap-3 border-t border-border pt-8 sm:grid-cols-3 sm:gap-6")}
          >
            {hero.highlights.map(({ icon: Icon, title, label }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-surface text-brand-start">
                  <Icon aria-hidden className="size-[18px]" />
                </span>
                <span className="flex flex-col">
                  <span className="font-heading text-sm font-semibold">{title}</span>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </span>
              </li>
            ))}
          </ul>

          <div style={delay(5)} className={cn(RISE, "mt-8 flex flex-wrap items-center gap-4")}>
            <span className="text-sm text-muted-foreground">Connect</span>
            <span aria-hidden className="h-px w-8 bg-border" />
            <SocialLinks />
          </div>
        </div>

        {/* Portrait */}
        <div
          style={{ animationDelay: "0.3s" }}
          className="motion-safe:animate-zoom-in relative mx-auto w-full max-w-110 px-2 sm:px-6 lg:px-0"
        >
          <Float className="absolute -top-6 right-2 sm:right-0" delay={0.6} distance={8}>
            <div aria-hidden className="size-16 rounded-full border-2 border-dashed border-brand-mid/50" />
          </Float>
          <Float className="absolute -bottom-6 left-6" delay={1.2} distance={12}>
            <div aria-hidden className="bg-brand-gradient size-8 rotate-12 rounded-lg opacity-80" />
          </Float>

          <div className="bg-brand-gradient relative rounded-[28px] p-0.75 shadow-(--shadow-soft)">
            <div className="relative aspect-4/5 overflow-hidden rounded-[25px] bg-surface">
              <Image
                src={siteConfig.portrait.src}
                alt={siteConfig.portrait.alt}
                fill
                priority
                sizes="(min-width: 1024px) 440px, (min-width: 640px) 60vw, 90vw"
                className="object-cover"
              />
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/3 bg-linear-to-t from-black/60 to-transparent"
              />
              <p className="absolute inset-x-0 bottom-5 text-center">
                <span className="font-heading text-lg font-semibold text-white">{siteConfig.name}</span>
                <span className="block text-sm text-white/80">{siteConfig.role}</span>
              </p>
            </div>
          </div>

          <Float className="absolute top-10 -left-1 sm:-left-6 lg:-left-8 xl:-left-14" delay={0}>
            <FloatingCard icon={<Rocket aria-hidden className="size-5" />} title="7+ Years" label="Experience" />
          </Float>
          <Float className="absolute -right-1 bottom-24 sm:-right-6 lg:-right-3 xl:-right-10" delay={1.5}>
            <FloatingCard
              icon={<Code aria-hidden className="size-5" />}
              title="React & WP"
              label="Development"
            />
          </Float>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="container-page relative mt-14 hidden justify-center md:flex">
        <a
          href="#about"
          aria-label="Scroll to About section"
          className="group flex flex-col items-center gap-3 rounded-full text-xs tracking-[0.2em] text-muted-foreground uppercase transition-colors hover:text-foreground"
        >
          <span className="flex h-11 w-7 justify-center rounded-full border-2 border-current pt-2">
            <span aria-hidden className="bg-brand-gradient motion-safe:animate-scroll-cue block h-2 w-1 rounded-full" />
          </span>
          Scroll
        </a>
      </div>
    </section>
  );
}
