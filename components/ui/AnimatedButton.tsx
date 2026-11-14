"use client";

import { cn } from "@/lib/utils";
import { useFinePointer } from "@/lib/hooks";
import { softSpring } from "@/lib/motion";
import {
  m,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { ArrowRight, Loader2 } from "lucide-react";
import {
  useRef,
  type AnchorHTMLAttributes,
  type ButtonHTMLAttributes,
  type PointerEvent,
  type ReactNode,
} from "react";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  /** Show a trailing arrow that slides on hover. */
  arrow?: boolean;
  /** Optional leading icon. */
  icon?: ReactNode;
  loading?: boolean;
  /** Turn the magnetic hover off for this instance. */
  magnetic?: boolean;
  className?: string;
  /** Classes for the outer (magnetic) wrapper, e.g. `w-full`. */
  wrapperClassName?: string;
  children: ReactNode;
}

type ButtonProps = BaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type LinkProps = BaseProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof BaseProps> & {
    href: string;
  };

export type AnimatedButtonProps = ButtonProps | LinkProps;

const MAX_PULL = 8;

const sizes: Record<Size, string> = {
  sm: "h-10 px-5 text-sm gap-2",
  md: "h-12 px-6 text-[0.95rem] gap-2.5",
  lg: "h-14 px-8 text-base gap-3",
};

const variants: Record<Variant, string> = {
  primary:
    "bg-brand-gradient text-brand-ink font-semibold shadow-[var(--shadow-soft)]",
  secondary:
    "border border-border bg-transparent text-foreground font-medium hover:bg-foreground hover:text-background hover:border-foreground",
  ghost:
    "bg-transparent text-foreground font-medium hover:bg-surface-2",
};

export function AnimatedButton(props: AnimatedButtonProps) {
  const {
    variant = "primary",
    size = "md",
    arrow = false,
    icon,
    loading = false,
    magnetic = true,
    className,
    wrapperClassName,
    children,
    ...rest
  } = props;

  const reduceMotion = useReducedMotion();
  const finePointer = useFinePointer();
  const inactive = loading || ("disabled" in rest && !!rest.disabled);
  const magneticOn = magnetic && finePointer && !reduceMotion && !inactive;

  const wrapperRef = useRef<HTMLSpanElement>(null);
  const x = useSpring(useMotionValue(0), softSpring);
  const y = useSpring(useMotionValue(0), softSpring);

  function handlePointerMove(e: PointerEvent<HTMLSpanElement>) {
    if (!magneticOn || !wrapperRef.current) return;
    const rect = wrapperRef.current.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    x.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dx * 0.2)));
    y.set(Math.max(-MAX_PULL, Math.min(MAX_PULL, dy * 0.3)));
  }

  function reset() {
    x.set(0);
    y.set(0);
  }

  const classes = cn(
    "group/btn relative inline-flex w-full select-none items-center justify-center overflow-hidden rounded-full whitespace-nowrap transition-colors duration-300",
    "disabled:cursor-not-allowed disabled:opacity-70 aria-disabled:pointer-events-none cursor-pointer",
    // no hover-state styling while disabled
    inactive && "pointer-events-none",
    sizes[size],
    variants[variant],
    className,
  );

  const content = (
    <>
      {variant === "primary" && (
        // Gradient "shift": a reversed gradient fades in (opacity only).
        <span
          aria-hidden
          className="bg-brand-gradient-reverse absolute inset-0 opacity-0 transition-opacity duration-500 group-hover/btn:opacity-100"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-[inherit]">
        {loading ? (
          <Loader2 aria-hidden className="size-4 animate-spin" />
        ) : (
          icon
        )}
        <span>{children}</span>
        {arrow && !loading && (
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1"
          />
        )}
      </span>
    </>
  );

  return (
    <m.span
      ref={wrapperRef}
      className={cn("relative inline-flex rounded-full", wrapperClassName)}
      style={{ x, y }}
      onPointerMove={handlePointerMove}
      onPointerLeave={reset}
      whileHover={inactive ? undefined : { scale: 1.03 }}
      whileTap={inactive ? undefined : { scale: 0.97 }}
      transition={softSpring}
    >
      {"href" in rest && typeof rest.href === "string" ? (
        <a {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)} className={classes}>
          {content}
        </a>
      ) : (
        <button
          type="button"
          {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}
          disabled={loading || (rest as ButtonHTMLAttributes<HTMLButtonElement>).disabled}
          aria-busy={loading || undefined}
          className={classes}
        >
          {content}
        </button>
      )}
    </m.span>
  );
}
