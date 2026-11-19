import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site";

const PDF_PATH = "/cv/faiz-syaiful-wafa-cv.pdf";

export const metadata: Metadata = {
  title: "CV",
  description:
    "One-page CV for Faiz Syaiful Wafa, a fullstack developer in training in Indonesia.",
  alternates: {
    canonical: "/cv",
  },
};

function displayUrl(url: string) {
  return url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");
}

const linkedIn = profile.socials.find((social) => social.label === "LinkedIn");

const contactLinks = [
  { label: profile.email, href: `mailto:${profile.email}` },
  { label: displayUrl(siteUrl), href: siteUrl },
  { label: displayUrl(profile.github), href: profile.github },
  ...(linkedIn
    ? [{ label: displayUrl(linkedIn.href), href: linkedIn.href }]
    : []),
];

const cvProjects = [
  {
    name: "Code to Snippet",
    meta: "Browser tool · GitHub Pages",
    summary:
      "Converts plain code into a VS Code snippet file without a build step, a server, or a dependency.",
    bullets: [
      "Escaping layer keeps $, backslashes, and real tab stops intact, so jQuery, PHP, and template literals survive the round trip.",
      "Optional placeholder support ($1, ${1:name}, ${1|a,b|}), syntax-highlighted output, line numbers, copy and download, keyboard shortcuts.",
      "Everything runs in the tab: pasted code never leaves the browser.",
    ],
    stack: "HTML · CSS · JavaScript · Clipboard API · File API",
    live: "https://f-wafa.github.io/code-to-snippet/",
    source: "https://github.com/f-wafa/code-to-snippet",
  },
  {
    name: "This Portfolio",
    meta: "Site · Vercel",
    summary:
      "Design and front end for the site this CV lives on, built as one public repository.",
    bullets: [
      "Next.js App Router with a typography-first layout, a light and dark theme, and keyboard-accessible navigation.",
      "WebGL hero built with React Three Fiber: loaded after the text, paused off-screen, and backed by an SVG fallback when JavaScript is unavailable.",
      "Repository and contribution data comes from the GitHub API, cached hourly; Lighthouse scores 100 for accessibility, best practices, and SEO.",
    ],
    stack: "TypeScript · Next.js · React Three Fiber · Tailwind CSS",
    live: siteUrl,
    source: profile.source,
  },
];

const education = [
  {
    title: "SMK, Computer Network Engineering (TKJ)",
    meta: "Indonesia · First year",
    detail:
      "Networking coursework at school; web development through documentation, small builds, and public repositories.",
  },
];

function CvSection({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-5 grid gap-x-6 gap-y-2 border-t border-line pt-5 sm:grid-cols-[92px_minmax(0,1fr)]">
      <h2 className="font-mono text-[8.5pt] uppercase tracking-[0.16em] text-muted">
        {label}
      </h2>
      <div className="min-w-0">{children}</div>
    </section>
  );
}

export default function CvPage() {
  return (
    <>
      <div data-print-hide className="border-b border-line">
        <div className="mx-auto flex max-w-[820px] items-center justify-between gap-4 px-5 py-3 sm:px-8">
          <Link
            href="/"
            className="inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <ArrowLeftIcon className="h-4 w-4" />
            Back to portfolio
          </Link>

          <a
            href={PDF_PATH}
            download
            className="inline-flex min-h-11 items-center justify-center rounded-sm bg-accent px-4 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          >
            Download PDF
          </a>
        </div>
      </div>

      <main
        id="main"
        tabIndex={-1}
        className="mx-auto max-w-[820px] px-5 py-8 sm:px-8 sm:py-12 print:max-w-none print:p-0"
      >
        <article className="border border-line bg-surface px-6 py-8 sm:px-10 sm:py-12 print:border-0 print:bg-transparent print:p-0">
          <div className="border-b border-ink pb-5">
            <h1 className="text-[26pt] font-semibold leading-[1.05] tracking-[-0.045em]">
              {profile.name}
            </h1>
            <p className="mt-2 font-mono text-[9pt] uppercase tracking-[0.18em] text-accent">
              {profile.role}
            </p>

            <ul className="mt-3 grid gap-x-6 gap-y-1 font-mono text-[8.5pt] text-muted sm:grid-cols-2">
              {contactLinks.map((link) => (
                <li key={link.href} className="min-w-0">
                  <a
                    href={link.href}
                    className="break-words underline decoration-line underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <CvSection label="Summary">
            <p className="max-w-[72ch] text-[10pt] leading-[1.6]">
              First-year SMK student in Computer Network Engineering (TKJ) in
              Indonesia. I build small web tools that I can finish and keep
              public, and I care about interfaces that stay fast, accessible,
              and usable when JavaScript or a third-party API is unavailable.
            </p>
          </CvSection>

          <CvSection label="Projects">
            <div className="space-y-5">
              {cvProjects.map((project) => (
                <div key={project.name} className="break-inside-avoid">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-[11.5pt] font-semibold tracking-[-0.01em]">
                      {project.name}
                    </h3>
                    <p className="font-mono text-[8.5pt] text-muted">
                      {project.meta}
                    </p>
                  </div>

                  <p className="mt-1 text-[10pt] leading-[1.55]">
                    {project.summary}
                  </p>

                  <ul className="mt-2 space-y-1">
                    {project.bullets.map((bullet) => (
                      <li
                        key={bullet}
                        className="flex gap-2 text-[9.5pt] leading-[1.45] text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[0.6em] h-px w-2 shrink-0 bg-accent"
                        />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>

                  <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-0.5 font-mono text-[8.5pt] text-muted">
                    <span>{project.stack}</span>
                    <span className="inline-flex items-baseline gap-2">
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-line underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
                      >
                        Live
                      </a>
                      <span aria-hidden="true">·</span>
                      <a
                        href={project.source}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-ink underline decoration-line underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent"
                      >
                        Source
                      </a>
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </CvSection>

          <CvSection label="Skills">
            <dl className="space-y-2">
              {profile.stack.map((group) => (
                <div
                  key={group.label}
                  className="grid gap-x-4 gap-y-0.5 sm:grid-cols-[40mm_minmax(0,1fr)]"
                >
                  <dt className="text-[9.5pt] font-medium">{group.label}</dt>
                  <dd className="text-[9.5pt] leading-[1.5] text-muted">
                    {group.items.join(" · ")}
                  </dd>
                </div>
              ))}
            </dl>
          </CvSection>

          <CvSection label="Education">
            <div className="space-y-3">
              {education.map((entry) => (
                <div key={entry.title}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-0.5">
                    <h3 className="text-[10.5pt] font-semibold">
                      {entry.title}
                    </h3>
                    <p className="font-mono text-[8.5pt] text-muted">
                      {entry.meta}
                    </p>
                  </div>
                  <p className="mt-1 max-w-[72ch] text-[9.5pt] leading-[1.5] text-muted">
                    {entry.detail}
                  </p>
                </div>
              ))}
            </div>
          </CvSection>

          <div
            data-print-hide
            className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4"
          >
            <p className="font-mono text-[8pt] text-muted">
              Sources: {displayUrl(profile.github)} · {displayUrl(siteUrl)}
            </p>
            <a
              href={PDF_PATH}
              download
              className="group inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Download this CV as PDF
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
          </div>
        </article>
      </main>
    </>
  );
}
