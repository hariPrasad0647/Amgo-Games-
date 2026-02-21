import { useState } from "react";
import type { Campaign } from "../types";

interface OverviewTabProps {
  campaign: Campaign;
}

export function OverviewTab({ campaign }: OverviewTabProps) {
  const [form, setForm] = useState({
    name: campaign.name,
    type: campaign.type,
    startDate: campaign.startDate,
    endDate: campaign.endDate,
    budget: campaign.budget,
  });
  const [saved, setSaved] = useState(false);

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
    setSaved(false);
  };

  const handleSave = () => setSaved(true);

  return (
    <div className="max-w-lg space-y-5">
      {Object.entries(form).map(([key, value]) => (
        <div key={key}>
          <label className="mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
            {key.replace(/([A-Z])/g, " $1")}
          </label>
          <input
            type={key.includes("Date") ? "date" : "text"}
            value={value}
            onChange={(e) => handleChange(key, e.target.value)}
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-1 transition-shadow"
          />
        </div>
      ))}

      <div className="flex items-center gap-3">
        <button
          onClick={handleSave}
          className="rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 active:opacity-80 transition-opacity"
        >
          Save changes
        </button>
        {saved && <span className="text-sm text-success">Saved successfully</span>}
      </div>
    </div>
  );
}
