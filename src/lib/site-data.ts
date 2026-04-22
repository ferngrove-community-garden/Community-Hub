export type EventItem = {
  slug: string;
  title: string;
  date: string;
  time: string;
  category: string;
  location: string;
  excerpt: string;
  capacity: number;
  spotsLeft: number;
  featured?: boolean;
};

export type PlotStatus = "Assigned" | "Available" | "Shared" | "Maintenance";

export type PlotItem = {
  code: string;
  size: string;
  status: PlotStatus;
  holder: string | null;
  note: string;
};

export const publicNavigation = [
  { href: "/", label: "Home" },
  { href: "/events", label: "Events" },
  { href: "/updates", label: "Updates" },
  { href: "/newsletter", label: "Newsletter" },
  { href: "/plots", label: "Plots" },
];

export const quickBits = [
  "Liverpool 8",
  "Raised beds and seedlings",
  "Bees, composting, and seasonal growing",
  "A garden made with local hands",
];

export const eventCategories = [
  "Volunteer Day",
  "Workshop",
  "Open Garden",
  "Members Meeting",
  "Family Session",
];

export const events: EventItem[] = [
  {
    slug: "spring-tidy-up",
    title: "Spring tidy-up morning",
    date: "2026-05-02",
    time: "10:00-13:00",
    category: "Volunteer Day",
    location: "Fern Grove main beds",
    excerpt: "Mulching, edging paths, and getting shared beds ready for the warmer months.",
    capacity: 18,
    spotsLeft: 6,
    featured: true,
  },
  {
    slug: "seed-starting-club",
    title: "Seed starting club",
    date: "2026-05-06",
    time: "17:30-19:00",
    category: "Workshop",
    location: "Garden pod",
    excerpt: "A hands-on evening for sowing salad leaves, herbs, and summer flowers.",
    capacity: 12,
    spotsLeft: 4,
  },
  {
    slug: "open-garden-saturday",
    title: "Open garden Saturday",
    date: "2026-05-09",
    time: "12:00-15:00",
    category: "Open Garden",
    location: "Whole site",
    excerpt: "Drop in for a wander, tea, and a quick look at what is growing right now.",
    capacity: 50,
    spotsLeft: 29,
    featured: true,
  },
  {
    slug: "compost-and-soil-basics",
    title: "Compost and soil basics",
    date: "2026-05-13",
    time: "18:00-19:30",
    category: "Workshop",
    location: "Compost area",
    excerpt: "A practical session on feeding the soil, compost layering, and using homemade compost.",
    capacity: 16,
    spotsLeft: 9,
  },
  {
    slug: "family-planting-afternoon",
    title: "Family planting afternoon",
    date: "2026-05-16",
    time: "13:00-15:30",
    category: "Family Session",
    location: "Raised beds",
    excerpt: "Easy planting activities for children and carers, with sunflowers and beans to take home.",
    capacity: 20,
    spotsLeft: 11,
  },
  {
    slug: "members-check-in",
    title: "Members check-in",
    date: "2026-05-20",
    time: "18:30-20:00",
    category: "Members Meeting",
    location: "Garden pod",
    excerpt: "Updates on plots, shared jobs, summer priorities, and new applications.",
    capacity: 24,
    spotsLeft: 10,
  },
  {
    slug: "bee-friendly-planting-day",
    title: "Bee-friendly planting day",
    date: "2026-05-23",
    time: "11:00-14:00",
    category: "Volunteer Day",
    location: "Pollinator border",
    excerpt: "Planting nectar-rich flowers and refreshing signage around the wildlife corner.",
    capacity: 15,
    spotsLeft: 3,
  },
  {
    slug: "evening-open-garden",
    title: "Evening open garden",
    date: "2026-05-28",
    time: "17:00-19:00",
    category: "Open Garden",
    location: "Whole site",
    excerpt: "A relaxed after-work visit with garden updates, tea, and light volunteering.",
    capacity: 40,
    spotsLeft: 22,
  },
];

export const newsletterTopics = [
  "Garden news and seasonal updates",
  "Volunteer days and event reminders",
  "Plot availability and waiting list updates",
  "Workshops, family sessions, and open days",
];

export const plotSummary = [
  { label: "Total plots", value: "24" },
  { label: "Assigned now", value: "18" },
  { label: "Shared beds", value: "3" },
  { label: "Waiting list", value: "7" },
];

export const plots: PlotItem[] = [
  { code: "A1", size: "Small", status: "Assigned", holder: "R. Jones", note: "Salads and herbs" },
  { code: "A2", size: "Small", status: "Assigned", holder: "M. Ali", note: "Flowers and beans" },
  { code: "A3", size: "Medium", status: "Available", holder: null, note: "Ready for new grower" },
  { code: "A4", size: "Medium", status: "Shared", holder: "Community bed", note: "Children's planting area" },
  { code: "B1", size: "Medium", status: "Assigned", holder: "K. Doyle", note: "Tomatoes and kale" },
  { code: "B2", size: "Large", status: "Assigned", holder: "L. Okafor", note: "Mixed vegetables" },
  { code: "B3", size: "Large", status: "Maintenance", holder: null, note: "Path edging repair" },
  { code: "B4", size: "Small", status: "Assigned", holder: "S. Williams", note: "Pollinator planting" },
  { code: "C1", size: "Small", status: "Assigned", holder: "D. Green", note: "Leafy greens" },
  { code: "C2", size: "Medium", status: "Available", holder: null, note: "Topsoil added this month" },
  { code: "C3", size: "Medium", status: "Shared", holder: "Community bed", note: "Cut flowers" },
  { code: "C4", size: "Large", status: "Assigned", holder: "A. Roberts", note: "Courgettes and squash" },
];

export const waitingList = [
  { name: "Chloe B.", applied: "12 Apr 2026", status: "Ready to contact", preference: "Small or medium plot" },
  { name: "Imran H.", applied: "29 Mar 2026", status: "Interested in next opening", preference: "Any plot size" },
  { name: "Patricia T.", applied: "18 Mar 2026", status: "Needs follow-up", preference: "Shared bed first" },
  { name: "Leo S.", applied: "02 Mar 2026", status: "Ready to contact", preference: "Large plot" },
  { name: "Nadia R.", applied: "17 Feb 2026", status: "Paused", preference: "Autumn start" },
];

export const adminStats = [
  { label: "Upcoming events", value: "8", tone: "sky" },
  { label: "Newsletter subscribers", value: "126", tone: "sun" },
  { label: "Waiting list applicants", value: "7", tone: "leaf" },
  { label: "Plots available soon", value: "2", tone: "berry" },
];

export const adminTasks = [
  "Confirm volunteers for the bee-friendly planting day.",
  "Review waiting list before plot A3 is offered.",
  "Send this month's newsletter draft to the board.",
  "Add accessibility notes for the next open garden event.",
];

export const gardenUpdates = [
  {
    slug: "spring-beds-filling-up",
    title: "Spring beds are filling up fast",
    date: "24 April 2026",
    category: "Seasonal update",
    excerpt:
      "Fresh salad leaves, early flowers, and new seedlings are bringing the main beds back to life after the colder months.",
  },
  {
    slug: "volunteer-day-ready",
    title: "Volunteer day planned for early May",
    date: "21 April 2026",
    category: "Volunteer call",
    excerpt:
      "We are organising a shared garden tidy-up with mulching, path work, and plenty of tea breaks along the way.",
  },
  {
    slug: "newsletter-starting",
    title: "The garden newsletter is taking shape",
    date: "18 April 2026",
    category: "Website progress",
    excerpt:
      "The new website now includes a newsletter page so local supporters can keep up with seasonal changes and upcoming sessions.",
  },
];
