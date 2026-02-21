// import { useState } from "react";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

// type ViewState = "loading" | "data" | "empty" | "error";

// export function PerformanceTab() {
//   const [viewState, setViewState] = useState<ViewState>("data");

//   return (
//     <div className="space-y-4">
//       {/* State toggles */}
//       <div className="flex items-center gap-2">
//         <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">View</span>
//         {(["data", "loading", "empty", "error"] as ViewState[]).map((state) => (
//           <button
//             key={state}
//             onClick={() => setViewState(state)}
//             className={`rounded-md border px-2.5 py-1 text-xs font-medium capitalize transition-colors ${
//               viewState === state
//                 ? "border-primary bg-primary text-primary-foreground"
//                 : "border-border bg-card text-muted-foreground hover:bg-accent hover:text-foreground"
//             }`}
//           >
//             {state}
//           </button>
//         ))}
//       </div>

//       {/* Chart area */}
//       <div className="rounded-lg border border-border bg-card p-6">
//         {viewState === "loading" && (
//           <div className="flex h-64 items-center justify-center">
//             <div className="flex flex-col items-center gap-2">
//               <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
//               <p className="text-sm text-muted-foreground">Loading performance data...</p>
//             </div>
//           </div>
//         )}

//         {viewState === "empty" && (
//           <div className="flex h-64 items-center justify-center">
//             <div className="text-center">
//               <p className="text-sm font-medium text-foreground">No data yet</p>
//               <p className="mt-1 text-xs text-muted-foreground">Performance data will appear once the campaign starts.</p>
//             </div>
//           </div>
//         )}

//         {viewState === "error" && (
//           <div className="flex h-64 items-center justify-center">
//             <div className="text-center">
//               <p className="text-sm font-medium text-destructive">Failed to load data</p>
//               <p className="mt-1 text-xs text-muted-foreground">Something went wrong. Please try again.</p>
//               <button
//                 onClick={() => setViewState("data")}
//                 className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
//               >
//                 Retry
//               </button>
//             </div>
//           </div>
//         )}

//         {viewState === "data" && (
//           <ResponsiveContainer width="100%" height={280}>
//             <BarChart data={chartData}>
//               <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" />
//               <XAxis dataKey="name" tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
//               <YAxis tick={{ fontSize: 12, fill: "hsl(215, 16%, 47%)" }} />
//               <Tooltip
//                 contentStyle={{
//                   backgroundColor: "hsl(0, 0%, 100%)",
//                   border: "1px solid hsl(220, 13%, 91%)",
//                   borderRadius: "8px",
//                   fontSize: "12px",
//                 }}
//               />
//               <Bar dataKey="impressions" fill="hsl(239, 84%, 67%)" radius={[4, 4, 0, 0]} />
//             </BarChart>
//           </ResponsiveContainer>
//         )}
//       </div>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { campaignService } from "../services/campaign.service";

type PerformanceData = {
  date: string;
  impressions: number;
};

export function PerformanceTab({ campaignId }: { campaignId: string }) {
  const [data, setData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await campaignService.getPerformanceData();
      setData(result);
    } catch (err) {
      setError("Failed to load data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [campaignId]);

  return (
    <div className="rounded-lg border border-border bg-card p-6">
      {loading && (
        <div className="flex h-64 items-center justify-center">
          <div className="flex flex-col items-center gap-2">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
            <p className="text-sm text-muted-foreground">
              Loading performance data...
            </p>
          </div>
        </div>
      )}

      {error && (
        <div className="flex h-64 items-center justify-center">
          <div className="text-center">
            <p className="text-sm font-medium text-destructive">
              Failed to load data
            </p>
            <button
              onClick={loadData}
              className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium hover:bg-accent transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="flex h-64 items-center justify-center">
          <p className="text-sm text-muted-foreground">No data available</p>
        </div>
      )}

      {!loading && !error && data.length > 0 && (
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar
              dataKey="impressions"
              fill="hsl(239, 84%, 67%)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}
