"use client";

import { easeOut } from "@/lib/motion";
import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";

interface CounterProps {
  value: number;
  suffix?: string;
  /** Seconds. */
  duration?: number;
  className?: string;
}

/**
 * Counts from 0 to `value` once, the first time it scrolls into view.
 * Writes straight to the DOM node so it doesn't re-render every frame.
 */
export function Counter({ value, suffix = "", duration = 1.4, className }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const node = ref.current;
    if (!node || !inView) return;
    if (reduceMotion) {
      node.textContent = `${value}${suffix}`;
      return;
    }
    const controls = animate(0, value, {
      duration,
      ease: easeOut,
      onUpdate: (latest) => {
        node.textContent = `${Math.round(latest)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, suffix, duration, reduceMotion]);

  return (
    <span className={className}>
      {/* Screen readers get the final value immediately. */}
      <span className="sr-only">{`${value}${suffix}`}</span>
      <span ref={ref} aria-hidden>
        {`0${suffix}`}
      </span>
    </span>
  );
}
