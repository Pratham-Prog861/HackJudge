import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import {
  categoryValidator,
  evaluationStatusValidator,
  scoreValidator,
} from "./domain";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.union(v.string(), v.null()),
    name: v.union(v.string(), v.null()),
    bio: v.optional(v.string()),
    imageUrl: v.union(v.string(), v.null()),
    githubUsername: v.optional(v.string()),
    isAdmin: v.boolean(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_clerkId", ["clerkId"])
    .index("by_email", ["email"]),

  submissions: defineTable({
    userId: v.id("users"),
    title: v.string(),
    description: v.string(),
    githubUrl: v.string(),
    demoUrl: v.optional(v.string()),
    category: categoryValidator,
    evaluationStatus: evaluationStatusValidator,
    latestEvaluationId: v.optional(v.id("evaluations")),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_category", ["category"])
    .index("by_evaluationStatus", ["evaluationStatus"])
    .index("by_category_status", ["category", "evaluationStatus"]),

  evaluations: defineTable({
    submissionId: v.id("submissions"),
    source: v.union(v.literal("gemini"), v.literal("mock")),
    aiScores: scoreValidator,
    aiTotal: v.number(),
    aiFeedback: v.string(),
    overrideScores: v.optional(scoreValidator),
    overrideTotal: v.optional(v.number()),
    overrideFeedback: v.optional(v.string()),
    overrideByUserId: v.optional(v.id("users")),
    overrideUpdatedAt: v.optional(v.number()),
    effectiveScores: scoreValidator,
    effectiveTotal: v.number(),
    effectiveFeedback: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_submissionId", ["submissionId"])
    .index("by_effectiveTotal", ["effectiveTotal"]),
});
