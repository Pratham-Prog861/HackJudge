"use client";
import Link from "next/link";
import {
  Code2,
  Terminal,
  Trophy,
  GitBranch,
  Sparkles,
  Shield,
  FileCode,
  User,
  CheckCircle,
  ArrowRight,
  Hash,
  Layers,
  Cpu,
  Smartphone,
  Brain,
  Database,
  Command,
  Zap,
  Clock,
  BarChart3,
  Heart,
  Mail,
  Globe,
  ChevronRight,
  Link2Icon,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const sponsors = [
  { name: "Vercel", icon: "▲" },
  { name: "GitHub", icon: "⬡" },
  { name: "OpenAI", icon: "◈" },
  { name: "Claude", icon: "◇" },
  { name: "Convex", icon: "⬡" },
  { name: "Clerk", icon: "○" },
  { name: "Supabase", icon: "◈" },
  { name: "Railway", icon: "▲" },
];

const footerLinks = {
  product: [
    { label: "Features", href: "#features" },
    { label: "Leaderboard", href: "/leaderboard" },
    { label: "Submit", href: "/submit" },
    { label: "Dashboard", href: "/dashboard" },
  ],
  resources: [
    { label: "Documentation", href: "#" },
    { label: "API", href: "#" },
    { label: "Status", href: "#" },
    { label: "Contact", href: "#" },
  ],
  company: [
    { label: "About", href: "#" },
    { label: "Blog", href: "#" },
    { label: "Careers", href: "#" },
    { label: "Privacy", href: "#" },
  ],
};

export default function Home() {
  return (
    <div className="space-y-8">
      <section className="relative overflow-hidden rounded-none border-2 border-border/80 bg-card/60">
        <div className="absolute inset-0 bg-grid opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-chart-2/5" />
        <div className="relative border-b border-border/50">
          <div className="flex items-center gap-2 px-4 py-2">
            <span className="flex gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-red/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-amber/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-terminal-green/80" />
            </span>
            <span className="ml-3 font-mono text-xs text-muted-foreground">
              hackjudge —
            </span>
          </div>
        </div>
        <div className="px-6 py-12 sm:px-8 sm:py-16">
          <div className="max-w-3xl">
            <div className="mb-4 flex items-center gap-2 font-mono text-xs text-terminal-green">
              <Terminal className="h-4 w-4" />
              <span>&gt;_ npm run dev</span>
            </div>
            <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
              <span className="text-primary">Fairer</span> hackathon judging{" "}
              <span className="text-terminal-green">+</span> AI
            </h1>
            <p className="mt-4 max-w-2xl font-mono text-sm text-muted-foreground sm:text-base">
              <span className="text-primary">//</span> Structured scorecards,
              live leaderboards, and admin override power. Built for hackers, by
              hackers.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/dashboard">
                <Button size="lg" className="font-mono text-sm">
                  <span className="text-terminal-green">$</span> ./dashboard
                </Button>
              </Link>
              <Link href="/submit">
                <Button
                  size="lg"
                  variant="outline"
                  className="font-mono text-sm"
                >
                  <span className="text-terminal-amber">$</span> ./submit
                </Button>
              </Link>
              <Link href="/leaderboard">
                <Button
                  size="lg"
                  variant="secondary"
                  className="font-mono text-sm"
                >
                  <span className="text-terminal-green">&gt;</span> leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-2">
            <Command className="h-3.5 w-3.5" />
            <span>[stats]</span>
          </div>
          <p className="text-3xl font-black text-primary">5</p>
          <p className="font-mono text-xs text-muted-foreground">
            score criteria
          </p>
        </div>
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-2">
            <Layers className="h-3.5 w-3.5" />
            <span>[categories]</span>
          </div>
          <p className="text-3xl font-black text-primary">4</p>
          <p className="font-mono text-xs text-muted-foreground">
            track categories
          </p>
        </div>
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-2">
            <Zap className="h-3.5 w-3.5" />
            <span>[status]</span>
          </div>
          <p className="text-3xl font-black text-terminal-green">AI</p>
          <p className="font-mono text-xs text-muted-foreground">
            powered scoring
          </p>
        </div>
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-4">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground mb-2">
            <Clock className="h-3.5 w-3.5" />
            <span>[time]</span>
          </div>
          <p className="text-3xl font-black text-terminal-amber">~30s</p>
          <p className="font-mono text-xs text-muted-foreground">eval time</p>
        </div>
      </div>

      <section className="rounded-none border-2 border-border/80 bg-card/60 overflow-hidden">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Globe className="h-3.5 w-3.5" />
            <span>[trusted-by]</span>
          </div>
        </div>
        <div className="p-6">
          <p className="text-center font-mono text-xs text-muted-foreground mb-6">
            // Used by hackathons worldwide
          </p>
          <div className="relative flex overflow-hidden">
            <div className="flex animate-infinite-scroll gap-8">
              {[...sponsors, ...sponsors, ...sponsors].map((sponsor, i) => (
                <div
                  key={i}
                  className="flex min-w-[120px] items-center gap-2 text-muted-foreground opacity-60 hover:opacity-100 transition-opacity"
                >
                  <span className="text-2xl">{sponsor.icon}</span>
                  <span className="font-mono text-sm">{sponsor.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes infinite-scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-infinite-scroll {
          animation: infinite-scroll 20s linear infinite;
        }
      `}</style>

      <section className="grid gap-4 md:grid-cols-2">
        <section className="rounded-none border-2 border-border/80 bg-card/60">
          <div className="border-b border-border/50 bg-card/40 px-4 py-2">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <Code2 className="h-3.5 w-3.5" />
              <span>[dashboard]</span>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold">Your Submissions</h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Track projects, review AI scores, iterate fast.
            </p>
            <div className="mt-4 space-y-2 font-mono text-sm">
              <div className="flex justify-between border-b border-border/30 py-1">
                <span className="text-muted-foreground">
                  projects submitted
                </span>
                <span className="text-primary">0</span>
              </div>
              <div className="flex justify-between border-b border-border/30 py-1">
                <span className="text-muted-foreground">
                  evaluations complete
                </span>
                <span className="text-terminal-green">0</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-muted-foreground">avg score</span>
                <span className="text-muted-foreground">—</span>
              </div>
            </div>
            <Link href="/dashboard">
              <Button
                size="sm"
                variant="outline"
                className="mt-4 font-mono text-xs"
              >
                View Dashboard <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </section>

        <section className="rounded-none border-2 border-border/80 bg-card/60">
          <div className="border-b border-border/50 bg-card/40 px-4 py-2">
            <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
              <GitBranch className="h-3.5 w-3.5" />
              <span>[submit]</span>
            </div>
          </div>
          <div className="p-5">
            <h2 className="text-xl font-bold">Ship Your Build</h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              GitHub URL, category, short pitch.
            </p>
            <div className="mt-4 rounded border border-border/50 bg-background/50 p-3 font-mono text-xs">
              <div className="text-muted-foreground">
                <span className="text-terminal-green">$</span> ./submit
                --project
              </div>
              <div className="mt-1 text-muted-foreground">
                <span className="text-terminal-amber">max:</span> 3 submissions
              </div>
              <div className="mt-1 text-muted-foreground">
                <span className="text-terminal-green">status:</span> ready
              </div>
            </div>
            <Link href="/submit">
              <Button
                size="sm"
                variant="outline"
                className="mt-4 font-mono text-xs"
              >
                Submit Project <ArrowRight className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </div>
        </section>
      </section>

      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Trophy className="h-3.5 w-3.5" />
            <span>[leaderboard]</span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold">Live Rankings</h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Category-aware leaderboard with AI + override scores.
          </p>
          <div className="mt-4 overflow-x-auto">
            <table className="w-full font-mono text-sm">
              <thead>
                <tr className="border-b border-border/50 text-left text-xs text-muted-foreground">
                  <th className="pb-2 pr-4 font-medium">#</th>
                  <th className="pb-2 pr-4 font-medium">project</th>
                  <th className="pb-2 pr-4 font-medium">category</th>
                  <th className="pb-2 text-right font-medium">score</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/20">
                  <td className="py-2 pr-4 text-terminal-green">1</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 text-right text-muted-foreground">—</td>
                </tr>
                <tr className="border-b border-border/20">
                  <td className="py-2 pr-4 text-terminal-amber">2</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 text-right text-muted-foreground">—</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4">3</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 pr-4">—</td>
                  <td className="py-2 text-right text-muted-foreground">—</td>
                </tr>
              </tbody>
            </table>
          </div>
          <Link href="/leaderboard">
            <Button
              size="sm"
              variant="outline"
              className="mt-4 font-mono text-xs"
            >
              View Leaderboard <ArrowRight className="ml-2 h-3 w-3" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <BarChart3 className="h-3.5 w-3.5" />
            <span>[categories]</span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold">Track Categories</h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Projects are judged within their category for fair competition.
          </p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-3 rounded border border-border/60 bg-background/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-primary/10">
                <Code2 className="h-4 w-4 text-primary" />
              </div>
              <div>
                <p className="font-bold">Web</p>
                <p className="font-mono text-xs text-muted-foreground">
                  web apps
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-border/60 bg-background/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-terminal-green/10">
                <Brain className="h-4 w-4 text-terminal-green" />
              </div>
              <div>
                <p className="font-bold">AI</p>
                <p className="font-mono text-xs text-muted-foreground">
                  ml / llm
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-border/60 bg-background/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-terminal-amber/10">
                <Database className="h-4 w-4 text-terminal-amber" />
              </div>
              <div>
                <p className="font-bold">Data Science</p>
                <p className="font-mono text-xs text-muted-foreground">
                  analytics
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3 rounded border border-border/60 bg-background/50 p-3">
              <div className="flex h-9 w-9 items-center justify-center rounded bg-chart-3/20">
                <Smartphone className="h-4 w-4 text-chart-3" />
              </div>
              <div>
                <p className="font-bold">Mobile</p>
                <p className="font-mono text-xs text-muted-foreground">
                  ios / android
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-none border-2 border-border/80 bg-card/60">
        <div className="border-b border-border/50 bg-card/40 px-4 py-2">
          <div className="flex items-center gap-2 font-mono text-xs text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5" />
            <span>[how-it-works]</span>
          </div>
        </div>
        <div className="p-5">
          <h2 className="text-xl font-bold">How It Works</h2>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            From submission to score in three simple steps.
          </p>
          <div className="mt-4 grid gap-4 sm:grid-cols-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-terminal-green/50 bg-terminal-green/10 font-mono text-sm font-bold text-terminal-green">
                01
              </div>
              <h3 className="mt-3 font-bold">Submit</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                Paste your GitHub repo URL, choose a category, and write a short
                pitch.
              </p>
            </div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-terminal-amber/50 bg-terminal-amber/10 font-mono text-sm font-bold text-terminal-amber">
                02
              </div>
              <h3 className="mt-3 font-bold">AI Evaluates</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                HackJudge analyzes your README and code across 5 criteria in ~30
                seconds.
              </p>
            </div>
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-primary/50 bg-primary/10 font-mono text-sm font-bold text-primary">
                03
              </div>
              <h3 className="mt-3 font-bold">Live Results</h3>
              <p className="mt-1 font-mono text-xs text-muted-foreground">
                View your score breakdown and compete on the category-aware
                leaderboard.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-terminal-green/30 bg-terminal-green/10">
            <Sparkles className="h-4 w-4 text-terminal-green" />
          </div>
          <h3 className="mt-3 text-lg font-bold">Structured AI</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Innovation, UI/UX, code quality, problem solving, completeness — all
            normalized.
          </p>
        </div>
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-terminal-amber/30 bg-terminal-green/10">
            <Shield className="h-4 w-4 text-terminal-amber" />
          </div>
          <h3 className="mt-3 text-lg font-bold">Graceful Fallback</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            If API is down, HackJudge stores a usable fallback so nothing gets
            stuck.
          </p>
        </div>
        <div className="rounded-none border-2 border-border/80 bg-card/60 p-5">
          <div className="flex h-9 w-9 items-center justify-center rounded border border-primary/30 bg-primary/10">
            <Cpu className="h-4 w-4 text-primary" />
          </div>
          <h3 className="mt-3 text-lg font-bold">Admin Override</h3>
          <p className="mt-1 font-mono text-xs text-muted-foreground">
            Allowlisted admins override scores, original AI results preserved
            for audit.
          </p>
        </div>
      </section>

      <section className="rounded-none border-2 border-terminal-green/30 bg-terminal-green/5 p-6">
        <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
          <div className="flex h-12 w-12 items-center justify-center rounded border border-terminal-green/30 bg-terminal-green/10">
            <Zap className="h-6 w-6 text-terminal-green" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold">Ready to ship?</h2>
            <p className="mt-1 font-mono text-xs text-muted-foreground">
              Submit your hackathon project and get scored in ~30 seconds.
            </p>
          </div>
          <Link href="/submit">
            <Button size="lg" className="font-mono">
              <span className="text-terminal-green">$</span> ./submit
            </Button>
          </Link>
        </div>
      </section>

      <footer className="rounded-none border-2 border-border/80 bg-card/60 mt-8">
        <div className="p-6">
          <div className="grid gap-8 md:grid-cols-5">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-mono text-lg font-bold">
                <span className="text-primary">$</span> HackJudge
              </div>
              <p className="mt-2 font-mono text-xs text-muted-foreground max-w-xs">
                Fairer hackathon judging powered by AI. Built for hackers, by
                hackers.
              </p>
              <div className="mt-4 flex gap-3">
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Link2Icon className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Globe className="h-5 w-5" />
                </a>
                <a
                  href="#"
                  className="text-muted-foreground hover:text-primary transition-colors"
                >
                  <Mail className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div>
              <h4 className="font-bold mb-3">Product</h4>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Resources</h4>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-bold mb-3">Company</h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="font-mono text-xs text-muted-foreground">
              © 2024 HackJudge. Built with{" "}
              <Heart className="h-3 w-3 inline text-terminal-red" /> for
              hackers.
            </p>
            <div className="flex items-center gap-4 font-mono text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-primary transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
