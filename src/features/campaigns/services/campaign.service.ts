import { mockDB, getDailyImpressions } from "../../../mock/db";
import { simulateRequest } from "../../../mock/simulateRequest";
import type { Campaign, CampaignStatus } from "../types";

export const campaignService = {
  async getById(id: string): Promise<Campaign | undefined> {
    const campaign = mockDB.campaigns.find((c) => c.id === id);
    return simulateRequest(campaign);
  },

  async getAll({
    page,
    pageSize,
    filters,
  }: {
    page: number;
    pageSize: number;
    filters: {
      statuses: CampaignStatus[];
      types: string[];
      search: string;
    };
  }) {
    let data = [...mockDB.campaigns];

    // Filter by status
    if (filters.statuses.length > 0) {
      data = data.filter((c) => filters.statuses.includes(c.status));
    }

    // Filter by type
    if (filters.types.length > 0) {
      data = data.filter((c) => filters.types.includes(c.type));
    }

    // Search
    if (filters.search) {
      data = data.filter((c) =>
        c.name.toLowerCase().includes(filters.search.toLowerCase())
      );
    }

    const total = data.length;

    const start = (page - 1) * pageSize;
    const paginated = data.slice(start, start + pageSize);

    return simulateRequest({ data: paginated, total });
  },

  async updateStatus(id: string, status: CampaignStatus) {
    const campaign = mockDB.campaigns.find((c) => c.id === id);

    if (!campaign) {
      throw new Error("Campaign not found");
    }

    campaign.status = status;

    // 20% failure rate to test optimistic rollback
    return simulateRequest(true, { failureRate: 0.2 });
  },

  async getPerformanceData() {
    const data = getDailyImpressions();
    return simulateRequest(data);
  },
};