"use client";

import { useEffect } from "react";

/**
 * Below-the-fold sections use `content-visibility: auto` (the `cv-auto`
 * utility), so until rendered they occupy a placeholder height. A smooth
 * scroll to an in-page anchor would compute its target from those
 * placeholders and stop short once the sections render at their real size.
 *
 * On the first click on an in-page link this switches the deferral off
 * (`data-cv-off` on <html>) and forces a layout *before* the browser's
 * default fragment navigation runs, so the target position is exact. It stays
 * off afterwards: deferral only matters for the initial load.
 */
export function InPageNavigation() {
  useEffect(() => {
    const root = document.documentElement;

    function onClick(event: MouseEvent) {
      if (root.hasAttribute("data-cv-off")) return;
      const link = (event.target as Element | null)?.closest?.('a[href^="#"]');
      if (!link) return;
      root.setAttribute("data-cv-off", "");
      void root.offsetHeight; // apply real sizes now, before the scroll target is computed
      document.removeEventListener("click", onClick, true);
    }

    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);

  return null;
}
