"use client";

import { useAuditsViewModel } from "../viewmodels/useAuditsViewModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Activity, CheckCircle, AlertTriangle } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface AuditResultsProps {
  appId: string;
}

export function AuditResults({ appId }: AuditResultsProps) {
  const { history, isLoading, isTriggering, error, triggerAudit } = useAuditsViewModel(appId);

  // Prepare chart data from history (mocking score trend)
  const chartData = [...history].reverse().map((audit, index) => ({
    name: `Audit ${index + 1}`,
    score: audit.score,
  }));

  const latestAudit = history[0];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">AI Audit Dashboard</h2>
          <p className="text-muted-foreground">
            Review the latest findings and performance score for your app.
          </p>
        </div>
        <Button 
          onClick={triggerAudit} 
          disabled={isTriggering}
          className="bg-primary text-primary-foreground"
        >
          <Play className="mr-2 h-4 w-4" />
          {isTriggering ? "Queuing Audit..." : "Run New Audit"}
        </Button>
      </div>

      {error && (
        <div className="p-4 bg-destructive/10 text-destructive rounded-lg flex items-center">
          <AlertTriangle className="mr-2 h-5 w-5" />
          {error}
        </div>
      )}

      {isLoading ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse h-48 bg-muted/50" />
          ))}
        </div>
      ) : history.length === 0 ? (
        <Card className="flex flex-col items-center justify-center p-12 text-center border-dashed">
          <Activity className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold">No Audits Found</h3>
          <p className="text-sm text-muted-foreground mb-4">
            You haven't run any AI audits for this app yet.
          </p>
          <Button variant="outline" onClick={triggerAudit} disabled={isTriggering}>
            Run your first audit
          </Button>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-3">
          {/* Main Score Card */}
          <Card className="col-span-1 md:col-span-1 border-primary/20">
            <CardHeader>
              <CardTitle>Overall Health Score</CardTitle>
              <CardDescription>Based on the latest AI analysis</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center py-6">
              <div className="relative flex items-center justify-center w-32 h-32 rounded-full border-8 border-primary/20">
                <span className="text-4xl font-bold text-primary">{latestAudit?.score}</span>
              </div>
              <p className="text-sm text-muted-foreground mt-4 flex items-center">
                <CheckCircle className="h-4 w-4 text-emerald-500 mr-2" />
                Good standing
              </p>
            </CardContent>
          </Card>

          {/* Trend Chart */}
          <Card className="col-span-1 md:col-span-2">
            <CardHeader>
              <CardTitle>Score History</CardTitle>
            </CardHeader>
            <CardContent className="h-[200px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#88888833" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#888888'}} />
                  <YAxis domain={[0, 100]} axisLine={false} tickLine={false} tick={{fill: '#888888'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                    activeDot={{ r: 6, fill: "hsl(var(--primary))" }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Detailed Findings */}
          <Card className="col-span-1 md:col-span-3">
            <CardHeader>
              <CardTitle>Latest AI Findings</CardTitle>
              <CardDescription>Date: {latestAudit?.createdAt ? new Date(latestAudit.createdAt).toLocaleString() : ''}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none bg-muted/30 p-4 rounded-lg">
                <pre className="whitespace-pre-wrap font-sans text-sm">
                  {latestAudit?.findings}
                </pre>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}
