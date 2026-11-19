"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import { LatticeFallback } from "./lattice-fallback";

const HeroScene = dynamic(() => import("./hero-scene"), { ssr: false });

let webglSupport: boolean | null = null;

function hasWebGL() {
  if (webglSupport !== null) return webglSupport;

  try {
    const canvas = document.createElement("canvas");
    const context =
      canvas.getContext("webgl2") ?? canvas.getContext("webgl");
    webglSupport = Boolean(context);
  } catch {
    webglSupport = false;
  }

  return webglSupport;
}

function canRenderScene() {
  if (typeof window === "undefined") return false;
  if (!hasWebGL()) return false;
  return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function subscribeToPreferences(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

export function HeroVisual() {
  const { resolvedTheme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);
  const allowScene = useSyncExternalStore(
    subscribeToPreferences,
    canRenderScene,
    () => false,
  );
  const [ready, setReady] = useState(false);
  const [inView, setInView] = useState(true);
  const [pageVisible, setPageVisible] = useState(true);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "200px" },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const onVisibilityChange = () => {
      setPageVisible(document.visibilityState === "visible");
    };

    document.addEventListener("visibilitychange", onVisibilityChange);
    return () =>
      document.removeEventListener("visibilitychange", onVisibilityChange);
  }, []);

  const theme = resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div
      ref={containerRef}
      role="img"
      aria-label="A low-poly wireframe lattice with a single orbit ring, drawn in the browser."
      className="relative mx-auto aspect-square w-full max-w-[260px] sm:max-w-[400px] lg:max-w-[560px]"
    >
      <LatticeFallback
        className={`absolute inset-0 h-full w-full transition-opacity duration-700 ${
          ready ? "opacity-0" : "opacity-100"
        }`}
      />

      {allowScene ? (
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 transition-opacity duration-700 ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        >
          <HeroScene
            theme={theme}
            active={inView && pageVisible}
            onReady={() => setReady(true)}
          />
        </div>
      ) : null}
    </div>
  );
}
