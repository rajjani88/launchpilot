"use client";

import { useEffect, useState } from "react";
import { ProjectList } from "@/modules/projects/ui/ProjectList";
import { CreateProjectDialog } from "@/modules/projects/ui/CreateProjectDialog";
import { useProjectsViewModel } from "@/modules/projects/viewmodels/useProjectsViewModel";

// For demo purposes, we'll hardcode a workspace ID or let the user select it later.
// In a real app, this comes from Clerk organization or custom workspace state.
const TEMP_WORKSPACE_ID = "workspace_123";

export default function DashboardPage() {
  const { projects, isLoading, error, fetchProjects, createProject } = useProjectsViewModel(TEMP_WORKSPACE_ID);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return (
    <div className="flex flex-col gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
          <p className="text-muted-foreground mt-2">Manage your apps and view AI audits.</p>
        </div>
        <CreateProjectDialog onCreate={createProject} />
      </div>

      {error && (
        <div className="p-4 rounded-lg bg-destructive/10 text-destructive border border-destructive/20 text-sm">
          {error}
        </div>
      )}

      <ProjectList projects={projects} isLoading={isLoading} />
    </div>
  );
}

