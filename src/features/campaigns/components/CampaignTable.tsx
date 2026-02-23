import { ArrowUpDown } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Campaign } from "../types";


interface CampaignTableProps {
  campaigns: Campaign[];
  selectedIds: string[];
  onSelectionChange: (ids: string[]) => void;
  sortField: keyof Campaign;
  onSort: (field: keyof Campaign) => void;
  loading?: boolean;
  onStatusChange?: (id: string, status: Campaign["status"]) => void;
}
export function CampaignTable({
  campaigns,
  selectedIds,
  onSelectionChange,
  sortField,
  onSort,
  onStatusChange,
}: CampaignTableProps) {
  const navigate = useNavigate();

  const allSelected = campaigns.length > 0 && selectedIds.length === campaigns.length;

  const toggleAll = () => {
    onSelectionChange(allSelected ? [] : campaigns.map((c) => c.id));
  };

  const toggleOne = (id: string) => {
    onSelectionChange(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    );
  };

  const SortHeader = ({ field, children }: { field: keyof Campaign; children: React.ReactNode }) => (
    <button
      onClick={() => onSort(field)}
      className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground hover:text-foreground transition-colors"
    >
      {children}
      <ArrowUpDown className={`h-3 w-3 ${sortField === field ? "text-foreground" : ""}`} />
    </button>
  );

  return (
    <div className="overflow-x-auto rounded-lg border border-border bg-card">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-border">
            <th className="px-4 py-3 text-left">
              <input
                type="checkbox"
                checked={allSelected}
                onChange={toggleAll}
                className="h-4 w-4 rounded border-border accent-primary"
              />
            </th>
            <th className="px-4 py-3 text-left"><SortHeader field="name">Name</SortHeader></th>
            <th className="px-4 py-3 text-left"><SortHeader field="status">Status</SortHeader></th>
            <th className="px-4 py-3 text-left"><SortHeader field="type">Type</SortHeader></th>
            <th className="px-4 py-3 text-left"><SortHeader field="startDate">Start</SortHeader></th>
            <th className="px-4 py-3 text-left"><SortHeader field="budget">Budget</SortHeader></th>
            <th className="px-4 py-3 text-right"><SortHeader field="impressions">Impressions</SortHeader></th>
          </tr>
        </thead>
        <tbody>
          {campaigns.map((campaign) => (
            <tr
              key={campaign.id}
              onClick={() => navigate(`/campaigns/${campaign.id}`)}
              className={`cursor-pointer border-b border-border last:border-0 hover:bg-accent/50 transition-colors ${selectedIds.includes(campaign.id) ? "bg-accent/30" : ""
                }`}
            >
              <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selectedIds.includes(campaign.id)}
                  onChange={() => toggleOne(campaign.id)}
                  className="h-4 w-4 rounded border-border accent-primary"
                />
              </td>
              <td className="px-4 py-3 font-medium text-foreground">{campaign.name}</td>
              <td
                className="px-4 py-3"
                onClick={(e) => e.stopPropagation()}
              >
                <select
                  value={campaign.status}
                  onChange={(e) =>
                    onStatusChange?.(campaign.id, e.target.value as Campaign["status"])
                  }
                  className="rounded-md border border-border bg-card px-2 py-1 text-sm"
                >
                  <option value="pending">pending</option>
                  <option value="processing">processing</option>
                  <option value="completed">completed</option>
                  <option value="failed">failed</option>
                </select>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{campaign.type}</td>
              <td className="px-4 py-3 text-muted-foreground">{campaign.startDate}</td>
              <td className="px-4 py-3 text-muted-foreground">{campaign.budget}</td>
              <td className="px-4 py-3 text-right text-muted-foreground">{campaign.impressions.toLocaleString()}</td>
            </tr>
          ))}
          {campaigns.length === 0 && (
            <tr>
              <td colSpan={7} className="px-4 py-12 text-center text-muted-foreground">
                No campaigns found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
