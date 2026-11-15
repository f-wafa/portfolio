import { ArrowUpRightIcon } from "@/components/icons";
import { SnapshotNote } from "@/components/snapshot-note";
import { profile } from "@/content/profile";
import { formatFullDate } from "@/lib/format";
import { getProjects } from "@/lib/github";
import { ProjectRow } from "./project-row";

export async function ProjectList() {
  const { projects, stale, fetchedAt } = await getProjects();

  if (projects.length === 0) {
    return (
      <div className="mt-12 border-y border-line py-14">
        <p className="font-mono text-[11px] text-accent">Empty</p>
        <p className="mt-3 text-xl font-medium">No public repositories yet.</p>
        <p className="mt-2 max-w-[52ch] text-[0.9375rem] leading-relaxed text-muted">
          The first push will show up here. Until then, the GitHub profile is
          the honest place to look.
        </p>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link mt-5 inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
        >
          Visit github.com/{profile.handle}
          <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
      </div>
    );
  }

  return (
    <div className="mt-12">
      {stale ? (
        <div className="mb-8">
          <SnapshotNote>
            GitHub did not answer, so this list is from{" "}
            {formatFullDate(fetchedAt)}. The repository links still work.
          </SnapshotNote>
        </div>
      ) : null}

      <div className="border-b border-line">
        {projects.map((project, index) => (
          <ProjectRow
            key={project.name}
            project={project}
            index={index + 1}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <a
          href={`${profile.github}?tab=repositories`}
          target="_blank"
          rel="noopener noreferrer"
          className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent"
        >
          All repositories on GitHub
          <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
        </a>
        <p className="font-mono text-[11px] text-muted">
          {projects.length} project{" "}
          {projects.length === 1 ? "repository" : "repositories"}
        </p>
      </div>
    </div>
  );
}
