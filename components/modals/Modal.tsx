"use client";

import { Dialog as DialogPrimitive } from "@base-ui/react/dialog";
import { cn } from "@/lib/utils";
import { modalSpring } from "@/lib/motion";
import { AnimatePresence, m } from "framer-motion";
import { X } from "lucide-react";
import type { ComponentProps, ReactNode } from "react";

type FinalFocus = ComponentProps<typeof DialogPrimitive.Popup>["finalFocus"];

interface ModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: ReactNode;
  description?: ReactNode;
  /** Visually hide the title (still announced to screen readers). */
  hideTitle?: boolean;
  children?: ReactNode;
  className?: string;
  titleClassName?: string;
  /** Where focus goes on close. Defaults to the element that opened it. */
  finalFocus?: FinalFocus;
}

/**
 * Shared animated dialog built on the shadcn (Base UI) Dialog primitives.
 * Handles focus trapping, Escape / overlay-click to close and focus return;
 * Framer Motion drives the enter/exit animation.
 */
export function Modal({
  open,
  onOpenChange,
  title,
  description,
  hideTitle = false,
  children,
  className,
  titleClassName,
  finalFocus,
}: ModalProps) {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
      <AnimatePresence>
        {open && (
          <DialogPrimitive.Portal keepMounted>
            <DialogPrimitive.Backdrop
              render={
                <m.div
                  className="fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.25 }}
                />
              }
            />
            <DialogPrimitive.Popup
              finalFocus={finalFocus}
              render={
                <m.div
                  initial={{ opacity: 0, scale: 0.95, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 16 }}
                  transition={modalSpring}
                />
              }
              className={cn(
                // inset-0 + m-auto + h-fit centres without a transform,
                // leaving transform free for the animation.
                "fixed inset-0 z-[61] m-auto flex h-fit max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg flex-col outline-none",
                "bg-brand-gradient rounded-3xl p-px shadow-2xl shadow-black/40",
                className,
              )}
            >
              <div className="relative flex max-h-[calc(100dvh-2rem-2px)] flex-col overflow-hidden rounded-[calc(1.5rem-1px)] bg-surface">
                <DialogPrimitive.Close
                  render={
                    <m.button
                      type="button"
                      aria-label="Close dialog"
                      whileHover={{ rotate: 90 }}
                      transition={{ type: "spring", stiffness: 300, damping: 18 }}
                    />
                  }
                  className="absolute top-4 right-4 z-10 grid size-10 place-items-center rounded-full border border-border bg-surface text-foreground transition-colors hover:bg-surface-2"
                >
                  <X aria-hidden className="size-4" />
                </DialogPrimitive.Close>

                <div className="overflow-y-auto overscroll-contain p-6 sm:p-8">
                  <DialogPrimitive.Title
                    className={cn(
                      "pr-12 font-heading text-2xl font-bold tracking-tight sm:text-3xl",
                      hideTitle && "sr-only",
                      titleClassName,
                    )}
                  >
                    {title}
                  </DialogPrimitive.Title>
                  {description && (
                    <DialogPrimitive.Description className="mt-3 text-base leading-relaxed text-muted-foreground">
                      {description}
                    </DialogPrimitive.Description>
                  )}
                  {children}
                </div>
              </div>
            </DialogPrimitive.Popup>
          </DialogPrimitive.Portal>
        )}
      </AnimatePresence>
    </DialogPrimitive.Root>
  );
}
