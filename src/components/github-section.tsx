import { ArrowUpRightIcon } from "@/components/icons";
import { Reveal } from "@/components/reveal";
import { SectionLabel } from "@/components/section-label";
import { SnapshotNote } from "@/components/snapshot-note";
import { formatFullDate } from "@/lib/format";
import { getGitHubActivity, getGitHubStats } from "@/lib/github";

const LEVEL_CLASS = [
  "bg-line",
  "bg-accent/25",
  "bg-accent/45",
  "bg-accent/70",
  "bg-accent",
] as const;

function dayClass(level: number) {
  if (level < 0) return "opacity-0";
  return LEVEL_CLASS[level] ?? LEVEL_CLASS[0];
}

export async function GitHubSection() {
  const [stats, activity] = await Promise.all([
    getGitHubStats(),
    getGitHubActivity(),
  ]);

  const streak = activity.streak;
  const items = [
    { label: "Projects shipped", value: String(stats.projectRepositories) },
    {
      label: "Contributions, last year",
      value: streak?.total != null ? String(streak.total) : "—",
    },
    {
      label: "Active days, last year",
      value: streak ? String(streak.activeDays) : "—",
    },
    {
      label: "Longest streak (days)",
      value: streak ? String(streak.longest) : "—",
    },
  ];

  return (
    <section
      id="github"
      tabIndex={-1}
      className="border-t border-line focus:outline-none"
    >
      <div className="mx-auto max-w-[1180px] px-5 py-20 sm:px-8 sm:py-28">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <SectionLabel index="04">GitHub</SectionLabel>
              <h2 className="mt-5 max-w-[14ch] text-balance text-[clamp(2rem,4.6vw,3.35rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
                {"The "}
                <em className="font-serif font-normal italic tracking-[-0.02em] text-accent">
                  trail
                </em>
                {" so far."}
              </h2>
            </div>

            <div className="lg:col-span-5 lg:pb-2">
              <p className="max-w-[46ch] text-[0.9375rem] leading-relaxed text-muted">
                Counts, commits, and the contribution graph come from GitHub
                and refresh hourly.
              </p>
            </div>
          </div>
        </Reveal>

        {stats.stale ? (
          <Reveal delay={0.05}>
            <div className="mt-10">
              <SnapshotNote>
                GitHub did not answer, so these numbers are from{" "}
                {formatFullDate(stats.fetchedAt)}.
              </SnapshotNote>
            </div>
          </Reveal>
        ) : null}

        <Reveal delay={0.05}>
          <dl className="mt-10 grid grid-cols-2 gap-px border-y border-line bg-line sm:grid-cols-4">
            {items.map((item) => (
              <div key={item.label} className="bg-paper px-5 py-8 sm:px-7">
                <dt className="font-mono text-[11px] leading-relaxed text-muted">
                  {item.label}
                </dt>
                <dd className="mt-6 text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                  {item.value}
                </dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-12 grid gap-12 border-t border-line pt-10 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-7">
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="font-mono text-[11px] text-muted">
                  Recent commits
                </h3>
                <span className="font-mono text-[11px] text-muted">
                  {activity.commits.length > 0
                    ? `${activity.commits.length} shown`
                    : ""}
                </span>
              </div>

              {activity.commits.length > 0 ? (
                <div className="mt-4">
                  {activity.commits.map((commit) => (
                    <a
                      key={commit.sha}
                      href={commit.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group/commit block border-t border-line py-4 first:border-t-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
                    >
                      <span className="flex items-baseline justify-between gap-4">
                        <span className="line-clamp-2 min-w-0 text-[0.9375rem] leading-[1.5] transition-colors group-hover/commit:text-accent">
                          {commit.message}
                        </span>
                        <span className="shrink-0 font-mono text-[11px] text-muted">
                          {formatFullDate(commit.date)}
                        </span>
                      </span>
                      <span className="mt-1.5 flex flex-wrap items-center gap-x-2 font-mono text-[11px] text-muted">
                        <span>{commit.repo}</span>
                        <span aria-hidden="true">/</span>
                        <span>{commit.shortSha}</span>
                      </span>
                    </a>
                  ))}
                </div>
              ) : (
                <p className="mt-4 max-w-[42ch] text-sm leading-relaxed text-muted">
                  No commits to show right now. The repositories on GitHub are
                  still the source of truth.
                </p>
              )}
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              {streak ? (
                <>
                  <h3 className="font-mono text-[11px] text-muted">
                    Current streak
                  </h3>

                  <p className="mt-4 flex items-end gap-2">
                    <span className="text-[clamp(2.5rem,5vw,3.5rem)] font-semibold leading-none tracking-[-0.05em] tabular-nums">
                      {streak.current}
                    </span>
                    <span className="pb-1.5 text-sm text-muted">
                      {streak.current === 1 ? "day" : "days"} in a row
                    </span>
                  </p>

                  <div
                    role="img"
                    aria-label={`Contribution activity over the last 14 weeks: ${streak.recentActiveDays} active ${
                      streak.recentActiveDays === 1 ? "day" : "days"
                    }.`}
                    className="mt-6 grid w-max grid-flow-col grid-rows-[repeat(7,9px)] gap-[3px]"
                  >
                    {streak.days.map((day) => (
                      <span
                        key={day.date}
                        aria-hidden="true"
                        className={`h-[9px] w-[9px] rounded-[1px] ${dayClass(day.level)}`}
                      />
                    ))}
                  </div>

                  <p className="mt-3 max-w-[34ch] font-mono text-[11px] leading-relaxed text-muted">
                    Last 14 weeks. Each square is a day, darker means more
                    contributions.
                  </p>
                </>
              ) : (
                <>
                  <h3 className="font-mono text-[11px] text-muted">Streak</h3>
                  <p className="mt-4 max-w-[34ch] text-sm leading-relaxed text-muted">
                    The public contribution graph is not available right now.
                    No streak number is shown rather than an estimate.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-[58ch] text-sm leading-relaxed text-muted">
              {stats.projectRepositories} projects plus the profile repository.
              Last push{" "}
              {stats.lastPush
                ? `${formatFullDate(stats.lastPush)}.`
                : "not recorded."}
            </p>

            <a
              href="https://github.com/f-wafa"
              target="_blank"
              rel="noopener noreferrer"
              className="group/link inline-flex min-h-11 shrink-0 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Open github.com/f-wafa
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          </div>

          <p className="mt-4 font-mono text-[11px] text-muted">
            Sources: GitHub REST API and{" "}
            <span className="whitespace-nowrap">
              github.com/f-wafa/contributions
            </span>
            . Refreshed hourly.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
