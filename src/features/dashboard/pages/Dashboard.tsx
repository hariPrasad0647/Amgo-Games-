import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Skeleton } from "@/shared/ui/skeleton";
import { StatsCard } from "../components/StatsCard";
import { ImpressionsTrendChart } from "../components/ImpressionsTrendChart";
import { StatusBadge } from "../../campaigns/components/StatusBadge";
import type { DashboardStats } from "../types";
import type { Campaign } from "../../campaigns/types";
import { dashboardService } from "../services/dashboard.service";
import { campaignService } from "../../campaigns/services/campaign.service";

export default function Dashboard() {
  const navigate = useNavigate();

const [stats, setStats] = useState<DashboardStats | null>(null);
const [recentCampaigns, setRecentCampaigns] = useState<Campaign[]>([]);
const [trendData, setTrendData] = useState<{ date: string; impressions: number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);
        const [statsData, campaignsData, trend] = await Promise.all([
          dashboardService.getStats(),
          campaignService.getAll({
            page: 1,
            pageSize: 5,
            filters: {
              statuses: [],
              types: [],
              search: "",
            },
          }),
          campaignService.getPerformanceData(),
        ]);

        setStats(statsData);
        setRecentCampaigns(campaignsData.data);
        setTrendData(trend);
      } catch (err) {
        console.error("Dashboard load failed");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);



  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="rounded-lg border border-border bg-card p-4 space-y-3"
            >
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-8 w-20" />
            </div>
          ))
          : stats && (
            <>
              <StatsCard label="Total Campaigns" value={stats.totalCampaigns} />
              <StatsCard label="Active Campaigns" value={stats.activeCampaigns} />
              <StatsCard
                label="Total Impressions"
                value={stats.totalImpressions}
              />
              <StatsCard
                label="Conversion Rate"
                value={`${stats.conversionRate}%`}
              />
            </>
          )}
      </div>

      {loading ? (
        <div className="rounded-lg border border-border bg-card p-5">
          <Skeleton className="h-5 w-48 mb-4" />
          <Skeleton className="h-[300px] w-full rounded-md" />
        </div>
      ) : (
        <ImpressionsTrendChart
          title="Impressions Trend (Last 30 Days)"
          data={trendData}
        />
      )}
      {/* Recent campaigns */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">
            Recent Campaigns
          </h2>
          <button
            onClick={() => navigate("/campaigns")}
            className="text-xs font-medium text-primary hover:underline"
          >
            View all
          </button>
        </div>

        <div className="divide-y divide-border">
          {loading
            ? Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-5 py-3"
              >
                <div className="space-y-2">
                  <Skeleton className="h-4 w-40" />
                  <Skeleton className="h-3 w-28" />
                </div>
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
            ))
            : recentCampaigns.map((c) => (
              <button
                key={c.id}
                onClick={() => navigate(`/campaigns/${c.id}`)}
                className="flex w-full items-center justify-between px-5 py-3 text-left hover:bg-accent/50 transition-colors"
              >
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {c.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {c.type} · {c.startDate}
                  </p>
                </div>
                <StatusBadge status={c.status} />
              </button>
            ))}
        </div>
      </div>
    </div>
  );
}
