import { AnimatedButton } from "@/components/ui/AnimatedButton";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/site";
import { revealSelf } from "@/lib/reveal";
import { cn } from "@/lib/utils";
import type { Project } from "@/types";
import { BookOpen, ExternalLink } from "lucide-react";
import Image from "next/image";

function ProjectLink({
  href,
  label,
  icon,
  variant,
}: {
  href: string | null;
  label: string;
  icon: React.ReactNode;
  variant: "primary" | "secondary";
}) {
  if (href) {
    return (
      <AnimatedButton
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        variant={variant}
        size="sm"
        icon={icon}
        magnetic={false}
      >
        {label}
        <span className="sr-only"> (opens in a new tab)</span>
      </AnimatedButton>
    );
  }
  // No URL yet: render an honest, disabled control instead of a dead link.
  return (
    <AnimatedButton
      variant={variant}
      size="sm"
      icon={icon}
      disabled
      magnetic={false}
      title="Coming soon"
      className="disabled:opacity-50"
    >
      {label}
      <span className="sr-only"> (coming soon)</span>
    </AnimatedButton>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const reversed = index % 2 === 1;
  return (
    <article
      {...revealSelf({ kind: "up-lg" })}
      aria-labelledby={`${project.id}-title`}
      className="group grid items-center gap-8 rounded-[24px] border border-border bg-surface p-4 sm:p-6 lg:grid-cols-2 lg:gap-12 lg:p-8"
    >
      <div
        className={cn(
          "relative overflow-hidden rounded-[18px] border border-border bg-background",
          reversed && "lg:order-2",
        )}
      >
        <Image
          src={project.image.src}
          alt={project.image.alt}
          width={project.image.width}
          height={project.image.height}
          sizes="(min-width: 1200px) 540px, (min-width: 1024px) 45vw, 100vw"
          className="h-auto w-full transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        {project.placeholder && (
          <span className="absolute top-4 left-4 rounded-full border border-white/15 bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
            Placeholder
          </span>
        )}
      </div>

      <div className={cn("px-2 pb-2 sm:px-0 sm:pb-0", reversed && "lg:order-1")}>
        <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.18em] text-muted-foreground uppercase">
          <span aria-hidden className="text-gradient font-heading text-sm tracking-normal">
            {String(index + 1).padStart(2, "0")}
          </span>
          {project.category}
        </p>
        <h3 id={`${project.id}-title`} className="mt-4 font-heading text-2xl font-semibold tracking-tight sm:text-3xl">
          {project.title}
          {project.placeholder && <span className="sr-only"> (placeholder)</span>}
        </h3>
        <p className="mt-4 leading-relaxed text-muted-foreground">{project.description}</p>
        <ul aria-label="Technologies used" className="mt-5 flex flex-wrap gap-2">
          {project.tech.map((t) => (
            <li key={t} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium">
              {t}
            </li>
          ))}
        </ul>
        <div className="mt-7 flex flex-wrap gap-3">
          <ProjectLink
            href={project.liveUrl}
            label="Live Demo"
            variant="primary"
            icon={<ExternalLink aria-hidden className="size-4" />}
          />
          <ProjectLink
            href={project.caseStudyUrl}
            label="Case Study"
            variant="secondary"
            icon={<BookOpen aria-hidden className="size-4" />}
          />
        </div>
      </div>
    </article>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="section-y scroll-mt-24">
      <div className="container-page">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading id="projects-title" eyebrow="Portfolio" title="Selected Projects & *Creative Work.*" />
          <p {...revealSelf()} className="max-w-sm text-muted-foreground">
            A selection of websites and interfaces across React.js, Next.js and WordPress.
          </p>
        </div>

        <div className="mt-14 flex flex-col gap-6 lg:gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        <div
          {...revealSelf()}
          className="mt-12 flex flex-col items-center gap-4 text-center"
        >
          <p className="text-muted-foreground">Have a similar project in mind?</p>
          <AnimatedButton href="#contact" arrow size="lg">
            Hire Me for Your Project
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}
