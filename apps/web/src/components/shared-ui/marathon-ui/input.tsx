import type { ComponentProps } from "react";
import { Input as UiInput } from "@/components/ui/input";
import { cn } from "@/lib/utils";

export function Input({ className, ...props }: ComponentProps<typeof UiInput>) {
  return (
    <UiInput
      className={cn(
        "font-(family-name:--font-mu-mono) mt-2.5 h-auto min-h-12 w-full rounded-none border border-(--line) bg-(--bg) px-3.5 py-0 text-(--fg) text-sm shadow-none",
        "placeholder:text-muted focus-visible:border-(--fg) focus-visible:shadow-[inset_4px_0_0_var(--signal)] focus-visible:ring-0",
        "aria-invalid:border-(--critical) aria-invalid:ring-0 dark:aria-invalid:border-(--critical)",
        "disabled:opacity-50 md:text-sm",
        className,
      )}
      {...props}
    />
  );
}
