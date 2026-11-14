import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { Hero } from "@/components/hero/hero";
import { ProjectsSection } from "@/components/projects/projects-section";
import { profile } from "@/content/profile";

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: profile.handle,
  jobTitle: profile.role,
  email: `mailto:${profile.email}`,
  url: profile.github,
  sameAs: profile.socials.map((social) => social.href),
  address: {
    "@type": "PostalAddress",
    addressCountry: "ID",
  },
  knowsAbout: profile.stack.flatMap((group) => group.items),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <main id="main" tabIndex={-1}>
        <Hero />
        <ProjectsSection />
        <AboutSection />
        <ContactSection />
      </main>
    </>
  );
}
