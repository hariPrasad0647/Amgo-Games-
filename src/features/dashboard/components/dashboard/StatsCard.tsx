interface StatsCardProps {
  label: string;
  value: string;
  change: string;
}

export function StatsCard({ label, value, change }: StatsCardProps) {
  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">{label}</p>
      <p className="mt-1 text-2xl font-semibold text-foreground">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{change}</p>
    </div>
  );
}
