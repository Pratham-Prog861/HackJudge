"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trophy, Terminal, Code2, Loader, Crown } from "lucide-react";
import { categories, categoryLabels, type Category } from "@/lib/hackjudge";

const topTone = [
  "border-terminal-green/50 bg-terminal-green/10",
  "border-terminal-amber/50 bg-terminal-amber/10",
  "border-amber-700/50 bg-amber-700/10",
] as const;

export default function LeaderboardPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const rows = useQuery(api.leaderboard.listLeaderboard, {
    category,
  });

  return (
    <div className="space-y-6">
      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Trophy className="h-3.5 w-3.5" />
            <span>[leaderboard]</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-terminal-amber/30 bg-terminal-amber/10">
              <Crown className="h-5 w-5 text-terminal-amber" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Top <span className="text-terminal-amber">submissions</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                &gt;_ Scores use effective total (AI + admin override).
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={category === "all" ? "default" : "outline"}
          onClick={() => setCategory("all")}
          className="font-mono text-xs"
        >
          [all]
        </Button>
        {categories.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={category === item ? "default" : "outline"}
            onClick={() => setCategory(item)}
            className="font-mono text-xs"
          >
            [{categoryLabels[item].toLowerCase()}]
          </Button>
        ))}
      </div>

      {!rows && (
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <p className="font-mono text-sm text-muted-foreground">
            <Loader className="mr-2 inline h-4 w-4 animate-spin" />
            Loading leaderboard...
          </p>
        </div>
      )}
      {rows && rows.length === 0 && (
        <div className="rounded-none border-2 border-border/80 bg-card/60">
          <div className="border-b border-border/50 bg-card/40 px-4 py-2">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Terminal className="h-3.5 w-3.5" />
              <span>[empty]</span>
            </div>
          </div>
          <div className="p-5">
            <p className="font-mono text-sm text-muted-foreground">
              No ranked submissions yet. New projects will appear here after
              evaluation completes.
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {rows?.map((row, index) => (
          <div
            key={row.submission._id}
            className={`rounded-none border-2 bg-card/60 ${
              index < 3 ? topTone[index] : "border-border/80"
            }`}
          >
            <div className="border-b border-border/50 bg-card/40 px-4 py-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <Code2 className="h-3.5 w-3.5" />
                  <span>
                    [{row.submission.title.toLowerCase().replace(/\s+/g, "-")}]
                  </span>
                </div>
                <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
                  <span className={index === 0 ? "text-terminal-amber" : ""}>
                    #{index + 1}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold">{row.submission.title}</h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    {row.owner?.name ?? row.owner?.email ?? "Anonymous"} •{" "}
                    {categoryLabels[row.submission.category]}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                    score
                  </p>
                  <p className="text-3xl font-black text-primary">
                    {(row.evaluation?.effectiveTotal ?? 0).toFixed(1)}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex items-start gap-2">
                <Badge className="text-xs font-mono">
                  {row.submission.evaluationStatus}
                </Badge>
                <p className="font-mono text-xs text-muted-foreground line-clamp-2">
                  {row.evaluation?.effectiveFeedback}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
