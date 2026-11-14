import { cacheLife } from "next/cache";

const USERNAME = "f-wafa";
const API_URL = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`;

export type Project = {
  name: string;
  description: string;
  url: string;
  liveUrl: string | null;
  language: string | null;
  topics: string[];
  updatedAt: string;
  license: string | null;
};

export type ProjectsResult = {
  projects: Project[];
  stale: boolean;
  fetchedAt: string;
};

type GitHubRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  topics?: string[];
  pushed_at: string;
  fork: boolean;
  archived: boolean;
  has_pages: boolean;
  license: { spdx_id: string | null } | null;
};

// Verified copy for the two published projects. Future repositories fall back
// to the description in the GitHub API, so the list keeps updating by itself.
const REPO_COPY: Record<string, string> = {
  "code-to-snippet":
    "A browser tool that turns plain code into ready-to-use VS Code snippets. It keeps placeholders intact, copies, and downloads the file without sending code anywhere.",
  portfolio:
    "A personal portfolio, built in the open and published as a public repository.",
};

const FALLBACK_PROJECTS: Project[] = [
  {
    name: "code-to-snippet",
    description: REPO_COPY["code-to-snippet"],
    url: "https://github.com/f-wafa/code-to-snippet",
    liveUrl: "https://f-wafa.github.io/code-to-snippet/",
    language: "JavaScript",
    topics: [],
    updatedAt: "2026-10-29T08:17:22Z",
    license: "MIT",
  },
  {
    name: "portfolio",
    description: REPO_COPY.portfolio,
    url: "https://github.com/f-wafa/portfolio",
    liveUrl: "https://f-wafa.github.io/portfolio/",
    language: "HTML",
    topics: [],
    updatedAt: "2026-11-13T19:28:07Z",
    license: "MIT",
  },
];

function pagesUrl(name: string) {
  return `https://${USERNAME}.github.io/${name}/`;
}

function toProject(repo: GitHubRepo): Project {
  const homepage = repo.homepage?.trim();
  const liveUrl =
    homepage && homepage.length > 0
      ? homepage
      : repo.has_pages
        ? pagesUrl(repo.name)
        : null;

  return {
    name: repo.name,
    description:
      REPO_COPY[repo.name] ?? repo.description ?? "No description yet.",
    url: repo.html_url,
    liveUrl,
    language: repo.language,
    topics: repo.topics ?? [],
    updatedAt: repo.pushed_at,
    license:
      repo.license?.spdx_id && repo.license.spdx_id !== "NOASSERTION"
        ? repo.license.spdx_id
        : null,
  };
}

function sortProjects(projects: Project[]) {
  return projects.sort((a, b) => {
    if (a.name === "portfolio") return 1;
    if (b.name === "portfolio") return -1;
    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

export async function getProjects(): Promise<ProjectsResult> {
  "use cache";
  cacheLife("hours");

  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  try {
    const response = await fetch(API_URL, { headers });

    if (!response.ok) {
      throw new Error(`GitHub responded with ${response.status}`);
    }

    const repos = (await response.json()) as GitHubRepo[];
    const projects = sortProjects(
      repos
        .filter((repo) => !repo.fork && !repo.archived && repo.name !== USERNAME)
        .map(toProject),
    );

    return {
      projects,
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      projects: FALLBACK_PROJECTS,
      stale: true,
      fetchedAt: "2026-11-14T00:00:00.000Z",
    };
  }
}
