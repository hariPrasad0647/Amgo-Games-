import { getDashboardStats } from "../../../mock/db";
import { simulateRequest } from "../../../mock/simulateRequest";
import type { DashboardStats } from "../types";

export const dashboardService = {
  async getStats(): Promise<DashboardStats> {
    const stats = getDashboardStats();
    return simulateRequest(stats);
  },
};