"use client";

import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { easeOut } from "@/lib/motion";
import { m } from "framer-motion";
import { Modal } from "./Modal";

interface SuccessModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name?: string;
}

export function SuccessModal({ open, onOpenChange, name }: SuccessModalProps) {
  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      className="text-center"
      titleClassName="px-8"
      title={
        <span className="flex flex-col items-center gap-6">
          <span className="bg-brand-gradient grid size-20 place-items-center rounded-full p-[3px]">
            <span className="grid size-full place-items-center rounded-full bg-surface">
              <svg viewBox="0 0 24 24" className="size-9" aria-hidden fill="none">
                <m.path
                  d="M5 12.5l4.5 4.5L19 7.5"
                  stroke="var(--brand-start)"
                  strokeWidth={2.5}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.2, ease: easeOut }}
                />
              </svg>
            </span>
          </span>
          <span>Message sent{name ? `, ${name.split(" ")[0]}` : ""}!</span>
        </span>
      }
      description="Thank you for reaching out. I've received your message and will get back to you within one to two business days."
    >
      <div className="mt-8 flex justify-center">
        <AnimatedButton onClick={() => onOpenChange(false)} magnetic={false}>
          Close
        </AnimatedButton>
      </div>
    </Modal>
  );
}
