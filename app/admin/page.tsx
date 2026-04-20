"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { scoreKeys, type ScoreShape } from "@/lib/hackjudge";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/toast-provider";
import { cn } from "@/lib/utils";
import {
  AlertTriangle,
  BarChart3,
  Eye,
  Flag,
  Loader2,
  Save,
  Shield,
  XCircle,
} from "lucide-react";

const blankScores: ScoreShape = {
  innovation: 12,
  uiUx: 12,
  codeQuality: 12,
  problemSolving: 12,
  completeness: 12,
};

const adminTabs = ["Submissions", "Judges", "Rules"] as const;

export default function AdminPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const rows = useQuery(
    api.admin.listAllSubmissions,
    me?.isAdmin ? {} : "skip",
  );
  const adjustEvaluation = useMutation(api.admin.adjustEvaluation);
  const { toast } = useToast();
  const [active, setActive] = useState<Id<"submissions"> | null>(null);
  const [scores, setScores] = useState<ScoreShape>(blankScores);
  const [feedback, setFeedback] = useState("Manual review adjustment.");
  const [status, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState<string>("Submissions");

  function startEdit(row: NonNullable<typeof rows>[number]) {
    setActive(row.submission._id);
    setScores(row.evaluation?.effectiveScores ?? blankScores);
    setFeedback(
      row.evaluation?.effectiveFeedback ?? "Manual review adjustment.",
    );
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!active) return;
    try {
      await adjustEvaluation({ submissionId: active, scores, feedback });
      setStatus("Evaluation override saved.");
      toast({
        title: "Override saved",
        description: "Leaderboard scores now use your updated values.",
        variant: "success",
      });
      setActive(null);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to save override.";
      setStatus(message);
      toast({ title: "Save failed", description: message, variant: "error" });
    }
  }

  if (me === undefined) {
    return (
      <div className="rounded-2xl bg-[#151926] p-5 text-sm text-muted-foreground">
        <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
        Loading admin access...
      </div>
    );
  }

  if (!me?.isAdmin) {
    return (
      <div className="rounded-2xl bg-rose-500/10 p-6">
        <h2 className="text-lg font-semibold text-rose-300">
          Admin access required
        </h2>
        <p className="mt-1 text-sm text-rose-100/80">
          Your account is signed in but not on the admin allowlist.
        </p>
      </div>
    );
  }

  const totalSubmissions = rows?.length ?? 0;
  const aiProcessed = rows
    ? rows.filter((r) => r.submission.evaluationStatus === "completed").length
    : 0;
  const flaggedEntries = 0;
  const avgScore =
    rows && rows.length > 0
      ? (
          rows.reduce(
            (sum, r) => sum + (r.evaluation?.effectiveTotal ?? 0),
            0,
          ) / rows.length
        ).toFixed(1)
      : "—";

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl bg-[#151926] p-6 sm:p-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Admin Panel
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Real-time judging oversight. Adjust scores, flag entries, or
              override AI decisions manually.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#0f131e] px-3 py-2">
            <Shield className="h-4 w-4 text-amber-300" />
            <span className="text-xs text-muted-foreground">
              Audit-safe override mode
            </span>
          </div>
        </div>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-[#0f131e] p-1">
        {adminTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "flex-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
              activeTab === tab
                ? "bg-[#151926] text-foreground"
                : "text-muted-foreground hover:text-foreground",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-2xl bg-[#151926] p-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Total Submissions
          </p>
          <p className="mt-2 text-3xl font-semibold">{totalSubmissions}</p>
        </div>
        <div className="rounded-2xl bg-[#151926] p-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            AI Processed
          </p>
          <p className="mt-2 text-3xl font-semibold">
            {totalSubmissions > 0
              ? ((aiProcessed / totalSubmissions) * 100).toFixed(1)
              : 0}
            <span className="text-base text-muted-foreground">%</span>
          </p>
        </div>
        <div className="rounded-2xl bg-[#151926] p-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Flagged Entries
          </p>
          <p className="mt-2 text-3xl font-semibold">{flaggedEntries}</p>
        </div>
        <div className="rounded-2xl bg-[#151926] p-5">
          <p className="text-xs tracking-wider text-muted-foreground uppercase">
            Avg. Score
          </p>
          <p className="mt-2 text-3xl font-semibold">{avgScore}</p>
        </div>
      </div>

      {status && (
        <div className="rounded-xl bg-[#0f131e] p-3 text-sm text-muted-foreground">
          {status}
        </div>
      )}

      {/* Override Form */}
      {active && (
        <div className="rounded-2xl bg-[#151926] overflow-hidden">
          <div className="flex items-center justify-between bg-[#0f131e] px-5 py-3">
            <h3 className="text-base font-semibold">Manual Override</h3>
            <button
              onClick={() => setActive(null)}
              className="rounded-lg p-1 text-muted-foreground hover:text-foreground"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
          <form className="space-y-4 p-5" onSubmit={onSubmit}>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {scoreKeys.map((key) => (
                <label key={key} className="space-y-1.5">
                  <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                    {key}
                  </span>
                  <Input
                    type="number"
                    min={0}
                    max={20}
                    step={0.1}
                    value={scores[key]}
                    onChange={(e) =>
                      setScores((c) => ({
                        ...c,
                        [key]: Number(e.target.value),
                      }))
                    }
                    className="bg-[#0a0e18] border-border/20"
                  />
                </label>
              ))}
            </div>
            <label className="block space-y-1.5">
              <span className="text-[10px] tracking-wider text-muted-foreground uppercase">
                Feedback
              </span>
              <Textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="min-h-20 bg-[#0a0e18] border-border/20"
              />
            </label>
            <div className="flex gap-2">
              <Button
                type="submit"
                className="bg-gradient-to-r from-primary to-[#8d98ff] text-xs font-medium"
              >
                <Save className="h-4 w-4" />
                Save Override
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => setActive(null)}
                className="border-border/30 text-xs"
              >
                Cancel
              </Button>
            </div>
          </form>
        </div>
      )}

      {/* Live Judging Queue */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">Live Judging Queue</h2>

        {!rows && (
          <div className="rounded-2xl bg-[#151926] p-5 text-sm text-muted-foreground">
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Loading submissions...
          </div>
        )}

        <div className="space-y-2">
          {rows?.map((row) => (
            <article
              key={row.submission._id}
              className="flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-[#151926] px-5 py-4 transition-colors hover:bg-[#1a1f2d]"
            >
              <div className="flex items-center gap-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0f131e]">
                  <BarChart3 className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold">
                    {row.submission.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {row.owner?.name ?? row.owner?.email ?? "Unknown"} •{" "}
                    {row.submission.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Score
                  </p>
                  <p className="text-xl font-semibold">
                    {(row.evaluation?.effectiveTotal ?? 0).toFixed(1)}
                  </p>
                </div>

                <Badge
                  className={cn(
                    "text-[10px]",
                    row.submission.evaluationStatus === "completed"
                      ? "bg-emerald-500/15 text-emerald-300 border-emerald-400/25"
                      : row.submission.evaluationStatus === "failed"
                        ? "bg-rose-500/15 text-rose-300 border-rose-400/25"
                        : "bg-primary/20 text-primary border-primary/30",
                  )}
                >
                  {row.submission.evaluationStatus}
                </Badge>

                <div className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-border/30 text-[10px]"
                    onClick={() => startEdit(row)}
                  >
                    <Eye className="h-3 w-3" />
                    Review
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 border-border/30 text-[10px]"
                    onClick={() => startEdit(row)}
                  >
                    Override
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {rows && rows.length > 0 && (
          <p className="mt-4 text-center text-xs text-muted-foreground">
            Showing 1-{rows.length} of {rows.length} submissions
          </p>
        )}
      </section>
    </div>
  );
}
