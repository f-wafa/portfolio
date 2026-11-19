export type ProjectStory = {
  title: string;
  image: string;
  imageAlt: string;
  stack: string[];
  note: string;
};

// Screenshots are captures of the running project. Repositories without an
// entry fall back to their GitHub name and description.
export const projectStories: Record<string, ProjectStory> = {
  "code-to-snippet": {
    title: "Code to Snippet",
    image: "/shots/code-to-snippet.webp",
    imageAlt:
      "Code to Snippet turning a JavaScript function into a downloadable VS Code snippet file.",
    stack: ["Clipboard API", "File API", "Zero dependencies"],
    note: "The hard part is escaping: $, backslashes, and real tab stops have to survive the round trip without breaking jQuery, PHP, or template literals.",
  },
  portfolio: {
    title: "This Portfolio",
    image: "/shots/portfolio-work.webp",
    imageAlt:
      "The Work section of this portfolio, with two project entries and a screenshot beside each one.",
    stack: ["Next.js", "React Three Fiber", "Tailwind CSS", "GitHub API"],
    note: "The hero is decoration, so it loads after the text, pauses off-screen, and falls back to an SVG. GitHub data is cached for an hour so the page never waits on the API.",
  },
};
