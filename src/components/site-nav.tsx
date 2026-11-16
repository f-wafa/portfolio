"use client";

import { useEffect, useRef, useState } from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { sections } from "@/content/sections";

function twoDigits(index: number) {
  return String(index + 1).padStart(2, "0");
}

export function SiteNav() {
  const [active, setActive] = useState("");
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);
  const arrivalTimeout = useRef<number | null>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      frame = 0;

      const marker = window.innerHeight * 0.38;
      let current = "";

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element && element.getBoundingClientRect().top <= marker) {
          current = section.id;
        }
      }

      setActive((previous) => (previous === current ? previous : current));
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const details = detailsRef.current;
    if (!details) return;

    const close = () => details.removeAttribute("open");

    const onPointerDown = (event: PointerEvent) => {
      if (!details.open) return;
      if (event.target instanceof Node && !details.contains(event.target)) {
        close();
      }
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape" || !details.open) return;
      close();
      summaryRef.current?.focus();
    };

    const desktop = window.matchMedia("(min-width: 640px)");
    const onDesktop = () => {
      if (desktop.matches) close();
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    desktop.addEventListener("change", onDesktop);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      desktop.removeEventListener("change", onDesktop);
    };
  }, []);

  useEffect(() => {
    return () => {
      if (arrivalTimeout.current) {
        window.clearTimeout(arrivalTimeout.current);
      }
    };
  }, []);

  function handleNavigate(id: string) {
    detailsRef.current?.removeAttribute("open");

    const target = document.getElementById(id);
    if (!target) return;

    target.classList.remove("section-arrive");
    void target.offsetWidth;
    target.classList.add("section-arrive");

    // Move the reading position, not just the scroll offset, so the next Tab
    // continues from the section the visitor asked for.
    target.focus({ preventScroll: true });

    if (arrivalTimeout.current) {
      window.clearTimeout(arrivalTimeout.current);
    }

    arrivalTimeout.current = window.setTimeout(() => {
      target.classList.remove("section-arrive");
    }, 1000);
  }

  return (
    <>
      <nav
        aria-label="Primary"
        className="hidden items-center gap-0.5 sm:flex sm:gap-1"
      >
        {sections.map((section) => {
          const current = active === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => handleNavigate(section.id)}
              aria-current={current ? "location" : undefined}
              className={`inline-flex min-h-11 items-center rounded-sm px-2 text-[0.8125rem] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:px-3 sm:text-sm ${
                current
                  ? "text-ink underline decoration-accent decoration-2 underline-offset-[6px]"
                  : "text-muted hover:text-ink"
              }`}
            >
              {section.label}
            </a>
          );
        })}
      </nav>

      <span
        aria-hidden="true"
        className="mx-1 hidden h-5 w-px bg-line sm:block"
      />

      <ThemeToggle />

      <details ref={detailsRef} className="group sm:hidden">
        <summary
          ref={summaryRef}
          className="flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-sm text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent [&::-webkit-details-marker]:hidden"
        >
          <span className="sr-only">Menu</span>
          <span aria-hidden="true" className="grid w-5 gap-1.5">
            <span className="h-px w-full bg-current transition-transform group-open:translate-y-[3.5px] group-open:rotate-45" />
            <span className="h-px w-full bg-current transition-transform group-open:-translate-y-[3.5px] group-open:-rotate-45" />
          </span>
        </summary>

        <div className="hidden fixed inset-x-0 top-16 border-b border-line bg-paper px-5 pb-5 group-open:block">
          <nav aria-label="Sections" className="flex flex-col">
            {sections.map((section, index) => {
              const current = active === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  onClick={() => handleNavigate(section.id)}
                  aria-current={current ? "location" : undefined}
                  className={`flex min-h-12 items-center justify-between border-t border-line text-base transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                    current ? "text-accent" : "text-ink hover:text-accent"
                  }`}
                >
                  <span>{section.label}</span>
                  <span
                    aria-hidden="true"
                    className="font-mono text-[11px] text-muted"
                  >
                    {twoDigits(index)}
                  </span>
                </a>
              );
            })}
          </nav>
        </div>
      </details>
    </>
  );
}
