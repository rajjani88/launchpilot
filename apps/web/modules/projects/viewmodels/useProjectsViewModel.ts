import { useState, useCallback, useMemo } from "react";
import { useAuth } from "@clerk/nextjs";
import { ProjectRepository } from "../repositories/project.repository";
import { Project } from "../types/project.types";
import { CreateProjectInput } from "../validation/project.schema";

export function useProjectsViewModel(workspaceId: string | null) {
  const { getToken } = useAuth();
  
  const repository = useMemo(() => {
    return new ProjectRepository(() => getToken());
  }, [getToken]);

  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    if (!workspaceId) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await repository.getProjects(workspaceId);
      setProjects(data);
    } catch (err: any) {
      setError(err.message || "Failed to load projects");
    } finally {
      setIsLoading(false);
    }
  }, [repository, workspaceId]);

  const createProject = useCallback(async (data: CreateProjectInput) => {
    if (!workspaceId) throw new Error("No active workspace");
    setIsLoading(true);
    setError(null);
    try {
      const newProject = await repository.createProject(workspaceId, data);
      setProjects((prev) => [...prev, newProject]);
      return newProject;
    } catch (err: any) {
      setError(err.message || "Failed to create project");
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [repository, workspaceId]);

  return {
    projects,
    isLoading,
    error,
    fetchProjects,
    createProject,
  };
}
