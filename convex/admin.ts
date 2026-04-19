import { v } from "convex/values";
import {
  mutation,
  query,
  type MutationCtx,
  type QueryCtx,
} from "./_generated/server";
import { computeTotal, normalizeScores, scoreValidator } from "./domain";

async function requireAdmin(ctx: MutationCtx | QueryCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("You must be signed in.");
  }

  const user = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  if (!user?.isAdmin) {
    throw new Error("Admin access required.");
  }

  return user;
}

export const listAllSubmissions = query({
  args: {},
  handler: async (ctx) => {
    await requireAdmin(ctx);

    const submissions = await ctx.db
      .query("submissions")
      .order("desc")
      .collect();
    const rows = await Promise.all(
      submissions.map(async (submission) => {
        const evaluation = submission.latestEvaluationId
          ? await ctx.db.get(submission.latestEvaluationId)
          : null;
        const owner = await ctx.db.get(submission.userId);
        return { submission, evaluation, owner };
      }),
    );

    return rows;
  },
});

export const adjustEvaluation = mutation({
  args: {
    submissionId: v.id("submissions"),
    scores: scoreValidator,
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    const adminUser = await requireAdmin(ctx);
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) {
      throw new Error("Submission not found.");
    }

    const now = Date.now();
    const normalized = normalizeScores(args.scores);
    const total = computeTotal(normalized);

    if (!submission.latestEvaluationId) {
      const evaluationId = await ctx.db.insert("evaluations", {
        submissionId: submission._id,
        source: "mock",
        aiScores: normalized,
        aiTotal: total,
        aiFeedback: args.feedback,
        overrideScores: normalized,
        overrideTotal: total,
        overrideFeedback: args.feedback,
        overrideByUserId: adminUser._id,
        overrideUpdatedAt: now,
        effectiveScores: normalized,
        effectiveTotal: total,
        effectiveFeedback: args.feedback,
        createdAt: now,
        updatedAt: now,
      });

      await ctx.db.patch(submission._id, {
        latestEvaluationId: evaluationId,
        evaluationStatus: "completed",
        updatedAt: now,
      });

      return evaluationId;
    }

    await ctx.db.patch(submission.latestEvaluationId, {
      overrideScores: normalized,
      overrideTotal: total,
      overrideFeedback: args.feedback,
      overrideByUserId: adminUser._id,
      overrideUpdatedAt: now,
      effectiveScores: normalized,
      effectiveTotal: total,
      effectiveFeedback: args.feedback,
      updatedAt: now,
    });

    await ctx.db.patch(submission._id, {
      evaluationStatus: "completed",
      updatedAt: now,
    });

    return submission.latestEvaluationId;
  },
});
