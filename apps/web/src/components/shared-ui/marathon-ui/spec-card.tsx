import type { ComponentProps } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function SpecCard({
  className,
  wide,
  ...props
}: ComponentProps<typeof Card> & { wide?: boolean }) {
  return (
    <Card
      className={cn(
        "min-w-0 gap-0 rounded-none bg-(--panel) py-0 text-(--fg) ring-(--line) ring-1",
        wide && "col-span-full max-sm:col-auto",
        className,
      )}
      {...props}
    />
  );
}

export function SpecCardHeader({
  className,
  ...props
}: ComponentProps<typeof CardHeader>) {
  return (
    <CardHeader
      className={cn(
        "flex h-11.5 flex-row items-center justify-between gap-2 rounded-none border-(--line) border-b px-4 py-0",
        className,
      )}
      {...props}
    />
  );
}

export function SpecCardTitle({
  className,
  ...props
}: ComponentProps<typeof CardTitle>) {
  return (
    <CardTitle
      className={cn(
        "font-(family-name:--font-mu-mono) font-bold text-[10px] tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export function SpecCardMeta({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-(family-name:--font-mu-mono) text-[10px] text-muted tracking-widest",
        className,
      )}
      {...props}
    />
  );
}

export function SpecCardContent({
  className,
  ...props
}: ComponentProps<typeof CardContent>) {
  return (
    <CardContent
      data-mu-demo
      className={cn("p-[clamp(22px,4vw,48px)]", className)}
      {...props}
    />
  );
}
