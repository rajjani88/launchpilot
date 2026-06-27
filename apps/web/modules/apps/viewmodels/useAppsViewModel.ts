import { useState, useCallback } from "react";
import { AppModel } from "../types/app.types";
import { CreateAppInput } from "../validation/app.schema";
import { AppRepository } from "../repositories/AppRepository";
import { useAuth } from "@clerk/nextjs";

export function useAppsViewModel(projectId: string) {
  const { getToken } = useAuth();
  const [apps, setApps] = useState<AppModel[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const fetchApps = useCallback(async () => {
    if (!projectId) return;
    try {
      setIsLoading(true);
      setError(null);
      // Wait for clerk to be ready
      const token = await getToken();
      if (!token) return;

      const data = await AppRepository.getApps(projectId);
      setApps(data);
    } catch (err: any) {
      setError(err.message || "Failed to load apps");
    } finally {
      setIsLoading(false);
    }
  }, [projectId, getToken]);

  const createApp = async (data: CreateAppInput) => {
    try {
      setIsLoading(true);
      setError(null);
      const newApp = await AppRepository.createApp({ ...data, projectId });
      setApps((prev) => [newApp, ...prev]);
      return newApp;
    } catch (err: any) {
      setError(err.message || "Failed to create app");
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const uploadAppAsset = async (file: File, assetType: string) => {
    try {
      setIsUploading(true);
      const path = `${projectId}/${Date.now()}_${file.name}`;
      const url = await AppRepository.uploadFile(file, path);
      return url;
    } catch (err: any) {
      setError(err.message || "Failed to upload file");
      throw err;
    } finally {
      setIsUploading(false);
    }
  };

  return {
    apps,
    isLoading,
    error,
    isUploading,
    fetchApps,
    createApp,
    uploadAppAsset,
  };
}
