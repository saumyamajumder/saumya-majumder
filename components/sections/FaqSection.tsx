"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { faqs } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { useId, useState } from "react";

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const baseId = useId();

  return (
    <section id="faq" aria-labelledby="faq-title" className="section-y scroll-mt-24 border-t border-border">
      <div className="container-page grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <SectionHeading
            id="faq-title"
            eyebrow="FAQ"
            title="Frequently Asked *Questions.*"
            description="Answers to common questions about working with me as a freelance frontend developer."
          />
        </div>

        <ul {...revealGroup} className="flex flex-col gap-3">
          {faqs.map((faq, i) => {
            const open = openIndex === i;
            const buttonId = `${baseId}-q${i}`;
            const panelId = `${baseId}-a${i}`;
            return (
              <li
                key={faq.question}
                {...reveal(i)}
                className={cn(
                  "rounded-[20px] border bg-surface transition-colors duration-300",
                  open ? "border-brand-start/40" : "border-border",
                )}
              >
                <h3>
                  <button
                    id={buttonId}
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenIndex(open ? null : i)}
                    className="flex w-full items-center justify-between gap-6 rounded-[20px] px-6 py-5 text-left font-heading text-base font-semibold tracking-tight sm:text-lg"
                  >
                    {faq.question}
                    <span
                      aria-hidden
                      className={cn(
                        "grid size-9 shrink-0 place-items-center rounded-full border transition-[rotate,background-color,border-color,color] duration-300",
                        open
                          ? "bg-brand-gradient rotate-45 border-transparent text-brand-ink"
                          : "border-border text-foreground",
                      )}
                    >
                      <Plus className="size-4" />
                    </span>
                  </button>
                </h3>
                {/* grid-rows 0fr → 1fr gives a smooth height transition with no JS
                    measuring; content stays in the DOM for search engines. */}
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={buttonId}
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-out motion-reduce:transition-none",
                    open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                  inert={!open}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-6 leading-relaxed text-muted-foreground">{faq.answer}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
