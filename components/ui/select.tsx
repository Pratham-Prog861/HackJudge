import { cn } from "@/lib/utils";

export function Select({
  className,
  ...props
}: React.ComponentProps<"select">) {
  return (
    <select
      className={cn(
        "h-11 w-full rounded-xl border border-input/80 bg-background/80 px-3 text-sm text-foreground outline-none transition focus-visible:border-primary/60 focus-visible:bg-card/80 focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
