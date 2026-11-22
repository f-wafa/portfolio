"use client";

import { useTheme } from "next-themes";
import type { MouseEvent } from "react";
import { MoonIcon, SunIcon } from "@/components/icons";

export function ThemeToggle() {
  const { setTheme } = useTheme();

  function toggle(event: MouseEvent<HTMLButtonElement>) {
    const root = document.documentElement;
    const next = root.classList.contains("dark") ? "light" : "dark";
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduceMotion || typeof document.startViewTransition !== "function") {
      root.classList.toggle("dark", next === "dark");
      setTheme(next);
      return;
    }

    // The reveal starts at the button itself, so the new palette feels like
    // it spreads from the control the visitor just pressed.
    const button = event.currentTarget;
    const updateOrigin = () => {
      const rect = button.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;
      // Mobile URL bars make the visual and layout viewports disagree. Cover
      // the larger one, plus a small margin, so the disc never stops short of
      // a bottom corner.
      const width = Math.max(window.innerWidth, root.clientWidth);
      const height = Math.max(window.innerHeight, root.clientHeight);
      const reach = Math.hypot(
        Math.max(x, width - x),
        Math.max(y, height - y),
      );
      root.style.setProperty("--theme-x", `${x}px`);
      root.style.setProperty("--theme-y", `${y}px`);
      root.style.setProperty("--theme-r", `${Math.ceil(reach * 1.05) + 2}px`);
    };

    updateOrigin();

    const transition = document.startViewTransition(() => {
      // Apply the class here instead of waiting for an effect, so the new
      // snapshot is captured with the new palette already in place.
      root.classList.toggle("dark", next === "dark");
      setTheme(next);
    });

    // Keep the radius honest if the viewport changes mid-reveal.
    const viewport = window.visualViewport;
    viewport?.addEventListener("resize", updateOrigin);
    window.addEventListener("resize", updateOrigin);
    const stopTracking = () => {
      viewport?.removeEventListener("resize", updateOrigin);
      window.removeEventListener("resize", updateOrigin);
    };
    transition.finished.then(stopTracking, stopTracking);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      data-theme-toggle="true"
      className="inline-flex h-11 w-11 items-center justify-center rounded-sm text-ink transition-colors hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      aria-label="Switch color theme"
    >
      <SunIcon className="hidden h-[18px] w-[18px] dark:block" />
      <MoonIcon className="block h-[18px] w-[18px] dark:hidden" />
    </button>
  );
}
