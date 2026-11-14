"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/site";
import { viewportOnce } from "@/lib/motion";
import { revealSelf } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import type { Experience } from "@/types";
import { m, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import { useEffect, useRef, useState, type RefObject } from "react";

function ExperienceCard({ item, side }: { item: Experience; side: "left" | "right" }) {
  return (
    <article
      {...revealSelf({ kind: side })}
      className="rounded-[20px] border border-border bg-surface/70 p-6 transition-colors duration-300 hover:border-brand-start/40 sm:p-8"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        {item.companyUrl ? (
          <a
            href={item.companyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            {item.company}
            <ArrowUpRight
              aria-hidden
              className="size-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5"
            />
            <span className="sr-only"> website (opens in a new tab)</span>
          </a>
        ) : (
          <p className="text-sm font-semibold text-muted-foreground">{item.company}</p>
        )}
        <span
          className={cn(
            "rounded-full px-3 py-1 text-xs font-semibold",
            item.current ? "bg-brand-gradient text-brand-ink" : "border border-border text-muted-foreground",
          )}
        >
          {item.current ? "Current" : "Previous"}
        </span>
      </div>
      <h3 className="mt-3 font-heading text-2xl font-semibold tracking-tight">{item.title}</h3>
      <p className="mt-3 inline-flex items-center gap-1.5 text-sm text-muted-foreground">
        <Calendar aria-hidden className="size-4" />
        <time dateTime={item.start}>{item.period.split(" – ")[0]}</time>
        <span aria-hidden>–</span>
        {item.end ? <time dateTime={item.end}>{item.period.split(" – ")[1]}</time> : <span>Present</span>}
      </p>
      <ul className="mt-5 space-y-2.5 text-[0.95rem] leading-relaxed text-muted-foreground">
        {item.responsibilities.map((r) => (
          <li key={r} className="flex gap-3">
            <span aria-hidden className="bg-brand-gradient mt-2.5 size-1.5 shrink-0 rounded-full" />
            {r}
          </li>
        ))}
      </ul>
      <ul aria-label="Technologies used" className="mt-6 flex flex-wrap gap-2">
        {item.tech.map((t) => (
          <li key={t} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
            {t}
          </li>
        ))}
      </ul>
    </article>
  );
}

/** Scroll-driven progress line. Framer's `useScroll({ target })` measures
 *  layout, so it's only mounted once the list is near the viewport (see
 *  below), keeping that work off the initial load. Before it mounts the line
 *  is at 0, which is also what it would show at that scroll position. */
function ProgressLine({ target }: { target: RefObject<HTMLOListElement | null> }) {
  const { scrollYProgress } = useScroll({
    target,
    offset: ["start 75%", "end 55%"],
  });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.3 });
  return (
    <m.span
      aria-hidden
      style={{ scaleY }}
      className="absolute top-0 bottom-0 left-[11px] w-[2px] origin-top bg-linear-to-b from-brand-start via-brand-mid to-brand-end md:left-1/2 md:-translate-x-1/2"
    />
  );
}

export function ExperienceTimeline() {
  const listRef = useRef<HTMLOListElement>(null);
  const [near, setNear] = useState(false);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setNear(true);
          io.disconnect();
        }
      },
      { rootMargin: "400px 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      id="experience"
      aria-labelledby="experience-title"
      className="section-y scroll-mt-24 border-y border-border bg-surface"
    >
      <div className="container-page">
        <SectionHeading
          id="experience-title"
          eyebrow="Experience"
          title="My Professional *Journey.*"
          description="7+ years building websites and frontend applications for businesses and teams."
          align="center"
          className="mx-auto"
        />

        <ol ref={listRef} className="relative mt-16 flex flex-col gap-10 md:gap-14">
          {/* Track + scroll-driven progress line */}
          <span aria-hidden className="absolute top-0 bottom-0 left-[11px] w-px bg-border md:left-1/2 md:-translate-x-1/2" />
          {near && <ProgressLine target={listRef} />}

          {experience.map((item, i) => {
            const side = i % 2 === 0 ? "left" : "right";
            return (
              <li key={`${item.company}-${item.start}`} className="relative grid pl-10 md:grid-cols-2 md:gap-16 md:pl-0">
                {/* Marker: the unscaled wrapper is what's observed, so the
                    in-view check works even while the dot is at scale 0. */}
                <m.span
                  aria-hidden
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewportOnce}
                  className="absolute top-8 left-0 size-6 md:left-1/2 md:-ml-3"
                >
                  <m.span
                    variants={{ hidden: { scale: 0, opacity: 0 }, visible: { scale: 1, opacity: 1 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 18, delay: 0.1 }}
                    className="bg-brand-gradient block size-6 rounded-full p-[5px] ring-4 ring-surface"
                  >
                    <span className="block size-full rounded-full bg-surface" />
                  </m.span>
                </m.span>

                {/* Opposite side on desktop: the period, big and quiet */}
                {/* Decorative watermark (the real dates are in the card's <time>
                    elements). Drawn as generated content so it isn't text in the
                    document, which is what it is visually: ornament. */}
                <span
                  aria-hidden
                  data-years={`${item.start.slice(0, 4)} — ${item.end ? item.end.slice(0, 4) : "Now"}`}
                  className={cn(
                    "hidden self-start pt-7 font-heading text-4xl font-bold tracking-tight text-foreground/10 before:content-[attr(data-years)] md:block",
                    side === "left" ? "md:order-2" : "md:text-right",
                  )}
                />

                <div className={cn(side === "left" ? "md:order-1" : "md:order-2")}>
                  <ExperienceCard item={item} side={side} />
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
