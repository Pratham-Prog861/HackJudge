export const categories = ["web", "ai", "data-science", "mobile"] as const;
export type Category = (typeof categories)[number];

export const categoryLabels: Record<Category, string> = {
  web: "Web",
  ai: "AI",
  "data-science": "Data Science",
  mobile: "Mobile",
};

export type EvaluationStatus = "pending" | "completed" | "fallback" | "failed";

export type ScoreShape = {
  innovation: number;
  uiUx: number;
  codeQuality: number;
  problemSolving: number;
  completeness: number;
};

export const scoreKeys: Array<keyof ScoreShape> = [
  "innovation",
  "uiUx",
  "codeQuality",
  "problemSolving",
  "completeness",
];

export const scoreLabels: Record<keyof ScoreShape, string> = {
  innovation: "Innovation",
  uiUx: "UI/UX",
  codeQuality: "Code Quality",
  problemSolving: "Problem Solving",
  completeness: "Completeness",
};

export function isValidUrl(value: string): boolean {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

export function asScoreShape(input: Partial<ScoreShape>): ScoreShape {
  return {
    innovation: Number(input.innovation ?? 0),
    uiUx: Number(input.uiUx ?? 0),
    codeQuality: Number(input.codeQuality ?? 0),
    problemSolving: Number(input.problemSolving ?? 0),
    completeness: Number(input.completeness ?? 0),
  };
}
