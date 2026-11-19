import { HeroVisual } from "@/components/hero/hero-visual";
import { ArrowDownIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { availability } from "@/content/status";

export function Hero() {
  return (
    <section className="mx-auto flex w-full max-w-[1180px] flex-1 items-center px-5 py-8 sm:px-8 sm:py-12">
      <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
        <div>
          <p className="font-mono text-[11px] leading-relaxed text-muted">
            {profile.name} <span aria-hidden="true">/</span> Indonesia{" "}
            <span aria-hidden="true">/</span>{" "}
            <span className="text-accent">
              {availability.openToInternships
                ? "Open to internships"
                : availability.status}
            </span>
          </p>

          <h1 className="mt-5 max-w-[720px] text-balance text-[clamp(2.5rem,7.4vw,5.6rem)] font-semibold leading-[0.96] tracking-[-0.045em]">
            {"I build web things by "}
            <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
              feel
            </em>
            .
          </h1>

          <p className="mt-7 max-w-[48ch] text-pretty text-[1.0625rem] leading-[1.7] text-muted sm:text-lg">
            A 15-year-old fullstack developer in training. Instinct starts the
            draft; DevTools and a clean console finish it.
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
              href="/cv/faiz-syaiful-wafa-cv.pdf"
              download
              className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Download CV
            </a>
          </div>

        </div>

        <HeroVisual />
      </div>
    </section>
  );
}
