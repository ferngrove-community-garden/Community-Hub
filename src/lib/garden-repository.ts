import {
  adminStats,
  adminTasks,
  events,
  newsletterTopics,
  plots,
  plotSummary,
  quickBits,
  waitingList,
} from "@/lib/site-data";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function listEvents() {
  return events;
}

export async function listPlots() {
  return plots;
}

export async function listWaitingList() {
  return waitingList;
}

export async function listAdminStats() {
  return adminStats;
}

export async function listAdminTasks() {
  return adminTasks;
}

export async function listNewsletterTopics() {
  return newsletterTopics;
}

export async function listQuickBits() {
  return quickBits;
}

export async function getPlotSummary() {
  return plotSummary;
}

export function getGardenDataState() {
  return {
    activeSource: "mock" as const,
    supabaseConfigured: isSupabaseConfigured(),
  };
}
