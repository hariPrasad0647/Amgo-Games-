import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { StatsCard } from "../components/StatsCard";
import { ImpressionsTrendChart } from "../components/ImpressionsTrendChart";
import { StatusBadge } from "../../campaigns/components/StatusBadge";

import { dashboardService } from "../services/dashboard.service";
import { campaignService } from "../../campaigns/services/campaign.service";

export default function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState<any>(null);
  const [recentCampaigns, setRecentCampaigns] = useState<any[]>([]);
  const [trendData, setTrendData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboard() {
      try {
        setLoading(true);

        const statsData = await dashboardService.getStats();

        const campaignsData = await campaignService.getAll({
          page: 1,
          pageSize: 5,
          filters: {
            statuses: [],
            types: [],
            search: "",
          },
        });

        const trend = await campaignService.getPerformanceData();

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

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        </div>
      )}

      {/* Impressions trend */}
      <ImpressionsTrendChart
        title="Impressions Trend (Last 30 Days)"
        data={trendData}
      />

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
          {recentCampaigns.map((c) => (
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
