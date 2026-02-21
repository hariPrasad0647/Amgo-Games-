import type { Campaign, CampaignStatus } from "@/data/placeholder";
import { CampaignTable } from "@/features/campaigns/components/CampaignTable";
import { FilterPanel } from "@/features/campaigns/components/FilterPanel";
import { PaginationControls } from "@/features/campaigns/components/PaginationControls";
import { SearchInput } from "@/features/campaigns/components/SearchInput";
import { campaignService } from "@/features/campaigns/services/campaign.service";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const PAGE_SIZE = 6;

export default function Campaigns() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [total, setTotal] = useState(0);
const [loading, setLoading] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  // Derive values for rendering
  const search = searchParams.get("search") ?? "";
  const sortField = (searchParams.get("sort") as keyof Campaign) ?? "name";
  const pageParam = searchParams.get("page");
  const currentPage = pageParam ? Number(pageParam) : 1;

  // Create a stable dependency key
  const searchParamsKey = searchParams.toString();

useEffect(() => {
  let cancelled = false;

  const statuses = searchParams.getAll("status") as CampaignStatus[];
  const types = searchParams.getAll("type");

  async function load() {
    try {
      // Show loading only if this is first load
      if (campaigns.length === 0) {
        setLoading(true);
      }

      const result = await campaignService.getAll({
        page: currentPage,
        pageSize: PAGE_SIZE,
        filters: {
          statuses,
          types,
          search,
        },
      });

      if (cancelled) return;

      setCampaigns(result.data);
      setTotal(result.total);
    } catch (err) {
      console.error("Failed to load campaigns:", err);
    } finally {
      if (!cancelled) {
        setLoading(false);
      }
    }
  }

  load();

  return () => {
    cancelled = true;
  };
}, [searchParamsKey]);

  const totalPages = Math.max(1, Math.ceil(total / PAGE_SIZE));

  const handleSort = (field: keyof Campaign) => {
    const params = new URLSearchParams(searchParams);
    const currentSort = params.get("sort");
    const currentDir = params.get("dir");

    if (currentSort === field) {
      params.set("dir", currentDir === "asc" ? "desc" : "asc");
    } else {
      params.set("sort", field);
      params.set("dir", "asc");
    }

    params.set("page", "1");
    setSearchParams(params);
  };

  const handleFilterChange = (f: {
    statuses: CampaignStatus[];
    types: string[];
  }) => {
    const params = new URLSearchParams(searchParams);

    params.delete("status");
    params.delete("type");

    f.statuses.forEach((s) => params.append("status", s));
    f.types.forEach((t) => params.append("type", t));

    params.set("page", "1");
    setSearchParams(params);
  };

  const handleSearch = (q: string) => {
    const params = new URLSearchParams(searchParams);
    if (q) params.set("search", q);
    else params.delete("search");
    params.set("page", "1");
    setSearchParams(params);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput onSearch={handleSearch} />
        {selectedIds.length > 0 && (
          <span className="text-sm text-muted-foreground">
            {selectedIds.length} selected
          </span>
        )}
      </div>

      <FilterPanel onFilterChange={handleFilterChange} />

      <CampaignTable
        campaigns={campaigns}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sortField={sortField}
        onSort={handleSort}
        loading={loading}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          console.log("onPageChange called with:", page);
          console.log("Before setSearchParams:", searchParams.toString());

          setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            next.set("page", String(page));
            return next;
          });

          setTimeout(() => {
            console.log("After setSearchParams (next tick):", window.location.search);
          }, 0);
        }}
      />
    </div>
  );
}