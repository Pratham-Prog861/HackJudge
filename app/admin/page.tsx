"use client";

import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { scoreKeys, scoreLabels, type ScoreShape } from "@/lib/hackjudge";
import { Id } from "@/convex/_generated/dataModel";
import { useToast } from "@/components/toast-provider";
import { Shield, Terminal, Code2, Loader, Save, XCircle } from "lucide-react";

const blankScores: ScoreShape = {
  innovation: 12,
  uiUx: 12,
  codeQuality: 12,
  problemSolving: 12,
  completeness: 12,
};

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
      await adjustEvaluation({
        submissionId: active,
        scores,
        feedback,
      });
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
      <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
        <p className="font-mono text-sm text-muted-foreground">
          <Loader className="mr-2 inline h-4 w-4 animate-spin" />
          Loading admin access...
        </p>
      </div>
    );
  }

  if (!me?.isAdmin) {
    return (
      <div className="rounded-none border-2 border-destructive/50 bg-destructive/10">
        <div className="border-b border-destructive/30 bg-destructive/20 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-destructive">
            <XCircle className="h-3.5 w-3.5" />
            <span>[access-denied]</span>
          </div>
        </div>
        <div className="p-5">
          <CardTitle className="text-destructive">
            Admin access required
          </CardTitle>
          <CardDescription>
            Your account is signed in but not on the admin allowlist.
          </CardDescription>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Shield className="h-3.5 w-3.5" />
            <span>[admin]</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-terminal-amber/30 bg-terminal-amber/10">
              <Shield className="h-5 w-5 text-terminal-amber" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Review &amp; <span className="text-terminal-amber">adjust</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                $ Override scores, preserve original AI results for audit.
              </p>
            </div>
          </div>
        </div>
      </section>

      {status && (
        <div className="rounded border border-terminal-green/50 bg-terminal-green/10 p-3">
          <p className="font-mono text-sm text-terminal-green">{status}</p>
        </div>
      )}

      {active && (
        <Card className="rounded-none border-2 border-terminal-amber/50 bg-terminal-amber/5">
          <div className="border-b border-terminal-amber/30 bg-terminal-amber/10 px-4 py-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 font-mono text-xs text-terminal-amber">
                <Terminal className="h-3.5 w-3.5" />
                <span>[override-scores]</span>
              </div>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => setActive(null)}
                className="h-6 w-6 p-0"
              >
                <XCircle className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="p-5">
            <CardDescription className="mb-4">
              Adjust criterion scores and feedback for the selected submission.
            </CardDescription>
            <form className="space-y-4" onSubmit={onSubmit}>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {scoreKeys.map((key) => (
                  <label key={key} className="space-y-1.5">
                    <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                      {key}
                    </span>
                    <Input
                      type="number"
                      min={0}
                      max={20}
                      step={0.1}
                      value={scores[key]}
                      onChange={(event) =>
                        setScores((current) => ({
                          ...current,
                          [key]: Number(event.target.value),
                        }))
                      }
                      className="font-mono"
                    />
                  </label>
                ))}
              </div>
              <label className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  feedback
                </span>
                <Textarea
                  value={feedback}
                  onChange={(event) => setFeedback(event.target.value)}
                  className="font-mono min-h-[80px]"
                />
              </label>
              <div className="flex gap-2">
                <Button type="submit" className="font-mono">
                  <Save className="mr-2 h-4 w-4" />
                  <span className="text-terminal-green">$</span> save
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  onClick={() => setActive(null)}
                  className="font-mono"
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  cancel
                </Button>
              </div>
            </form>
          </div>
        </Card>
      )}

      {!rows && (
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <p className="font-mono text-sm text-muted-foreground">
            <Loader className="mr-2 inline h-4 w-4 animate-spin" />
            Loading submissions...
          </p>
        </div>
      )}
      <div className="grid gap-3">
        {rows?.map((row) => (
          <Card
            key={row.submission._id}
            className="rounded-none border-2 border-border/80 bg-card/60"
          >
            <div className="border-b border-border/50 bg-card/40 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>
                    [{row.submission.title.toLowerCase().replace(/\s+/g, "-")}]
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <CardTitle>{row.submission.title}</CardTitle>
                  <CardDescription className="font-mono text-xs">
                    {row.owner?.name ?? row.owner?.email ?? "Unknown user"} •{" "}
                    {row.submission.category}
                  </CardDescription>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    effective_total
                  </p>
                  <p className="text-2xl font-black">
                    {(row.evaluation?.effectiveTotal ?? 0).toFixed(1)}
                  </p>
                </div>
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground border-l-2 border-border/50 pl-3">
                {row.submission.description}
              </p>
              <div className="mt-3">
                <Button
                  size="sm"
                  onClick={() => startEdit(row)}
                  className="font-mono text-xs"
                >
                  <span className="text-terminal-amber">$</span> adjust-score
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
