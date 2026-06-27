import { apiClient } from "../../../api/client";
import { AppModel } from "../types/app.types";
import { CreateAppInput } from "../validation/app.schema";
import { supabase } from "../../../lib/supabase";

export class AppRepository {
  static async getApps(projectId: string): Promise<AppModel[]> {
    const response = await apiClient.get<AppModel[]>(`/apps?projectId=${projectId}`);
    return response.data;
  }

  static async createApp(data: CreateAppInput & { projectId: string }): Promise<AppModel> {
    const response = await apiClient.post<AppModel>("/apps", data);
    return response.data;
  }

  static async uploadFile(file: File, path: string): Promise<string> {
    const { data, error } = await supabase.storage
      .from("apps-assets")
      .upload(path, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      throw error;
    }

    const { data: publicUrlData } = supabase.storage
      .from("apps-assets")
      .getPublicUrl(path);

    return publicUrlData.publicUrl;
  }
}
