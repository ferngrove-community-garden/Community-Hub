export type GardenRole = "admin" | "editor" | "volunteer";

export type EventCategory =
  | "volunteer_day"
  | "workshop"
  | "open_garden"
  | "members_meeting"
  | "family_session"
  | "other";

export type EventVisibility = "draft" | "public" | "members_only";

export type PlotStatus = "assigned" | "available" | "shared" | "maintenance";

export type WaitlistStatus =
  | "new"
  | "ready_to_contact"
  | "contacted"
  | "offered"
  | "accepted"
  | "declined"
  | "paused";

export interface GardenProfileRow {
  id: string;
  full_name: string;
  email: string;
  role: GardenRole;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface MemberRow {
  id: string;
  full_name: string;
  public_plot_name: string | null;
  show_on_plot_page: boolean;
  email: string | null;
  phone: string | null;
  postcode: string | null;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface EventRow {
  id: string;
  slug: string;
  title: string;
  summary: string;
  details: string | null;
  category: EventCategory;
  visibility: EventVisibility;
  location: string;
  starts_at: string;
  ends_at: string | null;
  capacity: number | null;
  is_featured: boolean;
  is_cancelled: boolean;
  created_by: string | null;
  updated_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface NewsletterSubscriberRow {
  id: string;
  email: string;
  full_name: string | null;
  postcode: string | null;
  interests: string[];
  source: string;
  consented_at: string;
  unsubscribed_at: string | null;
  created_at: string;
}

export interface PlotRow {
  id: string;
  code: string;
  label: string;
  size_label: string;
  status: PlotStatus;
  public_note: string | null;
  admin_note: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlotAssignmentRow {
  id: string;
  plot_id: string;
  member_id: string;
  start_date: string;
  end_date: string | null;
  is_current: boolean;
  notes: string | null;
  created_by: string | null;
  created_at: string;
  updated_at: string;
}

export interface PlotWaitlistRow {
  id: string;
  full_name: string;
  email: string;
  phone: string | null;
  postcode: string | null;
  preference: string | null;
  status: WaitlistStatus;
  priority_order: number;
  notes: string | null;
  member_id: string | null;
  offered_plot_id: string | null;
  joined_at: string;
  last_contacted_at: string | null;
  created_by: string | null;
  updated_at: string;
}

export interface NewsletterSignupInput {
  email: string;
  full_name?: string;
  postcode?: string;
  interests?: string[];
}

export interface CreateEventInput {
  slug: string;
  title: string;
  summary: string;
  details?: string;
  category: EventCategory;
  visibility: EventVisibility;
  location: string;
  starts_at: string;
  ends_at?: string;
  capacity?: number;
  is_featured?: boolean;
}

export interface CreatePlotWaitlistInput {
  full_name: string;
  email: string;
  phone?: string;
  postcode?: string;
  preference?: string;
  notes?: string;
}
