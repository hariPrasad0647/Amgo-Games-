export interface DashboardStats {
  totalCampaigns: number;
  activeCampaigns: number;
  totalImpressions: number;
  conversionRate: number;
}

export interface TrendPoint {
  date: string;
  impressions: number;
}