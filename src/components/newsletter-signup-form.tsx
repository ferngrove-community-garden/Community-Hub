"use client";

import { type FormEvent, useState } from "react";

import { newsletterTopics } from "@/lib/site-data";

export function NewsletterSignupForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Join the list</p>
          <h2 className="section-title mt-3 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
            Sign up for garden updates
          </h2>
          <p className="mt-4 text-lg leading-8 text-[var(--muted)]">
            This is the front-end signup flow for the new hub. Next, we can wire it into Supabase and Brevo so
            admins can manage subscribers for real.
          </p>
        </div>
        <div className="rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.65)] px-4 py-3 text-sm font-bold text-[var(--leaf-deep)]">
          Double opt-in and consent text can be added when the mailing backend is connected.
        </div>
      </div>

      {submitted ? (
        <div className="mt-6 rounded-[1.5rem] border-3 border-[var(--border)] bg-[var(--surface-strong)] p-5 text-[var(--leaf-deep)]">
          <p className="text-lg font-extrabold">Thanks - this mock signup was captured.</p>
          <p className="mt-2 text-base leading-7 text-[var(--muted)]">
            The next step is saving real submissions to Supabase and syncing them with Brevo.
          </p>
        </div>
      ) : null}

      <form className="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]" onSubmit={handleSubmit}>
        <div className="grid gap-4">
          <label className="field-stack">
            <span className="field-label">Name</span>
            <input name="name" type="text" placeholder="Your name" className="field-input" required />
          </label>
          <label className="field-stack">
            <span className="field-label">Email</span>
            <input name="email" type="email" placeholder="you@example.com" className="field-input" required />
          </label>
          <label className="field-stack">
            <span className="field-label">Postcode or area</span>
            <input name="area" type="text" placeholder="Liverpool 8" className="field-input" />
          </label>
        </div>

        <div className="rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.65)] p-5">
          <p className="field-label">What would you like updates about?</p>
          <div className="mt-4 grid gap-3">
            {newsletterTopics.map((topic) => (
              <label key={topic} className="flex items-start gap-3 text-sm font-bold text-[var(--leaf-deep)]">
                <input type="checkbox" name="topics" value={topic} className="mt-1 h-4 w-4 accent-[var(--accent)]" />
                <span>{topic}</span>
              </label>
            ))}
          </div>

          <label className="mt-5 flex items-start gap-3 text-sm font-bold text-[var(--leaf-deep)]">
            <input type="checkbox" name="consent" className="mt-1 h-4 w-4 accent-[var(--accent)]" required />
            <span>I am happy to receive occasional email updates from Fern Grove Community Garden.</span>
          </label>

          <button type="submit" className="cartoon-button mt-6 w-full justify-center">
            Join the newsletter
          </button>
        </div>
      </form>
    </div>
  );
}
