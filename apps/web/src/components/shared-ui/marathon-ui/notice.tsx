import type { ComponentProps } from "react";
import {
  Alert,
  AlertAction,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert";
import { cn } from "@/lib/utils";

export function Notice({ className, ...props }: ComponentProps<typeof Alert>) {
  return (
    <Alert
      className={cn(
        "grid grid-cols-[34px_1fr_auto] items-start gap-3.5 rounded-none border border-[#39434a] bg-[#151b20] px-4.5 py-4.5 text-(--fg) shadow-none",
        "has-[>svg]:grid-cols-[34px_1fr_auto] has-[>svg]:gap-x-3.5 *:[svg]:row-auto *:[svg]:translate-y-0",
        className,
      )}
      {...props}
    />
  );
}

export function NoticeIndex({ className, ...props }: ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "font-(family-name:--font-mu-display) font-black text-(--signal) text-xl leading-none",
        className,
      )}
      {...props}
    />
  );
}

export function NoticeTitle({
  className,
  ...props
}: ComponentProps<typeof AlertTitle>) {
  return (
    <AlertTitle
      className={cn("font-bold text-[#f4f7f8] text-sm", className)}
      {...props}
    />
  );
}

export function NoticeDescription({
  className,
  ...props
}: ComponentProps<typeof AlertDescription>) {
  return (
    <AlertDescription
      className={cn("mt-1 text-[13px] text-muted", className)}
      {...props}
    />
  );
}

export function NoticeAction({
  className,
  ...props
}: ComponentProps<typeof AlertAction>) {
  return (
    <AlertAction
      className={cn(
        "border-0 bg-transparent p-0 text-[23px] text-white leading-none shadow-none hover:bg-transparent",
        className,
      )}
      {...props}
    />
  );
}
