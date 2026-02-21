import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartState = "default" | "loading" | "empty" | "error";

interface ChartCardProps {
  title: string;
  data: { date: string; impressions: number }[];
}

export function ImpressionsTrendChart({ title, data }: ChartCardProps) {
  const [viewState, setViewState] = useState<ChartState>("default");

  return (
    <div className="rounded-lg border border-border bg-card">
      <div className="flex items-center justify-between border-b border-border px-5 py-4">
        <h2 className="text-sm font-semibold text-foreground">{title}</h2>
        <div className="flex items-center gap-1">
          {(["default", "loading", "empty", "error"] as ChartState[]).map((s) => (
            <button
              key={s}
              onClick={() => setViewState(s)}
              className={`rounded-md px-2 py-1 text-xs font-medium capitalize transition-colors ${
                viewState === s
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {viewState === "loading" && (
          <div className="flex h-64 items-center justify-center">
            <div className="flex flex-col items-center gap-2">
              <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-primary" />
              <p className="text-sm text-muted-foreground">Loading chart data…</p>
            </div>
          </div>
        )}

        {viewState === "empty" && (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-foreground">No performance data available</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Data will appear here once impressions are recorded.
              </p>
            </div>
          </div>
        )}

        {viewState === "error" && (
          <div className="flex h-64 items-center justify-center">
            <div className="text-center">
              <p className="text-sm font-medium text-destructive">Unable to load chart data</p>
              <p className="mt-1 text-xs text-muted-foreground">
                Something went wrong. Please try again.
              </p>
              <button
                onClick={() => setViewState("default")}
                className="mt-3 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        )}

        {viewState === "default" && (
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 13%, 91%)" vertical={false} />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
                tickLine={false}
                axisLine={{ stroke: "hsl(220, 13%, 91%)" }}
                interval={4}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(215, 16%, 47%)" }}
                tickLine={false}
                axisLine={false}
                tickFormatter={(v: number) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(0, 0%, 100%)",
                  border: "1px solid hsl(220, 13%, 91%)",
                  borderRadius: "8px",
                  fontSize: "12px",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                }}
                formatter={(value: number) => [value.toLocaleString(), "Impressions"]}
              />
              <Line
                type="monotone"
                dataKey="impressions"
                stroke="hsl(239, 84%, 67%)"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4, strokeWidth: 0, fill: "hsl(239, 84%, 67%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        )}
      </div>
    </div>
  );
}
