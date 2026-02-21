import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

import { StatusBadge } from "../components/StatusBadge";
import { OverviewTab } from "../components/OverviewTab";
import { AssetsTab } from "../components/AssetsTab";
import { PerformanceTab } from "../components/PerformanceTab";
import { campaignService } from "../services/campaign.service";
import type { Campaign } from "../types";

const tabs = ["Overview", "Assets", "Performance"] as const;
type Tab = typeof tabs[number];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaign() {
      if (!id) return;

      try {
        setLoading(true);
        setError(null);

        const result = await campaignService.getById(id);

        if (!result) {
          setError("Campaign not found");
        } else {
          setCampaign(result);
        }
      } catch {
        setError("Failed to load campaign");
      } finally {
        setLoading(false);
      }
    }

    loadCampaign();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading campaign...</p>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="text-center">
          <p className="text-sm font-medium text-foreground">
            {error ?? "Campaign not found"}
          </p>
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
            <h2 className="text-lg font-semibold text-foreground">
              {campaign.name}
            </h2>
            <StatusBadge status={campaign.status} />
          </div>
          <p className="text-xs text-muted-foreground">
            {campaign.id} · {campaign.type} · {campaign.startDate} →{" "}
            {campaign.endDate}
          </p>
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
      {activeTab === "Performance" && (
        <PerformanceTab campaignId={campaign.id} />
      )}
    </div>
  );
}
