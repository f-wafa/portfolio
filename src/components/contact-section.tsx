import { ContactForm } from "@/components/contact-form";
import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { contactSocials, profile } from "@/content/profile";
import { availability } from "@/content/status";

const [localPart, domain] = profile.email.split("@");

export function ContactSection() {
  return (
    <section
      id="contact"
      tabIndex={-1}
      className="border-t border-line bg-surface focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="05">Contact</SectionLabel>
              <div className="heading-mask">
                <h2 className="heading-rise mt-5 max-w-[15ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                  {"Have something worth "}
                  <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                    building
                  </em>
                  ?
                </h2>
              </div>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-muted">
                Small builds, fixes, or a question about a project. Email is
                the fastest way to reach me.
              </p>
            </Reveal>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <Reveal delay={0.05}>
              <h3 className="font-mono text-[11px] text-muted">Elsewhere</h3>
              <ul className="mt-4 border-t border-line">
                {contactSocials.map((social) => (
                  <li key={social.label} className="border-b border-line">
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex min-h-11 items-center justify-between gap-4 py-2.5 text-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span>{social.label}</span>
                      <span className="font-mono text-[11px] text-muted">
                        {social.handle}
                      </span>
                    </a>
                  </li>
                ))}
                <li className="border-b border-line">
                  <a
                    href="/cv/faiz-syaiful-wafa-cv.pdf"
                    download
                    className="flex min-h-11 items-center justify-between gap-4 py-2.5 text-sm transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                  >
                    <span>One-page CV</span>
                    <span className="font-mono text-[11px] text-muted">PDF</span>
                  </a>
                </li>
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-muted">
                {availability.openToInternships
                  ? `Open to internships and small collaborations. Based in ${profile.location}.`
                  : `Based in ${profile.location}. Questions and small projects are welcome.`}
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-line pt-8">
            <p className="font-mono text-[11px] text-muted">Write to me</p>

            <div className="mt-2 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
              <a
                href={`mailto:${profile.email}`}
                className="group/email inline-block max-w-full py-3 text-[clamp(1.2rem,6vw,3.4rem)] font-medium leading-[1.12] tracking-[-0.04em] [overflow-wrap:anywhere] underline decoration-line decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent sm:py-1"
              >
                <span>{localPart}</span>
                <span className="text-accent">@</span>
                <span className="text-muted transition-colors group-hover/email:text-accent">
                  {domain}
                </span>
              </a>

              <div className="shrink-0 sm:pb-1">
                <CopyEmailButton email={profile.email} />
              </div>
            </div>

            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
