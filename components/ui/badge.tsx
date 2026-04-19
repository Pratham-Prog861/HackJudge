import { cn } from "@/lib/utils";

export function Badge({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-border/70 bg-muted px-2.5 py-1 text-xs font-semibold tracking-wide",
        className,
      )}
      {...props}
    />
  );
}
