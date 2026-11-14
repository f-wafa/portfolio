import { HeroVisual } from "@/components/hero/hero-visual";
import { ArrowDownIcon } from "@/components/icons";
import { profile } from "@/content/profile";

export function Hero() {
  return (
    <section className="mx-auto max-w-[1180px] px-5 pb-16 pt-14 sm:px-8 sm:pb-24 sm:pt-20 lg:pt-24">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.25fr)_minmax(0,0.75fr)] lg:gap-16">
        <div>
          <p className="font-mono text-[11px] leading-relaxed text-muted">
            {profile.name} <span aria-hidden="true">/</span> fullstack developer
            in training
          </p>

          <h1 className="mt-5 max-w-[760px] text-balance text-[clamp(2.75rem,7.4vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            {"I build web things by "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
              feel
            </em>
            , then learn why they work.
          </h1>

          <p className="mt-7 max-w-[54ch] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-lg">
            I&apos;m Faiz, a 15-year-old developer in training in Indonesia. I
            start from instinct, read the error, and rebuild until the thing
            holds. This site keeps the work that held.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <a
              href="#work"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-sm bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
            >
              See the work
              <ArrowDownIcon className="h-4 w-4" />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Email me
            </a>
          </div>

          <p className="mt-8 font-mono text-[11px] leading-relaxed text-muted">
            Based in Indonesia. Open to internships. Learning in public.
          </p>
        </div>

        <div>
          <HeroVisual />
          <p className="mt-2 text-center font-mono text-[11px] text-muted">
            Low-poly study, drawn in the browser.
          </p>
        </div>
      </div>
    </section>
  );
}
