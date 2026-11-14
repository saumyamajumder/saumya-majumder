import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { whatsappHref } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";
import { FaWhatsapp } from "react-icons/fa6";

/** Mid-page conversion band between Skills/Education and FAQ. */
export function CtaBand() {
  return (
    <section aria-labelledby="cta-title" className="py-12">
      <div className="container-page">
        <div
          {...revealGroup}
          className="relative overflow-hidden rounded-[28px] border border-border bg-surface px-6 py-12 sm:px-12 md:py-16"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-24 size-80 rounded-full bg-brand-start/20 blur-[100px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-24 -left-24 size-72 rounded-full bg-brand-end/10 blur-[100px]"
          />
          <div className="relative flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-center">
            <div className="max-w-2xl">
              <h2 id="cta-title" {...reveal(0)} className="heading-2 text-balance">
                Have a website idea? <span className="text-gradient italic">Let&apos;s build it.</span>
              </h2>
              <p {...reveal(1)} className="mt-4 text-muted-foreground md:text-lg">
                Tell me about your project and I&apos;ll help you plan the right solution, whether that&apos;s
                React, Next.js or WordPress.
              </p>
            </div>
            <div {...reveal(2)} className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <AnimatedButton href="#contact" size="lg" arrow wrapperClassName="w-full sm:w-auto">
                Start a Project
              </AnimatedButton>
              <AnimatedButton
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                icon={<FaWhatsapp aria-hidden className="size-4" />}
                wrapperClassName="w-full sm:w-auto"
              >
                Chat on WhatsApp
                <span className="sr-only"> (opens in a new tab)</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
