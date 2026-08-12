import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Display({
  className,
  as: Comp = "h1",
  ...props
}: ComponentProps<"h1"> & { as?: "h1" | "h2" | "h3" | "span" }) {
  return (
    <Comp
      className={cn(
        "font-(family-name:--font-marathon-display) font-bold uppercase leading-[0.95] tracking-[0.04em]",
        className,
      )}
      {...props}
    />
  );
}
