create extension if not exists pgcrypto;

create type public.garden_role as enum ('admin', 'editor', 'volunteer');
create type public.event_category as enum (
  'volunteer_day',
  'workshop',
  'open_garden',
  'members_meeting',
  'family_session',
  'other'
);
create type public.event_visibility as enum ('draft', 'public', 'members_only');
create type public.plot_status as enum ('assigned', 'available', 'shared', 'maintenance');
create type public.waitlist_status as enum (
  'new',
  'ready_to_contact',
  'contacted',
  'offered',
  'accepted',
  'declined',
  'paused'
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = timezone('utc', now());
  return new;
end;
$$;

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null,
  email text not null,
  role public.garden_role not null default 'volunteer',
  is_active boolean not null default true,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.members (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  public_plot_name text,
  show_on_plot_page boolean not null default true,
  email text,
  phone text,
  postcode text,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  summary text not null,
  details text,
  category public.event_category not null default 'other',
  visibility public.event_visibility not null default 'draft',
  location text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  capacity integer,
  is_featured boolean not null default false,
  is_cancelled boolean not null default false,
  created_by uuid references public.profiles(id) on delete set null,
  updated_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint events_capacity_check check (capacity is null or capacity > 0),
  constraint events_ends_after_start check (ends_at is null or ends_at >= starts_at)
);

create table public.newsletter_subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  full_name text,
  postcode text,
  interests text[] not null default '{}',
  source text not null default 'website',
  consented_at timestamptz not null default timezone('utc', now()),
  unsubscribed_at timestamptz,
  created_at timestamptz not null default timezone('utc', now())
);

create table public.plots (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  label text not null,
  size_label text not null,
  status public.plot_status not null default 'available',
  public_note text,
  admin_note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table public.plot_assignments (
  id uuid primary key default gen_random_uuid(),
  plot_id uuid not null references public.plots(id) on delete cascade,
  member_id uuid not null references public.members(id) on delete cascade,
  start_date date not null,
  end_date date,
  is_current boolean not null default true,
  notes text,
  created_by uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),
  constraint plot_assignments_dates_check check (end_date is null or end_date >= start_date)
);

create table public.plot_waitlist (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  phone text,
  postcode text,
  preference text,
  status public.waitlist_status not null default 'new',
  priority_order integer not null default 0,
  notes text,
  member_id uuid references public.members(id) on delete set null,
  offered_plot_id uuid references public.plots(id) on delete set null,
  joined_at timestamptz not null default timezone('utc', now()),
  last_contacted_at timestamptz,
  created_by uuid references public.profiles(id) on delete set null,
  updated_at timestamptz not null default timezone('utc', now())
);

create unique index newsletter_subscribers_active_email_idx
on public.newsletter_subscribers (lower(email))
where unsubscribed_at is null;

create unique index plot_assignments_one_current_plot_idx
on public.plot_assignments (plot_id)
where is_current = true;

create index events_starts_at_idx on public.events (starts_at);
create index events_visibility_idx on public.events (visibility);
create index plots_status_idx on public.plots (status);
create index plot_waitlist_status_idx on public.plot_waitlist (status, priority_order, joined_at);

create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger members_set_updated_at
before update on public.members
for each row execute function public.set_updated_at();

create trigger events_set_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger plots_set_updated_at
before update on public.plots
for each row execute function public.set_updated_at();

create trigger plot_assignments_set_updated_at
before update on public.plot_assignments
for each row execute function public.set_updated_at();

create trigger plot_waitlist_set_updated_at
before update on public.plot_waitlist
for each row execute function public.set_updated_at();

create or replace function public.is_garden_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role in ('admin', 'editor')
      and is_active = true
  );
$$;

alter table public.profiles enable row level security;
alter table public.members enable row level security;
alter table public.events enable row level security;
alter table public.newsletter_subscribers enable row level security;
alter table public.plots enable row level security;
alter table public.plot_assignments enable row level security;
alter table public.plot_waitlist enable row level security;

create policy "profiles view own"
on public.profiles
for select
to authenticated
using (auth.uid() = id or public.is_garden_admin());

create policy "profiles manage own row"
on public.profiles
for update
to authenticated
using (auth.uid() = id or public.is_garden_admin())
with check (auth.uid() = id or public.is_garden_admin());

create policy "admins manage members"
on public.members
for all
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create policy "public view public events"
on public.events
for select
to anon, authenticated
using (visibility = 'public' and is_cancelled = false);

create policy "admins manage events"
on public.events
for all
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create policy "public subscribe to newsletter"
on public.newsletter_subscribers
for insert
to anon, authenticated
with check (email <> '');

create policy "admins view newsletter subscribers"
on public.newsletter_subscribers
for select
to authenticated
using (public.is_garden_admin());

create policy "admins update newsletter subscribers"
on public.newsletter_subscribers
for update
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create policy "admins manage plots"
on public.plots
for all
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create policy "admins manage plot assignments"
on public.plot_assignments
for all
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create policy "admins manage plot waitlist"
on public.plot_waitlist
for all
to authenticated
using (public.is_garden_admin())
with check (public.is_garden_admin());

create or replace view public.public_events as
select
  id,
  slug,
  title,
  summary,
  category,
  location,
  starts_at,
  ends_at,
  capacity,
  is_featured
from public.events
where visibility = 'public'
  and is_cancelled = false;

create or replace view public.public_plot_overview as
select
  p.id,
  p.code,
  p.label,
  p.size_label,
  p.status,
  p.public_note,
  case
    when p.status = 'shared' then 'Community bed'
    when p.status = 'assigned' and m.show_on_plot_page = true then coalesce(nullif(m.public_plot_name, ''), m.full_name)
    else null
  end as holder_name
from public.plots p
left join public.plot_assignments pa
  on pa.plot_id = p.id
 and pa.is_current = true
left join public.members m
  on m.id = pa.member_id;

grant select on public.public_events to anon, authenticated;
grant select on public.public_plot_overview to anon, authenticated;
