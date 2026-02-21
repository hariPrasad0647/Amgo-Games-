export type CampaignStatus = "Pending" | "Processing" | "Completed" | "Failed";

export interface Campaign {
  id: string;
  name: string;
  status: CampaignStatus;
  type: string;
  startDate: string;
  endDate: string;
  budget: string;
  impressions: number;
  clicks: number;
  conversions: number;
}

export interface Job {
  id: string;
  name: string;
  status: "Running" | "Queued" | "Completed" | "Failed";
  progress: number;
  createdAt: string;
  duration: string;
}

export const campaigns: Campaign[] = [
  { id: "CAM-001", name: "Q1 Brand Awareness", status: "Completed", type: "Display", startDate: "2026-01-01", endDate: "2026-03-31", budget: "$12,500", impressions: 1240000, clicks: 18600, conversions: 930 },
  { id: "CAM-002", name: "Product Launch - Series X", status: "Processing", type: "Email", startDate: "2026-02-01", endDate: "2026-04-15", budget: "$8,200", impressions: 540000, clicks: 12100, conversions: 605 },
  { id: "CAM-003", name: "Holiday Retargeting", status: "Pending", type: "Social", startDate: "2026-03-01", endDate: "2026-03-31", budget: "$5,000", impressions: 0, clicks: 0, conversions: 0 },
  { id: "CAM-004", name: "Enterprise Outreach", status: "Failed", type: "Email", startDate: "2026-01-15", endDate: "2026-02-28", budget: "$3,400", impressions: 120000, clicks: 2400, conversions: 48 },
  { id: "CAM-005", name: "Developer Conference", status: "Completed", type: "Event", startDate: "2026-01-10", endDate: "2026-01-12", budget: "$25,000", impressions: 890000, clicks: 44500, conversions: 2225 },
  { id: "CAM-006", name: "SMB Acquisition", status: "Processing", type: "Search", startDate: "2026-02-10", endDate: "2026-05-10", budget: "$15,750", impressions: 320000, clicks: 9600, conversions: 480 },
  { id: "CAM-007", name: "Partner Co-Marketing", status: "Pending", type: "Display", startDate: "2026-04-01", endDate: "2026-06-30", budget: "$7,800", impressions: 0, clicks: 0, conversions: 0 },
  { id: "CAM-008", name: "Webinar Series", status: "Completed", type: "Event", startDate: "2025-11-01", endDate: "2025-12-15", budget: "$4,200", impressions: 210000, clicks: 8400, conversions: 420 },
  { id: "CAM-009", name: "Content Syndication", status: "Processing", type: "Content", startDate: "2026-02-15", endDate: "2026-04-30", budget: "$6,300", impressions: 180000, clicks: 5400, conversions: 270 },
  { id: "CAM-010", name: "ABM Tier 1 Accounts", status: "Completed", type: "Email", startDate: "2025-10-01", endDate: "2026-01-31", budget: "$18,900", impressions: 45000, clicks: 4500, conversions: 450 },
  { id: "CAM-011", name: "Social Proof Campaign", status: "Pending", type: "Social", startDate: "2026-05-01", endDate: "2026-07-31", budget: "$9,100", impressions: 0, clicks: 0, conversions: 0 },
  { id: "CAM-012", name: "SEO Content Push", status: "Processing", type: "Content", startDate: "2026-01-20", endDate: "2026-06-20", budget: "$11,000", impressions: 670000, clicks: 26800, conversions: 1340 },
];

export const jobs: Job[] = [
  { id: "JOB-001", name: "Data Export - Q1 Report", status: "Completed", progress: 100, createdAt: "2026-02-20", duration: "4m 12s" },
  { id: "JOB-002", name: "Campaign Sync", status: "Running", progress: 67, createdAt: "2026-02-21", duration: "2m 30s" },
  { id: "JOB-003", name: "Audience Segmentation", status: "Queued", progress: 0, createdAt: "2026-02-21", duration: "—" },
  { id: "JOB-004", name: "Asset Upload Batch", status: "Failed", progress: 34, createdAt: "2026-02-19", duration: "1m 45s" },
  { id: "JOB-005", name: "Analytics Aggregation", status: "Running", progress: 89, createdAt: "2026-02-21", duration: "6m 03s" },
  { id: "JOB-006", name: "Email Template Render", status: "Completed", progress: 100, createdAt: "2026-02-18", duration: "0m 58s" },
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
