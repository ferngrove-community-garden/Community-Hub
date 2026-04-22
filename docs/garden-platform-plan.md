# Fern Grove Platform Plan

This document captures the best reusable ideas pulled from `C:\Users\Gary\Documents\Gary\Coding\Projects\congrego` and maps them onto the Fern Grove hub.

## Reusable Product Patterns

### 1. Clear split between public pages and admin tools

Congrego keeps public and admin surfaces separate. That same split fits Fern Grove well:

- Public pages: `Home`, `Events`, `Newsletter`, `Plots`
- Admin pages: dashboard, event management, plot allocation, waiting list, updates

Fern Grove now follows that structure in `src/app/admin` and public pages can stay lightweight while admin tools grow independently.

### 2. Dashboard cards and quick actions

Useful reference: `congrego/admin/src/pages/dashboard.tsx`

Patterns worth reusing:

- top-level stat cards
- recent activity list
- quick action buttons
- a separate calendar panel

Recommended Fern Grove dashboard actions:

- create event
- assign plot
- review waiting list
- draft newsletter
- publish seasonal update

### 3. Searchable admin management pages

Useful reference: `congrego/admin/src/pages/people.tsx`

Patterns worth reusing:

- search box
- summary stats above the list
- filter tabs
- modal forms for create/edit actions

For Fern Grove, this maps directly to:

- plot holders list
- waiting list management
- volunteer/member records later

### 4. Centralized data access layer

Useful reference: `congrego/admin/src/api/posts.ts`

Congrego keeps database calls out of the page component. Fern Grove should do the same.

That is why the hub now has a repository seam in `src/lib/garden-repository.ts`. It currently returns seeded data, but it is the correct place to swap in Supabase queries.

### 5. Draft, autosave, and publish flow

Useful reference: `congrego/admin/src/modules/posts/PostEditor.tsx`

The best transferable idea is not the whole editor, but the workflow:

- create a draft record first
- autosave edits
- publish when ready

That is a strong fit for:

- events
- seasonal updates
- newsletters
- volunteer notices

### 6. Newsletter architecture

Useful reference: `congrego/TODO.md:88`

Congrego already outlined a clean newsletter design:

- subscriber table
- public signup page
- send action from admin
- unsubscribe flow

Fern Grove should follow the same shape, using Supabase for storage first and Brevo for delivery once the core flow is working.

## Fern Grove Data Model

The first database slice should cover:

- `profiles` - admin accounts linked to Supabase Auth
- `members` - real people associated with plots or garden admin work
- `events` - public and admin-managed calendar items
- `newsletter_subscribers` - public signups and opt-in state
- `plots` - the actual plot inventory
- `plot_assignments` - who currently holds each plot, plus history
- `plot_waitlist` - applicants, status, notes, and offer flow

The initial SQL lives in `supabase/migrations/20260422_initial_garden_hub.sql`.

## App Wiring Strategy

### Current state

The pages are still using seeded content so the UI can move quickly.

### Transition plan

1. Keep seeded content in `src/lib/site-data.ts`
2. Route all page reads through `src/lib/garden-repository.ts`
3. Add Supabase query implementations to the repository
4. Replace mock form handlers with real server actions or API handlers
5. Add admin auth and role checks

## Suggested Build Order

1. Add Supabase tables and RLS
2. Wire public `events` reads
3. Wire public `newsletter` inserts
4. Wire admin `events` CRUD
5. Wire `plots` and `plot_waitlist`
6. Add `garden updates` drafts and publishing
