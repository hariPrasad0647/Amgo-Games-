import { useState, useMemo, useCallback } from "react";
import { campaigns as allCampaigns } from "@/data/placeholder";
import type { Campaign, CampaignStatus } from "@/data/placeholder";
import { CampaignTable } from "@/features/campaigns/components/CampaignTable";
import { FilterPanel } from "@/features/campaigns/components/FilterPanel";
import { SearchInput } from "@/features/campaigns/components/SearchInput";
import { PaginationControls } from "@/features/campaigns/components/PaginationControls";

const PAGE_SIZE = 6;

export default function Campaigns() {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<{ statuses: CampaignStatus[]; types: string[] }>({ statuses: [], types: [] });
  const [sortField, setSortField] = useState<keyof Campaign>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [currentPage, setCurrentPage] = useState(1);

  const handleSort = (field: keyof Campaign) => {
    if (field === sortField) {
      setSortDirection((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleFilterChange = useCallback((f: { statuses: CampaignStatus[]; types: string[] }) => {
    setFilters(f);
    setCurrentPage(1);
  }, []);

  const handleSearch = useCallback((q: string) => {
    setSearch(q);
    setCurrentPage(1);
  }, []);

  const filtered = useMemo(() => {
    let result = [...allCampaigns];

    if (search) {
      const q = search.toLowerCase();
      result = result.filter((c) => c.name.toLowerCase().includes(q) || c.id.toLowerCase().includes(q));
    }

    if (filters.statuses.length > 0) {
      result = result.filter((c) => filters.statuses.includes(c.status));
    }

    if (filters.types.length > 0) {
      result = result.filter((c) => filters.types.includes(c.type));
    }

    result.sort((a, b) => {
      const aVal = a[sortField];
      const bVal = b[sortField];
      const cmp = String(aVal).localeCompare(String(bVal), undefined, { numeric: true });
      return sortDirection === "asc" ? cmp : -cmp;
    });

    return result;
  }, [search, filters, sortField, sortDirection]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const paginated = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <SearchInput onSearch={handleSearch} />
        {selectedIds.length > 0 && (
          <span className="text-sm text-muted-foreground">{selectedIds.length} selected</span>
        )}
      </div>

      <FilterPanel onFilterChange={handleFilterChange} />

      <CampaignTable
        campaigns={paginated}
        selectedIds={selectedIds}
        onSelectionChange={setSelectedIds}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSort}
      />

      <PaginationControls
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
