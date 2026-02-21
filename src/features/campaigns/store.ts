import { create } from "zustand";
import type { Campaign, CampaignStatus } from "./types";
import { campaignService } from "./services/campaign.service";

interface CampaignFilters {
  statuses: CampaignStatus[];
  types: string[];
  search: string;
}

interface CampaignState {
  campaigns: Campaign[];
  loading: boolean;
  error: string | null;

  page: number;
  pageSize: number;
  total: number;

  filters: CampaignFilters;

  fetchCampaigns: () => Promise<void>;
  setPage: (page: number) => void;
  setFilters: (filters: Partial<CampaignFilters>) => void;
  updateStatusOptimistic: (id: string, status: CampaignStatus) => Promise<void>;
}

export const useCampaignStore = create<CampaignState>((set, get) => ({
  campaigns: [],
  loading: false,
  error: null,

  page: 1,
  pageSize: 5,
  total: 0,

  filters: {
    statuses: [],
    types: [],
    search: "",
  },

  fetchCampaigns: async () => {
    try {
      set({ loading: true, error: null });

      const { page, pageSize, filters } = get();

      const result = await campaignService.getAll({
        page,
        pageSize,
        filters,
      });

      set({
        campaigns: result.data,
        total: result.total,
        loading: false,
      });
    } catch (err) {
      set({
        error: "Failed to fetch campaigns",
        loading: false,
      });
    }
  },

  setPage: (page) => {
    set({ page });
    get().fetchCampaigns();
  },

  setFilters: (newFilters) => {
    set({
      filters: { ...get().filters, ...newFilters },
      page: 1,
    });
    get().fetchCampaigns();
  },

  updateStatusOptimistic: async (id, status) => {
    const previous = get().campaigns;

    // Optimistic update
    set({
      campaigns: previous.map((c) =>
        c.id === id ? { ...c, status } : c
      ),
    });

    try {
      await campaignService.updateStatus(id, status);
    } catch {
      // Rollback on failure
      set({ campaigns: previous });
    }
  },
}));