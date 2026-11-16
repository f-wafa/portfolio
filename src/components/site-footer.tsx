import { ArrowUpIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { sections } from "@/content/sections";

const year = new Date().getFullYear();

const elsewhere = profile.socials.filter((social) =>
  ["GitHub", "LinkedIn", "Instagram"].includes(social.label),
);

const more = profile.socials.filter((social) =>
  ["TikTok", "YouTube", "Buy me a coffee"].includes(social.label),
);

function FooterLink({
  href,
  children,
  external = false,
}: {
  href: string;
  children: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external
        ? { target: "_blank", rel: "noopener noreferrer" }
        : {})}
      className="-mx-2 inline-flex min-h-11 items-center px-2 text-sm text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
    >
      {children}
    </a>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-14 sm:px-8">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <a
              href="#top"
              aria-label="Faiz Syaiful Wafa, back to top"
              className="-mx-2 inline-flex min-h-11 items-center px-2 text-xl font-semibold tracking-[-0.04em]"
            >
              faiz<span className="text-accent">.</span>
            </a>
            <p className="mt-4 max-w-[36ch] text-sm leading-relaxed text-muted">
              Fullstack developer in training. Indonesia. Learning in public,
              one repository at a time.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:col-span-6 lg:col-start-7">
            <div>
              <h3 className="font-mono text-[11px] text-muted">Sections</h3>
              <ul className="mt-2">
                {sections.map((section) => (
                  <li key={section.id}>
                    <FooterLink href={`#${section.id}`}>
                      {section.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-muted">Elsewhere</h3>
              <ul className="mt-2">
                {elsewhere.map((social) => (
                  <li key={social.label}>
                    <FooterLink href={social.href} external>
                      {social.label}
                    </FooterLink>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-mono text-[11px] text-muted">More</h3>
              <ul className="mt-2">
                {more.map((social) => (
                  <li key={social.label}>
                    <FooterLink href={social.href} external>
                      {social.label}
                    </FooterLink>
                  </li>
                ))}
                <li>
                  <FooterLink href="/cv/faiz-syaiful-wafa-cv.pdf">
                    CV (PDF)
                  </FooterLink>
                </li>
                <li>
                  <FooterLink href={profile.source} external>
                    Site source
                  </FooterLink>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted">
            &copy; {year} {profile.name}.
          </p>
          <p className="text-xs text-muted">
            Built with Next.js, React Three Fiber, and Tailwind CSS.
          </p>
          <a
            href="#top"
            className="inline-flex min-h-11 items-center gap-1.5 text-xs font-medium text-muted transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Back to top
            <ArrowUpIcon className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>
    </footer>
  );
}
