import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

export function Prose({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "font-(family-name:--font-marathon-mono) text-(--m-white) text-[0.95rem] leading-[1.65]",
        "[&_:is(h1,h2,h3,h4)]:font-(family-name:--font-marathon-display) [&_:is(h1,h2,h3,h4)]:mt-[1.4em] [&_:is(h1,h2,h3,h4)]:mb-[0.5em] [&_:is(h1,h2,h3,h4)]:uppercase [&_:is(h1,h2,h3,h4)]:leading-[1.05] [&_:is(h1,h2,h3,h4)]:tracking-[0.04em]",
        "[&_h1]:text-[clamp(1.8rem,4vw,2.6rem)] [&_h2]:text-[clamp(1.35rem,3vw,1.85rem)]",
        "[&_a]:text-(--m-lime) [&_a]:underline-offset-[3px]",
        "[&_:is(code,pre)]:border [&_:is(code,pre)]:border-(--m-line) [&_:is(code,pre)]:bg-[color-mix(in_srgb,var(--m-ink)_45%,transparent)]",
        "[&_code]:px-[0.35em] [&_code]:py-[0.1em] [&_code]:text-[0.88em]",
        "[&_pre]:my-4 [&_pre]:overflow-x-auto [&_pre]:p-4",
        "[&_pre_code]:border-0 [&_pre_code]:bg-transparent [&_pre_code]:p-0",
        "[&_:is(ul,ol)]:my-3 [&_:is(ul,ol)]:pl-5",
        "[&_blockquote]:my-4 [&_blockquote]:border-(--m-lime) [&_blockquote]:border-l-[3px] [&_blockquote]:pl-4 [&_blockquote]:text-(--m-muted)",
        "[&_hr]:my-6 [&_hr]:border-(--m-line) [&_hr]:border-0 [&_hr]:border-t [&_hr]:border-dashed",
        className,
      )}
      {...props}
    />
  );
}
