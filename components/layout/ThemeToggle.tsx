"use client";

import { useMounted } from "@/lib/hooks";
import { cn } from "@/lib/utils";
import { AnimatePresence, m } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

export function ThemeToggle({ className }: { className?: string }) {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = mounted ? resolvedTheme === "dark" : true;
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={label}
      title={label}
      className={cn(
        "cursor-pointer ton relative grid size-10 place-items-center overflow-hidden rounded-full border border-border text-foreground transition-colors hover:bg-surface-2",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <m.span
          key={mounted ? (isDark ? "moon" : "sun") : "placeholder"}
          initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
          animate={{ opacity: 1, rotate: 0, scale: 1 }}
          exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="grid place-items-center"
          aria-hidden
        >
          {isDark ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
        </m.span>
      </AnimatePresence>
    </button>
  );
}
