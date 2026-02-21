import { mockDB } from "../../../mock/db";
import { simulateRequest } from "../../../mock/simulateRequest";
import type { Job } from "../types";

export const jobService = {
  async getAll(): Promise<Job[]> {
    return simulateRequest([...mockDB.jobs], { delay: 500 });
  },

  async tick(): Promise<Job[]> {
    // Simulate job lifecycle progression
    mockDB.jobs.forEach((job) => {
      if (job.status === "pending") {
        job.status = "processing";
      } else if (job.status === "processing") {
        job.progress += Math.floor(Math.random() * 25);

        if (job.progress >= 100) {
          job.progress = 100;

          // 20% failure rate
          job.status =
            Math.random() < 0.2 ? "failed" : "completed";
        }
      }
    });

    return simulateRequest([...mockDB.jobs], { delay: 300 });
  },
};