import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { profile } from "@/content/profile";

export function ToolsSection() {
  return (
    <section
      id="tools"
      tabIndex={-1}
      className="border-t border-line focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-16 sm:px-8 sm:py-20">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="03">Tools</SectionLabel>
              <h2 className="mt-5 max-w-[15ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {"The "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  kit
                </em>
                {" behind the work."}
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted">
                Grouped by where they sit in the process. The list changes as
                I learn.
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-10 grid border-t border-line sm:grid-cols-3">
            {profile.stack.map((group) => (
              <div
                key={group.label}
                className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <h3 className="text-sm font-medium">{group.label}</h3>

                <ul className="mt-4 space-y-1.5">
                  {group.items.map((item) => (
                    <li key={item} className="text-base leading-snug">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
