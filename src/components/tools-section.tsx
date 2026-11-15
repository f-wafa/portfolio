import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { profile } from "@/content/profile";

export function ToolsSection() {
  return (
    <section
      id="tools"
      tabIndex={-1}
      className="scroll-mt-20 border-t border-line focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="03">Toolbox</SectionLabel>
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
          <div className="mt-14 grid border-t border-line sm:grid-cols-3">
            {profile.stack.map((group) => (
              <div
                key={group.label}
                className="border-b border-line py-7 sm:border-b-0 sm:border-r sm:px-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
              >
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="text-sm font-medium">{group.label}</h3>
                  <span className="font-mono text-[11px] text-muted">
                    {String(group.items.length).padStart(2, "0")}
                  </span>
                </div>

                <ul className="mt-5 space-y-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-[1.0625rem] leading-snug">
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
