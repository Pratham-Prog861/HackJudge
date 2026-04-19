import { v } from "convex/values";

export const CATEGORIES = ["web", "ai", "data-science", "mobile"] as const;
export const EVALUATION_STATUSES = [
  "pending",
  "completed",
  "fallback",
  "failed",
] as const;

export const categoryValidator = v.union(
  v.literal("web"),
  v.literal("ai"),
  v.literal("data-science"),
  v.literal("mobile"),
);

export const evaluationStatusValidator = v.union(
  v.literal("pending"),
  v.literal("completed"),
  v.literal("fallback"),
  v.literal("failed"),
);

export const scoreValidator = v.object({
  innovation: v.number(),
  uiUx: v.number(),
  codeQuality: v.number(),
  problemSolving: v.number(),
  completeness: v.number(),
});

export type ScoreShape = {
  innovation: number;
  uiUx: number;
  codeQuality: number;
  problemSolving: number;
  completeness: number;
};

export function computeTotal(scores: ScoreShape): number {
  return (
    scores.innovation +
    scores.uiUx +
    scores.codeQuality +
    scores.problemSolving +
    scores.completeness
  );
}

export function clampScore(value: number): number {
  if (!Number.isFinite(value)) return 0;
  return Math.max(0, Math.min(20, Math.round(value * 10) / 10));
}

export function normalizeScores(input: Partial<ScoreShape>): ScoreShape {
  return {
    innovation: clampScore(input.innovation ?? 0),
    uiUx: clampScore(input.uiUx ?? 0),
    codeQuality: clampScore(input.codeQuality ?? 0),
    problemSolving: clampScore(input.problemSolving ?? 0),
    completeness: clampScore(input.completeness ?? 0),
  };
}

export function parseAdminAllowlist(): Set<string> {
  const raw = process.env.ADMIN_ALLOWLIST ?? "";
  return new Set(
    raw
      .split(",")
      .map((value) => value.trim().toLowerCase())
      .filter(Boolean),
  );
}

export function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}
