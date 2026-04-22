import { NewsletterSignupForm } from "@/components/newsletter-signup-form";
import { SiteFrame } from "@/components/site-frame";
import { listNewsletterTopics } from "@/lib/garden-repository";

export default async function NewsletterPage() {
  const newsletterTopics = await listNewsletterTopics();

  return (
    <SiteFrame>
      <section className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr] lg:items-start">
        <div className="cartoon-panel rounded-[2rem] p-7 sm:p-8">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">Newsletter page</p>
          <h1 className="section-title mt-4 text-5xl font-semibold text-[var(--leaf-deep)] sm:text-6xl">
            A calmer way to keep everyone in the loop.
          </h1>
          <p className="mt-5 text-lg leading-8 text-[var(--muted)]">
            The newsletter gives Fern Grove a regular way to share seasonal updates, practical reminders, plot
            news, and open event invitations without relying only on social posts.
          </p>
        </div>

        <div className="cartoon-panel rounded-[2rem] p-6">
          <p className="text-sm font-extrabold uppercase tracking-[0.16em] text-[var(--accent)]">What people receive</p>
          <div className="mt-4 grid gap-3">
            {newsletterTopics.map((topic) => (
              <div key={topic} className="rounded-[1.4rem] border-3 border-[var(--border)] bg-[rgba(255,255,255,0.62)] px-4 py-3 text-base font-bold text-[var(--leaf-deep)]">
                {topic}
              </div>
            ))}
          </div>
        </div>
      </section>

      <NewsletterSignupForm />
    </SiteFrame>
  );
}
