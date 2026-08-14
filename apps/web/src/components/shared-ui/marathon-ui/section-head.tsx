import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Eyebrow({ className, ...props }: ComponentProps<"p">) {
  return (
    <p
      className={cn(
        "font-(family-name:--font-mu-mono) m-0 font-bold text-[11px] text-muted leading-[1.2] tracking-[0.14em]",
        className,
      )}
      {...props}
    />
  );
}

export function SectionHead({
  index,
  eyebrow,
  title,
  description,
  vertical,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  description: string;
  vertical?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-15 grid grid-cols-[56px_minmax(250px,0.8fr)_1fr] items-start gap-6 max-md:mb-9.5 max-md:grid-cols-[38px_1fr]",
        vertical && "mb-0 block",
        className,
      )}
    >
      <span
        className={cn(
          "font-(family-name:--font-mu-display) font-black text-(--hazard) text-[28px] leading-none",
          vertical && "mb-5.5 block",
        )}
      >
        {index}
      </span>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2
          className={cn(
            "font-(family-name:--font-mu-display) mt-3 mb-0 font-black text-[clamp(38px,5vw,72px)] uppercase leading-[0.9] tracking-[-0.035em]",
            vertical && "mt-3",
          )}
        >
          {title}
        </h2>
      </div>
      <p
        className={cn(
          "mt-6 mb-0 max-w-130 text-[17px] text-muted max-md:col-start-2",
          vertical && "mt-7",
        )}
      >
        {description}
      </p>
    </div>
  );
}
