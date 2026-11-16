import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";

export function AboutSection() {
  return (
    <section
      id="about"
      tabIndex={-1}
      className="scroll-mt-20 border-t border-line focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <div className="lg:sticky lg:top-24">
              <Reveal>
                <SectionLabel index="01">About</SectionLabel>
                <h2 className="mt-5 max-w-[13ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  {"Learning "}
                  <em className="ml-[0.1em] font-serif font-normal italic tracking-[-0.02em] text-accent">
                    out loud
                  </em>
                  .
                </h2>
              </Reveal>
            </div>
          </div>

          <div className="lg:col-span-7 lg:col-start-6">
            <Reveal delay={0.05}>
              <div className="space-y-5">
                <p className="text-pretty text-[1.125rem] leading-[1.7]">
                  I&apos;m Faiz Syaiful Wafa, a first-year SMK student in
                  Computer Network Engineering (TKJ) in Indonesia. School covers
                  networking, so web development happens after class: docs,
                  small builds, and bugs I have to understand before moving on.
                </p>

                <p className="text-[1.0625rem] leading-[1.75] text-muted">
                  Most of what I know came from repetition: build, break, fix,
                  understand. code-to-snippet started as a chore I kept
                  repeating by hand. This portfolio started because the tool
                  needed somewhere to live. Neither one arrived in a single
                  draft.
                </p>

                <p className="text-[1.0625rem] leading-[1.75] text-muted">
                  I care about interfaces that feel quick and calm, and I keep
                  the repositories public so the progress is easy to check.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
