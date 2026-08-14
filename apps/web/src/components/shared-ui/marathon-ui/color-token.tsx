"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

export function ColorToken({
  name,
  cssVar,
  value,
  color,
  className,
}: {
  name: string;
  cssVar: string;
  value: string;
  color: string;
  className?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard?.writeText(value);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Копировать ${value}`}
      className={cn(
        "group cursor-pointer appearance-none border-(--line) border-0 border-r border-b bg-(--panel) p-0 text-left",
        className,
      )}
    >
      <span
        data-mu-swatch
        className="flex h-47.5 items-end p-3.5 max-sm:h-37.5"
        style={{ background: color }}
      >
        <i
          className={cn(
            "font-(family-name:--font-mu-mono) translate-y-1 bg-(--void) px-2.5 py-1.5 font-extrabold text-[10px] text-white not-italic tracking-[0.12em] opacity-0 transition-[opacity,transform] duration-150",
            "group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100",
            copied && "translate-y-0 opacity-100",
          )}
        >
          {copied ? "COPIED" : "COPY"}
        </i>
      </span>
      <span className="grid grid-cols-[1fr_auto] gap-x-3 gap-y-2 p-4.25">
        <b className="font-bold text-sm">{name}</b>
        <code className="col-start-2 row-start-1 text-[11px] text-muted">
          {cssVar}
        </code>
        <code className="text-[11px] text-muted">{value}</code>
      </span>
    </button>
  );
}
