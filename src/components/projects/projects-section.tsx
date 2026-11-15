import { ProjectList } from "@/components/projects/project-list";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function ProjectsSection() {
  return (
    <section
      id="work"
      tabIndex={-1}
      className="scroll-mt-20 border-t border-line focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="02">Selected work</SectionLabel>
              <h2 className="mt-5 max-w-[16ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {"Small tools, "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  real
                </em>
                {" repositories."}
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                Still trying to free up time for new projects, cooked by school. The list comes from the GitHub API and refreshes hourly.
              </p>
            </div>
          </div>
        </Reveal>

        <ProjectList />
      </div>
    </section>
  );
}
