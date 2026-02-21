import { create } from "zustand";
import { jobService } from "./services/job.service";
import type { Job } from "./types";

interface JobState {
  jobs: Job[];
  loading: boolean;
  polling: boolean;

  fetchJobs: () => Promise<void>;
  startPolling: () => void;
  stopPolling: () => void;
}

let interval: ReturnType<typeof setInterval> | null = null;

export const useJobStore = create<JobState>((set, get) => ({
  jobs: [],
  loading: false,
  polling: false,

  fetchJobs: async () => {
    set({ loading: true });
    const data = await jobService.getAll();
    set({ jobs: data, loading: false });
  },

  startPolling: () => {
    if (get().polling) return;

    set({ polling: true });

    interval = setInterval(async () => {
      const updated = await jobService.tick();
      set({ jobs: updated });
    }, 2000);
  },

  stopPolling: () => {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
    set({ polling: false });
  },
}));