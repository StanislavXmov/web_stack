import type { ComponentProps } from "react";
import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<typeof UiInput>) {
  return (
    <UiInput
      className={cn(
        "font-(family-name:--font-marathon-mono) h-auto w-full rounded-none border-(--m-ink) border-0 border-b-2 bg-[color-mix(in_srgb,var(--m-lime)_8%,transparent)] px-3 py-[0.65rem] text-(--m-white) text-[0.9rem] shadow-none outline-none transition-[background,box-shadow] duration-160 placeholder:text-(--m-muted) focus-visible:border-(--m-ink) focus-visible:bg-(--m-lime) focus-visible:text-(--m-ink) focus-visible:shadow-[0_0_0_2px_var(--m-ink)] focus-visible:ring-0 disabled:bg-[color-mix(in_srgb,var(--m-lime)_8%,transparent)] motion-reduce:transition-none dark:bg-[color-mix(in_srgb,var(--m-lime)_8%,transparent)]",
        className,
      )}
      {...props}
    />
  );
}
