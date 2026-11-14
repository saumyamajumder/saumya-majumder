"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import { ThemeProvider } from "next-themes";
import type { ReactNode } from "react";

// Components use the lightweight `m.*` elements; the animation features are
// fetched after hydration instead of shipping in the initial bundle.
const loadMotionFeatures = () => import("@/lib/motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {/* reducedMotion="user" strips transform animations for users who ask for
          reduced motion, while opacity fades still run. */}
      <MotionConfig reducedMotion="user">
        {/* strict: throws in dev if a full `motion.*` component sneaks back in. */}
        <LazyMotion features={loadMotionFeatures} strict>
          {children}
        </LazyMotion>
      </MotionConfig>
    </ThemeProvider>
  );
}
