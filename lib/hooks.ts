"use client";

import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** `true` after hydration, `false` during SSR — without a setState-in-effect. */
export function useMounted(): boolean {
  return useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );
}

/** Subscribe to a CSS media query. Returns `fallback` on the server. */
export function useMediaQuery(query: string, fallback = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  );
}

/** True on devices whose primary pointer is a fine pointer that can hover. */
export function useFinePointer(): boolean {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Current year on the client; `null` during prerender (keeps the page static). */
export function useCurrentYear(): number | null {
  return useSyncExternalStore(
    noopSubscribe,
    () => new Date().getFullYear(),
    () => null,
  );
}

/**
 * `true` once the page is scrolled past `px`. A passive scroll listener that
 * only reads `window.scrollY`, so unlike Framer's `useScroll` it never
 * measures layout (no forced style/layout recalcs during hydration).
 */
export function useScrolledPast(px: number): boolean {
  return useSyncExternalStore(
    (onChange) => {
      window.addEventListener("scroll", onChange, { passive: true });
      return () => window.removeEventListener("scroll", onChange);
    },
    () => window.scrollY > px,
    () => false,
  );
}
