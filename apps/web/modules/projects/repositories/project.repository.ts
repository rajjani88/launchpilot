import { Project } from "../types/project.types";
import { CreateProjectInput } from "../validation/project.schema";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export class ProjectRepository {
  constructor(private readonly getToken: () => Promise<string | null>) {}

  private async getHeaders(): Promise<HeadersInit> {
    const token = await this.getToken();
    return {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
  }

  async getProjects(workspaceId: string): Promise<Project[]> {
    const headers = await this.getHeaders();
    const response = await fetch(`${API_BASE_URL}/projects?workspaceId=${workspaceId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      throw new Error("Failed to fetch projects");
    }

    return response.json();
  }

  async createProject(workspaceId: string, data: CreateProjectInput): Promise<Project> {
    const headers = await this.getHeaders();
    const response = await fetch(`${API_BASE_URL}/projects`, {
      method: "POST",
      headers,
      body: JSON.stringify({ ...data, workspaceId }),
    });

    if (!response.ok) {
      throw new Error("Failed to create project");
    }

    return response.json();
  }
}
