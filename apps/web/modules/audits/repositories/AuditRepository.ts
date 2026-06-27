import { apiClient } from "../../../api/client";
import { AuditHistoryModel, TriggerAuditResponse } from "../types/audit.types";

export class AuditRepository {
  static async getAuditHistory(appId: string): Promise<AuditHistoryModel[]> {
    const response = await apiClient.get<AuditHistoryModel[]>(`/audits/${appId}`);
    return response.data;
  }

  static async triggerAudit(appId: string): Promise<TriggerAuditResponse> {
    const response = await apiClient.post<TriggerAuditResponse>("/audits", { appId });
    return response.data;
  }
}
