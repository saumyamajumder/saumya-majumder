import { siteConfig } from "@/data/site";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <a
      href="#home"
      className={cn("group inline-flex items-center gap-3 rounded-xl", className)}
    >
      <span
        aria-hidden
        className="bg-brand-gradient grid size-10 place-items-center rounded-xl font-heading text-base font-bold tracking-tight text-brand-ink transition-transform duration-300 group-hover:-rotate-6"
      >
        {siteConfig.initials}
      </span>
      {/* The name is the link's accessible name; where it is visually hidden
          (mobile, and lg where the nav needs the room) it stays sr-only. */}
      <span className="sr-only font-heading text-lg font-semibold tracking-tight whitespace-nowrap sm:not-sr-only lg:sr-only xl:not-sr-only">
        {siteConfig.name}
      </span>
    </a>
  );
}
