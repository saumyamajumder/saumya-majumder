import { socials } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import type { Social } from "@/types";
import type { CSSProperties } from "react";

interface SocialLinksProps {
  /** `icons`: round icon buttons. `pills`: icon + label. */
  variant?: "icons" | "pills";
  items?: Social[];
  className?: string;
  /** Compact icon size for narrow columns. */
  size?: "sm" | "md";
}

export function SocialLinks({
  variant = "icons",
  items = socials,
  className,
  size = "md",
}: SocialLinksProps) {
  return (
    <ul
      {...revealGroup}
      className={cn("flex flex-wrap items-center", variant === "icons" ? (size === "sm" ? "gap-2" : "gap-2.5") : "gap-2.5", className)}
    >
      {items.map((social, i) => {
        const Icon = social.icon;
        return (
          <li key={social.label} {...reveal(i, { step: 0.06, base: 0 })}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={variant === "icons" ? `${social.label} (opens in a new tab)` : undefined}
              style={{ "--brand": social.color } as CSSProperties}
              className={cn(
                "group inline-flex items-center border border-border text-muted-foreground transition-[color,border-color,background-color,translate] duration-300 hover:-translate-y-1 hover:border-[var(--brand)] hover:text-[var(--brand)]",
                variant === "icons"
                  ? cn("justify-center rounded-full", size === "sm" ? "size-10" : "size-11")
                  : "h-11 gap-2 rounded-full bg-surface px-4 text-sm font-medium hover:bg-surface-2",
              )}
            >
              <Icon aria-hidden className={size === "sm" ? "size-4" : "size-[18px]"} />
              {variant === "pills" && (
                <>
                  <span className="text-foreground">{social.label}</span>
                  <span className="sr-only">(opens in a new tab)</span>
                </>
              )}
            </a>
          </li>
        );
      })}
    </ul>
  );
}
