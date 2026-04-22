import Image from "next/image";
import Link from "next/link";

import { SiteFrame } from "@/components/site-frame";
import { getPlotSummary, listEvents } from "@/lib/garden-repository";

const featureCards = [
  {
    title: "Events calendar",
    text: "A public place to see volunteer days, open sessions, workshops, and member meetings.",
    href: "/events",
  },
  {
    title: "Newsletter sign up",
    text: "A friendly signup flow for seasonal updates, event reminders, and garden news.",
    href: "/newsletter",
  },
  {
    title: "Plot allocation",
    text: "A clear way to show which plots are active, shared, available, or on the waiting list.",
    href: "/plots",
  },
  {
    title: "Garden admin",
    text: "An admin area for events, waiting lists, and eventually member tools and communications.",
    href: "/admin",
  },
];

export default async function Home() {
  const [events, plotSummary] = await Promise.all([listEvents(), getPlotSummary()]);
  const featuredEvents = events.filter((event) => event.featured).slice(0, 2);

  return (
    <SiteFrame>
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
        <div className="cartoon-panel rounded-[2rem] p-7 sm:p-9">
          <span className="sun-badge">
            <span className="flower-dot" />
            A custom garden community hub
          </span>
          <h1 className="section-title mt-6 max-w-3xl text-5xl leading-[0.95] font-semibold text-[var(--leaf-deep)] sm:text-6xl lg:text-7xl">
            A brighter online home for Fern Grove.
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">
            The site is now growing beyond a homepage. It includes public tools for events, newsletters, and
            plots, plus the first admin pages for managing what happens in the garden.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href="/events" className="cartoon-button justify-center">
              Explore events
            </Link>
            <Link href="/admin" className="cartoon-button-secondary justify-center">
              View admin tools
            </Link>
          </div>
        </div>

        <div className="cartoon-panel relative min-h-[340px] overflow-hidden rounded-[2rem] bg-[var(--surface-strong)] p-3">
          <div className="relative h-full min-h-[316px] overflow-hidden rounded-[1.4rem]">
            <Image src="/images/hero-sign.jpg" alt="Hand-painted Fern Grove garden sign" fill className="object-cover" priority />
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {featureCards.map((item) => (
          <Link key={item.href} href={item.href} className="cartoon-panel rounded-[1.7rem] p-5 transition-transform duration-200 hover:-translate-y-1">
            <p className="section-title text-3xl font-semibold text-[var(--leaf-deep)]">{item.title}</p>
            <p className="mt-3 text-base leading-7 text-[var(--muted)]">{item.text}</p>
          </Link>
        ))}
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
        <div className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">What is live now</p>
          <h2 className="section-title mt-4 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
            The hub is starting to feel useful.
          </h2>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            Instead of a single landing page, Fern Grove now has the start of a practical system: upcoming events,
            newsletter signup, plot visibility, and admin pages that can later connect to Supabase.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {plotSummary.map((item) => (
              <div key={item.label} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.6)] p-4">
                <p className="text-sm font-extrabold uppercase tracking-[0.12em] text-[var(--muted)]">{item.label}</p>
                <p className="mt-2 text-3xl font-extrabold text-[var(--leaf-deep)]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="cartoon-panel relative min-h-[320px] overflow-hidden rounded-[2rem] bg-[var(--surface-strong)] p-3">
          <div className="relative h-full min-h-[296px] overflow-hidden rounded-[1.4rem]">
            <Image src="/images/spring-bed.jpg" alt="Fresh spring growth appearing in one of the garden beds" fill className="object-cover" />
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Featured events</p>
          <h2 className="section-title mt-4 text-4xl font-semibold text-[var(--leaf-deep)] sm:text-5xl">
            The new calendar has room to grow.
          </h2>
          <div className="mt-6 grid gap-4">
            {featuredEvents.map((event) => (
              <div key={event.slug} className="rounded-[1.5rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.62)] p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="status-chip status-chip-sun">{event.category}</span>
                  <span className="status-chip status-chip-sky">{event.time}</span>
                </div>
                <h3 className="section-title mt-4 text-3xl font-semibold text-[var(--leaf-deep)]">{event.title}</h3>
                <p className="mt-2 text-sm font-bold uppercase tracking-[0.12em] text-[var(--muted)]">{event.location}</p>
                <p className="mt-4 text-base leading-7 text-[var(--muted)]">{event.excerpt}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <div className="cartoon-panel rounded-[1.7rem] p-6">
            <h3 className="section-title text-3xl font-semibold text-[var(--leaf-deep)]">What we can build next</h3>
            <ul className="mt-4 space-y-3 text-base leading-7 text-[var(--muted)]">
              <li>Real admin login with Supabase Auth.</li>
              <li>Database-backed event creation and editing.</li>
              <li>Live newsletter signup sync to Brevo.</li>
              <li>Plot assignment history and waiting list actions.</li>
            </ul>
          </div>
          <div className="cartoon-panel relative min-h-[280px] overflow-hidden rounded-[1.7rem] bg-[var(--surface-strong)] p-3">
            <div className="relative h-full min-h-[256px] overflow-hidden rounded-[1.3rem]">
              <Image src="/images/seedlings.jpg" alt="Young seedlings growing in pots inside the polytunnel" fill className="object-cover" />
            </div>
          </div>
        </div>
      </section>
    </SiteFrame>
  );
}
