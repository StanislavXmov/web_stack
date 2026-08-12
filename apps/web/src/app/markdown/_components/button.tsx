import Link from "next/link";
import type { ComponentProps } from "react";
import { Button as UiButton } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const base =
  "inline-flex h-auto items-center justify-center gap-2 rounded-none border-2 border-(--m-ink) bg-(--m-lime) px-[1.15rem] py-[0.7rem] font-[family-name:var(--font-marathon-display)] text-[0.95rem] font-bold tracking-[0.12em] text-(--m-ink) uppercase no-underline transition-[background,color,transform] duration-[160ms] ease-in-out hover:bg-(--m-ink) hover:text-(--m-lime) focus-visible:border-(--m-ink) focus-visible:ring-0 focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-(--m-white) active:translate-y-0 disabled:pointer-events-none disabled:opacity-55 motion-reduce:transition-none";

const ghost =
  "border-(--m-line) bg-transparent text-(--m-white) hover:border-(--m-ink) hover:bg-(--m-lime) hover:text-(--m-ink)";

type Variant = "default" | "ghost";

export function Button({
  className,
  variant = "default",
  ...props
}: Omit<ComponentProps<typeof UiButton>, "variant" | "size"> & {
  variant?: Variant;
}) {
  return (
    <UiButton
      variant={variant === "ghost" ? "outline" : "default"}
      size="default"
      className={cn(base, variant === "ghost" && ghost, className)}
      {...props}
    />
  );
}

export function ButtonLink({
  className,
  variant = "default",
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return (
    <Link
      className={cn(base, variant === "ghost" && ghost, className)}
      {...props}
    />
  );
}
