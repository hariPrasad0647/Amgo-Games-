import type { CampaignStatus } from "@/data/placeholder";

const statusStyles: Record<CampaignStatus, string> = {
  Pending: "bg-secondary text-muted-foreground",
  Processing: "bg-primary/10 text-primary",
  Completed: "bg-success/10 text-success",
  Failed: "bg-destructive/10 text-destructive",
};

interface StatusBadgeProps {
  status: CampaignStatus;
}

export function StatusBadge({ status }: StatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {status}
    </span>
  );
}
