"use client";

import { FormEvent, useMemo, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
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
import { GitBranch, Terminal, Loader, Send } from "lucide-react";

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
      const message =
        "Submission cap reached. You can only submit 3 projects in this HackJudge.";
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
      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <GitBranch className="h-3.5 w-3.5" />
            <span>[submit]</span>
          </div>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-terminal-green/30 bg-terminal-green/10">
              <Terminal className="h-5 w-5 text-terminal-green" />
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight">
                Ship your <span className="text-terminal-green">build</span>
              </h1>
              <p className="font-mono text-xs text-muted-foreground">
                $ Each user can submit up to 3 projects. Remaining: {remaining}
              </p>
            </div>
          </div>
        </div>
      </section>

      <Card className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Send className="h-3.5 w-3.5" />
            <span>[new-submission]</span>
          </div>
        </div>
        <div className="p-5">
          <CardDescription className="mb-4">
            Provide a concise pitch, your repository, and an optional demo URL.
          </CardDescription>

          <form className="space-y-4" onSubmit={onSubmit}>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  project_title
                </span>
                <Input
                  value={form.title}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      title: event.target.value,
                    }))
                  }
                  placeholder="PulseBoard"
                  className="font-mono"
                />
              </label>
              <label className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  category
                </span>
                <Select
                  value={form.category}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      category: event.target.value as Category,
                    }))
                  }
                  className="font-mono"
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {categoryLabels[category]}
                    </option>
                  ))}
                </Select>
              </label>
            </div>

            <label className="space-y-1.5">
              <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                description
              </span>
              <Textarea
                value={form.description}
                onChange={(event) =>
                  setForm((current) => ({
                    ...current,
                    description: event.target.value,
                  }))
                }
                placeholder="Describe the problem, your solution, and what makes it different."
                className="font-mono min-h-[100px]"
              />
            </label>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  github_url
                </span>
                <Input
                  value={form.githubUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      githubUrl: event.target.value,
                    }))
                  }
                  placeholder="https://github.com/you/repo"
                  className="font-mono"
                />
              </label>
              <label className="space-y-1.5">
                <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  demo_url{" "}
                  <span className="text-muted-foreground/60">(optional)</span>
                </span>
                <Input
                  value={form.demoUrl}
                  onChange={(event) =>
                    setForm((current) => ({
                      ...current,
                      demoUrl: event.target.value,
                    }))
                  }
                  placeholder="https://your-demo.app"
                  className="font-mono"
                />
              </label>
            </div>

            {status && (
              <div className="rounded border border-border/60 bg-background/50 p-3">
                <p className="font-mono text-sm text-muted-foreground">
                  {status}
                </p>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting || remaining <= 0}
              className="font-mono"
            >
              {isSubmitting ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  submitting...
                </>
              ) : (
                <>
                  <span className="text-terminal-green">$</span> ./submit
                </>
              )}
            </Button>
          </form>
        </div>
      </Card>
    </div>
  );
}
