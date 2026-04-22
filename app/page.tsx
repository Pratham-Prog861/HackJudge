"use client";

import Link from "next/link";
import {
  ArrowRight,
  Brain,
  BarChart3,
  Sparkles,
  Zap,
  Upload,
  Trophy,
  ShieldCheck,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const stats = [
  { value: "500+", label: "Organizers" },
  { value: "<30s", label: "Eval Time" },
  { value: "10K+", label: "Entries Handled" },
  { value: "99.9%", label: "Uptime" },
];

const howItWorks = [
  {
    step: "01",
    title: "Submit Your Project",
    description:
      "Upload your project with a title, description, GitHub repo link, and optional demo URL. Select your hackathon track.",
    icon: Upload,
    color: "text-primary",
    bgColor: "bg-primary/10",
  },
  {
    step: "02",
    title: "AI Evaluates Instantly",
    description:
      "Our AI engine scans your codebase, analyzes architecture, checks innovation, and scores across 5 weighted criteria in under 30 seconds.",
    icon: Brain,
    color: "text-secondary",
    bgColor: "bg-secondary/10",
  },
  {
    step: "03",
    title: "Live Rankings Update",
    description:
      "Your score appears on the real-time leaderboard. Category-aware comparisons ensure fairness across all tracks.",
    icon: Trophy,
    color: "text-amber-300",
    bgColor: "bg-amber-300/10",
  },
  {
    step: "04",
    title: "Admin Reviews & Overrides",
    description:
      "Organizers can review AI decisions, adjust scores manually, and publish final results with full audit transparency.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bgColor: "bg-emerald-400/10",
  },
];

const trustedCompanies = [
  "Google",
  "Microsoft",
  "Meta",
  "Amazon",
  "Stripe",
  "Vercel",
  "GitHub",
  "OpenAI",
  "Cloudflare",
  "Figma",
  "Notion",
  "Linear",
];

export default function Home() {
  return (
    <div className="space-y-0">
      {/* ── Hero Section ── */}
      <section className="relative min-h-[60vh] overflow-hidden flex items-center justify-center">
        {/* Background Video */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 h-full w-full object-cover"
        >
          <source src="/videos/bg-video.mp4" type="video/mp4" />
        </video>

        {/* Overlays for depth and readability */}
        <div className="absolute inset-0 bg-black/60 backdrop-blur-[2px]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_-10%,color-mix(in_oklab,var(--color-primary)_30%,transparent),transparent_70%)]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_80%_20%,color-mix(in_oklab,var(--color-secondary)_18%,transparent),transparent_60%)]" />

        <div className="relative mx-auto max-w-7xl px-6 pt-24 pb-10 text-center sm:pt-32 sm:pb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-[#151926] px-4 py-1.5 text-xs tracking-widest text-muted-foreground uppercase">
            <Sparkles className="h-3.5 w-3.5 text-secondary" />
            Judging Reimagined
          </div>

          <h1 className="mx-auto mt-7 max-w-4xl text-5xl font-semibold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
            AI-Powered Hackathon{" "}
            <span className="bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              Judging Platform
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Automate code evaluation, generate instant feedback, and maintain
            live leaderboards with the engine designed for the next generation
            of builders.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link href="/submit">
              <Button
                size="lg"
                className="bg-linear-to-r from-primary to-[#8d98ff] px-8 text-sm font-medium"
              >
                Get Started
                <ArrowRight className="ml-1 h-4 w-4" />
              </Button>
            </Link>
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="border-border/40 px-8 text-sm font-medium"
              >
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Trusted By ── Infinite Scroll Logos ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <p className="mb-8 text-center text-xs tracking-widest text-muted-foreground uppercase">
          Trusted by teams at leading companies
        </p>
        <div className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-linear-to-r from-[#0a0e18] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-linear-to-l from-[#0a0e18] to-transparent" />
          <div className="animate-infinite-scroll flex w-max gap-12">
            {[...trustedCompanies, ...trustedCompanies].map((name, i) => (
              <div
                key={`${name}-${i}`}
                className="flex shrink-0 items-center gap-2.5 rounded-xl bg-[#151926]/60 px-5 py-3"
              >
                <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-xs font-bold text-primary">
                  {name[0]}
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-muted-foreground">
                  {name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bento Features Grid (Stitch-style) ── */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Judging Reimagined
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Precise, automated, and unbiased evaluation for every commit.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-12">
          {/* Feature 1: AI Evaluation — 8 cols */}
          <div className="group relative overflow-hidden rounded-2xl bg-[#151926] p-8 transition-all hover:bg-[#1a1f2d] md:col-span-8">
            <div className="relative z-10">
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                <Brain className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">AI Evaluation</h3>
              <p className="max-w-md text-muted-foreground">
                Our neural engine analyzes code quality, innovation, and
                adherence to hackathon themes in seconds, not hours.
              </p>
            </div>
            {/* Ambient glow */}
            <div className="absolute bottom-[-10%] right-[-5%] aspect-square w-1/2 bg-primary/5 blur-[80px] transition-colors group-hover:bg-primary/10" />
            {/* Image */}
            <div className="mt-8 overflow-hidden rounded-xl border border-white/5">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuBinFcdFp2xHCJF-1qpHvRt3kUXvylHxjW4rDOn1Tarut-XFvyy4IMxL1VDZTbbAJw3xUkvB7yG1C6BaVz_OTamJVNQIMacEr9v-CVDjqVamxFQtoWnODiS050WFxR9rR10r-lz7p80MP7boyT3-qUqnA-Qh3FS7SCu_b50S-E0vKNFnWl2AZxK6lpc8o7rdzHTnb_g2Nf_HLRy81ODYdqRPFY9-7vUEWEes4irNCTC2pfUllVypA0BitQsfqQqLboQLZRIgP8j7xo"
                alt="Neural network with glowing nodes"
                className="h-48 w-full object-cover opacity-40 grayscale transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0"
                width={100}
                height={100}
              />
            </div>
          </div>

          {/* Feature 2: Real-time Leaderboard — 4 cols */}
          <div className="flex flex-col justify-between rounded-2xl bg-[#0f131e] p-8 md:col-span-4">
            <div>
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary/10">
                <BarChart3 className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="mb-3 text-2xl font-bold">Real-time Leaderboard</h3>
              <p className="text-muted-foreground">
                Live updates as scores are processed. Watch the rankings shift
                in high-fidelity.
              </p>
            </div>
            {/* Skeleton leaderboard rows */}
            <div className="mt-8 space-y-3">
              <div className="flex h-12 items-center justify-between rounded-xl bg-[#1a1f2d] px-4">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-primary/20" />
                  <span className="text-sm font-medium">Team Alpha</span>
                </div>
                <span className="font-bold text-primary">98.2</span>
              </div>
              <div className="flex h-12 items-center justify-between rounded-xl bg-[#1a1f2d]/50 px-4 opacity-50">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-muted-foreground/20" />
                  <span className="text-sm font-medium">Team Beta</span>
                </div>
                <span className="font-bold">94.5</span>
              </div>
            </div>
          </div>

          {/* Feature 3: Detailed Feedback — 4 cols */}
          <div className="rounded-2xl bg-[#151926] p-8 md:col-span-4">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-amber-400/10">
              <MessageSquare className="h-6 w-6 text-amber-300" />
            </div>
            <h3 className="mb-3 text-2xl font-bold">Detailed Feedback</h3>
            <p className="mb-6 text-muted-foreground">
              Actionable insights for every submission. We help developers
              understand their score with comprehensive AI reports.
            </p>
            {/* Skeleton feedback card */}
            <div className="group relative overflow-hidden rounded-xl border border-amber-400/20 bg-[#0a0e18] p-4 transition-all hover:shadow-[0_0_20px_rgba(251,191,36,0.05)]">
              {/* Header: Minimal & Polished */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)] animate-pulse" />
                  <div className="h-1.5 w-24 rounded-full bg-linear-to-r from-[#1a1f2d] to-[#0f131e]" />
                </div>
                <div className="h-3 w-3 rounded-full border border-amber-400/10 opacity-40 transition-opacity group-hover:opacity-80" />
              </div>

              {/* Content Bars: Varied & Gradient-rich */}
              <div className="space-y-2">
                <div className="h-1.5 w-full rounded-full bg-linear-to-r from-[#1a1f2d] to-[#0f131e]" />
                <div className="flex items-center gap-2">
                  <div className="h-1.5 w-[75%] rounded-full bg-linear-to-r from-[#1a1f2d] to-[#0f131e]" />
                  <div className="h-1.5 flex-1 rounded-full bg-amber-400/10" />
                </div>
              </div>

              {/* Subtle ambient glow in corner */}
              <div className="absolute -right-4 -bottom-4 h-16 w-16 bg-amber-400/5 blur-2xl transition-colors group-hover:bg-amber-400/10" />
            </div>
          </div>

          {/* Feature 4: Scale — 8 cols */}
          <div className="flex flex-col items-center gap-8 rounded-2xl bg-[#151926]/60 p-8 backdrop-blur-sm md:col-span-8 md:flex-row">
            <div className="flex-1">
              <h3 className="mb-3 text-2xl font-bold">Architected for Scale</h3>
              <p className="text-muted-foreground">
                Whether it&apos;s a local meetup or a global hackathon with
                10,000+ entries, our obsidian-grade infrastructure handles the
                load without breaking a sweat.
              </p>
            </div>
            <div className="aspect-video w-full overflow-hidden rounded-xl bg-black/40 md:w-1/3">
              <Image
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB4xfGYCPuVfyr8j542bGgngCFeRotjYgos2DG2KP3_2rYYXw1UCgO6PDBe-Z6s5tpanBEF2Lxqu2jr776rcg-o6hi8O1N9jfSEEmGUcZvulPpWCbovA28ImfgKBMKGCjoib_STFIUVFzXqHIOxbncazLUdaquzHJP1aOrbcuY4JjZmVIwwnst2lC1XHvNcSVibfZk5wzpNccQj_egmzMlynL0VYt0MCouAQaJHVGHKqNy26zLI05DBoDA_NN7b1G52jShRD3hA5_4"
                alt="Global connectivity map with glowing data points"
                className="h-full w-full object-cover opacity-50"
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="text-center">
          <p className="text-xs tracking-widest text-muted-foreground uppercase">
            How It Works
          </p>
          <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
            From submission to leaderboard in 4 steps
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
            A transparent, end-to-end pipeline that every participant can
            follow.
          </p>
        </div>

        <div className="relative mt-16">
          <div className="absolute top-0 bottom-0 left-8 hidden w-px bg-linear-to-b from-primary/30 via-secondary/20 to-transparent lg:block" />

          <div className="grid gap-6 lg:gap-0">
            {howItWorks.map((item, stepIdx) => {
              const Icon = item.icon;
              return (
                <div
                  key={item.step}
                  className="relative flex gap-6 lg:gap-10 lg:py-6"
                >
                  <div className="relative z-10 hidden shrink-0 lg:block">
                    <div
                      className={`flex h-16 w-16 items-center justify-center rounded-2xl ${item.bgColor}`}
                    >
                      <Icon className={`h-7 w-7 ${item.color}`} />
                    </div>
                  </div>

                  <div className="flex-1 rounded-2xl bg-[#151926] p-6 transition-colors hover:bg-[#1a1f2d]">
                    <div className="flex items-start gap-4 lg:gap-0">
                      <div
                        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl lg:hidden ${item.bgColor}`}
                      >
                        <Icon className={`h-5 w-5 ${item.color}`} />
                      </div>
                      <div>
                        <span className="text-xs font-semibold tracking-widest text-muted-foreground/50 uppercase">
                          Step {item.step}
                        </span>
                        <h3 className="mt-2 text-xl font-semibold">
                          {item.title}
                        </h3>
                        <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted-foreground">
                          {item.description}
                        </p>
                      </div>
                    </div>

                    {/* Step 01 — Form skeleton */}
                    {stepIdx === 0 && (
                      <div className="mt-5 overflow-hidden rounded-xl bg-[#0a0e18] p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <Upload className="h-3.5 w-3.5 text-primary/40" />
                          <span className="text-[10px] tracking-wider text-muted-foreground/50 uppercase">
                            New Submission
                          </span>
                        </div>
                        {/* Project Name field */}
                        <div className="mb-3">
                          <div className="mb-1.5 h-2 w-20 rounded bg-[#1a1f2d]" />
                          <div className="flex h-9 items-center rounded-lg bg-[#151926] px-3">
                            <span className="text-xs text-muted-foreground/40">
                              PulseBoard
                            </span>
                          </div>
                        </div>
                        {/* Category + GitHub URL row */}
                        <div className="mb-3 grid grid-cols-2 gap-3">
                          <div>
                            <div className="mb-1.5 h-2 w-14 rounded bg-[#1a1f2d]" />
                            <div className="flex h-9 items-center justify-between rounded-lg bg-[#151926] px-3">
                              <span className="text-xs text-muted-foreground/40">
                                Web App
                              </span>
                              <div className="h-3 w-3 rounded border border-muted-foreground/20" />
                            </div>
                          </div>
                          <div>
                            <div className="mb-1.5 h-2 w-16 rounded bg-[#1a1f2d]" />
                            <div className="flex h-9 items-center rounded-lg bg-[#151926] px-3">
                              <span className="text-xs text-muted-foreground/40">
                                github.com/you/repo
                              </span>
                            </div>
                          </div>
                        </div>
                        {/* Description */}
                        <div className="mb-4">
                          <div className="mb-1.5 h-2 w-18 rounded bg-[#1a1f2d]" />
                          <div className="h-16 rounded-lg bg-[#151926] p-3">
                            <div className="h-2 w-full rounded bg-[#1a1f2d]" />
                            <div className="mt-1.5 h-2 w-3/4 rounded bg-[#1a1f2d]" />
                            <div className="mt-1.5 h-2 w-1/2 rounded bg-[#1a1f2d]" />
                          </div>
                        </div>
                        {/* Submit button */}
                        <div className="flex justify-end">
                          <div className="flex h-8 items-center gap-2 rounded-lg bg-primary/20 px-4">
                            <span className="text-[10px] font-medium text-primary/60">
                              Submit Project →
                            </span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Step 02 — AI scoring dashboard */}
                    {stepIdx === 1 && (
                      <div className="mt-5 overflow-hidden rounded-xl bg-[#0a0e18] p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Brain className="h-3.5 w-3.5 text-secondary/50" />
                            <span className="text-[10px] tracking-wider text-muted-foreground/50 uppercase">
                              AI Analysis Running
                            </span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-secondary" />
                            <span className="text-[10px] text-secondary/60">
                              Processing
                            </span>
                          </div>
                        </div>
                        {/* Score categories */}
                        <div className="grid grid-cols-5 gap-2">
                          {[
                            { label: "Innovation", score: "17.2", pct: 86 },
                            { label: "UI/UX", score: "14.8", pct: 74 },
                            { label: "Code", score: "18.1", pct: 91 },
                            { label: "Problem", score: "15.5", pct: 78 },
                            { label: "Complete", score: "16.9", pct: 85 },
                          ].map((cat) => (
                            <div
                              key={cat.label}
                              className="rounded-lg bg-[#151926] p-2.5 text-center"
                            >
                              <p className="text-[9px] tracking-wider text-muted-foreground/40 uppercase">
                                {cat.label}
                              </p>
                              <p className="mt-1 text-sm font-semibold text-secondary/70">
                                {cat.score}
                              </p>
                              <div className="mx-auto mt-1.5 h-1 w-full rounded-full bg-[#0a0e18]">
                                <div
                                  className="h-1 rounded-full bg-secondary/30"
                                  style={{ width: `${cat.pct}%` }}
                                />
                              </div>
                            </div>
                          ))}
                        </div>
                        {/* Total score */}
                        <div className="mt-3 flex items-center justify-between rounded-lg bg-[#151926] p-3">
                          <span className="text-xs text-muted-foreground/50">
                            Overall Score
                          </span>
                          <span className="text-xl font-bold text-secondary/60">
                            82.5
                            <span className="text-xs text-muted-foreground/30">
                              /100
                            </span>
                          </span>
                        </div>
                      </div>
                    )}

                    {/* Step 03 — Leaderboard preview */}
                    {stepIdx === 2 && (
                      <div className="mt-5 overflow-hidden rounded-xl bg-[#0a0e18] p-5">
                        <div className="mb-4 flex items-center gap-2">
                          <Trophy className="h-3.5 w-3.5 text-amber-300/50" />
                          <span className="text-[10px] tracking-wider text-muted-foreground/50 uppercase">
                            Live Rankings
                          </span>
                        </div>
                        {/* Ranked entries */}
                        <div className="space-y-2">
                          {[
                            {
                              rank: 1,
                              name: "Neural-Sync",
                              score: "96.4",
                              badge: "🥇",
                              highlight: true,
                            },
                            {
                              rank: 2,
                              name: "PulseBoard",
                              score: "82.5",
                              badge: "🥈",
                              highlight: false,
                            },
                            {
                              rank: 3,
                              name: "DataForge",
                              score: "79.1",
                              badge: "🥉",
                              highlight: false,
                            },
                            {
                              rank: 4,
                              name: "CloudMesh",
                              score: "74.8",
                              badge: "",
                              highlight: false,
                            },
                          ].map((entry) => (
                            <div
                              key={entry.rank}
                              className={`flex items-center justify-between rounded-lg px-3 py-2.5 ${
                                entry.highlight
                                  ? "bg-amber-400/8 border border-amber-400/10"
                                  : entry.rank === 2
                                    ? "bg-primary/5 border border-primary/10 animate-pulse"
                                    : "bg-[#151926]"
                              }`}
                            >
                              <div className="flex items-center gap-3">
                                <span className="w-5 text-center text-xs font-bold text-muted-foreground/40">
                                  {entry.badge || `#${entry.rank}`}
                                </span>
                                <div className="h-5 w-5 rounded-full bg-muted-foreground/10" />
                                <span
                                  className={`text-xs font-medium ${
                                    entry.rank === 2
                                      ? "text-primary/70"
                                      : "text-muted-foreground/60"
                                  }`}
                                >
                                  {entry.name}
                                  {entry.rank === 2 && (
                                    <span className="ml-2 text-[9px] text-primary/40">
                                      ← Your project
                                    </span>
                                  )}
                                </span>
                              </div>
                              <span
                                className={`text-sm font-bold ${
                                  entry.highlight
                                    ? "text-amber-300/60"
                                    : entry.rank === 2
                                      ? "text-primary/60"
                                      : "text-muted-foreground/30"
                                }`}
                              >
                                {entry.score}
                              </span>
                            </div>
                          ))}
                        </div>
                        <p className="mt-3 text-center text-[9px] text-muted-foreground/30">
                          Updated live • Showing top 4 of 128
                        </p>
                      </div>
                    )}

                    {/* Step 04 — Admin review panel */}
                    {stepIdx === 3 && (
                      <div className="mt-5 overflow-hidden rounded-xl bg-[#0a0e18] p-5">
                        <div className="mb-4 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400/50" />
                            <span className="text-[10px] tracking-wider text-muted-foreground/50 uppercase">
                              Admin Console
                            </span>
                          </div>
                          <div className="rounded bg-emerald-400/10 px-2 py-0.5 text-[9px] text-emerald-400/50">
                            Audit Mode
                          </div>
                        </div>
                        {/* Table header */}
                        <div className="mb-1 grid grid-cols-12 gap-2 px-3 text-[9px] tracking-wider text-muted-foreground/30 uppercase">
                          <span className="col-span-4">Project</span>
                          <span className="col-span-2">AI Score</span>
                          <span className="col-span-3">Status</span>
                          <span className="col-span-3 text-right">Actions</span>
                        </div>
                        <div className="space-y-1.5">
                          {[
                            {
                              name: "PulseBoard",
                              score: "82.5",
                              status: "Reviewed",
                              statusColor:
                                "text-emerald-400/50 bg-emerald-400/8",
                            },
                            {
                              name: "DataForge",
                              score: "79.1",
                              status: "Flagged",
                              statusColor: "text-amber-300/50 bg-amber-300/8",
                            },
                            {
                              name: "CloudMesh",
                              score: "74.8",
                              status: "Pending",
                              statusColor: "text-primary/50 bg-primary/8",
                            },
                          ].map((row) => (
                            <div
                              key={row.name}
                              className="grid grid-cols-12 items-center gap-2 rounded-lg bg-[#151926] px-3 py-2.5"
                            >
                              <span className="col-span-4 text-xs text-muted-foreground/50">
                                {row.name}
                              </span>
                              <span className="col-span-2 text-xs font-semibold text-muted-foreground/40">
                                {row.score}
                              </span>
                              <span className="col-span-3">
                                <span
                                  className={`rounded px-1.5 py-0.5 text-[9px] ${row.statusColor}`}
                                >
                                  {row.status}
                                </span>
                              </span>
                              <div className="col-span-3 flex justify-end gap-1.5">
                                <div className="rounded bg-[#0a0e18] px-2 py-1 text-[9px] text-muted-foreground/30">
                                  Review
                                </div>
                                <div className="rounded bg-[#0a0e18] px-2 py-1 text-[9px] text-muted-foreground/30">
                                  Override
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Stats Band ── */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="rounded-2xl bg-linear-to-r from-primary/10 via-[#151926] to-secondary/10 p-8 sm:p-12">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-semibold text-foreground sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Section ── */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="relative overflow-hidden rounded-3xl bg-[#151926] p-10 text-center sm:p-16">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_oklab,var(--color-primary)_20%,transparent),transparent_60%)]" />
          <div className="relative">
            <Zap className="mx-auto h-8 w-8 text-secondary" />
            <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">
              Ready to judge the future?
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-sm text-muted-foreground">
              Join 500+ organizers using HackJudge to streamline their
              evaluation process.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link href="/submit">
                <Button
                  size="lg"
                  className="bg-linear-to-r from-primary to-[#8d98ff] px-8 text-sm font-medium"
                >
                  Submit a Project
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-border/40 px-8 text-sm font-medium"
                >
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
