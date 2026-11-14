"use client";

import { SectionHeading } from "@/components/ui/SectionHeading";
import { services } from "@/data/site";
import { reveal, revealGroup, revealSelf } from "@/lib/reveal";
import type { Service } from "@/types";
import { ArrowUpRight, Check } from "lucide-react";
import dynamic from "next/dynamic";
import { useState } from "react";

// Split the dialog out of the initial bundle; it is fetched when a visitor
// shows intent (hover/focus on "Learn More") and rendered on first open.
const loadServiceModal = () => import("@/components/modals/ServiceModal");
const ServiceModal = dynamic(() => loadServiceModal().then((m) => m.ServiceModal), { ssr: false });

function ServiceCard({ service, onOpen }: { service: Service; onOpen: () => void }) {
  const Icon = service.icon;
  return (
    // Gradient-border card: the panel has a real 1px border (pixel-snapped,
    // never lost to sub-pixel rounding). On hover the border turns
    // transparent and the gradient layer behind it shows through;
    // bg-clip-padding keeps the panel fill out of the border area.
    <article className="group relative h-full rounded-[20px] transition-transform duration-300 ease-out hover:-translate-y-1.5 has-focus-visible:-translate-y-1.5">
      <span
        aria-hidden
        className="bg-brand-gradient absolute inset-0 rounded-[20px] opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-has-focus-visible:opacity-100"
      />
      <div className="relative flex h-full flex-col overflow-hidden rounded-[20px] border border-border bg-surface bg-clip-padding p-7 transition-colors duration-300 group-hover:border-transparent group-has-focus-visible:border-transparent">
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-linear-to-br from-brand-start/10 via-brand-mid/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
        <div className="relative flex items-start justify-between">
          <span className="bg-brand-gradient grid size-12 place-items-center rounded-2xl text-brand-ink transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-12">
            <Icon aria-hidden className="size-5" />
          </span>
          <span
            aria-hidden
            className="font-heading text-5xl leading-none font-bold tracking-tighter text-foreground/10 transition-colors duration-300 group-hover:text-foreground/20"
          >
            {service.number}
          </span>
        </div>

        <h3 className="relative mt-8 font-heading text-xl font-semibold tracking-tight">{service.title}</h3>
        <p className="relative mt-3 text-sm leading-relaxed text-muted-foreground">{service.summary}</p>
        <ul className="relative mt-5 flex-1 space-y-2 text-sm">
          {service.features.map((f) => (
            <li key={f} className="flex items-start gap-2.5">
              <Check aria-hidden className="mt-0.5 size-4 shrink-0 text-brand-start" />
              {f}
            </li>
          ))}
        </ul>
        <button
          type="button"
          onClick={onOpen}
          onPointerEnter={loadServiceModal}
          onFocus={loadServiceModal}
          aria-haspopup="dialog"
          className="cursor-pointer relative mt-7 inline-flex w-fit items-center gap-2 rounded-full text-sm font-semibold outline-none after:absolute after:-inset-2 after:rounded-full focus-visible:after:outline-2 focus-visible:after:outline-ring"
        >
          Learn More
          <span className="sr-only"> about {service.title}</span>
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-0.5"
          />
        </button>
      </div>
    </article>
  );
}

export function ServicesSection() {
  const [selected, setSelected] = useState<Service | null>(null);
  const [open, setOpen] = useState(false);

  return (
    <section
      id="services"
      aria-labelledby="services-title"
      className="section-y scroll-mt-24 border-y border-border bg-surface"
    >
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            id="services-title"
            eyebrow="Services"
            title="Web Development Services That Help Your *Business Grow.*"
          />
          <p {...revealSelf()} className="max-w-sm text-muted-foreground">
            From a single landing page to a full React application, I build websites that look great, load
            fast and are easy to maintain.
          </p>
        </div>

        <ul
          {...revealGroup}
          className="mt-14 grid gap-5 sm:grid-cols-2 xl:grid-cols-4"
        >
          {services.map((service, i) => (
            <li key={service.id} {...reveal(i)}>
              <ServiceCard
                service={service}
                onOpen={() => {
                  setSelected(service);
                  setOpen(true);
                }}
              />
            </li>
          ))}
        </ul>
      </div>

      {/* Mounted from the first open onwards, so the exit animation can play. */}
      {selected && <ServiceModal service={selected} open={open} onOpenChange={setOpen} />}
    </section>
  );
}
