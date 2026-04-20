"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Card, CardTitle } from "@/components/ui/card";
import {
  BarChart3,
  Activity,
  Target,
  Zap,
  Clock,
  Sparkles,
  Loader2,
  FileSearch,
} from "lucide-react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
} from "recharts";

export default function EvaluationPage() {
  const rows = useQuery(api.submissions.listMySubmissions, {});
  const me = useQuery(api.users.getCurrentUser, {});

  // Calculate actual stats from user data
  const evaluations =
    rows?.filter((r) => r.evaluation).map((r) => r.evaluation!) || [];

  const avgScore =
    evaluations.length > 0
      ? evaluations.reduce((sum, e) => sum + e.effectiveTotal, 0) /
        evaluations.length
      : 0;

  const avgInnovation =
    evaluations.length > 0
      ? evaluations.reduce((sum, e) => sum + e.effectiveScores.innovation, 0) /
        evaluations.length
      : 0;

  const avgUI =
    evaluations.length > 0
      ? evaluations.reduce((sum, e) => sum + e.effectiveScores.uiUx, 0) /
        evaluations.length
      : 0;

  // Chart data from actual evaluations
  const chartData = evaluations.map((e, i) => ({
    name: `Env ${i + 1}`,
    score: e.effectiveTotal,
  }));

  const stats = [
    {
      label: "Overall Avg",
      value: `${avgScore.toFixed(1)}/100`,
      icon: Target,
      color: "text-emerald-400",
    },
    {
      label: "Innovation",
      value: `${avgInnovation.toFixed(1)}`,
      icon: Zap,
      color: "text-amber-400",
    },
    {
      label: "UI/UX Avg",
      value: `${avgUI.toFixed(1)}`,
      icon: Activity,
      color: "text-blue-400",
    },
    {
      label: "Total Projects",
      value: rows?.length.toString() || "0",
      icon: FileSearch,
      color: "text-primary",
    },
  ];

  if (rows === undefined) {
    return (
      <div className="flex h-[400px] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/50" />
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          {me?.name ? `${me.name}'s Insights` : "Project Insights"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Real-time analysis of your submitted builds and AI-generated scores.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-[#151926] p-6 transition-all hover:bg-[#1a1f2d] border border-border/10"
          >
            <div className="flex items-center justify-between">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <Clock className="h-4 w-4 text-muted-foreground/30" />
            </div>
            <p className="mt-4 text-2xl font-bold">{stat.value}</p>
            <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
              {stat.label}
            </p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="rounded-2xl bg-[#151926] border-border/10 p-6">
          <div className="mb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-primary" />
              Evaluation History
            </CardTitle>
          </div>
          <div className="h-[300px] w-full min-h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" minHeight={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop
                        offset="5%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0.3}
                      />
                      <stop
                        offset="95%"
                        stopColor="hsl(var(--primary))"
                        stopOpacity={0}
                      />
                    </linearGradient>
                  </defs>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="#1f2937"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="name"
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#6b7280"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value: number) => `${value}`}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#0f131e",
                      border: "1px solid #1f2937",
                      borderRadius: "8px",
                    }}
                    itemStyle={{ color: "#fff" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="score"
                    stroke="hsl(var(--primary))"
                    fillOpacity={1}
                    fill="url(#colorScore)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
                No evaluation data to display.
              </div>
            )}
          </div>
        </Card>

        <Card className="rounded-2xl bg-[#151926] border-border/10 p-6">
          <div className="mb-4">
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Zap className="h-5 w-5 text-secondary" />
              Actual Evaluation Logs
            </CardTitle>
          </div>
          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
            {rows.length > 0 ? (
              rows.map(({ submission, evaluation }) => (
                <div
                  key={submission._id}
                  className="flex items-center justify-between p-3 rounded-xl bg-[#0f131e] border border-border/5"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Sparkles className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium line-clamp-1">
                        {submission.title}
                      </p>
                      <p className="text-[10px] text-muted-foreground">
                        {submission.evaluationStatus}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-emerald-400">
                      {evaluation?.effectiveTotal.toFixed(1) || "—"}
                    </p>
                    <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
                      {evaluation ? "Success" : "Pending"}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-10 text-sm text-muted-foreground">
                No submissions found.
              </div>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
}
