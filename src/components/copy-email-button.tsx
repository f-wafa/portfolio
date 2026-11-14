"use client";

import { useEffect, useRef, useState } from "react";
import { CheckIcon, CopyIcon } from "@/components/icons";

type Status = "idle" | "copied" | "error";

export function CopyEmailButton({ email }: { email: string }) {
  const [status, setStatus] = useState<Status>("idle");
  const timeout = useRef<number | null>(null);

  useEffect(() => {
    return () => {
      if (timeout.current) window.clearTimeout(timeout.current);
    };
  }, []);

  async function copyAddress() {
    try {
      if (!navigator.clipboard) {
        throw new Error("Clipboard unavailable");
      }

      await navigator.clipboard.writeText(email);
      setStatus("copied");

      if (timeout.current) window.clearTimeout(timeout.current);
      timeout.current = window.setTimeout(() => setStatus("idle"), 2500);
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="mt-5 flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={copyAddress}
        className="inline-flex min-h-11 items-center justify-center gap-2 rounded-sm border border-ink px-4 text-sm font-medium transition-colors hover:bg-ink hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {status === "copied" ? (
          <CheckIcon className="h-4 w-4" />
        ) : (
          <CopyIcon className="h-4 w-4" />
        )}
        {status === "copied" ? "Copied" : "Copy address"}
      </button>

      <span
        role="status"
        aria-live="polite"
        className="text-sm text-muted"
      >
        {status === "copied"
          ? "Email address copied to the clipboard."
          : status === "error"
            ? "Copy failed. Select the address above."
            : ""}
      </span>
    </div>
  );
}
