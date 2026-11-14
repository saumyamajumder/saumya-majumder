"use client";

import { whatsappHref } from "@/data/site";
import { useScrolledPast } from "@/lib/hooks";
import { AnimatePresence, m } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa6";

/** Floating WhatsApp shortcut that appears once the hero is scrolled past. */
export function WhatsAppFab() {
  const visible = useScrolledPast(640);

  return (
    <AnimatePresence>
      {visible && (
        <m.a
          href={whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Chat on WhatsApp (opens in a new tab)"
          initial={{ opacity: 0, scale: 0.6, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 16 }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed right-4 bottom-4 z-40 grid size-14 place-items-center rounded-full bg-[#25d366] text-[#06281a] shadow-lg shadow-black/30 sm:right-6 sm:bottom-6"
        >
          <FaWhatsapp aria-hidden className="size-7" />
        </m.a>
      )}
    </AnimatePresence>
  );
}
