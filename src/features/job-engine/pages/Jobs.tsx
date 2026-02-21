import { useEffect } from "react";
import { useJobStore } from "../store";
import { Skeleton } from "@/shared/ui/skeleton";
const statusStyles: Record<string, string> = {
  pending: "bg-secondary text-muted-foreground",
  processing: "bg-primary/10 text-primary",
  completed: "bg-success/10 text-success",
  failed: "bg-destructive/10 text-destructive",
};

export default function Jobs() {
  const { jobs, loading, fetchJobs, startPolling, stopPolling } =
    useJobStore();

  useEffect(() => {
    fetchJobs();
    startPolling();

    return () => {
      stopPolling();
    };
  }, []);


  return (
    <div className="space-y-4">
      <div className="rounded-lg border border-border bg-card">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Job
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Status
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Progress
              </th>
              <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Created
              </th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? Array.from({ length: 6 }).map((_, i) => (
                <tr key={i} className="border-b border-border last:border-0">
                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-24" />
                  </td>

                  <td className="px-4 py-3">
                    <Skeleton className="h-6 w-20 rounded-full" />
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Skeleton className="h-1.5 w-24 rounded-full" />
                      <Skeleton className="h-4 w-10" />
                    </div>
                  </td>

                  <td className="px-4 py-3">
                    <Skeleton className="h-4 w-32" />
                  </td>
                </tr>
              ))
              : jobs.map((job) => (
                <tr key={job.id} className="border-b border-border last:border-0">
                  <td className="px-4 py-3 font-medium text-foreground">
                    {job.id}
                  </td>

                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusStyles[job.status]}`}
                    >
                      {job.status}
                    </span>
                  </td>

                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-secondary">
                        <div
                          className={`h-full rounded-full transition-all ${job.status === "failed"
                              ? "bg-destructive"
                              : "bg-primary"
                            }`}
                          style={{ width: `${job.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {job.progress}%
                      </span>
                    </div>
                  </td>

                  <td className="px-4 py-3 text-muted-foreground">
                    {new Date(job.createdAt).toLocaleString()}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
