import { Counter } from "@/components/ui/Counter";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about } from "@/data/site";
import { reveal, revealGroup } from "@/lib/reveal";

export function AboutSection() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-y scroll-mt-24">
      <div className="container-page">
        <div className="grid gap-10 md:grid-cols-2 md:gap-16">
          <SectionHeading id="about-title" eyebrow={about.eyebrow} title={about.title} />
          <div
            {...revealGroup}
            className="flex flex-col gap-4 text-base leading-relaxed text-muted-foreground md:text-lg"
          >
            {about.paragraphs.map((p, i) => (
              <p key={p} {...reveal(i)} className={i === 0 ? "text-foreground" : undefined}>
                {p}
              </p>
            ))}
          </div>
        </div>

        <ul
          {...revealGroup}
          className="mt-16 grid gap-5 md:grid-cols-3"
        >
          {about.stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <li key={stat.title} {...reveal(i)}>
                <div className="group relative h-full overflow-hidden rounded-[20px] border border-border bg-surface p-7 transition-[translate,border-color] duration-300 hover:-translate-y-1.5 hover:border-brand-start/40">
                  {/* Oversized decorative number */}
                  <span
                    aria-hidden
                    className="pointer-events-none absolute -right-2 -bottom-8 font-heading text-[8.5rem] leading-none font-bold tracking-tighter text-foreground/4 select-none"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {stat.value !== undefined ? (
                    <Counter
                      value={stat.value}
                      suffix={stat.suffix}
                      className="text-gradient relative block font-heading text-5xl font-bold tracking-tight md:text-6xl"
                    />
                  ) : (
                    Icon && (
                      <span className="bg-brand-gradient relative grid size-14 place-items-center rounded-2xl text-brand-ink transition-transform duration-500 group-hover:-rotate-6">
                        <Icon aria-hidden className="size-6" />
                      </span>
                    )
                  )}
                  <h3 className="relative mt-5 font-heading text-lg font-semibold tracking-tight">{stat.title}</h3>
                  <p className="relative mt-2 max-w-[28ch] text-sm leading-relaxed text-muted-foreground">
                    {stat.description}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
