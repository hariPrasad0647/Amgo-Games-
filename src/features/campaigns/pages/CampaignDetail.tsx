import { Skeleton } from "@/shared/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";

import { AssetsTab } from "../components/AssetsTab";
import { OverviewTab } from "../components/OverviewTab";
import { PerformanceTab } from "../components/PerformanceTab";
import { StatusBadge } from "../components/StatusBadge";
import { campaignService } from "../services/campaign.service";
import type { Campaign } from "../types";

const tabs = ["Overview", "Assets", "Performance"] as const;
type Tab = typeof tabs[number];

export default function CampaignDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const activeTab = (searchParams.get("tab") as Tab) ?? "Overview";
  const isValidTab = tabs.includes(activeTab);
  const currentTab = isValidTab ? activeTab : "Overview";

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCampaign() {
      if (!id) {
        setError("Campaign ID is missing");
        setLoading(false);
        return;
      }

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
      <div className="space-y-6">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-8 rounded-md" />
          <div className="space-y-2">
            <Skeleton className="h-5 w-48" />
            <Skeleton className="h-4 w-64" />
          </div>
        </div>

        <div className="flex gap-1 border-b border-border">
          {tabs.map((tab) => (
            <Skeleton key={tab} className="h-8 w-24" />
          ))}
        </div>

        <div className="space-y-4">
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
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

  const handleTabChange = (tab: Tab) => {
    const params = new URLSearchParams(searchParams);
    params.set("tab", tab);
    setSearchParams(params);
  };

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
            {campaign.id} · {campaign.type} · {campaign.startDate} → {campaign.endDate}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabChange(tab)}
            className={`border-b-2 px-4 py-2 text-sm font-medium transition-colors ${
              currentTab === tab
                ? "border-primary text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {currentTab === "Overview" && <OverviewTab campaign={campaign} />}
      {currentTab === "Assets" && <AssetsTab />}
      {currentTab === "Performance" && (
        <PerformanceTab campaignId={campaign.id} />
      )}
    </div>
  );
}
