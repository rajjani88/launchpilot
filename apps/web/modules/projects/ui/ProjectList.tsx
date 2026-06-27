import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Project } from "../types/project.types";
import Link from "next/link";

interface ProjectListProps {
  projects: Project[];
  isLoading: boolean;
}

export function ProjectList({ projects, isLoading }: ProjectListProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="h-24 bg-slate-100 dark:bg-zinc-800 rounded-t-xl" />
            <CardContent className="h-16" />
          </Card>
        ))}
      </div>
    );
  }

  if (projects.length === 0) {
    return (
      <div className="flex h-48 items-center justify-center rounded-lg border border-dashed text-muted-foreground bg-slate-50 dark:bg-zinc-900/50">
        <p>No projects found. Create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {projects.map((project) => (
        <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
          <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>{project.name}</CardTitle>
              <CardDescription>{project.description || "No description provided."}</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-muted-foreground">
                Created {new Date(project.createdAt).toLocaleDateString()}
              </p>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  );
}
