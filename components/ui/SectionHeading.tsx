import { cn } from "@/lib/utils";
import { reveal, revealGroup } from "@/lib/reveal";
import { Fragment, type ReactNode } from "react";

/** Render `*text*` segments as gradient italics. */
export function renderAccent(text: string): ReactNode {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith("*") && part.endsWith("*") ? (
      <em key={i} className="text-gradient italic">
        {part.slice(1, -1)}
      </em>
    ) : (
      <Fragment key={i}>{part}</Fragment>
    ),
  );
}

interface SectionHeadingProps {
  eyebrow?: string;
  /** Use `*word*` to highlight with the brand gradient. */
  title: string;
  description?: string;
  align?: "left" | "center";
  id?: string;
  className?: string;
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  id,
  className,
}: SectionHeadingProps) {
  return (
    <div
      {...revealGroup}
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow && (
        <p
          {...reveal(0)}
          className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-muted-foreground uppercase"
        >
          <span aria-hidden className="bg-brand-gradient h-px w-8" />
          {eyebrow}
        </p>
      )}
      <h2 id={id} {...reveal(eyebrow ? 1 : 0)} className="heading-2 max-w-3xl text-balance">
        {renderAccent(title)}
      </h2>
      {description && (
        <p
          {...reveal(eyebrow ? 2 : 1)}
          className="max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
        >
          {description}
        </p>
      )}
    </div>
  );
}
