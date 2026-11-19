import { ArrowUpRightIcon } from "@/components/icons";
import { profile } from "@/content/profile";
import { now } from "@/content/status";
import { formatFullDate } from "@/lib/format";
import { getGitHubStats } from "@/lib/github";

export async function NowStrip() {
  const stats = await getGitHubStats();
  const lastPush = stats.stale ? null : stats.lastPush;

  return (
    <section aria-label="Now" className="border-t border-line">
      <div className="mx-auto flex max-w-[1180px] flex-col gap-2 px-5 py-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-8 sm:px-8">
        <p className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
          <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-accent">
            Now
          </span>
          <span className="text-[0.9375rem] leading-relaxed text-ink">
            {now.headline}
          </span>
        </p>

        <p className="shrink-0 font-mono text-[11px] text-muted">
          {lastPush ? (
            <>
              Last push {formatFullDate(lastPush)}
              <span aria-hidden="true"> · </span>
            </>
          ) : null}
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="group/link inline-flex items-center gap-1 underline decoration-line underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            github.com/f-wafa
            <ArrowUpRightIcon className="h-3 w-3 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>
        </p>
      </div>
    </section>
  );
}
