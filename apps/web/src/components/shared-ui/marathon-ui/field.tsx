import type { ComponentProps } from "react";
import {
  Field as UiField,
  FieldDescription as UiFieldDescription,
  FieldError as UiFieldError,
  FieldLabel as UiFieldLabel,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

export function Field({ className, ...props }: ComponentProps<typeof UiField>) {
  return (
    <UiField
      className={cn("gap-0 data-[invalid=true]:text-(--critical)", className)}
      {...props}
    />
  );
}

export function FieldLabel({
  className,
  ...props
}: ComponentProps<typeof UiFieldLabel>) {
  return (
    <UiFieldLabel
      className={cn(
        "font-(family-name:--font-mu-mono) font-bold text-(--fg) text-[11px] tracking-[0.08em]",
        className,
      )}
      {...props}
    />
  );
}

export function FieldError({
  className,
  ...props
}: ComponentProps<typeof UiFieldError>) {
  return (
    <UiFieldError
      className={cn(
        "font-(family-name:--font-mu-mono) mt-1.5 block text-(--critical) text-xs",
        className,
      )}
      {...props}
    />
  );
}

export function FieldDescription({
  className,
  ...props
}: ComponentProps<typeof UiFieldDescription>) {
  return (
    <UiFieldDescription className={cn("text-muted", className)} {...props} />
  );
}
