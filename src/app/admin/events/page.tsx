import Link from "next/link";

import { AdminFrame } from "@/components/admin-frame";
import { listEvents } from "@/lib/garden-repository";

export default async function AdminEventsPage() {
  const events = await listEvents();

  return (
    <AdminFrame>
      <section className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Event management</p>
            <h2 className="section-title mt-3 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
              Manage the event calendar
            </h2>
          </div>
          <Link href="/admin/events/new" className="cartoon-button justify-center">
            Add new event
          </Link>
        </div>
      </section>

      <section className="grid gap-4">
        {events.map((event) => (
          <article key={event.slug} className="cartoon-panel rounded-[1.7rem] p-5">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <div className="flex flex-wrap gap-2">
                  <span className="status-chip status-chip-sun">{event.category}</span>
                  <span className="status-chip status-chip-sky">{event.date}</span>
                  <span className="status-chip status-chip-leaf">{event.spotsLeft} spots left</span>
                </div>
                <h3 className="section-title mt-4 text-3xl font-semibold text-[var(--leaf-deep)]">{event.title}</h3>
                <p className="mt-2 text-base font-bold text-[var(--muted)]">{event.time} at {event.location}</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{event.excerpt}</p>
              </div>
              <div className="flex flex-wrap gap-2 lg:max-w-xs lg:justify-end">
                <button type="button" className="cartoon-button-secondary">
                  Edit
                </button>
                <button type="button" className="cartoon-button-secondary">
                  Duplicate
                </button>
                <button type="button" className="cartoon-button-secondary">
                  Cancel
                </button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </AdminFrame>
  );
}
