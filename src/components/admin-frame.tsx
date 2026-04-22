import Link from "next/link";
import type { ReactNode } from "react";

export function AdminFrame({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <header className="cartoon-panel rounded-[2rem] bg-[var(--sky)] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-extrabold uppercase tracking-[0.18em] text-[var(--leaf-deep)]">Admin area</p>
              <h1 className="section-title mt-2 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
                Fern Grove garden dashboard
              </h1>
              <p className="mt-3 max-w-2xl text-base leading-7 text-[var(--muted)]">
                Manage events, newsletter signups, plots, and the waiting list from one place.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin" className="site-nav-link">
                Overview
              </Link>
              <Link href="/admin/events" className="site-nav-link">
                Events
              </Link>
              <Link href="/admin/events/new" className="site-nav-link">
                New event
              </Link>
              <Link href="/admin/plots" className="site-nav-link">
                Plots
              </Link>
              <Link href="/" className="cartoon-button-secondary">
                Public site
              </Link>
            </div>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-8 py-8">{children}</main>
      </div>
    </div>
  );
}
