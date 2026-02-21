import type { Campaign, CampaignStatus } from "@/features/campaigns/types";
import type { Job } from "@/features/job-engine/types";

export type { CampaignStatus };

export const campaigns: Campaign[] = [
  { id: "CAM-001", name: "Q1 Brand Awareness", status: "completed", type: "Display", startDate: "2026-01-01", endDate: "2026-03-31", budget: 12500, impressions: 1240000, clicks: 18600, conversions: 930, createdAt: "2026-01-01T00:00:00Z" },
  { id: "CAM-002", name: "Product Launch - Series X", status: "processing", type: "Email", startDate: "2026-02-01", endDate: "2026-04-15", budget: 8200, impressions: 540000, clicks: 12100, conversions: 605, createdAt: "2026-02-01T00:00:00Z" },
  { id: "CAM-003", name: "Holiday Retargeting", status: "pending", type: "Social", startDate: "2026-03-01", endDate: "2026-03-31", budget: 5000, impressions: 0, clicks: 0, conversions: 0, createdAt: "2026-03-01T00:00:00Z" },
  { id: "CAM-004", name: "Enterprise Outreach", status: "failed", type: "Email", startDate: "2026-01-15", endDate: "2026-02-28", budget: 3400, impressions: 120000, clicks: 2400, conversions: 48, createdAt: "2026-01-15T00:00:00Z" },
  { id: "CAM-005", name: "Developer Conference", status: "completed", type: "Display", startDate: "2026-01-10", endDate: "2026-01-12", budget: 25000, impressions: 890000, clicks: 44500, conversions: 2225, createdAt: "2026-01-10T00:00:00Z" },
  { id: "CAM-006", name: "SMB Acquisition", status: "processing", type: "Search", startDate: "2026-02-10", endDate: "2026-05-10", budget: 15750, impressions: 320000, clicks: 9600, conversions: 480, createdAt: "2026-02-10T00:00:00Z" },
  { id: "CAM-007", name: "Partner Co-Marketing", status: "pending", type: "Display", startDate: "2026-04-01", endDate: "2026-06-30", budget: 7800, impressions: 0, clicks: 0, conversions: 0, createdAt: "2026-04-01T00:00:00Z" },
  { id: "CAM-008", name: "Webinar Series", status: "completed", type: "Display", startDate: "2025-11-01", endDate: "2025-12-15", budget: 4200, impressions: 210000, clicks: 8400, conversions: 420, createdAt: "2025-11-01T00:00:00Z" },
  { id: "CAM-009", name: "Content Syndication", status: "processing", type: "Display", startDate: "2026-02-15", endDate: "2026-04-30", budget: 6300, impressions: 180000, clicks: 5400, conversions: 270, createdAt: "2026-02-15T00:00:00Z" },
  { id: "CAM-010", name: "ABM Tier 1 Accounts", status: "completed", type: "Email", startDate: "2025-10-01", endDate: "2026-01-31", budget: 18900, impressions: 45000, clicks: 4500, conversions: 450, createdAt: "2025-10-01T00:00:00Z" },
  { id: "CAM-011", name: "Social Proof Campaign", status: "pending", type: "Social", startDate: "2026-05-01", endDate: "2026-07-31", budget: 9100, impressions: 0, clicks: 0, conversions: 0, createdAt: "2026-05-01T00:00:00Z" },
  { id: "CAM-012", name: "SEO Content Push", status: "processing", type: "Search", startDate: "2026-01-20", endDate: "2026-06-20", budget: 11000, impressions: 670000, clicks: 26800, conversions: 1340, createdAt: "2026-01-20T00:00:00Z" },
];

export const jobs: Job[] = [
  { id: "JOB-001", name: "Data Export - Q1 Report", campaignId: "CAM-001", status: "completed", progress: 100, createdAt: "2026-02-20", duration: "4m 12s" },
  { id: "JOB-002", name: "Campaign Sync", campaignId: "CAM-002", status: "processing", progress: 67, createdAt: "2026-02-21", duration: "2m 30s" },
  { id: "JOB-003", name: "Audience Segmentation", campaignId: "CAM-003", status: "pending", progress: 0, createdAt: "2026-02-21", duration: "—" },
  { id: "JOB-004", name: "Asset Upload Batch", campaignId: "CAM-004", status: "failed", progress: 34, createdAt: "2026-02-19", duration: "1m 45s" },
  { id: "JOB-005", name: "Analytics Aggregation", campaignId: "CAM-005", status: "processing", progress: 89, createdAt: "2026-02-21", duration: "6m 03s" },
  { id: "JOB-006", name: "Email Template Render", campaignId: "CAM-006", status: "completed", progress: 100, createdAt: "2026-02-18", duration: "0m 58s" },
];

export const chartData = [
  { name: "Jan", impressions: 420000, clicks: 12600, conversions: 630 },
  { name: "Feb", impressions: 380000, clicks: 11400, conversions: 570 },
  { name: "Mar", impressions: 510000, clicks: 15300, conversions: 765 },
  { name: "Apr", impressions: 470000, clicks: 14100, conversions: 705 },
  { name: "May", impressions: 590000, clicks: 17700, conversions: 885 },
  { name: "Jun", impressions: 620000, clicks: 18600, conversions: 930 },
];

export const statsOverview = [
  { label: "Total Campaigns", value: "12", change: "+2 this month" },
  { label: "Active Campaigns", value: "4", change: "33% of total" },
  { label: "Total Impressions", value: "4.2M", change: "+12% vs last month" },
  { label: "Avg. Conversion Rate", value: "4.8%", change: "+0.3% vs last month" },
];

export type { Campaign } from "@/features/campaigns/types";
