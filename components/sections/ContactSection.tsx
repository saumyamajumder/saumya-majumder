"use client";

import { AddressCard } from "@/components/shared/AddressCard";
import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { renderAccent } from "@/components/ui/SectionHeading";
import { Textarea } from "@/components/ui/textarea";
import { contactInfo, whatsappHref } from "@/data/site";
import { budgetRanges, projectTypes } from "@/lib/contact-options";
import { contactResolver, preloadContactResolver } from "@/lib/contact-resolver";
import type { ContactFormValues } from "@/lib/contact-schema";
import { reveal, revealGroup, revealSelf } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import { ChevronDown, Send } from "lucide-react";
import { useState, type ReactNode } from "react";
import dynamic from "next/dynamic";
import { useForm } from "react-hook-form";

// The dialog (Base UI + its focus/portal code) is only needed after a
// successful send, so it is split out and fetched on first use.
const SuccessModal = dynamic(() => import("@/components/modals/SuccessModal").then((m) => m.SuccessModal), {
  ssr: false,
});

type SubmitError = "not_configured" | "rate_limited" | "failed" | null;

const fieldClasses =
  "h-12 rounded-xl border-border bg-background px-4 text-base md:text-[0.95rem] placeholder:text-muted-foreground/80 focus-visible:border-brand-start focus-visible:ring-0 aria-invalid:border-destructive dark:bg-background";

function Field({
  id,
  label,
  hint,
  error,
  children,
  className,
}: {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <Label htmlFor={id} className="text-sm font-medium">
        {label}
        {hint && <span className="font-normal text-muted-foreground">{hint}</span>}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function NativeSelect({ className, ...props }: React.ComponentProps<"select">) {
  return (
    <div className="relative">
      <select
        {...props}
        className={cn(
          "w-full appearance-none rounded-xl border border-border bg-background pr-10 pl-4 text-base outline-none md:text-[0.95rem]",
          "focus-visible:border-brand-start aria-invalid:border-destructive",
          "h-12",
          className,
        )}
      />
      <ChevronDown aria-hidden className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted-foreground" />
    </div>
  );
}

function SubmitErrorMessage({ error }: { error: SubmitError }) {
  if (!error) return null;
  const lead =
    error === "not_configured"
      ? "Online inquiries aren't connected yet, so your message was not sent."
      : error === "rate_limited"
        ? "Too many messages were sent from this connection. Please wait a few minutes."
        : "Your message could not be sent because of a temporary problem.";
  return (
    <div role="alert" className="rounded-xl border border-destructive/40 bg-destructive/10 p-4 text-sm sm:col-span-2">
      <p className="font-medium text-foreground">{lead}</p>
      <p className="mt-1 text-muted-foreground">
        Please email{" "}
        <a href={`mailto:${contactInfo.email}`} className="font-medium text-foreground underline underline-offset-4">
          {contactInfo.email}
        </a>{" "}
        or{" "}
        <a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-foreground underline underline-offset-4"
        >
          message me on WhatsApp
        </a>
        .
      </p>
    </div>
  );
}

export function ContactSection() {
  const [successOpen, setSuccessOpen] = useState(false);
  const [sentName, setSentName] = useState<string>();
  const [submitError, setSubmitError] = useState<SubmitError>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    // Zod + schema load on first use (see lib/contact-resolver.ts).
    resolver: contactResolver,
    defaultValues: { name: "", email: "", projectType: undefined, budget: "", details: "", website: "" },
    mode: "onTouched",
  });

  async function onSubmit(values: ContactFormValues) {
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setSentName(values.name);
        reset();
        setSuccessOpen(true);
        return;
      }
      setSubmitError(
        data.error === "not_configured" ? "not_configured" : res.status === 429 ? "rate_limited" : "failed",
      );
    } catch {
      setSubmitError("failed");
    }
  }

  const a11y = (name: keyof ContactFormValues) => ({
    "aria-invalid": !!errors[name],
    "aria-describedby": errors[name] ? `contact-${name}-error` : undefined,
  });

  return (
    <section id="contact" aria-labelledby="contact-title" className="section-y scroll-mt-24 border-t border-border bg-surface">
      <div className="container-page grid gap-6 lg:grid-cols-12">
        <div
          {...revealGroup}
          className="rounded-[20px] border border-border bg-background p-6 sm:p-10 lg:col-span-8"
        >
          <p
            {...reveal(0)}
            className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
          >
            <span aria-hidden className="bg-brand-gradient h-px w-8" />
            Contact
          </p>
          <h2 id="contact-title" {...reveal(1)} className="heading-2 mt-4 max-w-2xl text-balance">
            {renderAccent("Let's Create Something *Great Together.*")}
          </h2>
          <p {...reveal(2)} className="mt-4 max-w-2xl text-muted-foreground">
            Have a project in mind? I&apos;m available to collaborate with businesses, startups, agencies, and
            individuals worldwide. Let&apos;s discuss your ideas and turn them into an exceptional digital
            experience.
          </p>

          <form
            {...reveal(3)}
            onSubmit={handleSubmit(onSubmit)}
            onFocusCapture={preloadContactResolver}
            onPointerEnter={preloadContactResolver}
            noValidate
            aria-label="Project inquiry"
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            <Field id="contact-name" label="Full Name" error={errors.name?.message}>
              <Input
                id="contact-name"
                autoComplete="name"
                placeholder="Your full name"
                className={fieldClasses}
                {...a11y("name")}
                {...register("name")}
              />
            </Field>
            <Field id="contact-email" label="Email Address" error={errors.email?.message}>
              <Input
                id="contact-email"
                type="email"
                autoComplete="email"
                placeholder="you@company.com"
                className={fieldClasses}
                {...a11y("email")}
                {...register("email")}
              />
            </Field>
            <Field id="contact-projectType" label="Project Type" error={errors.projectType?.message}>
              <NativeSelect id="contact-projectType" defaultValue="" {...a11y("projectType")} {...register("projectType")}>
                <option value="" disabled>
                  Select a project type
                </option>
                {projectTypes.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field id="contact-budget" label="Project Budget" hint="(optional)" error={errors.budget?.message}>
              <NativeSelect id="contact-budget" {...a11y("budget")} {...register("budget")}>
                <option value="">Select a budget range</option>
                {budgetRanges.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </NativeSelect>
            </Field>
            <Field id="contact-details" label="Project Details" error={errors.details?.message} className="sm:col-span-2">
              <Textarea
                id="contact-details"
                rows={6}
                placeholder="Tell me about your project, goals, timeline and any links or designs you already have…"
                className={cn(fieldClasses, "h-auto min-h-40 resize-y py-3")}
                {...a11y("details")}
                {...register("details")}
              />
            </Field>

            {/* Honeypot: hidden from people and assistive tech */}
            <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
              <label htmlFor="contact-website">Website</label>
              <input id="contact-website" tabIndex={-1} autoComplete="off" {...register("website")} />
            </div>

            <SubmitErrorMessage error={submitError} />

            <div className="flex flex-col gap-4 sm:col-span-2 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">I&apos;ll reply as soon as possible, usually within 1–2 business days.</p>
              <AnimatedButton
                type="submit"
                size="lg"
                loading={isSubmitting}
                icon={<Send aria-hidden className="size-4" />}
                wrapperClassName="w-full sm:w-auto"
              >
                {isSubmitting ? "Sending…" : "Send Project Inquiry"}
              </AnimatedButton>
            </div>
          </form>
        </div>

        <div {...revealSelf({ base: 0.15 })} className="lg:col-span-4">
          <AddressCard />
        </div>
      </div>

      {/* Mounted from the first success onwards, so the exit animation can play. */}
      {sentName !== undefined && (
        <SuccessModal open={successOpen} onOpenChange={setSuccessOpen} name={sentName} />
      )}
    </section>
  );
}
