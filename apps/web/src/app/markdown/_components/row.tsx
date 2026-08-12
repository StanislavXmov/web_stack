import Link from "next/link";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Row({ className, ...props }: ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(
        "flex items-baseline justify-between gap-4 border-(--m-line) border-b border-dashed py-[0.85rem] pr-1 pl-1 text-inherit no-underline transition-[background,color,padding-left] duration-160 hover:bg-(--m-lime) hover:pl-[0.65rem] hover:text-(--m-ink) motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  );
}
