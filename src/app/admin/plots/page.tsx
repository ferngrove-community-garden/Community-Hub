import { AdminFrame } from "@/components/admin-frame";
import { listPlots, listWaitingList } from "@/lib/garden-repository";

function getPlotTone(status: string) {
  switch (status) {
    case "Assigned":
      return "status-chip-leaf";
    case "Available":
      return "status-chip-sun";
    case "Shared":
      return "status-chip-sky";
    default:
      return "status-chip-berry";
  }
}

export default async function AdminPlotsPage() {
  const [plots, waitingList] = await Promise.all([listPlots(), listWaitingList()]);

  return (
    <AdminFrame>
      <section className="grid gap-6 xl:grid-cols-[1.02fr_0.98fr]">
        <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Plot management</p>
          <h2 className="section-title mt-3 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
            Allocation board
          </h2>
          <p className="mt-3 text-sm font-bold text-[var(--muted)]">
            Keep this as a readable allocation list for now. The later phase can replace it with a true editable plot
            diagram builder.
          </p>
          <div className="plot-card-grid mt-5">
            {plots.map((plot) => (
              <article key={plot.code} className="plot-card rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.65)] p-4 sm:p-5">
                <div className="flex flex-col items-start gap-3">
                  <div>
                    <p className="section-title text-3xl font-semibold text-[var(--leaf-deep)]">{plot.code}</p>
                    <p className="text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{plot.size} plot</p>
                  </div>
                  <span className={`status-chip ${getPlotTone(plot.status)}`}>{plot.status}</span>
                </div>
                <p className="mt-4 text-base font-extrabold text-[var(--leaf-deep)]">{plot.holder ?? "No current holder"}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{plot.note}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <button type="button" className="cartoon-button-secondary">
                    Reassign
                  </button>
                  <button type="button" className="cartoon-button-secondary">
                    Notes
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-6">
          <section className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Waiting list</p>
            <div className="mt-4 overflow-x-auto">
              <table className="min-w-full border-separate border-spacing-y-3 text-left">
                <thead>
                  <tr className="text-xs font-extrabold uppercase tracking-[0.16em] text-[var(--muted)]">
                    <th className="px-3">Name</th>
                    <th className="px-3">Applied</th>
                    <th className="px-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {waitingList.map((entry) => (
                    <tr key={entry.name} className="rounded-[1rem] bg-[rgba(255,255,255,0.62)] text-sm font-bold text-[var(--leaf-deep)]">
                      <td className="rounded-l-[1rem] border-y-3 border-l-3 border-[var(--border)] px-3 py-3">{entry.name}</td>
                      <td className="border-y-3 border-[var(--border)] px-3 py-3">{entry.applied}</td>
                      <td className="rounded-r-[1rem] border-y-3 border-r-3 border-[var(--border)] px-3 py-3">{entry.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          <section className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">System next steps</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              <li>Add member records and allocation history.</li>
              <li>Track offers made, accepted, declined, or paused.</li>
              <li>Create a public waiting list application form.</li>
            </ul>
          </section>
        </div>
      </section>
    </AdminFrame>
  );
}
