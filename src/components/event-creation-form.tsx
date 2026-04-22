"use client";

import { type FormEvent, useMemo, useState } from "react";

import { eventCategories } from "@/lib/site-data";

type DraftEvent = {
  title: string;
  date: string;
  startTime: string;
  endTime: string;
  category: string;
  location: string;
  capacity: string;
  summary: string;
  visibility: string;
};

const defaultEvent: DraftEvent = {
  title: "Summer planting session",
  date: "2026-06-03",
  startTime: "17:30",
  endTime: "19:00",
  category: "Workshop",
  location: "Fern Grove raised beds",
  capacity: "16",
  summary: "An evening session for planting summer crops, watering new beds, and welcoming new volunteers.",
  visibility: "Public",
};

export function EventCreationForm() {
  const [draft, setDraft] = useState<DraftEvent>(defaultEvent);
  const [saved, setSaved] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
  }

  const previewDate = useMemo(() => {
    const date = new Date(`${draft.date}T12:00:00`);
    return Number.isNaN(date.getTime())
      ? "Choose a date"
      : new Intl.DateTimeFormat("en-GB", { weekday: "long", day: "numeric", month: "long" }).format(date);
  }, [draft.date]);

  return (
    <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
      <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col items-start justify-between gap-4 sm:flex-row">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Event builder</p>
            <h2 className="section-title mt-3 text-3xl leading-tight font-semibold text-[var(--leaf-deep)] sm:text-4xl lg:text-5xl">
              Create a new event
            </h2>
          </div>
          <span className="rounded-full border-3 border-[var(--border)] bg-[var(--surface-strong)] px-4 py-2 text-sm font-extrabold text-[var(--leaf-deep)]">
            Mock save
          </span>
        </div>

        {saved ? (
          <div className="mt-6 rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(199,240,255,0.6)] p-4 text-sm font-bold text-[var(--leaf-deep)]">
            Draft saved locally. Next we can connect this form to Supabase and create the real admin workflow.
          </div>
        ) : null}

        <form className="mt-6 grid gap-4" onSubmit={handleSubmit}>
          <label className="field-stack">
            <span className="field-label">Event title</span>
            <input
              className="field-input"
              value={draft.title}
              onChange={(event) => setDraft({ ...draft, title: event.target.value })}
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-stack">
              <span className="field-label">Date</span>
              <input
                type="date"
                className="field-input"
                value={draft.date}
                onChange={(event) => setDraft({ ...draft, date: event.target.value })}
              />
            </label>
            <label className="field-stack">
              <span className="field-label">Category</span>
              <select
                className="field-input"
                value={draft.category}
                onChange={(event) => setDraft({ ...draft, category: event.target.value })}
              >
                {eventCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-stack">
              <span className="field-label">Start time</span>
              <input
                type="time"
                className="field-input"
                value={draft.startTime}
                onChange={(event) => setDraft({ ...draft, startTime: event.target.value })}
              />
            </label>
            <label className="field-stack">
              <span className="field-label">End time</span>
              <input
                type="time"
                className="field-input"
                value={draft.endTime}
                onChange={(event) => setDraft({ ...draft, endTime: event.target.value })}
              />
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="field-stack">
              <span className="field-label">Location</span>
              <input
                className="field-input"
                value={draft.location}
                onChange={(event) => setDraft({ ...draft, location: event.target.value })}
              />
            </label>
            <label className="field-stack">
              <span className="field-label">Capacity</span>
              <input
                type="number"
                min="1"
                className="field-input"
                value={draft.capacity}
                onChange={(event) => setDraft({ ...draft, capacity: event.target.value })}
              />
            </label>
          </div>

          <label className="field-stack">
            <span className="field-label">Summary</span>
            <textarea
              className="field-input min-h-36 resize-y"
              value={draft.summary}
              onChange={(event) => setDraft({ ...draft, summary: event.target.value })}
            />
          </label>

          <label className="field-stack">
            <span className="field-label">Visibility</span>
            <select
              className="field-input"
              value={draft.visibility}
              onChange={(event) => setDraft({ ...draft, visibility: event.target.value })}
            >
              <option value="Public">Public</option>
              <option value="Members only">Members only</option>
              <option value="Draft">Draft</option>
            </select>
          </label>

          <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <button type="submit" className="cartoon-button w-full justify-center sm:min-w-52 sm:w-auto">
              Save event draft
            </button>
            <button
              type="button"
              className="cartoon-button-secondary w-full justify-center sm:min-w-52 sm:w-auto"
              onClick={() => {
                setDraft(defaultEvent);
                setSaved(false);
              }}
            >
              Reset form
            </button>
          </div>
        </form>
      </div>

      <aside className="grid gap-6">
        <div className="cartoon-panel rounded-[2rem] p-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Preview</p>
          <div className="mt-4 rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.7)] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.14em] text-[var(--muted)]">{draft.category}</p>
            <h3 className="section-title mt-3 text-2xl leading-tight font-semibold text-[var(--leaf-deep)] sm:text-3xl">{draft.title}</h3>
            <p className="mt-3 text-base font-bold text-[var(--leaf-deep)]">{previewDate}</p>
            <p className="mt-1 text-sm font-bold text-[var(--muted)]">
              {draft.startTime} - {draft.endTime} at {draft.location}
            </p>
            <p className="mt-4 text-base leading-7 text-[var(--muted)]">{draft.summary}</p>
            <div className="mt-5 flex flex-wrap gap-2">
              <span className="status-chip status-chip-leaf">{draft.visibility}</span>
              <span className="status-chip status-chip-sun">Capacity {draft.capacity || "-"}</span>
            </div>
          </div>
        </div>

        <div className="cartoon-panel rounded-[2rem] p-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Build next</p>
          <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
            <li>Connect save actions to Supabase.</li>
            <li>Add editing, cancellation, and attendance tracking.</li>
            <li>Support recurring volunteer days and draft approval.</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
