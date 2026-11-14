"use client";

import { useEffect } from "react";

/**
 * One IntersectionObserver for every scroll reveal on the page (see
 * lib/reveal.ts). When a `[data-reveal-group]` enters the viewport it marks
 * the `[data-reveal]` elements that belong to it (nearest group) with
 * `data-shown`, which starts their CSS animation. Each group fires once.
 */
export function RevealObserver() {
  useEffect(() => {
    const groups = document.querySelectorAll<HTMLElement>("[data-reveal-group]");

    const show = (group: Element) => {
      const candidates = [group, ...group.querySelectorAll("[data-reveal]")];
      for (const el of candidates) {
        if (el.hasAttribute("data-reveal") && el.closest("[data-reveal-group]") === group) {
          el.setAttribute("data-shown", "");
        }
      }
    };

    if (!("IntersectionObserver" in window)) {
      groups.forEach(show);
      return;
    }

    // Same trigger as Framer's `viewport={{ once: true, margin: "-80px" }}`.
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          show(entry.target);
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "-80px" },
    );
    groups.forEach((group) => io.observe(group));
    return () => io.disconnect();
  }, []);

  return null;
}
