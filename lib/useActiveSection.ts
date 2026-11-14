"use client";

import { useEffect, useState } from "react";

/**
 * Tracks which section is currently in the middle band of the viewport.
 * Uses IntersectionObserver so it never runs on every scroll frame.
 */
export function useActiveSection(ids: string[]): string {
  const [active, setActive] = useState(ids[0] ?? "");
  const key = ids.join("|");

  useEffect(() => {
    const sectionIds = key.split("|");
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null);
    if (elements.length === 0) return;

    const visible = new Map<string, number>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visible.set(entry.target.id, entry.intersectionRatio);
          else visible.delete(entry.target.id);
        }
        // Pick the first section (in document order) that's in the band.
        const next = sectionIds.find((id) => visible.has(id));
        if (next) setActive(next);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.01] },
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [key]);

  return active;
}
