export type JobStatus =
  | "pending"
  | "processing"
  | "completed"
  | "failed";

export interface Job {
  id: string;
  campaignId: string;
  status: JobStatus;
  progress: number;
  createdAt: string;
  name: string;
  duration: string;
}