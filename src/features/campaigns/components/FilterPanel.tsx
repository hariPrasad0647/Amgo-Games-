import { useState } from "react";
import type { CampaignStatus } from "@/data/placeholder";

const statuses: CampaignStatus[] = ["Pending", "Processing", "Completed", "Failed"];
const types = ["Display", "Email", "Social", "Search", "Event", "Content"];

interface FilterPanelProps {
  onFilterChange: (filters: { statuses: CampaignStatus[]; types: string[] }) => void;
}

export function FilterPanel({ onFilterChange }: FilterPanelProps) {
  const [selectedStatuses, setSelectedStatuses] = useState<CampaignStatus[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  const toggleStatus = (s: CampaignStatus) => {
    const next = selectedStatuses.includes(s)
      ? selectedStatuses.filter((x) => x !== s)
      : [...selectedStatuses, s];
    setSelectedStatuses(next);
    onFilterChange({ statuses: next, types: selectedTypes });
  };

  const toggleType = (t: string) => {
    const next = selectedTypes.includes(t)
      ? selectedTypes.filter((x) => x !== t)
      : [...selectedTypes, t];
    setSelectedTypes(next);
    onFilterChange({ statuses: selectedStatuses, types: next });
  };

  const clearAll = () => {
    setSelectedStatuses([]);
    setSelectedTypes([]);
    onFilterChange({ statuses: [], types: [] });
  };

  const hasFilters = selectedStatuses.length > 0 || selectedTypes.length > 0;

  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">Status</span>
      {statuses.map((s) => (
        <button
          key={s}
          onClick={() => toggleStatus(s)}
          className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
            selectedStatuses.includes(s)
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          {s}
        </button>
      ))}

      <span className="ml-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Type</span>
      {types.map((t) => (
        <button
          key={t}
          onClick={() => toggleType(t)}
          className={`rounded-md border px-2.5 py-1 text-xs font-medium transition-colors ${
            selectedTypes.includes(t)
              ? "border-primary bg-primary text-primary-foreground"
              : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
          }`}
        >
          {t}
        </button>
      ))}

      {hasFilters && (
        <button
          onClick={clearAll}
          className="ml-2 text-xs text-primary hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}
