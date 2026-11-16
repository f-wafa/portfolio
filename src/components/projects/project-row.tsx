import Image from "next/image";
import { ArrowUpRightIcon } from "@/components/icons";
import { projectStories } from "@/content/projects";
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

  const story = projectStories[project.name];
  const title = story?.title ?? project.name;

  const seen = new Set<string>();
  const chips = [project.language, ...(story?.stack ?? []), ...project.topics]
    .filter((label): label is string => Boolean(label))
    .filter((label) => {
      const key = label.toLowerCase();
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .slice(0, 5);

  return (
    <article className="grid gap-6 border-t border-line py-9 lg:grid-cols-12 lg:gap-8">
      <div className="order-1 lg:order-none lg:col-span-1">
        <span className="font-mono text-[11px] text-muted">
          {String(index).padStart(2, "0")}
        </span>
      </div>

      <div className="order-3 lg:order-none lg:col-span-7">
        <h3 className="text-[clamp(1.5rem,3.4vw,2.25rem)] font-semibold leading-tight tracking-[-0.03em]">
          {title}
        </h3>

        <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
          {project.description}
        </p>

        {story ? (
          <p className="mt-3 max-w-[60ch] text-[0.9375rem] leading-relaxed text-muted">
            {story.note}
          </p>
        ) : null}

        <div className="mt-5 flex flex-wrap items-center gap-2">
          {chips.map((label) => (
            <span
              key={label}
              className="inline-flex items-center gap-2 rounded-[3px] border border-line px-2 py-1 font-mono text-[11px] text-muted"
            >
              {label === project.language ? (
                <span
                  aria-hidden="true"
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: color ?? undefined }}
                />
              ) : null}
              {label}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-x-6 gap-y-3">
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

          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[11px] text-muted">
            <span>Updated {formatMonthYear(project.updatedAt)}</span>
            {project.license ? <span>{project.license}</span> : null}
          </div>
        </div>
      </div>

      {story ? (
        <div className="order-2 lg:order-none lg:col-span-4">
          <a
            href={project.liveUrl ?? project.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${title}`}
            className="group/shot block overflow-hidden rounded-sm border border-line bg-surface transition-colors hover:border-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            <Image
              src={story.image}
              alt={story.imageAlt}
              width={1207}
              height={952}
              sizes="(min-width: 1024px) 33vw, calc(100vw - 2.5rem)"
              className="aspect-[4/3] w-full object-cover object-top transition-transform duration-500 group-hover/shot:scale-[1.02]"
            />
          </a>
        </div>
      ) : null}
    </article>
  );
}
