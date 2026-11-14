import type { CSSProperties } from "react";

/**
 * Scroll-reveal without a JS animation library.
 *
 * A CSS port of the Framer Motion `whileInView` variants in lib/motion.ts
 * (fadeUp, fadeIn, scaleIn + stagger), driven by one shared
 * IntersectionObserver (components/RevealObserver.tsx). It renders plain
 * markup, so sections that only need reveals can stay Server Components and
 * ship no JavaScript, and hydration has no per-element animation controllers
 * to set up.
 *
 * - `revealGroup` marks the element that is observed (Framer's `whileInView`
 *   parent). When it enters the viewport (once, -80px margin), its reveal
 *   children animate.
 * - `reveal(i)` marks a child; `i` is the stagger index. The default timing
 *   matches `stagger`: delay = 0.05s + i × 0.1s.
 * - An element can be both (a single self-revealing element): `revealSelf()`.
 *
 * Keyframes and the hidden state live in app/globals.css ("Scroll reveal").
 */

export type RevealKind = "up" | "up-lg" | "left" | "right" | "fade" | "scale" | "grow-x";

interface RevealOptions {
  kind?: RevealKind;
  /** Seconds between siblings. */
  step?: number;
  /** Seconds before the first sibling. */
  base?: number;
  /** Animation duration in seconds (default 0.6, or 0.5 for fade/scale). */
  duration?: number;
  /** Extra inline styles to merge. */
  style?: CSSProperties;
}

export const revealGroup = { "data-reveal-group": "" } as const;

export function reveal(i = 0, { kind = "up", step = 0.1, base = 0.05, duration, style }: RevealOptions = {}) {
  return {
    "data-reveal": kind,
    style: {
      ...style,
      "--reveal-delay": `${+(base + i * step).toFixed(3)}s`,
      ...(duration !== undefined && { "--reveal-duration": `${duration}s` }),
    } as CSSProperties,
  };
}

/** A single element that is its own trigger (no stagger, no delay by default). */
export function revealSelf(options: RevealOptions = {}) {
  return { ...revealGroup, ...reveal(0, { base: 0, ...options }) };
}
