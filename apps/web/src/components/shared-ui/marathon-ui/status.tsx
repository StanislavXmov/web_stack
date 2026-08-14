import type { ComponentProps } from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const variants = {
  ok: "text-[oklch(50%_0.17_145)]",
  warn: "text-[oklch(60%_0.18_65)]",
  fail: "text-(--critical)",
} as const;

export type StatusVariant = keyof typeof variants;

export function Status({
  className,
  variant = "ok",
  ...props
}: Omit<ComponentProps<typeof Badge>, "variant"> & {
  variant?: StatusVariant;
}) {
  return (
    <Badge
      variant="ghost"
      className={cn(
        "font-(family-name:--font-mu-mono) h-auto w-max gap-2 rounded-none border-0 bg-transparent p-0 font-bold text-[11px] uppercase tracking-normal shadow-none",
        "before:size-2 before:shrink-0 before:bg-current before:content-['']",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}
