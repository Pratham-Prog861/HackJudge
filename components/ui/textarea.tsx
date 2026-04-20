import { cn } from "@/lib/utils";

export function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      className={cn(
        "min-h-28 w-full rounded-xl border border-input/80 bg-background/80 px-3 py-2 text-sm text-foreground outline-none transition placeholder:text-muted-foreground/70 focus-visible:border-primary/60 focus-visible:bg-card/80 focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-60",
        className,
      )}
      {...props}
    />
  );
}
