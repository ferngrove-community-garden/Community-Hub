import Link from "next/link";

import { SiteFrame } from "@/components/site-frame";
import { listGardenUpdates } from "@/lib/garden-repository";

export default async function UpdatesPage() {
  const updates = await listGardenUpdates();

  return (
    <SiteFrame>
      <section className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Garden updates</p>
            <h1 className="section-title mt-4 text-4xl leading-tight font-semibold text-[var(--leaf-deep)] sm:text-5xl lg:text-6xl">
              Small stories, practical news, and seasonal progress.
            </h1>
            <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
              This is a first pass at a simple updates space for Fern Grove. It gives the garden a way to share
              fresh news between bigger event announcements and future newsletters.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link href="/newsletter" className="cartoon-button justify-center">
              Get updates by email
            </Link>
            <Link href="/admin" className="cartoon-button-secondary justify-center">
              Admin overview
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.04fr_0.96fr]">
        <div className="grid gap-4">
          {updates.map((item) => (
            <article key={item.slug} className="cartoon-panel rounded-[1.8rem] p-6 sm:p-7">
              <div className="flex flex-wrap items-center gap-2">
                <span className="status-chip status-chip-sun">{item.category}</span>
                <span className="status-chip status-chip-sky">{item.date}</span>
              </div>
              <h2 className="section-title mt-4 text-3xl leading-tight font-semibold text-[var(--leaf-deep)] sm:text-4xl">
                {item.title}
              </h2>
              <p className="mt-4 text-base leading-8 text-[var(--muted)]">{item.excerpt}</p>
            </article>
          ))}
        </div>

        <aside className="grid gap-6">
          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Why this matters</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              <li>Keeps the site feeling active between events.</li>
              <li>Gives volunteers and neighbours small reasons to return.</li>
              <li>Creates good material for future newsletters and social posts.</li>
            </ul>
          </div>

          <div className="cartoon-panel rounded-[2rem] p-6">
            <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">What can come next</p>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              <li>Draft and publish flow for updates.</li>
              <li>Photo-led seasonal posts.</li>
              <li>Email send toggle for selected updates.</li>
            </ul>
          </div>
        </aside>
      </section>
    </SiteFrame>
  );
}
