import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillCategories } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";

export function SkillsSection() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-y scroll-mt-24">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Toolkit"
          title="Skills & *Tools.*"
          description="The languages, frameworks, platforms and tools I use to design, build and ship websites."
        />

        <div
          {...revealGroup}
          className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
        >
          {skillCategories.map((category, i) => {
            const CategoryIcon = category.icon;
            return (
              <article
                key={category.title}
                {...reveal(i)}
                className="group/card relative overflow-hidden rounded-[20px] border border-border bg-surface p-6 transition-[translate,border-color] duration-300 hover:-translate-y-1 hover:border-brand-start/40"
              >
                <span
                  aria-hidden
                  className="bg-brand-gradient absolute inset-x-0 top-0 h-px origin-left scale-x-0 transition-transform duration-500 group-hover/card:scale-x-100"
                />
                <header className="mb-5 flex items-center gap-3">
                  <span className="bg-brand-gradient grid size-10 place-items-center rounded-xl text-brand-ink">
                    <CategoryIcon aria-hidden className="size-5" />
                  </span>
                  <h3 className="font-heading text-xl font-semibold tracking-tight">{category.title}</h3>
                </header>
                <ul className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => {
                    const Icon = skill.icon;
                    return (
                      <li
                        key={skill.name}
                        className="group inline-flex items-center gap-2 rounded-full border border-border bg-background py-1.5 pr-3.5 pl-2 text-sm font-medium transition-[translate,border-color] duration-300 hover:-translate-y-0.5 hover:border-foreground/25"
                      >
                        <span className="grid size-6 place-items-center rounded-full bg-surface-2 text-muted-foreground transition-colors group-hover:text-brand-start">
                          <Icon aria-hidden className="size-3.5" />
                        </span>
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
