import Link from "next/link";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/30 bg-[#0f131e]">
      <div className="mx-auto flex w-full max-w-7xl flex-wrap items-center justify-between gap-4 px-6 py-5">
        <div>
          <p className="text-sm font-semibold text-foreground/80">
            HackJudge AI
          </p>
          <p className="text-xs text-muted-foreground">
            © 2024 HackJudge AI. Built for the obsidian architect.
          </p>
        </div>
        <nav className="flex items-center gap-5">
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Privacy
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            Terms
          </Link>
          <Link
            href="#"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            API Status
          </Link>
          <Link
            href="https://github.com"
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </Link>
        </nav>
      </div>
    </footer>
  );
}
