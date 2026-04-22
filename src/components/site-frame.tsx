import Link from "next/link";
import type { ReactNode } from "react";

import { NatureDoodles } from "@/components/nature-doodles";
import { publicNavigation } from "@/lib/site-data";

export function SiteFrame({ children }: { children: ReactNode }) {
  return (
    <div className="page-shell flex min-h-screen flex-col">
      <NatureDoodles />
      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-1 flex-col px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
        <header className="cartoon-panel rounded-[2rem] px-5 py-4 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <Link href="/" className="section-title text-2xl font-semibold text-[var(--leaf-deep)]">
                Fern Grove Community Garden
              </Link>
              <p className="mt-1 text-sm font-bold tracking-[0.08em] text-[var(--muted)] uppercase">
                Community hub, events, plots, and updates
              </p>
            </div>
            <nav className="flex flex-wrap gap-2">
              {publicNavigation.map((item) => (
                <Link key={item.href} href={item.href} className="site-nav-link">
                  {item.label}
                </Link>
              ))}
              <Link href="/admin" className="cartoon-button-secondary">
                Admin
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex flex-1 flex-col gap-10 py-8">{children}</main>

        <footer className="cartoon-panel mt-2 rounded-[2rem] px-5 py-5 sm:px-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="section-title text-2xl font-semibold text-[var(--leaf-deep)]">Fern Grove Community Garden</p>
              <p className="mt-1 max-w-2xl text-sm leading-6 text-[var(--muted)]">
                A growing online home for events, updates, volunteer sessions, and simple garden admin tools.
              </p>
            </div>
            <div className="flex flex-wrap gap-2 text-sm font-bold text-[var(--leaf-deep)]">
              <Link href="/events" className="site-nav-link">
                Calendar
              </Link>
              <Link href="/newsletter" className="site-nav-link">
                Newsletter
              </Link>
              <Link href="/plots" className="site-nav-link">
                Plot allocation
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
