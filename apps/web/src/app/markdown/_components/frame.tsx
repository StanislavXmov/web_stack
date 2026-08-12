import type { ComponentProps, ElementType, ReactNode } from "react";
import { cn } from "@/lib/utils";

type FrameProps<T extends ElementType = "div"> = {
  as?: T;
  className?: string;
  children?: ReactNode;
} & Omit<ComponentProps<T>, "as" | "className" | "children">;

export function Frame<T extends ElementType = "div">({
  as,
  className,
  children,
  ...props
}: FrameProps<T>) {
  const Comp = as ?? "div";
  return (
    <Comp
      className={cn(
        "relative border border-(--m-line) bg-[color-mix(in_srgb,var(--m-ink)_12%,transparent)]",
        className,
      )}
      {...props}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute top-[-0.35rem] left-[-0.35rem] font-bold text-(--m-lime) text-[0.75rem] leading-none"
      >
        +
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute right-[-0.35rem] bottom-[-0.35rem] font-bold text-(--m-lime) text-[0.75rem] leading-none"
      >
        +
      </span>
      {children}
    </Comp>
  );
}
