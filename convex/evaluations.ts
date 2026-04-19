import { v } from "convex/values";
import { action, mutation, query } from "./_generated/server";
import { api } from "./_generated/api";
import { scoreValidator, normalizeScores, computeTotal } from "./domain";

type GeminiResponse = {
  candidates?: Array<{
    content?: {
      parts?: Array<{
        text?: string;
      }>;
    };
  }>;
};

function parseGithubRepo(url: string): { owner: string; repo: string } | null {
  try {
    const parsed = new URL(url);
    if (parsed.hostname !== "github.com") {
      return null;
    }
    const parts = parsed.pathname.split("/").filter(Boolean);
    if (parts.length < 2) {
      return null;
    }
    return {
      owner: parts[0],
      repo: parts[1].replace(/\.git$/, ""),
    };
  } catch {
    return null;
  }
}

async function tryFetchReadme(githubUrl: string): Promise<string> {
  const repo = parseGithubRepo(githubUrl);
  if (!repo) {
    return "README unavailable: URL is not a GitHub repository link.";
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${repo.owner}/${repo.repo}/readme`,
      {
        headers: {
          Accept: "application/vnd.github.raw+json",
          "User-Agent": "HackJudge",
        },
      },
    );

    if (!response.ok) {
      return "README unavailable: repository does not expose a readable README.";
    }

    const text = await response.text();
    return text.slice(0, 6000);
  } catch {
    return "README unavailable: failed to fetch from GitHub.";
  }
}

function fallbackEvaluation(reason: string) {
  const scores = normalizeScores({
    innovation: 12,
    uiUx: 12,
    codeQuality: 12,
    problemSolving: 12,
    completeness: 12,
  });

  return {
    source: "mock" as const,
    scores,
    total: computeTotal(scores),
    feedback:
      `Automatic fallback evaluation was used. ${reason} ` +
      "This score keeps the submission visible while waiting for a richer review.",
    status: "fallback" as const,
  };
}

export const getSubmissionForEvaluation = query({
  args: {
    submissionId: v.id("submissions"),
  },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.submissionId);
  },
});

export const applyEvaluationResult = mutation({
  args: {
    submissionId: v.id("submissions"),
    source: v.union(v.literal("gemini"), v.literal("mock")),
    status: v.union(
      v.literal("completed"),
      v.literal("fallback"),
      v.literal("failed"),
    ),
    scores: scoreValidator,
    total: v.number(),
    feedback: v.string(),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.db.get(args.submissionId);
    if (!submission) {
      throw new Error("Submission not found.");
    }

    const now = Date.now();
    const evaluationId = await ctx.db.insert("evaluations", {
      submissionId: submission._id,
      source: args.source,
      aiScores: args.scores,
      aiTotal: args.total,
      aiFeedback: args.feedback,
      effectiveScores: args.scores,
      effectiveTotal: args.total,
      effectiveFeedback: args.feedback,
      createdAt: now,
      updatedAt: now,
    });

    await ctx.db.patch(submission._id, {
      latestEvaluationId: evaluationId,
      evaluationStatus: args.status,
      updatedAt: now,
    });

    return evaluationId;
  },
});

async function runGeminiEvaluation(input: {
  title: string;
  description: string;
  category: string;
  githubUrl: string;
  readme: string;
}) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return fallbackEvaluation("GEMINI_API_KEY is missing.");
  }

  const prompt = [
    "You are an expert hackathon judge.",
    "Score each criterion from 0 to 20 (decimals allowed).",
    "Return strict JSON only with keys:",
    "innovation, uiUx, codeQuality, problemSolving, completeness, total, feedback",
    `Title: ${input.title}`,
    `Category: ${input.category}`,
    `Description: ${input.description}`,
    `GitHub URL: ${input.githubUrl}`,
    "README content:",
    input.readme,
  ].join("\n\n");

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          responseMimeType: "application/json",
        },
      }),
    },
  );

  if (!response.ok) {
    return fallbackEvaluation(
      `Gemini request failed with status ${response.status}.`,
    );
  }

  const data = (await response.json()) as GeminiResponse;
  const text =
    data?.candidates?.[0]?.content?.parts?.[0]?.text ??
    data?.candidates?.[0]?.content?.parts
      ?.map((part) => part?.text ?? "")
      .join("\n") ??
    "";

  if (!text) {
    return fallbackEvaluation("Gemini response was empty.");
  }

  try {
    const parsed = JSON.parse(text);
    const scores = normalizeScores({
      innovation: parsed.innovation,
      uiUx: parsed.uiUx,
      codeQuality: parsed.codeQuality,
      problemSolving: parsed.problemSolving,
      completeness: parsed.completeness,
    });

    const total = computeTotal(scores);
    return {
      source: "gemini" as const,
      scores,
      total,
      feedback:
        typeof parsed.feedback === "string"
          ? parsed.feedback.slice(0, 2000)
          : "Evaluation generated successfully.",
      status: "completed" as const,
    };
  } catch {
    return fallbackEvaluation("Failed to parse Gemini JSON response.");
  }
}

export const evaluateSubmission = action({
  args: {
    submissionId: v.id("submissions"),
  },
  handler: async (ctx, args) => {
    const submission = await ctx.runQuery(
      api.evaluations.getSubmissionForEvaluation,
      { submissionId: args.submissionId },
    );

    if (!submission) {
      return null;
    }

    const readme = await tryFetchReadme(submission.githubUrl);
    const result = await runGeminiEvaluation({
      title: submission.title,
      description: submission.description,
      category: submission.category,
      githubUrl: submission.githubUrl,
      readme,
    });

    await ctx.runMutation(api.evaluations.applyEvaluationResult, {
      submissionId: submission._id,
      source: result.source,
      status: result.status,
      scores: result.scores,
      total: result.total,
      feedback: result.feedback,
    });

    return result;
  },
});
