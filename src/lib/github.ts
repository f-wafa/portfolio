import { cacheLife } from "next/cache";

const USERNAME = "f-wafa";
const USER_URL = `https://api.github.com/users/${USERNAME}`;
const REPOS_URL = `https://api.github.com/users/${USERNAME}/repos?per_page=100&sort=pushed`;

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

export type ProjectList = {
  projects: Project[];
  stale: boolean;
  fetchedAt: string;
};

export type GitHubStats = {
  repositories: number;
  projectRepositories: number;
  languages: { name: string; count: number }[];
  languageCount: number;
  followers: number;
  daysOnGitHub: number;
  lastPush: string | null;
  memberSince: string;
  stale: boolean;
  fetchedAt: string;
};

type GitHubUser = {
  public_repos: number;
  followers: number;
  following: number;
  created_at: string;
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

type Snapshot = {
  projects: Project[];
  user: Pick<GitHubUser, "public_repos" | "followers" | "following" | "created_at">;
  stale: boolean;
  fetchedAt: string;
};

// Verified copy for the two published projects. Future repositories fall back
// to the description in the GitHub API, so the list keeps updating by itself.
const REPO_COPY: Record<string, string> = {
  "code-to-snippet":
    "A browser tool that turns plain code into ready-to-use VS Code snippets. It keeps placeholders intact, copies, and downloads the file without sending code anywhere.",
  portfolio:
    "The site you are reading: design, content, and the WebGL hero all live in one repository.",
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
    liveUrl: null,
    language: "TypeScript",
    topics: [],
    updatedAt: "2026-11-14T23:33:50Z",
    license: "MIT",
  },
];

const FALLBACK_USER: Snapshot["user"] = {
  public_repos: 3,
  followers: 1,
  following: 0,
  created_at: "2026-09-28T23:36:11Z",
};

const FALLBACK_AT = "2026-11-15T00:00:00.000Z";

function pagesUrl(name: string) {
  return `https://${USERNAME}.github.io/${name}/`;
}

// GitHub homepages are free text: some owners leave out the protocol, and a
// relative URL would resolve against this site instead of theirs.
function normalizeUrl(value: string | null | undefined) {
  const url = value?.trim();
  if (!url) return null;
  if (/^https?:\/\//i.test(url)) return url;
  return `https://${url.replace(/^\/+/, "")}`;
}

function toProject(repo: GitHubRepo): Project {
  // The portfolio entry is this site: a "Live" link would reload the page the
  // visitor is already on.
  const liveUrl =
    repo.name === "portfolio"
      ? null
      : (normalizeUrl(repo.homepage) ??
        (repo.has_pages ? pagesUrl(repo.name) : null));

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
    const aIsPortfolio = a.name === "portfolio";
    const bIsPortfolio = b.name === "portfolio";

    if (aIsPortfolio !== bIsPortfolio) {
      return aIsPortfolio ? -1 : 1;
    }

    return b.updatedAt.localeCompare(a.updatedAt);
  });
}

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }

  return headers;
}

async function fetchSnapshot(): Promise<Snapshot> {
  "use cache";
  cacheLife("hours");

  const headers = githubHeaders();

  try {
    const [userResponse, reposResponse] = await Promise.all([
      fetch(USER_URL, { headers }),
      fetch(REPOS_URL, { headers }),
    ]);

    if (!userResponse.ok || !reposResponse.ok) {
      throw new Error(
        `GitHub responded with ${userResponse.status}/${reposResponse.status}`,
      );
    }

    const user = (await userResponse.json()) as GitHubUser;
    const repos = (await reposResponse.json()) as GitHubRepo[];

    const projects = sortProjects(
      repos
        .filter((repo) => !repo.fork && !repo.archived && repo.name !== USERNAME)
        .map(toProject),
    );

    return {
      projects,
      user: {
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
        created_at: user.created_at,
      },
      stale: false,
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return {
      projects: sortProjects([...FALLBACK_PROJECTS]),
      user: FALLBACK_USER,
      stale: true,
      fetchedAt: FALLBACK_AT,
    };
  }
}

export async function getProjects(): Promise<ProjectList> {
  const { projects, stale, fetchedAt } = await fetchSnapshot();
  return { projects, stale, fetchedAt };
}

export async function getGitHubStats(): Promise<GitHubStats> {  const { projects, user, stale, fetchedAt } = await fetchSnapshot();

  const counts = new Map<string, number>();
  for (const project of projects) {
    if (!project.language) continue;
    counts.set(project.language, (counts.get(project.language) ?? 0) + 1);
  }

  const languages = [...counts.entries()]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count || a.name.localeCompare(b.name));

  const lastPush = projects.reduce<string | null>(
    (latest, project) =>
      !latest || project.updatedAt > latest ? project.updatedAt : latest,
    null,
  );

  const elapsed = Date.parse(fetchedAt) - Date.parse(user.created_at);

  return {
    repositories: user.public_repos,
    projectRepositories: projects.length,
    languages,
    languageCount: languages.length,
    followers: user.followers,
    daysOnGitHub: Math.max(1, Math.floor(elapsed / 86_400_000)),
    lastPush,
    memberSince: user.created_at,
    stale,
    fetchedAt,
  };
}

export type CommitEntry = {
  sha: string;
  shortSha: string;
  message: string;
  repo: string;
  date: string;
  url: string;
};

export type ContributionDay = {
  date: string;
  level: number;
};

export type ContributionSummary = {
  current: number;
  longest: number;
  total: number | null;
  activeDays: number;
  recentActiveDays: number;
  days: ContributionDay[];
};

export type GitHubActivity = {
  commits: CommitEntry[];
  streak: ContributionSummary | null;
  fetchedAt: string;
};

type GitHubCommit = {
  sha: string;
  html_url: string;
  parents: { sha: string }[];
  commit: {
    message: string;
    author: { date: string } | null;
  };
};

const BROWSER_UA =
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0 Safari/537.36";

// A commit called "1.3" says nothing to a visitor. Drop pure version
// messages, including typos with repeated dots, so the feed only shows
// commits that describe a change.
const VERSION_BUMP = /^v?\d+(?:\.+\d+)*$/i;

const RECENT_WEEKS = 14;

function utcDay(date: Date) {
  return date.toISOString().slice(0, 10);
}

function shiftDay(day: string, amount: number) {
  const date = new Date(`${day}T00:00:00.000Z`);
  date.setUTCDate(date.getUTCDate() + amount);
  return utcDay(date);
}

function buildRecentWeeks(
  levels: Map<string, number>,
  today: string,
  weeks: number,
) {
  const current = new Date(`${today}T00:00:00.000Z`);
  const start = new Date(current);
  start.setUTCDate(
    start.getUTCDate() - current.getUTCDay() - (weeks - 1) * 7,
  );

  const days: ContributionDay[] = [];

  for (let index = 0; index < weeks * 7; index += 1) {
    const date = new Date(start);
    date.setUTCDate(start.getUTCDate() + index);
    const key = utcDay(date);

    // Days after today hold their slot so the last column keeps its shape.
    days.push({
      date: key,
      level: key > today ? -1 : (levels.get(key) ?? 0),
    });
  }

  return days;
}

// The public contribution graph is HTML, not API. The parser only trusts the
// day cells and the "contributions in the last year" line, and returns null
// when GitHub changes the markup, so the page can drop the numbers instead of
// guessing them.
function parseContributions(html: string): ContributionSummary | null {
  const cells: ContributionDay[] = [];

  for (const match of html.matchAll(/<td\b[^>]*>/g)) {
    const tag = match[0];
    const date = tag.match(/data-date="(\d{4}-\d{2}-\d{2})"/);
    const level = tag.match(/data-level="([0-4])"/);

    if (date && level) {
      cells.push({ date: date[1], level: Number(level[1]) });
    }
  }

  if (cells.length < 7) return null;

  const today = utcDay(new Date());
  const levels = new Map(cells.map((cell) => [cell.date, cell.level]));
  const activeDates = cells
    .filter((cell) => cell.level > 0 && cell.date <= today)
    .map((cell) => cell.date)
    .sort();
  const active = new Set(activeDates);

  let current = 0;
  let cursor = active.has(today) ? today : shiftDay(today, -1);

  while (active.has(cursor)) {
    current += 1;
    cursor = shiftDay(cursor, -1);
  }

  let longest = 0;
  let run = 0;
  let previous: string | null = null;

  for (const date of activeDates) {
    run = previous && shiftDay(previous, 1) === date ? run + 1 : 1;
    if (run > longest) longest = run;
    previous = date;
  }

  const total = html.match(/([0-9,]+)\s+contributions?\s+in the last year/);
  const days = buildRecentWeeks(levels, today, RECENT_WEEKS);

  return {
    current,
    longest,
    total: total ? Number(total[1].replace(/,/g, "")) : null,
    activeDays: activeDates.length,
    recentActiveDays: days.filter((day) => day.level > 0).length,
    days,
  };
}

async function fetchActivity(): Promise<GitHubActivity> {
  "use cache";
  cacheLife("hours");

  const { projects } = await fetchSnapshot();
  const headers = githubHeaders();

  const groups = await Promise.all(
    projects.slice(0, 3).map(async (project) => {
      try {
        const response = await fetch(
          `https://api.github.com/repos/${USERNAME}/${project.name}/commits?per_page=10`,
          { headers },
        );

        if (!response.ok) return [];

        const commits = (await response.json()) as GitHubCommit[];

        // Merge commits repeat what the branch already shows, so the list
        // keeps only the commits that changed something.
        return commits
          .filter((commit) => commit.parents.length <= 1)
          .map((commit) => ({
            sha: commit.sha,
            shortSha: commit.sha.slice(0, 7),
            message:
              commit.commit.message.split("\n")[0]?.trim() || "No message",
            repo: project.name,
            date: commit.commit.author?.date ?? "",
            url: commit.html_url,
          }))
          .filter((commit) => !VERSION_BUMP.test(commit.message));
      } catch {
        return [];
      }
    }),
  );

  const commits = groups
    .flat()
    .filter((commit) => commit.date.length > 0)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, 6);

  let streak: ContributionSummary | null = null;

  try {
    const response = await fetch(
      `https://github.com/users/${USERNAME}/contributions`,
      {
        headers: {
          Accept: "text/html",
          "User-Agent": BROWSER_UA,
        },
      },
    );

    if (response.ok) {
      streak = parseContributions(await response.text());
    }
  } catch {
    streak = null;
  }

  return { commits, streak, fetchedAt: new Date().toISOString() };
}

export async function getGitHubActivity(): Promise<GitHubActivity> {
  return fetchActivity();
}
