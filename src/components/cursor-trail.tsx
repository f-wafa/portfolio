"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const fine = window.matchMedia("(pointer: fine)");
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");

  fine.addEventListener("change", callback);
  motion.addEventListener("change", callback);

  return () => {
    fine.removeEventListener("change", callback);
    motion.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  return (
    window.matchMedia("(pointer: fine)").matches &&
    !window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function CursorTrail() {
  const enabled = useSyncExternalStore(subscribe, getSnapshot, () => false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!canvas || !context) return;

    let width = 0;
    let height = 0;
    let accent = "#bc3d18";
    let frame = 0;
    let running = false;

    const points: { x: number; y: number; at: number }[] = [];
    const life = 150;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
    };

    const readAccent = () => {
      accent =
        getComputedStyle(document.documentElement)
          .getPropertyValue("--accent")
          .trim() || accent;
    };

    const draw = (now: number) => {
      context.clearRect(0, 0, width, height);

      while (points.length > 0 && now - points[0].at > life) {
        points.shift();
      }

      for (const point of points) {
        const age = (now - point.at) / life;
        context.globalAlpha = Math.max(0, 1 - age) * 0.4;
        context.fillStyle = accent;
        context.beginPath();
        context.arc(point.x, point.y, 5 - age * 3.2, 0, Math.PI * 2);
        context.fill();
      }

      context.globalAlpha = 1;

      if (points.length > 0) {
        frame = requestAnimationFrame(draw);
      } else {
        running = false;
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (event.pointerType === "touch") return;

      points.push({ x: event.clientX, y: event.clientY, at: performance.now() });

      if (points.length > 40) points.shift();

      if (!running) {
        running = true;
        frame = requestAnimationFrame(draw);
      }
    };

    const themeObserver = new MutationObserver(readAccent);

    resize();
    readAccent();
    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      themeObserver.disconnect();
      if (frame) cancelAnimationFrame(frame);
      context.clearRect(0, 0, width, height);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-40 h-dvh w-screen"
    />
  );
}
