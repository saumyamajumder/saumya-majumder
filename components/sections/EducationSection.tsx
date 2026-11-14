import { SectionHeading } from "@/components/ui/SectionHeading";
import { education } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";
import { GraduationCap } from "lucide-react";

export function EducationSection() {
  return (
    <section id="education" aria-labelledby="education-title" className="scroll-mt-24 pt-4 pb-20">
      <div className="container-page">
        <SectionHeading id="education-title" eyebrow="Education" title="Education & *Background.*" />

        <ul
          {...revealGroup}
          className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4"
        >
          {education.map((item, i) => (
            <li key={item.title} {...reveal(i)}>
              <article className="flex h-full flex-col gap-4 rounded-[20px] border border-border bg-surface p-5 transition-transform duration-300 hover:-translate-y-1">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-border bg-background text-brand-start">
                  <GraduationCap aria-hidden className="size-5" />
                </span>
                <div>
                  <h3 className="font-heading text-base leading-snug font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.institution}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
