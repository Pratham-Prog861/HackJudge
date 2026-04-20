"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import {
  categories,
  categoryLabels,
  isValidUrl,
  type Category,
} from "@/lib/hackjudge";
import { useToast } from "@/components/toast-provider";
import {
  CheckCircle2,
  FileText,
  Globe,
  Link2,
  Loader2,
  Rocket,
  SendHorizonal,
  Sparkles,
  Timer,
  MessageCircle,
} from "lucide-react";

export default function SubmitPage() {
  const count = useQuery(api.submissions.getMySubmissionCount, {});
  const createSubmission = useMutation(api.submissions.createSubmission);
  const { toast } = useToast();
  const [status, setStatus] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    title: "",
    description: "",
    githubUrl: "",
    demoUrl: "",
    category: "web" as Category,
  });

  const remaining = useMemo(() => Math.max(0, 3 - (count ?? 0)), [count]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");

    if (form.title.trim().length < 3) {
      const message = "Title must be at least 3 characters.";
      setStatus(message);
      toast({
        title: "Validation failed",
        description: message,
        variant: "error",
      });
      return;
    }
    if (form.description.trim().length < 20) {
      const message = "Description must be at least 20 characters.";
      setStatus(message);
      toast({
        title: "Validation failed",
        description: message,
        variant: "error",
      });
      return;
    }
    if (!isValidUrl(form.githubUrl)) {
      const message = "Please provide a valid GitHub URL.";
      setStatus(message);
      toast({
        title: "Validation failed",
        description: message,
        variant: "error",
      });
      return;
    }
    if (form.demoUrl && !isValidUrl(form.demoUrl)) {
      const message = "Demo URL must be a valid URL.";
      setStatus(message);
      toast({
        title: "Validation failed",
        description: message,
        variant: "error",
      });
      return;
    }
    if (remaining <= 0) {
      const message = "Submission cap reached. You can only submit 3 projects.";
      setStatus(message);
      toast({
        title: "Submission limit reached",
        description: message,
        variant: "error",
      });
      return;
    }

    try {
      setIsSubmitting(true);
      await createSubmission({
        title: form.title,
        description: form.description,
        githubUrl: form.githubUrl,
        demoUrl: form.demoUrl || undefined,
        category: form.category,
      });
      setStatus("Submission created. Evaluation is running now.");
      toast({
        title: "Submission created",
        description: "Your project was queued for evaluation.",
        variant: "success",
      });
      setForm({
        title: "",
        description: "",
        githubUrl: "",
        demoUrl: "",
        category: "web",
      });
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Failed to submit.";
      setStatus(message);
      toast({
        title: "Submission failed",
        description: message,
        variant: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <section className="rounded-2xl bg-[#151926] p-6 sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight">
          Submit Project
        </h1>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
          Ready to be judged? Provide your project details below. Our AI engine
          will evaluate your code, UX, and innovation metrics.
        </p>
      </section>

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        {/* Form */}
        <div className="space-y-6">
          <form className="space-y-6" onSubmit={onSubmit}>
            {/* Identity & Context */}
            <div className="rounded-2xl bg-[#151926] p-6">
              <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Identity & Context
              </h2>
              <p className="mt-1 text-xs text-muted-foreground/70">
                Markdown supported • Min 150 characters
              </p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="text-xs tracking-wider text-muted-foreground uppercase">
                    Project Name
                  </span>
                  <Input
                    value={form.title}
                    onChange={(e) =>
                      setForm((c) => ({ ...c, title: e.target.value }))
                    }
                    placeholder="PulseBoard"
                    className="bg-[#0a0e18] border-border/20 focus:border-primary/40"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="text-xs tracking-wider text-muted-foreground uppercase">
                    Category
                  </span>
                  <Select
                    value={form.category}
                    onChange={(e) =>
                      setForm((c) => ({
                        ...c,
                        category: e.target.value as Category,
                      }))
                    }
                    className="bg-[#0a0e18] border-border/20"
                  >
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {categoryLabels[cat]}
                      </option>
                    ))}
                  </Select>
                </label>
              </div>

              <label className="mt-4 block space-y-1.5">
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Description
                </span>
                <Textarea
                  value={form.description}
                  onChange={(e) =>
                    setForm((c) => ({ ...c, description: e.target.value }))
                  }
                  placeholder="Describe the problem, your solution, and what makes it different."
                  className="min-h-32 bg-[#0a0e18] border-border/20 focus:border-primary/40"
                />
              </label>
            </div>

            {/* Technical Assets */}
            <div className="rounded-2xl bg-[#151926] p-6">
              <h2 className="text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                Technical Assets
              </h2>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <label className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-muted-foreground uppercase">
                    <Link2 className="h-3 w-3" /> GitHub URL
                  </span>
                  <Input
                    value={form.githubUrl}
                    onChange={(e) =>
                      setForm((c) => ({ ...c, githubUrl: e.target.value }))
                    }
                    placeholder="https://github.com/you/repo"
                    className="bg-[#0a0e18] border-border/20 focus:border-primary/40"
                  />
                </label>
                <label className="space-y-1.5">
                  <span className="inline-flex items-center gap-1.5 text-xs tracking-wider text-muted-foreground uppercase">
                    <Globe className="h-3 w-3" /> Live Demo URL (optional)
                  </span>
                  <Input
                    value={form.demoUrl}
                    onChange={(e) =>
                      setForm((c) => ({ ...c, demoUrl: e.target.value }))
                    }
                    placeholder="https://your-demo.app"
                    className="bg-[#0a0e18] border-border/20 focus:border-primary/40"
                  />
                </label>
              </div>
            </div>

            {status && (
              <div className="rounded-xl bg-[#0f131e] p-3 text-sm text-muted-foreground">
                {status}
              </div>
            )}

            <div className="flex flex-wrap items-center justify-between gap-3">
              <p className="text-xs text-muted-foreground">
                Remaining attempts:{" "}
                <span className="font-semibold text-secondary">
                  {remaining}
                </span>
              </p>
              <Button
                type="submit"
                disabled={isSubmitting || remaining <= 0}
                className="bg-gradient-to-r from-primary to-[#8d98ff] px-6 text-xs font-medium"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <SendHorizonal className="h-4 w-4" />
                    Submit Project
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>

        {/* Right sidebar — Tips */}
        <div className="space-y-5">
          {/* AI Scoring Tips */}
          <div className="rounded-2xl bg-[#151926] p-5">
            <h3 className="flex items-center gap-2 text-sm font-semibold">
              <Sparkles className="h-4 w-4 text-secondary" />
              AI Scoring Tips
            </h3>
            <div className="mt-4 space-y-3">
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Provide a clear README. Our engine scans for documentation
                  clarity.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Detailed descriptions increase &quot;Innovation Intent&quot; scores by
                  15%.
                </p>
              </div>
              <div className="flex gap-3">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                <p className="text-xs leading-relaxed text-muted-foreground">
                  Ensure your Live URL is responsive. UX judging includes mobile
                  simulation.
                </p>
              </div>
            </div>
          </div>

          {/* Elite Tier */}
          <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-[#151926] to-secondary/10 p-5">
            <div className="flex items-center gap-2">
              <Timer className="h-4 w-4 text-amber-300" />
              <h3 className="text-sm font-semibold">Elite Tier Access</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Submit by Friday to enter the &quot;Featured Showcase&quot; and get 2x
              exposure to sponsors.
            </p>
            <p className="mt-3 text-xs font-semibold text-secondary">
              48 hours remaining
            </p>
          </div>

          {/* Need Help? */}
          <div className="rounded-2xl bg-[#151926] p-5">
            <div className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4 text-primary" />
              <h3 className="text-sm font-semibold">Need Help?</h3>
            </div>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
              Stuck on the submission? Our mentors are online.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
