import { cn } from "@/lib/cn";

export function Container({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("mx-auto w-full max-w-[86rem] px-[var(--gutter)]", className)}>{children}</div>;
}
