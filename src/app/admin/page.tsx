import Link from "next/link";

import { AdminFrame } from "@/components/admin-frame";
import { listAdminStats, listAdminTasks, listEvents, listWaitingList } from "@/lib/garden-repository";

function getToneClass(tone: string) {
  switch (tone) {
    case "leaf":
      return "status-chip-leaf";
    case "sun":
      return "status-chip-sun";
    case "berry":
      return "status-chip-berry";
    default:
      return "status-chip-sky";
  }
}

export default async function AdminPage() {
  const [adminStats, adminTasks, events, waitingList] = await Promise.all([
    listAdminStats(),
    listAdminTasks(),
    listEvents(),
    listWaitingList(),
  ]);

  return (
    <AdminFrame>
      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((item) => (
          <div key={item.label} className="cartoon-panel rounded-[1.7rem] p-5">
            <span className={`status-chip ${getToneClass(item.tone)}`}>{item.label}</span>
            <p className="mt-4 section-title text-5xl font-semibold text-[var(--leaf-deep)]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
          <div className="flex flex-wrap gap-3">
            <Link href="/admin/events/new" className="cartoon-button justify-center">
              Create event
            </Link>
            <Link href="/admin/events" className="cartoon-button-secondary justify-center">
              Manage events
            </Link>
            <Link href="/admin/plots" className="cartoon-button-secondary justify-center">
              Manage plots
            </Link>
          </div>

          <h2 className="section-title mt-6 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
            Priority tasks for the week
          </h2>
          <div className="mt-5 grid gap-3">
            {adminTasks.map((task) => (
              <div key={task} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-4 text-base font-bold text-[var(--leaf-deep)]">
                {task}
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Next events</p>
            <div className="mt-4 grid gap-3">
              {events.slice(0, 3).map((event) => (
                <div key={event.slug} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.65)] p-4">
                  <p className="text-base font-extrabold text-[var(--leaf-deep)]">{event.title}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--muted)]">{event.date} - {event.time}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Waiting list snapshot</p>
            <div className="mt-4 grid gap-3">
              {waitingList.slice(0, 3).map((entry) => (
                <div key={entry.name} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.65)] p-4">
                  <p className="text-base font-extrabold text-[var(--leaf-deep)]">{entry.name}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--muted)]">{entry.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </AdminFrame>
  );
}
