import { cn } from "@/lib/utils";

export function Dots({
  count = 16,
  className,
}: {
  count?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={cn("grid grid-cols-4 gap-[0.35rem]", className)}
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          className="size-[0.4rem] rounded-full bg-(--m-ink) opacity-85"
        />
      ))}
    </div>
  );
}
