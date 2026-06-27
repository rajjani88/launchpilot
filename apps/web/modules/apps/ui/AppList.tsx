"use client";

import { useEffect } from "react";
import { useAppsViewModel } from "../viewmodels/useAppsViewModel";
import { CreateAppDialog } from "./CreateAppDialog";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Smartphone, AlertCircle, Apple } from "lucide-react";
import { motion } from "framer-motion";

interface AppListProps {
  projectId: string;
}

export function AppList({ projectId }: AppListProps) {
  const { apps, isLoading, error, fetchApps } = useAppsViewModel(projectId);

  useEffect(() => {
    fetchApps();
  }, [fetchApps]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-destructive">
        <AlertCircle className="h-8 w-8 mb-2" />
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Applications</h2>
          <p className="text-muted-foreground">
            Manage the apps associated with this project.
          </p>
        </div>
        <CreateAppDialog projectId={projectId} onAppCreated={fetchApps} />
      </div>

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="h-24 bg-muted/50 rounded-t-xl" />
              <CardContent className="h-16" />
            </Card>
          ))}
        </div>
      ) : apps.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <Smartphone className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No apps yet</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Create your first application to get started with the audit.
          </p>
          <CreateAppDialog projectId={projectId} onAppCreated={fetchApps} />
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {apps.map((app, i) => (
            <motion.div
              key={app.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
            >
              <Link href={`/dashboard/apps/${app.id}`}>
                <Card className="overflow-hidden hover:shadow-md transition-shadow cursor-pointer group h-full">
                  <CardHeader className="pb-4 flex flex-row items-start justify-between space-y-0">
                    <div>
                      <CardTitle className="text-lg font-semibold truncate pr-4">
                        {app.name}
                      </CardTitle>
                      <CardDescription className="font-mono text-xs mt-1">
                        {app.bundleId || "No Bundle ID"}
                      </CardDescription>
                    </div>
                    <div className="p-2 bg-primary/10 rounded-full text-primary group-hover:scale-110 transition-transform">
                      {app.platform === "IOS" ? <Apple className="h-5 w-5" /> : <Smartphone className="h-5 w-5" />}
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 mr-2"></span>
                        Active
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
