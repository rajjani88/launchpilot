export interface AuditHistoryModel {
  id: string;
  appId: string;
  score: number;
  findings: string; // JSON string from the backend
  createdAt: string;
}

export interface TriggerAuditResponse {
  message: string;
  jobId: string;
}
