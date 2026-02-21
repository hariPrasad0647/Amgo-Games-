import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { campaigns } from "@/data/placeholder";
import { StatusBadge } from "@/features/campaigns/components/StatusBadge";
import { OverviewTab } from "@/features/campaigns/components/OverviewTab";
import { AssetsTab } from "@/features/campaigns/components/AssetsTab";
import { PerformanceTab } from "@/features/campaigns/components/PerformanceTab";

const tabs = ["Overview", "Assets", "Performance"] as const;
type Tab = typeof tabs[number];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const campaign = campaigns.find((c) => c.id === id);

  if (!campaign) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">Campaign not found</p>
          <button
            onClick={() => navigate("/campaigns")}
            className="mt-2 text-xs text-primary hover:underline"
          >
            Back to campaigns
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/campaigns")}
          className="flex h-8 w-8 items-center justify-center rounded-md border border-border text-muted-foreground hover:bg-accent hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-lg font-semibold text-foreground">{campaign.name}</h2>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-xs text-muted-foreground">{campaign.id} · {campaign.type} · {campaign.startDate} → {campaign.endDate}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {activeTab === "Overview" && <OverviewTab campaign={campaign} />}
      {activeTab === "Assets" && <AssetsTab />}
      {activeTab === "Performance" && <PerformanceTab />}
    </div>
  );
}
