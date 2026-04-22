import Link from "next/link";

import { SiteFrame } from "@/components/site-frame";
import { getPlotSummary, listPlots, listWaitingList } from "@/lib/garden-repository";

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

export default async function PlotsPage() {
  const [plots, plotSummary, waitingList] = await Promise.all([listPlots(), getPlotSummary(), listWaitingList()]);

  return (
    <SiteFrame>
      <section className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Plot allocation</p>
            <h1 className="section-title mt-4 text-5xl font-semibold text-[var(--leaf-deep)] sm:text-6xl">
              A clearer view of who has which plot.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              This page is the start of a public-friendly plot system. It can show availability, shared beds, and
              how the waiting list works without exposing private member details.
            </p>
            <p className="mt-3 text-sm font-bold text-[var(--muted)]">
              Later, this can become a proper editable site map so each plot is identified visually instead of by a
              temporary code.
            </p>
          </div>
          <Link href="/admin/plots" className="cartoon-button-secondary justify-center">
            Admin: manage plots
          </Link>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {plotSummary.map((item) => (
          <div key={item.label} className="cartoon-panel rounded-[1.7rem] p-5">
            <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">{item.label}</p>
            <p className="mt-3 text-4xl font-extrabold text-[var(--leaf-deep)]">{item.value}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="cartoon-panel rounded-[2rem] p-6 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Plot board</p>
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
                <p className="mt-4 text-base font-bold text-[var(--leaf-deep)]">{plot.holder ?? "Awaiting allocation"}</p>
                <p className="mt-2 text-sm leading-7 text-[var(--muted)]">{plot.note}</p>
              </article>
            ))}
          </div>
        </div>

        <aside className="grid gap-6">
          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Waiting list preview</p>
            <div className="mt-4 grid gap-3">
              {waitingList.slice(0, 3).map((entry) => (
                <div key={entry.name} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-4">
                  <p className="text-base font-extrabold text-[var(--leaf-deep)]">{entry.name}</p>
                  <p className="mt-1 text-sm font-bold text-[var(--muted)]">Applied {entry.applied}</p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{entry.preference}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">How this can grow</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              <li>Plot assignment history for each member.</li>
              <li>Admin controls for offers, acceptances, and notes.</li>
              <li>Public application form for the waiting list.</li>
            </ul>
          </div>
        </aside>
      </section>
    </SiteFrame>
  );
}
