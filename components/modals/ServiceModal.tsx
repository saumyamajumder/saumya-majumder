"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { fadeUp, staggerWith } from "@/lib/motion";
import type { Service } from "@/types";
import { m } from "framer-motion";
import { Check } from "lucide-react";
import { useRef } from "react";
import { Modal } from "./Modal";

interface ServiceModalProps {
  service: Service | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ServiceModal({ service, open, onOpenChange }: ServiceModalProps) {
  // When the CTA closes the modal we jump to #contact instead of returning
  // focus to the card (which would scroll the page back up).
  const leavingToContact = useRef(false);

  function startProject() {
    leavingToContact.current = true;
    onOpenChange(false);
    // Start scrolling as the modal exits; move focus to the form once the
    // dialog (and its focus trap) has fully unmounted.
    window.setTimeout(() => {
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    }, 120);
    window.setTimeout(() => {
      document.getElementById("contact-name")?.focus({ preventScroll: true });
      leavingToContact.current = false;
    }, 600);
  }

  if (!service) return null;
  const Icon = service.icon;

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      finalFocus={() => !leavingToContact.current}
      title={
        <span className="flex flex-col gap-5">
          <span className="flex items-center gap-4">
            <span className="bg-brand-gradient grid size-14 place-items-center rounded-2xl text-brand-ink">
              <Icon aria-hidden className="size-6" />
            </span>
            <span aria-hidden className="text-gradient font-heading text-5xl font-bold tracking-tighter">
              {service.number}
            </span>
          </span>
          <span>{service.title}</span>
        </span>
      }
      description={service.description}
    >
      <h3 className="mt-7 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase">
        What&apos;s included
      </h3>
      <m.ul
        variants={staggerWith(0.05, 0.15)}
        initial="hidden"
        animate="visible"
        className="mt-4 grid gap-2.5"
      >
        {service.features.map((item) => (
          <m.li key={item} variants={fadeUp} className="flex items-start gap-3 text-sm sm:text-base">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand-start/15 text-brand-start">
              <Check aria-hidden className="size-3" strokeWidth={3} />
            </span>
            {item}
          </m.li>
        ))}
      </m.ul>
      <div className="mt-8">
        <AnimatedButton arrow onClick={startProject} wrapperClassName="w-full sm:w-auto">
          Start a Project
        </AnimatedButton>
      </div>
    </Modal>
  );
}
