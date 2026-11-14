"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";

export function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    // Only hide what the visitor cannot see yet. Content above the fold, printed
    // pages, and no-JS visits keep the plain visible markup.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.92) return;

    element.classList.add("reveal-pending");

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        element.classList.remove("reveal-pending");
        element.classList.add("reveal-running");
        observer.disconnect();
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={{ "--reveal-delay": `${delay}s` } as CSSProperties}
    >
      {children}
    </div>
  );
}
