export type CampaignStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export type CampaignType =
  | "Display"
  | "Email"
  | "Social"
  | "Search";

export interface Campaign {
  id: string;
  name: string;
  type: CampaignType;
  status: CampaignStatus;
  budget: number;
  startDate: string;
  endDate: string;
  impressions: number;
  clicks: number;
  conversions: number;
  createdAt: string;
}