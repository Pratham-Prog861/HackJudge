"use client";

import Link from "next/link";
import Image from "next/image";
import { UserButton, SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/footer";
import {
  LayoutDashboard,
  FolderOpen,
  BarChart3,
  Trophy,
  ShieldCheck,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";

const sidebarLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/submit", label: "Projects", icon: FolderOpen },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/evaluation", label: "Evaluation", icon: BarChart3 },
  { href: "/admin", label: "Admin", icon: ShieldCheck },
  { href: "/settings", label: "Settings", icon: Settings },
] as const;

const landingNavLinks = [
  { href: "/submit", label: "Submit" },
  { href: "/dashboard", label: "Dashboard" },
] as const;

function isInnerPage(pathname: string) {
  return (
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/submit") ||
    pathname.startsWith("/leaderboard") ||
    pathname.startsWith("/admin") ||
    pathname.startsWith("/evaluation") ||
    pathname.startsWith("/settings")
  );
}

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const inner = isInnerPage(pathname);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (inner) {
    return (
      <div className="flex min-h-screen">
        {/* Mobile sidebar toggle */}
        <button
          className="fixed left-4 top-4 z-50 rounded-xl bg-[#151926] p-2 text-muted-foreground md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <X className="h-5 w-5" />
          ) : (
            <Menu className="h-5 w-5" />
          )}
        </button>

        {/* Sidebar overlay for mobile */}
        {sidebarOpen && (
          <div
            className="fixed inset-0 z-30 bg-black/60 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={cn(
            "fixed inset-y-0 left-0 z-40 flex w-[220px] flex-col bg-[#0f131e] transition-transform duration-300 md:static md:translate-x-0",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
          )}
        >
          {/* Branding */}
          <div className="px-5 pt-6 pb-2">
            <Link href="/" className="group flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="HackJudge Logo"
                width={32}
                height={32}
                className="rounded-lg"
              />
              <div>
                <p className="text-sm font-semibold leading-none text-foreground">
                  HackJudge
                </p>
                <p className="mt-0.5 text-[10px] tracking-wider text-muted-foreground uppercase">
                  AI Judging Engine
                </p>
              </div>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="mt-4 flex flex-1 flex-col gap-0.5 px-3">
            {sidebarLinks.map((link) => {
              const Icon = link.icon;
              const active = pathname === link.href;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setSidebarOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm transition-all",
                    active
                      ? "bg-linear-to-r from-primary/20 to-secondary/10 text-foreground"
                      : "text-muted-foreground hover:bg-[#151926] hover:text-foreground",
                  )}
                >
                  <Icon
                    className={cn(
                      "h-[18px] w-[18px]",
                      active && "text-primary",
                    )}
                  />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* User area at bottom */}
          <div className="border-t border-border/20 px-4 py-4">
            <SignedIn>
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-8 w-8",
                  },
                }}
              />
            </SignedIn>
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" variant="outline" className="w-full text-xs">
                  Sign in
                </Button>
              </SignInButton>
            </SignedOut>
          </div>
        </aside>

        {/* Main content */}
        <div className="flex min-h-screen flex-1 flex-col">
          <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-7 sm:px-8 md:pl-8">
            {children}
          </main>
          <Footer />
        </div>
      </div>
    );
  }

  /* ─── Landing page layout (top nav) ─── */
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 bg-[#0a0e18]/80 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-lg font-semibold tracking-tight text-foreground"
          >
            <Image
              src="/logo.png"
              alt="HackJudge Logo"
              width={32}
              height={32}
              className="rounded-lg"
            />
            HackJudge
          </Link>

          <nav className="hidden items-center gap-6 md:flex">
            {landingNavLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <SignedOut>
              <SignInButton mode="modal">
                <Button size="sm" variant="outline" className="text-xs">
                  Sign In
                </Button>
              </SignInButton>
            </SignedOut>
            <SignedIn>
              <Link href="/dashboard">
                <Button size="sm" className="text-xs">
                  Launch Dashboard
                </Button>
              </Link>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </header>

      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
}
