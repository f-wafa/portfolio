import { ArrowUpRightIcon } from "@/components/icons";
import { formatMonthYear } from "@/lib/format";
import type { Project } from "@/lib/github";

const LANGUAGE_COLORS: Record<string, string> = {
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
};

export function ProjectRow({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  const color = project.language
    ? (LANGUAGE_COLORS[project.language] ?? "var(--muted)")
    : null;

  return (
    <article className="grid gap-6 border-t border-line py-9 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-1">
        <span className="font-mono text-[11px] text-muted">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="lg:col-span-7">
        <h3 className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
          {project.name}
        </h3>

        <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
          {project.description}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {project.language ? (
            <span className="inline-flex items-center gap-2 rounded-[3px] border border-line px-2 py-1 font-mono text-[11px] text-muted">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: color ?? undefined }}
              />
              {project.language}
            </span>
          ) : null}

          {project.topics.slice(0, 3).map((topic) => (
            <span
              key={topic}
              className="rounded-[3px] border border-line px-2 py-1 font-mono text-[11px] text-muted"
            >
              {topic}
            </span>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-start justify-between gap-5 lg:col-span-4 lg:flex-col lg:items-end">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted lg:flex-col lg:items-end">
          <span>Updated {formatMonthYear(project.updatedAt)}</span>
          {project.license ? <span>{project.license}</span> : null}
        </div>

        <div className="flex items-center gap-4">
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Source code for ${project.name} on GitHub`}
            className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Source
            <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
          </a>

          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Live preview of ${project.name}`}
              className="group/link inline-flex min-h-11 items-center gap-1.5 text-sm font-medium transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
            >
              Live
              <ArrowUpRightIcon className="h-3.5 w-3.5 transition-transform group-hover/link:-translate-y-0.5 group-hover/link:translate-x-0.5" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
}
