"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { navItems } from "@/data/site";
import { useActiveSection } from "@/lib/useActiveSection";
import { cn } from "@/lib/utils";
import { useScrolledPast } from "@/lib/hooks";
import { m } from "framer-motion";
import { Logo } from "./Logo";
import { MobileMenu } from "./MobileMenu";
import { ThemeToggle } from "./ThemeToggle";

const sectionIds = navItems.map((item) => item.id);

export function Header() {
  const active = useActiveSection(sectionIds);
  const scrolled = useScrolledPast(24);

  return (
    // Entrance is CSS (globals.css) so the header paints with the HTML,
    // without waiting for hydration.
    <header
      className={cn(
        "motion-safe:animate-drop-in sticky top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-300",
        scrolled
          ? "border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-transparent bg-transparent",
      )}
    >
      <div className="container-page flex h-[72px] items-center justify-between gap-6">
        <Logo />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    aria-current={isActive ? "true" : undefined}
                    className={cn(
                      "group relative inline-flex rounded-full px-3 py-2 text-sm font-medium transition-colors",
                      isActive ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                    {/* hover underline */}
                    <span
                      aria-hidden
                      className="absolute inset-x-3 bottom-1 h-px origin-left scale-x-0 bg-foreground/40 transition-transform duration-300 group-hover:scale-x-100"
                    />
                    {/* active indicator */}
                    {isActive && (
                      <m.span
                        layoutId="nav-active"
                        aria-hidden
                        className="bg-brand-gradient absolute inset-x-3 bottom-1 h-[2px] rounded-full"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <ThemeToggle />
          <AnimatedButton
            href="#contact"
            size="sm"
            arrow
            wrapperClassName="hidden sm:inline-flex"
          >
            Let&apos;s Talk
          </AnimatedButton>
          <MobileMenu items={navItems} active={active} />
        </div>
      </div>
    </header>
  );
}
