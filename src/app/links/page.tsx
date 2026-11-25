import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CopyEmailButton } from "@/components/copy-email-button";
import { ArrowRightIcon, ArrowUpRightIcon } from "@/components/icons";
import { ThemeToggle } from "@/components/theme-toggle";
import { profile } from "@/content/profile";
import { availability } from "@/content/status";

const [emailUser, emailDomain] = profile.email.split("@");
const year = new Date().getFullYear();

export const metadata: Metadata = {
  title: "Links",
  description:
    "Every public link for Faiz Syaiful Wafa on one page: the portfolio, the CV, GitHub, LinkedIn, Instagram, TikTok, YouTube, and email.",
  alternates: {
    canonical: "/links",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/links",
    siteName: profile.name,
    title: `${profile.name} | Links`,
    description:
      "The portfolio, the CV, and every account I post on, on one page.",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Faiz Syaiful Wafa, fullstack developer in training. I build web things by feel.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${profile.name} | Links`,
    description:
      "The portfolio, the CV, and every account I post on, on one page.",
    images: ["/og.png"],
  },
};

const focusRing =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

const rowClass = `group flex min-h-14 w-full items-center gap-3 rounded-sm border border-line bg-surface px-4 py-3 text-left transition-colors hover:border-accent/50 hover:text-accent active:bg-paper ${focusRing}`;

function GroupLabel({ id, children }: { id: string; children: string }) {
  return (
    <h2 id={id} className="text-center font-mono text-[11px] text-muted">
      {children}
    </h2>
  );
}

export default function LinksPage() {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>

      <header>
        <div className="mx-auto flex h-16 max-w-[34rem] items-center justify-between gap-4 px-5 sm:px-6">
          <Link
            href="/"
            className={`-mx-2 inline-flex min-h-11 items-center px-2 text-xl font-semibold tracking-[-0.04em] ${focusRing}`}
          >
            faiz<span className="text-accent">.</span>
            <span className="sr-only">
              , {profile.name}, back to the portfolio
            </span>
          </Link>

          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="hidden font-mono text-[11px] text-muted sm:block"
            >
              /links
            </span>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto w-full max-w-[34rem] px-5 pt-6 pb-14 focus:outline-none sm:px-6 sm:pb-20"
      >
        <div className="flex flex-col items-center text-center">
          <span className="flex h-24 w-24 items-center justify-center rounded-full border border-line bg-surface">
            <Image
              src="/icon.svg"
              alt=""
              width={56}
              height={56}
              loading="eager"
              fetchPriority="high"
              className="h-14 w-14"
            />
          </span>

          <h1 className="mt-6 text-balance text-[1.75rem] font-semibold leading-tight tracking-[-0.04em] sm:text-[2rem]">
            {profile.name}
          </h1>

          <p className="mt-1.5 text-[0.9375rem] leading-snug text-ink">
            {profile.role}
          </p>

          <p className="mt-2 font-mono text-[11px] leading-relaxed text-muted">
            {profile.location} <span aria-hidden="true">/</span>{" "}
            <span className="text-accent">
              {availability.openToInternships
                ? "Open to internships"
                : availability.status}
            </span>
          </p>

          <p className="mt-4 max-w-[34ch] text-balance text-[0.9375rem] leading-[1.7] text-muted">
            {"I build web things by feel. Everything I keep "}
            <em className="font-serif text-[1.08em] font-normal italic tracking-[-0.01em] text-accent">
              public
            </em>{" "}
            is on this page.
          </p>
        </div>

        <div className="mt-9 flex flex-col gap-2.5">
          <Link
            href="/"
            className="group flex items-center justify-between gap-4 rounded-sm bg-accent px-5 py-4 text-accent-contrast transition-colors hover:bg-accent-hover active:brightness-[0.96] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            <span className="min-w-0 text-left">
              <span className="block text-base font-semibold leading-tight tracking-[-0.01em]">
                Portfolio
              </span>
              <span className="mt-0.5 block text-[0.8125rem] leading-snug">
                Work, tools, and the learning trail.
              </span>
            </span>
            <ArrowRightIcon className="h-4 w-4 shrink-0 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <a href="/cv/faiz-syaiful-wafa-cv.pdf" download className={rowClass}>
            <span className="text-[0.9375rem] font-medium">CV, one page</span>
            <span className="ml-auto font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
              PDF
            </span>
          </a>
        </div>

        <section aria-labelledby="elsewhere" className="mt-10">
          <GroupLabel id="elsewhere">Elsewhere</GroupLabel>

          <ul className="mt-3 flex flex-col gap-2.5">
            {profile.socials.map((account) => (
              <li key={account.label}>
                <a
                  href={account.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={rowClass}
                >
                  <span className="text-[0.9375rem] font-medium">
                    {account.label}
                  </span>
                  <span className="ml-auto min-w-0 truncate text-right font-mono text-[11px] text-muted transition-colors group-hover:text-accent">
                    {account.handle}
                  </span>
                  <span className="sr-only">(opens in a new tab)</span>
                  <ArrowUpRightIcon className="h-3.5 w-3.5 shrink-0 text-muted transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </section>

        <section aria-labelledby="say-hello" className="mt-10 text-center">
          <GroupLabel id="say-hello">Say hello</GroupLabel>

          <a
            href={`mailto:${profile.email}`}
            className="group/email mt-3 inline-block max-w-full py-2.5 text-[clamp(1.15rem,4.6vw,1.5rem)] font-medium leading-snug tracking-[-0.03em] [overflow-wrap:anywhere] underline decoration-line decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
          >
            <span>{emailUser}</span>
            <span className="text-accent">@</span>
            <span className="text-muted transition-colors group-hover/email:text-accent">
              {emailDomain}
            </span>
          </a>

          <div className="mt-1 flex justify-center">
            <CopyEmailButton email={profile.email} />
          </div>
        </section>
      </main>

      <footer className="border-t border-line">
        <div className="mx-auto flex max-w-[34rem] flex-col items-center gap-2 px-5 py-8 text-center sm:flex-row sm:justify-between sm:px-6 sm:text-left">
          <p className="text-xs text-muted">
            &copy; {year} {profile.name}.
          </p>
          <p className="font-mono text-[11px] text-muted">Next.js on Vercel</p>
        </div>
      </footer>
    </>
  );
}
