import type { ComponentProps } from "react";
import { Button as UiButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const base =
  "min-h-12 h-auto rounded-none border border-(--fg) bg-transparent px-5.5 py-0 font-(family-name:--font-mu-mono) text-xs font-extrabold tracking-[0.06em] text-(--fg) shadow-none transition-[box-shadow,transform,background,color,border-color] duration-150 ease-out hover:bg-transparent focus-visible:border-(--info) focus-visible:ring-0 focus-visible:outline-3 focus-visible:outline-offset-3 focus-visible:outline-(--info) active:translate-y-0 disabled:pointer-events-none disabled:opacity-[0.32] motion-reduce:transition-none";

const variants = {
  primary:
    "border-(--signal) bg-(--signal) text-(--void) hover:bg-(--signal) hover:text-(--void) hover:shadow-[6px_6px_0_var(--fg)] hover:-translate-x-0.5 hover:-translate-y-0.5",
  secondary:
    "border-(--fg) bg-(--fg) text-(--bg) hover:bg-(--fg) hover:text-(--bg)",
  ghost:
    "border-transparent bg-transparent underline underline-offset-4 hover:bg-transparent",
} as const;

export type MarathonButtonVariant = keyof typeof variants;

export function Button({
  className,
  variant = "primary",
  ...props
}: Omit<ComponentProps<typeof UiButton>, "variant" | "size"> & {
  variant?: MarathonButtonVariant;
}) {
  return (
    <UiButton
      variant="outline"
      size="default"
      className={cn(base, variants[variant], className)}
      {...props}
    />
  );
}
