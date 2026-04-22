import Link from "next/link";

import { SiteFrame } from "@/components/site-frame";
import { listEvents } from "@/lib/garden-repository";

const calendarMonth = { monthIndex: 4, year: 2026 };
const weekLabels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getCalendarDays() {
  const firstDay = new Date(calendarMonth.year, calendarMonth.monthIndex, 1);
  const daysInMonth = new Date(calendarMonth.year, calendarMonth.monthIndex + 1, 0).getDate();
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const cells: Array<{ day: number | null }> = [];

  for (let index = 0; index < leadingBlanks; index += 1) {
    cells.push({ day: null });
  }

  for (let day = 1; day <= daysInMonth; day += 1) {
    cells.push({ day });
  }

  return cells;
}

function getEventsForDay(day: number, events: Awaited<ReturnType<typeof listEvents>>) {
  const target = `${calendarMonth.year}-${String(calendarMonth.monthIndex + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  return events.filter((event) => event.date === target);
}

function formatDate(dateValue: string) {
  const date = new Date(`${dateValue}T12:00:00`);
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "short",
  }).format(date);
}

export default async function EventsPage() {
  const [events, calendarDays] = await Promise.all([listEvents(), Promise.resolve(getCalendarDays())]);

  return (
    <SiteFrame>
      <section className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
        <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Public events page</p>
        <div className="mt-4 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <h1 className="section-title text-5xl font-semibold text-[var(--leaf-deep)] sm:text-6xl">
              Calendar and upcoming events
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              This page gives Fern Grove a proper home for volunteer days, open sessions, workshops, and member
              gatherings. It is ready to become a live event system once the admin forms are connected to data.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/newsletter" className="cartoon-button justify-center">
              Get event reminders
            </Link>
            <Link href="/admin/events/new" className="cartoon-button-secondary justify-center">
              Admin: add event
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Calendar view</p>
              <h2 className="section-title mt-3 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">May 2026</h2>
            </div>
            <span className="status-chip status-chip-sky">8 events scheduled</span>
          </div>

          <div className="mt-6 grid grid-cols-7 gap-2">
            {weekLabels.map((label) => (
              <div key={label} className="text-center text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--muted)]">
                {label}
              </div>
            ))}

            {calendarDays.map((cell, index) => {
              const dayEvents = cell.day ? getEventsForDay(cell.day, events) : [];

              return (
                <div
                  key={`${cell.day ?? "blank"}-${index}`}
                  className={`min-h-28 rounded-[1.3rem] border-3 border-[var(--border)] p-3 ${
                    cell.day ? "bg-[rgba(255,255,255,0.65)]" : "bg-[rgba(255,255,255,0.3)] opacity-45"
                  }`}
                >
                  {cell.day ? (
                    <>
                      <p className="text-sm font-extrabold text-[var(--leaf-deep)]">{cell.day}</p>
                      <div className="mt-2 grid gap-2">
                        {dayEvents.map((event) => (
                          <div key={event.slug} className="rounded-[1rem] bg-[var(--surface-strong)] px-2 py-1.5 text-xs font-bold text-[var(--leaf-deep)]">
                            <p>{event.title}</p>
                            <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[var(--muted)]">{event.time}</p>
                          </div>
                        ))}
                      </div>
                    </>
                  ) : null}
                </div>
              );
            })}
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Upcoming</p>
            <div className="mt-4 grid gap-4">
              {events.map((event) => (
                <div key={event.slug} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="status-chip status-chip-sun">{event.category}</span>
                    <span className="status-chip status-chip-leaf">{event.spotsLeft} spots left</span>
                  </div>
                  <h3 className="section-title mt-3 text-2xl font-semibold text-[var(--leaf-deep)]">{event.title}</h3>
                  <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">
                    {formatDate(event.date)} - {event.time}
                  </p>
                  <p className="mt-1 text-sm font-bold text-[var(--muted)]">{event.location}</p>
                  <p className="mt-3 text-base leading-7 text-[var(--muted)]">{event.excerpt}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </section>
    </SiteFrame>
  );
}
