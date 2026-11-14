export const profile = {
  name: "Faiz Syaiful Wafa",
  firstName: "Faiz",
  handle: "f-wafa",
  role: "Fullstack developer in training",
  email: "faizsyaifulwafa@gmail.com",
  location: "Indonesia",
  github: "https://github.com/f-wafa",
  source: "https://github.com/f-wafa/portfolio",
  socials: [
    {
      label: "GitHub",
      handle: "@f-wafa",
      href: "https://github.com/f-wafa",
    },
    {
      label: "LinkedIn",
      handle: "/faiz-syaiful-wafa",
      href: "https://www.linkedin.com/in/faiz-syaiful-wafa",
    },
    {
      label: "Instagram",
      handle: "@izzpaiizzz",
      href: "https://instagram.com/izzpaiizzz",
    },
    {
      label: "TikTok",
      handle: "@izzpaiizzz",
      href: "https://tiktok.com/@izzpaiizzz",
    },
    {
      label: "YouTube",
      handle: "@izzpaiiizzzz",
      href: "https://youtube.com/@izzpaiiizzzz",
    },
    {
      label: "Buy me a coffee",
      handle: "/izzpaiizzz",
      href: "https://buymeacoffee.com/izzpaiizzz",
    },
  ],
  stack: [
    {
      label: "Languages and frontend",
      items: [
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "HTML5",
        "CSS3",
        "Markdown",
      ],
    },
    {
      label: "Backend and tools",
      items: ["Node.js", "MongoDB", "Git", "GitHub", "npm"],
    },
    {
      label: "Design and hosting",
      items: ["Figma", "Canva", "Vercel", "GitHub Pages"],
    },
  ],
} as const;

export const contactSocials = profile.socials.filter((social) =>
  ["GitHub", "LinkedIn", "Instagram", "Buy me a coffee"].includes(social.label),
);
