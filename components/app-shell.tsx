"use client";

import Link from "next/link";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";

const links = [
  { href: "/", label: "Home", bracket: "[Home]" },
  { href: "/dashboard", label: "Dashboard", bracket: "[Dashboard]" },
  { href: "/submit", label: "Submit", bracket: "[Submit]" },
  { href: "/leaderboard", label: "Leaderboard", bracket: "[Leaderboard]" },
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-grid">
      <header className="sticky top-0 z-40 border-b-2 border-border/80 bg-background/85 backdrop-blur-sm">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-4 px-4 py-0 sm:px-6">
          <div className="flex items-center gap-0">
            <div className="flex items-center gap-1.5 py-3 pr-4 border-r border-border/60">
              <span className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-terminal-red/80" />
                <span className="h-3 w-3 rounded-full bg-terminal-amber/80" />
                <span className="h-3 w-3 rounded-full bg-terminal-green/80" />
              </span>
            </div>
            <Link
              href="/"
              className="ml-4 font-mono text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
            >
              <span className="text-primary">$</span> HackJudge
            </Link>
          </div>
          <nav className="hidden items-center gap-0.5 md:flex">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "font-mono text-xs px-3 py-3 transition-all border-b-2 -mb-0.5",
                  pathname === link.href
                    ? "text-primary border-primary bg-primary/5"
                    : "text-muted-foreground border-transparent hover:text-foreground hover:border-border",
                )}
              >
                {pathname === link.href ? link.bracket : link.label}
              </Link>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <span className="hidden font-mono text-xs text-muted-foreground sm:inline">
              $
            </span>
            <ThemeToggle />
            <SignedOut>
              <SignInButton mode="modal">
                <Button
                  size="sm"
                  variant="outline"
                  className="font-mono text-xs"
                >
                  sign-in
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl px-4 py-6 sm:px-6">
        {children}
      </main>
    </div>
  );
}
