import { CopyEmailButton } from "@/components/copy-email-button";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { contactSocials, profile } from "@/content/profile";

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-20 border-t border-line">
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-6">
            <Reveal>
              <SectionLabel index="03">Contact</SectionLabel>
              <h2 className="mt-5 max-w-[15ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {"Have something worth "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  building
                </em>
                ?
              </h2>
              <p className="mt-5 max-w-[44ch] text-[1.0625rem] leading-[1.7] text-muted">
                Internships, small builds, or a question about a project. Email
                is the fastest way to reach me.
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
              </ul>

              <p className="mt-6 text-sm leading-relaxed text-muted">
                Open to internships and small collaborations. Based in{" "}
                {profile.location}.
              </p>
            </Reveal>
          </div>
        </div>

        <Reveal delay={0.1}>
          <div className="mt-14 border-t border-line pt-8">
            <p className="font-mono text-[11px] text-muted">Write to me</p>
            <a
              href={`mailto:${profile.email}`}
              className="mt-3 inline-block max-w-full py-3 text-[clamp(1.3rem,5.2vw,3.4rem)] sm:py-1 font-medium leading-[1.1] tracking-[-0.04em] [overflow-wrap:anywhere] underline decoration-line decoration-2 underline-offset-[0.18em] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {profile.email}
            </a>
            <CopyEmailButton email={profile.email} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
