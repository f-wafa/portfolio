import Link from "next/link";

export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-dvh max-w-[820px] flex-col justify-center px-5 py-20 sm:px-8">
      <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted">
        404 / Not found
      </p>

      <h1 className="mt-4 max-w-[18ch] text-balance text-[clamp(2.5rem,8vw,4.5rem)] font-semibold leading-[0.98] tracking-[-0.045em]">
        {"Nothing built "}
        <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
          here
        </em>
        .
      </h1>

      <p className="mt-5 max-w-[46ch] text-[1.0625rem] leading-[1.7] text-muted">
        The page you asked for is not part of this site.
      </p>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        <Link
          href="/"
          className="inline-flex min-h-12 items-center justify-center rounded-sm bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
        >
          Back to the portfolio
        </Link>
        <Link
          href="/#work"
          className="inline-flex min-h-12 items-center justify-center rounded-sm border border-ink px-5 text-sm font-medium transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          See the work
        </Link>
      </div>
    </main>
  );
}
