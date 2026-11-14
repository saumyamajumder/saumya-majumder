"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { easeOut, fadeUp, staggerWith } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { NavItem } from "@/types";
import { AnimatePresence, m } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useMounted } from "@/lib/hooks";

interface MobileMenuProps {
  items: NavItem[];
  active: string;
}

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ items, active }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const mounted = useMounted();

  const close = useCallback((restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) toggleRef.current?.focus();
  }, []);

  // Focus trap + Escape + body scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const firstLink = panel?.querySelector<HTMLElement>(FOCUSABLE);
    firstLink?.focus();

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        close();
        return;
      }
      if (e.key !== "Tab" || !panel || !toggleRef.current) return;
      const focusables = [
        toggleRef.current,
        ...Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)),
      ];
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    const mql = window.matchMedia("(min-width: 1024px)");
    function onBreakpoint(e: MediaQueryListEvent) {
      if (e.matches) setOpen(false);
    }

    document.addEventListener("keydown", onKeyDown);
    mql.addEventListener("change", onBreakpoint);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      mql.removeEventListener("change", onBreakpoint);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, close]);

  return (
    <div className="lg:hidden">
      <button
        ref={toggleRef}
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? "Close menu" : "Open menu"}
        className="cursor-pointer relative grid size-10 place-items-center rounded-full border border-border transition-colors hover:bg-surface-2"
      >
        <span aria-hidden className="relative block h-3.5 w-[18px]">
          <m.span
            className="absolute top-0 left-0 h-[2px] w-full rounded-full bg-foreground"
            animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          />
          <m.span
            className="absolute top-[6px] left-0 h-[2px] w-full rounded-full bg-foreground"
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: 0.2 }}
          />
          <m.span
            className="absolute top-[12px] left-0 h-[2px] w-full rounded-full bg-foreground"
            animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
            transition={{ duration: 0.3, ease: easeOut }}
          />
        </span>
      </button>

      {/* Portalled so the header's backdrop-filter doesn't become the
          containing block for these fixed-position layers. */}
      {mounted &&
        createPortal(
      <AnimatePresence>
        {open && (
          <>
            <m.div
              key="scrim"
              aria-hidden
              className="fixed inset-x-0 top-[72px] bottom-0 z-40 bg-black/50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => close(false)}
            />
            <m.div
              key="panel"
              id="mobile-menu"
              ref={panelRef}
              role="dialog"
              aria-modal="true"
              aria-label="Site navigation"
              className="fixed inset-x-0 top-[72px] z-50 max-h-[calc(100dvh-72px)] overflow-y-auto border-b border-border bg-background"
              initial={{ opacity: 0, y: -16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: easeOut }}
            >
              <nav aria-label="Mobile" className="container-page py-6">
                <m.ul
                  className="flex flex-col"
                  variants={staggerWith(0.05, 0.05)}
                  initial="hidden"
                  animate="visible"
                >
                  {items.map((item, i) => (
                    <m.li key={item.id} variants={fadeUp}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => close(false)}
                        aria-current={active === item.id ? "true" : undefined}
                        className={cn(
                          "flex items-baseline gap-4 border-b border-border py-4 font-heading text-2xl font-semibold tracking-tight transition-colors",
                          active === item.id ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        <span className="w-6 text-xs font-medium text-muted-foreground tabular-nums">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {item.label}
                        {active === item.id && (
                          <span aria-hidden className="bg-brand-gradient ml-auto size-2 self-center rounded-full" />
                        )}
                      </a>
                    </m.li>
                  ))}
                </m.ul>
                <div className="mt-6">
                  <AnimatedButton
                    href="#contact"
                    arrow
                    wrapperClassName="w-full"
                    magnetic={false}
                    onClick={() => close(false)}
                  >
                    Let&apos;s Talk
                  </AnimatedButton>
                </div>
              </nav>
            </m.div>
          </>
        )}
      </AnimatePresence>,
          document.body,
        )}
    </div>
  );
}
