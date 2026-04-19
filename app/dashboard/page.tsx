"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { categoryLabels, scoreKeys, scoreLabels } from "@/lib/hackjudge";
import {
  Code2,
  User,
  FileCode,
  CheckCircle,
  XCircle,
  Loader,
} from "lucide-react";

function statusTone(status: string) {
  if (status === "completed")
    return "border-terminal-green/50 bg-terminal-green/10 text-terminal-green";
  if (status === "fallback")
    return "border-terminal-amber/50 bg-terminal-amber/10 text-terminal-amber";
  if (status === "failed")
    return "border-destructive/50 bg-destructive/10 text-destructive";
  return "border-primary/50 bg-primary/10 text-primary";
}

function StatusIcon({ status }: { status: string }) {
  if (status === "completed")
    return <CheckCircle className="h-4 w-4 text-terminal-green" />;
  if (status === "failed")
    return <XCircle className="h-4 w-4 text-destructive" />;
  if (status === "fallback")
    return <Loader className="h-4 w-4 text-terminal-amber" />;
  return <Loader className="h-4 w-4 animate-spin text-primary" />;
}

export default function DashboardPage() {
  const me = useQuery(api.users.getCurrentUser, {});
  const rows = useQuery(api.submissions.listMySubmissions, {});

  return (
    <div className="space-y-6">
      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <User className="h-3.5 w-3.5" />
            <span>[dashboard]</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-border/60 bg-background">
              <User className="h-5 w-5 text-muted-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Welcome back
                <span className="text-primary">
                  {me?.name ? `, ${me.name}` : ""}
                </span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                &gt;_ Track your submissions and review AI score breakdowns.
              </p>
            </div>
          </div>
        </div>
      </section>

      {!rows && (
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <p className="font-mono text-sm text-muted-foreground">
            <Loader className="mr-2 inline h-4 w-4 animate-spin" />
            Loading your submissions...
          </p>
        </div>
      )}
      {rows && rows.length === 0 && (
        <div className="rounded-none border-2 border-border/80 bg-card/60">
          <div className="border-b border-border/50 bg-card/40 px-4 py-2">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <FileCode className="h-3.5 w-3.5" />
              <span>[empty]</span>
            </div>
          </div>
          <div className="p-5">
            <CardTitle>No submissions yet</CardTitle>
            <CardDescription>
              Create your first hack project entry in the Submit page.
            </CardDescription>
          </div>
        </div>
      )}

      <div className="grid gap-4">
        {rows?.map(({ submission, evaluation }) => (
          <Card
            key={submission._id}
            className="rounded-none border-2 border-border/80 bg-card/60"
          >
            <div className="border-b border-border/50 bg-card/40 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>
                    [{submission.title.toLowerCase().replace(/\s+/g, "-")}]
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <StatusIcon status={submission.evaluationStatus} />
                  <Badge className={statusTone(submission.evaluationStatus)}>
                    {submission.evaluationStatus}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="p-5 space-y-4">
              <div>
                <CardTitle className="text-xl">{submission.title}</CardTitle>
                <CardDescription className="mt-1">
                  {categoryLabels[submission.category]} •{" "}
                  {new Date(submission.createdAt).toLocaleDateString()}
                </CardDescription>
              </div>

              <p className="font-mono text-sm text-muted-foreground border-l-2 border-border/50 pl-3">
                {submission.description}
              </p>

              {evaluation ? (
                <div className="space-y-3">
                  <div className="rounded border-2 border-terminal-green/30 bg-terminal-green/5 p-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-wider text-terminal-green">
                        effective_total
                      </p>
                      <p className="text-3xl font-black text-terminal-green">
                        {evaluation.effectiveTotal.toFixed(1)}
                        <span className="text-sm font-normal text-muted-foreground">
                          /100
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                    {scoreKeys.map((key) => (
                      <div
                        key={key}
                        className="rounded border border-border/60 bg-background/50 p-3"
                      >
                        <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                          {key}
                        </p>
                        <p className="text-xl font-bold">
                          {evaluation.effectiveScores[key].toFixed(1)}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="rounded border border-border/60 bg-background/50 p-3">
                    <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground mb-1">
                      ai_feedback
                    </p>
                    <p className="text-sm text-foreground/90 leading-relaxed">
                      {evaluation.effectiveFeedback}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="rounded border border-border/60 bg-background/50 p-3">
                  <p className="font-mono text-sm text-muted-foreground">
                    <Loader className="mr-2 inline h-4 w-4 animate-spin" />
                    Evaluation pending. This usually completes in a few moments.
                  </p>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
