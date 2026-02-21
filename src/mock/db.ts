import type { Campaign } from "../features/campaigns/types";
import type { Job } from "../features/job-engine/types";
import { format, subDays } from "date-fns";

function randomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const statuses = ["pending", "processing", "completed", "failed"] as const;
const types = ["Display", "Email", "Social", "Search"] as const;

function generateCampaign(id: number): Campaign {
  const impressions = randomNumber(50000, 500000);
  const clicks = randomNumber(5000, 30000);
  const conversions = randomNumber(500, 5000);

  return {
    id: String(id),
    name: `Campaign ${id}`,
    type: types[randomNumber(0, types.length - 1)],
    status: statuses[randomNumber(0, statuses.length - 1)],
    budget: randomNumber(1000, 10000),
    startDate: format(subDays(new Date(), randomNumber(10, 60)), "yyyy-MM-dd"),
    endDate: format(subDays(new Date(), randomNumber(1, 9)), "yyyy-MM-dd"),
    impressions,
    clicks,
    conversions,
    createdAt: new Date().toISOString(),
  };
}

const campaigns: Campaign[] = Array.from({ length: 25 }).map((_, i) =>
  generateCampaign(i + 1)
);

const jobs: Job[] = campaigns.map((c) => ({
  id: `job-${c.id}`,
  campaignId: c.id,
  name: `Job for ${c.name}`,
  status: c.status === "processing" ? "processing" : "completed",
  progress: c.status === "processing" ? randomNumber(10, 70) : 100,
  createdAt: new Date().toISOString(),
  duration: c.status === "processing" ? "In Progress" : "Completed",
}));

export const mockDB = {
  campaigns,
  jobs,
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
    impressions: randomNumber(20000, 150000),
  }));
}