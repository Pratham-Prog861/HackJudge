"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { categoryLabels, scoreKeys } from "@/lib/hackjudge";
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  UserRound,
  XCircle,
  ArrowRight,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";

function statusTone(status: string) {
  if (status === "completed")
    return "bg-emerald-500/15 text-emerald-300 border-emerald-400/25";
  if (status === "fallback")
    return "bg-amber-500/15 text-amber-300 border-amber-400/25";
  if (status === "failed")
    return "bg-rose-500/15 text-rose-300 border-rose-400/25";
  return "bg-primary/20 text-primary border-primary/30";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "completed")
    return <CheckCircle2 className="h-4 w-4 text-emerald-300" />;
  if (status === "failed") return <XCircle className="h-4 w-4 text-rose-300" />;
  return <Loader2 className="h-4 w-4 animate-spin text-primary" />;
}

export default function DashboardPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const rows = useQuery(api.submissions.listMySubmissions, {});

  const totalPoints =
    rows?.reduce((sum, r) => sum + (r.evaluation?.effectiveTotal ?? 0), 0) ?? 0;

  return (
    <div className="space-y-6">
      {/* Welcome header */}
      <section className="rounded-2xl bg-[#151926] p-6 sm:p-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              Welcome back
              {me?.name ? `, ${me.name}` : ", Architect"}
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              You have {rows?.length ?? 0} project
              {(rows?.length ?? 0) !== 1 ? "s" : ""} currently under evaluation.
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-[#0f131e] px-3 py-2">
            <UserRound className="h-4 w-4 text-secondary" />
            <span className="text-sm text-muted-foreground">
              {me?.email ?? "Signed in"}
            </span>
          </div>
        </div>
      </section>

      {/* Stats & CTA Row */}
      <div className="grid gap-5 md:grid-cols-2">
        {/* Current Progress */}
        <div className="rounded-2xl bg-[#151926] p-6">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            Current Progress
          </p>
          <div className="mt-4 flex items-end gap-3">
            <p className="text-5xl font-semibold text-foreground">
              {totalPoints.toFixed(0)}
            </p>
            <p className="mb-1 text-sm text-muted-foreground">
              Total Points Earned
            </p>
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs text-emerald-400">
            <TrendingUp className="h-3.5 w-3.5" />
            Across {rows?.length ?? 0} submissions
          </div>
        </div>

        {/* Ready to ship CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-[#151926] to-secondary/10 p-6">
          <Sparkles className="h-5 w-5 text-secondary" />
          <h3 className="mt-3 text-lg font-semibold">Ready to ship?</h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Submit your latest build for AI-powered architectural review and
            score generation.
          </p>
          <Link href="/submit" className="mt-5 inline-flex">
            <Button
              size="sm"
              className="bg-gradient-to-r from-primary to-[#8d98ff] text-xs font-medium"
            >
              Submit Project
              <ArrowRight className="ml-1 h-3.5 w-3.5" />
            </Button>
          </Link>
        </div>
      </div>

      {/* Submissions List */}
      <section>
        <h2 className="mb-4 text-lg font-semibold">My Submissions</h2>

        {!rows && (
          <div className="rounded-2xl bg-[#151926] p-5 text-sm text-muted-foreground">
            <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
            Loading your submissions...
          </div>
        )}

        {rows && rows.length === 0 && (
          <div className="rounded-2xl bg-[#151926] p-6 text-center">
            <p className="text-sm text-muted-foreground">
              No submissions yet. Head to the Projects page to create your first
              entry.
            </p>
          </div>
        )}

        <div className="space-y-3">
          {rows?.map(({ submission, evaluation }) => (
            <article
              key={submission._id}
              className="rounded-2xl bg-[#151926] p-5 transition-colors hover:bg-[#1a1f2d]"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-muted-foreground">
                    {categoryLabels[submission.category]}
                  </p>
                  <h3 className="mt-1 text-base font-semibold">
                    {submission.title}
                  </h3>
                  <p className="mt-1 line-clamp-1 text-sm text-muted-foreground">
                    {submission.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground uppercase tracking-widest">
                    Judge Score
                  </p>
                  {evaluation ? (
                    <p className="mt-1 text-2xl font-semibold text-primary">
                      {evaluation.effectiveTotal.toFixed(0)}
                      <span className="text-sm text-muted-foreground">
                        /100
                      </span>
                    </p>
                  ) : (
                    <p className="mt-1 text-2xl font-semibold text-muted-foreground">
                      —
                    </p>
                  )}
                </div>
              </div>

              <div className="mt-3 flex items-center gap-2">
                <StatusIcon status={submission.evaluationStatus} />
                <Badge className={statusTone(submission.evaluationStatus)}>
                  {submission.evaluationStatus}
                </Badge>
              </div>

              {evaluation && (
                <div className="mt-4 space-y-3">
                  <div className="grid gap-2 sm:grid-cols-3 lg:grid-cols-5">
                    {scoreKeys.map((key) => (
                      <div key={key} className="rounded-xl bg-[#0f131e] p-3">
                        <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                          {key}
                        </p>
                        <p className="mt-1 text-lg font-semibold">
                          {evaluation.effectiveScores[key].toFixed(1)}
                        </p>
                      </div>
                    ))}
                  </div>
                  <div className="rounded-xl bg-[#0f131e] p-4">
                    <p className="mb-1 inline-flex items-center gap-2 text-[10px] tracking-wider text-muted-foreground uppercase">
                      <Sparkles className="h-3 w-3 text-secondary" />
                      AI Feedback
                    </p>
                    <p className="text-sm leading-relaxed text-foreground/90">
                      {evaluation.effectiveFeedback}
                    </p>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>
      </section>
    </div>
  );
}
