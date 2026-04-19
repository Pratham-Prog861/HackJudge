import { v } from "convex/values";
import { query } from "./_generated/server";
import { categoryValidator } from "./domain";

export const listLeaderboard = query({
  args: {
    category: v.optional(v.union(categoryValidator, v.literal("all"))),
  },
  handler: async (ctx, args) => {
    const submissions = await ctx.db.query("submissions").collect();

    const completed = submissions.filter((submission) => {
      if (!submission.latestEvaluationId) return false;
      if (
        submission.evaluationStatus !== "completed" &&
        submission.evaluationStatus !== "fallback"
      ) {
        return false;
      }
      if (!args.category || args.category === "all") return true;
      return submission.category === args.category;
    });

    const rows = await Promise.all(
      completed.map(async (submission) => {
        const evaluation = submission.latestEvaluationId
          ? await ctx.db.get(submission.latestEvaluationId)
          : null;
        const owner = await ctx.db.get(submission.userId);

        return {
          submission,
          evaluation,
          owner,
        };
      }),
    );

    return rows
      .filter((row) => !!row.evaluation)
      .sort(
        (a, b) =>
          (b.evaluation?.effectiveTotal ?? 0) -
          (a.evaluation?.effectiveTotal ?? 0),
      );
  },
});
