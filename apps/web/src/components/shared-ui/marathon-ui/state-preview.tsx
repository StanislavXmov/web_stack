import { cn } from "@/lib/utils";

export function StatePreview({
  className,
  variant = "idle",
  title,
  description,
  code,
}: {
  className?: string;
  variant?: "idle" | "active" | "danger";
  title: string;
  description: string;
  code?: string;
}) {
  return (
    <div
      className={cn(
        "grid grid-cols-[72px_1fr_auto] items-center gap-5.5 border border-(--line) bg-(--bg) p-6 max-sm:grid-cols-[52px_1fr]",
        variant === "danger" && "border-(--critical)",
        className,
      )}
    >
      <span
        className={cn(
          "font-(family-name:--font-mu-mono) grid size-16 place-items-center rounded-full border border-(--line) font-light text-[34px] text-muted leading-none max-sm:size-12.5",
          variant === "active" &&
            "border-(--signal) bg-(--signal) text-(--void)",
          variant === "danger" &&
            "border-(--critical) bg-(--critical) text-white",
        )}
        aria-hidden
      >
        +
      </span>
      <div>
        <b className="block font-bold text-[15px]">{title}</b>
        <p className="mt-1 mb-0 text-[13px] text-muted">{description}</p>
      </div>
      {code ? (
        <code className="font-(family-name:--font-mu-mono) text-[11px] text-muted max-sm:col-start-2">
          {code}
        </code>
      ) : null}
    </div>
  );
}
