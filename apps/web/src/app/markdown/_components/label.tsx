import type { ComponentProps, ElementType } from "react";
import { cn } from "@/lib/utils";

type LabelProps<T extends ElementType = "p"> = {
  as?: T;
  className?: string;
} & Omit<ComponentProps<T>, "as" | "className">;

export function Label<T extends ElementType = "p">({
  as,
  className,
  ...props
}: LabelProps<T>) {
  const Comp = as ?? "p";
  return (
    <Comp
      className={cn(
        "text-(--m-muted) text-[0.65rem] uppercase tracking-[0.22em]",
        className,
      )}
      {...props}
    />
  );
}
