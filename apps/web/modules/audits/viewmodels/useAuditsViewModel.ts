import { useState, useCallback, useEffect } from "react";
import { AuditHistoryModel } from "../types/audit.types";
import { AuditRepository } from "../repositories/AuditRepository";
import { useAuth } from "@clerk/nextjs";

export function useAuditsViewModel(appId: string) {
  const { getToken } = useAuth();
  const [history, setHistory] = useState<AuditHistoryModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTriggering, setIsTriggering] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchHistory = useCallback(async () => {
    if (!appId) return;
    try {
      setIsLoading(true);
      setError(null);
      const token = await getToken();
      if (!token) return;

      const data = await AuditRepository.getAuditHistory(appId);
      setHistory(data);
    } catch (err: any) {
      setError(err.message || "Failed to load audit history");
    } finally {
      setIsLoading(false);
    }
  }, [appId, getToken]);

  const triggerAudit = async () => {
    try {
      setIsTriggering(true);
      setError(null);
      const token = await getToken();
      if (!token) return;

      await AuditRepository.triggerAudit(appId);
      
      // We could set up polling here, but for now we just refresh after 5 seconds
      // as a simple mock for the background job. In a real app, you'd use websockets or SSE.
      setTimeout(() => {
        fetchHistory();
      }, 5000);

    } catch (err: any) {
      setError(err.message || "Failed to trigger audit");
    } finally {
      setIsTriggering(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [fetchHistory]);

  return {
    history,
    isLoading,
    isTriggering,
    error,
    triggerAudit,
    fetchHistory,
  };
}

