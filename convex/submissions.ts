import { v } from "convex/values";
import { mutation, query, type MutationCtx } from "./_generated/server";
import { api } from "./_generated/api";
import {
  categoryValidator,
  evaluationStatusValidator,
  isValidUrl,
  parseAdminAllowlist,
} from "./domain";

async function ensureCurrentUser(ctx: MutationCtx) {
  const identity = await ctx.auth.getUserIdentity();
  if (!identity) {
    throw new Error("You must be signed in.");
  }

  const email = identity.email?.toLowerCase() ?? null;
  const allowlist = parseAdminAllowlist();
  const isAdmin = email ? allowlist.has(email) : false;

  const existing = await ctx.db
    .query("users")
    .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
    .unique();

  const now = Date.now();
  if (existing) {
    await ctx.db.patch(existing._id, {
      email,
      name: identity.name ?? null,
      imageUrl: identity.pictureUrl ?? null,
      isAdmin,
      updatedAt: now,
    });
    return existing;
  }

  const userId = await ctx.db.insert("users", {
    clerkId: identity.subject,
    email,
    name: identity.name ?? null,
    imageUrl: identity.pictureUrl ?? null,
    isAdmin,
    createdAt: now,
    updatedAt: now,
  });

  const user = await ctx.db.get(userId);
  if (!user) {
    throw new Error("Failed to create user record.");
  }
  return user;
}

export const createSubmission = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    githubUrl: v.string(),
    demoUrl: v.optional(v.string()),
    category: categoryValidator,
  },
  handler: async (ctx, args) => {
    const user = await ensureCurrentUser(ctx);

    if (args.title.trim().length < 3) {
      throw new Error("Title must be at least 3 characters.");
    }
    if (args.description.trim().length < 20) {
      throw new Error("Description must be at least 20 characters.");
    }
    if (!isValidUrl(args.githubUrl)) {
      throw new Error("GitHub URL is invalid.");
    }
    if (args.demoUrl && !isValidUrl(args.demoUrl)) {
      throw new Error("Demo URL is invalid.");
    }

    const existing = await ctx.db
      .query("submissions")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    if (existing.length >= 3) {
      throw new Error(
        "Submission limit reached. HackJudge allows up to 3 submissions per user.",
      );
    }

    const now = Date.now();
    const submissionId = await ctx.db.insert("submissions", {
      userId: user._id,
      title: args.title.trim(),
      description: args.description.trim(),
      githubUrl: args.githubUrl.trim(),
      demoUrl: args.demoUrl?.trim(),
      category: args.category,
      evaluationStatus: "pending",
      createdAt: now,
      updatedAt: now,
    });

    await ctx.scheduler.runAfter(0, api.evaluations.evaluateSubmission, {
      submissionId,
    });

    return submissionId;
  },
});

export const listMySubmissions = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return [];
    }

    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .order("desc")
      .collect();

    const rows = await Promise.all(
      submissions.map(async (submission) => {
        const evaluation = submission.latestEvaluationId
          ? await ctx.db.get(submission.latestEvaluationId)
          : null;

        return {
          submission,
          evaluation,
        };
      }),
    );

    return rows;
  },
});

export const getMySubmissionCount = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) {
      return 0;
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .unique();

    if (!user) {
      return 0;
    }

    const submissions = await ctx.db
      .query("submissions")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    return submissions.length;
  },
});

export const listByCategoryAndStatus = query({
  args: {
    category: v.optional(categoryValidator),
    status: v.optional(evaluationStatusValidator),
  },
  handler: async (ctx, args) => {
    const all = await ctx.db.query("submissions").collect();
    return all.filter((submission) => {
      const categoryPass = args.category
        ? submission.category === args.category
        : true;
      const statusPass = args.status
        ? submission.evaluationStatus === args.status
        : true;
      return categoryPass && statusPass;
    });
  },
});
