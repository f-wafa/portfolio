"use client";

import { useState, type FormEvent } from "react";
import { profile } from "@/content/profile";

type Status = "idle" | "submitted";

const fieldClass =
  "mt-2 w-full rounded-sm border border-line bg-paper px-3 text-sm text-ink transition-colors focus:border-accent focus:outline-2 focus:outline-offset-2 focus:outline-accent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();

    const subject = `Portfolio message from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    setStatus("submitted");
    window.location.href = href;
  }

  function handleInput() {
    if (status !== "idle") setStatus("idle");
  }

  return (
    <form
      onSubmit={handleSubmit}
      onInput={handleInput}
      className="mt-10 max-w-[40rem]"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label htmlFor="contact-name" className="block">
          <span className="font-mono text-[11px] text-muted">Name</span>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            maxLength={80}
            required
            className={`${fieldClass} h-11`}
          />
        </label>

        <label htmlFor="contact-email" className="block">
          <span className="font-mono text-[11px] text-muted">Email</span>
          <input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={120}
            required
            className={`${fieldClass} h-11`}
          />
        </label>
      </div>

      <label htmlFor="contact-message" className="mt-4 block">
        <span className="font-mono text-[11px] text-muted">Message</span>
        <textarea
          id="contact-message"
          name="message"
          rows={4}
          minLength={10}
          maxLength={1200}
          required
          className={`${fieldClass} resize-y py-2.5 leading-relaxed`}
        />
      </label>

      <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          aria-describedby="contact-form-note"
          className="inline-flex min-h-12 w-full items-center justify-center rounded-sm bg-accent px-5 text-sm font-semibold text-accent-contrast transition-colors hover:bg-accent-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink sm:w-auto"
        >
          Send message
        </button>
        <p
          id="contact-form-note"
          className="text-xs leading-relaxed text-muted sm:max-w-[26ch] sm:text-right"
        >
          Opens your email app with the message ready to send.
        </p>
      </div>

      <p
        role="status"
        className="mt-3 min-h-5 text-xs leading-relaxed text-muted"
      >
        {status === "submitted" ? (
          <>
            Check your email app. If nothing happened,{" "}
            <a
              href={`mailto:${profile.email}`}
              className="underline decoration-line underline-offset-2 transition-colors hover:text-accent hover:decoration-accent"
            >
              email me directly
            </a>
            .
          </>
        ) : (
          ""
        )}
      </p>
    </form>
  );
}
