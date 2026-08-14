import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function BrandMark({
  className,
  size = "default",
  children = "V",
}: {
  className?: string;
  size?: "default" | "small";
  children?: ReactNode;
}) {
  return (
    <span
      className={cn(
        "font-(family-name:--font-mu-display) grid place-items-center bg-(--signal) font-black text-(--void)",
        "[clip-path:polygon(0_0,100%_0,78%_100%,22%_100%)]",
        size === "default" && "size-7.5 text-[18px] leading-none",
        size === "small" && "size-6 text-[13px] leading-none",
        className,
      )}
      aria-hidden={typeof children === "string" ? true : undefined}
    >
      {children}
    </span>
  );
}
