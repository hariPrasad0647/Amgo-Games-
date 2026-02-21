import { format, subDays } from "date-fns";
import { campaigns as placeholderCampaigns, jobs as placeholderJobs } from "@/data/placeholder";

export const mockDB = {
  campaigns: [...placeholderCampaigns],
  jobs: [...placeholderJobs],
};

export function getDashboardStats() {
  const totalCampaigns = mockDB.campaigns.length;
  const activeCampaigns = mockDB.campaigns.filter(
    (c) => c.status === "processing"
  ).length;

  const totalImpressions = mockDB.campaigns.reduce(
    (sum, c) => sum + c.impressions,
    0
  );

  const totalConversions = mockDB.campaigns.reduce(
    (sum, c) => sum + c.conversions,
    0
  );

  const conversionRate =
    totalImpressions === 0
      ? 0
      : Number(((totalConversions / totalImpressions) * 100).toFixed(2));

  return {
    totalCampaigns,
    activeCampaigns,
    totalImpressions,
    conversionRate,
  };
}

export function getDailyImpressions() {
  return Array.from({ length: 30 }).map((_, i) => ({
    date: format(subDays(new Date(), 29 - i), "MMM dd"),
    impressions: Math.floor(Math.random() * (150000 - 20000 + 1)) + 20000,
  }));
}