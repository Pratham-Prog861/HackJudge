"use client";

import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Crown, Loader2, Medal, Trophy } from "lucide-react";
import { categories, categoryLabels, type Category } from "@/lib/hackjudge";
import { cn } from "@/lib/utils";

const tabs = ["Active Season", "Hall of Fame", "Archive"] as const;

const podiumColors = [
  "from-amber-400/25 to-amber-700/8",
  "from-slate-300/20 to-slate-500/8",
  "from-orange-400/22 to-orange-700/8",
] as const;

const podiumIcons = [
  <Crown key="g" className="h-5 w-5 text-amber-300" />,
  <Medal key="s" className="h-5 w-5 text-slate-300" />,
  <Medal key="b" className="h-5 w-5 text-orange-300" />,
];

export default function LeaderboardPage() {
  const [category, setCategory] = useState<Category | "all">("all");
  const [activeTab, setActiveTab] = useState<string>("Active Season");
  const rows = useQuery(api.leaderboard.listLeaderboard, { category });

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl bg-[#151926] p-6 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">Leaderboard</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Rankings include AI scores plus approved admin overrides.
        </p>
      </section>

      {/* Tabs */}
      <div className="flex gap-1 rounded-xl bg-[#0f131e] p-1">
        {tabs.map((tab) => (
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

      {/* Category filters */}
      <div className="flex flex-wrap gap-2">
        <Button
          size="sm"
          variant={category === "all" ? "default" : "outline"}
          onClick={() => setCategory("all")}
          className={cn(
            "text-xs",
            category === "all" && "bg-gradient-to-r from-primary to-[#8d98ff]",
          )}
        >
          All
        </Button>
        {categories.map((item) => (
          <Button
            key={item}
            size="sm"
            variant={category === item ? "default" : "outline"}
            onClick={() => setCategory(item)}
            className={cn(
              "text-xs border-border/30",
              category === item && "bg-gradient-to-r from-primary to-[#8d98ff]",
            )}
          >
            {categoryLabels[item]}
          </Button>
        ))}
      </div>

      {/* Loading */}
      {!rows && (
        <div className="rounded-2xl bg-[#151926] p-5 text-sm text-muted-foreground">
          <Loader2 className="mr-2 inline h-4 w-4 animate-spin" />
          Loading leaderboard...
        </div>
      )}

      {rows && rows.length === 0 && (
        <div className="rounded-2xl bg-[#151926] p-6 text-center text-sm text-muted-foreground">
          No ranked submissions yet. Scores will appear here after evaluation
          completes.
        </div>
      )}

      {/* Rankings */}
      <div className="space-y-3">
        {rows?.map((row, index) => (
          <article
            key={row.submission._id}
            className="rounded-2xl bg-[#151926] overflow-hidden transition-colors hover:bg-[#1a1f2d]"
          >
            {/* Header band */}
            <div
              className={cn(
                "flex items-center justify-between gap-4 px-5 py-4",
                index < 3
                  ? `bg-gradient-to-r ${podiumColors[index]}`
                  : "bg-[#0f131e]/50",
              )}
            >
              <div className="flex items-center gap-4">
                {/* Rank */}
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#0a0e18]/60">
                  {index < 3 ? (
                    podiumIcons[index]
                  ) : (
                    <span className="text-sm font-semibold text-muted-foreground">
                      #{index + 1}
                    </span>
                  )}
                </div>
                <div>
                  <h3 className="text-base font-semibold">
                    {row.submission.title}
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    {categoryLabels[row.submission.category]}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-primary">
                  {(row.evaluation?.effectiveTotal ?? 0).toFixed(0)}
                </p>
                <p className="text-[10px] tracking-wider text-muted-foreground uppercase">
                  Score
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
              <div className="flex items-center gap-3">
                <p className="text-sm text-muted-foreground">
                  {row.owner?.name ?? row.owner?.email ?? "Anonymous"}
                </p>
                <Badge className="bg-muted/50 text-muted-foreground border-border/30 text-[10px]">
                  {row.submission.evaluationStatus}
                </Badge>
              </div>

              {index < 3 && (
                <span className="inline-flex items-center gap-1 text-xs text-amber-200/80">
                  <Trophy className="h-3 w-3" />
                  {index === 0
                    ? "Gold Tier"
                    : index === 1
                      ? "Silver Tier"
                      : "Bronze Tier"}
                </span>
              )}
            </div>

            {row.evaluation?.effectiveFeedback && (
              <div className="border-t border-border/10 px-5 py-3">
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {row.evaluation.effectiveFeedback}
                </p>
              </div>
            )}
          </article>
        ))}
      </div>

      {rows && rows.length > 0 && (
        <p className="text-center text-xs text-muted-foreground">
          Showing top {rows.length} projects in current season
        </p>
      )}
    </div>
  );
}
