import type { Transition, Variants } from "framer-motion";

/** Expo-like ease-out used across the site. */
export const easeOut: [number, number, number, number] = [0.22, 1, 0.36, 1];

/** Shared `whileInView` viewport: animate once, slightly before entering. */
export const viewportOnce = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
};

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: easeOut } },
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: easeOut } },
};

/** Parent variant that staggers its children. */
export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

/** Build a stagger parent with custom timing. */
export function staggerWith(staggerChildren = 0.1, delayChildren = 0): Variants {
  return {
    hidden: {},
    visible: { transition: { staggerChildren, delayChildren } },
  };
}

export const modalSpring: Transition = {
  type: "spring",
  stiffness: 260,
  damping: 24,
};

export const softSpring: Transition = {
  type: "spring",
  stiffness: 220,
  damping: 18,
  mass: 0.4,
};
