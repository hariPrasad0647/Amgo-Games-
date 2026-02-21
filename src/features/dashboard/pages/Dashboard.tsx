import { StatsCard } from "@/features/dashboard/components/dashboard/StatsCard";
import { ImpressionsTrendChart } from "@/features/dashboard/components/dashboard/ImpressionsTrendChart";
import { StatusBadge } from "@/features/campaigns/components/StatusBadge";
import { statsOverview, campaigns } from "@/data/placeholder";
import { dailyImpressionsData } from "@/data/daily-impressions";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const recentCampaigns = campaigns.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {statsOverview.map((stat) => (
          <StatsCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Impressions trend */}
      <ImpressionsTrendChart title="Impressions Trend (Last 30 Days)" data={dailyImpressionsData} />

      {/* Recent campaigns */}
      <div className="rounded-lg border border-border bg-card">
        <div className="flex items-center justify-between border-b border-border px-5 py-4">
          <h2 className="text-sm font-semibold text-foreground">Recent Campaigns</h2>
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
                <p className="text-sm font-medium text-foreground">{c.name}</p>
                <p className="text-xs text-muted-foreground">{c.type} · {c.startDate}</p>
              </div>
              <StatusBadge status={c.status} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
