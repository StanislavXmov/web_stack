import { Markdown as MarkdownComponent } from "@tanstack/markdown/react";
import Link from "next/link";
import type { MarkdownDto } from "@/generated/api";

function formatStamp(value: string | Date) {
  const date = typeof value === "string" ? new Date(value) : value;
  if (Number.isNaN(date.getTime())) return "—";
  return date.toISOString().replace("T", " ").slice(0, 19);
}

export default function Markdown({ markdown }: { markdown: MarkdownDto }) {
  return (
    <article className="flex flex-col gap-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="marathon-label">System {/* Detail */}</p>
          <h1 className="marathon-display text-[clamp(2.2rem,7vw,4.5rem)] text-white">
            {markdown.title}
          </h1>
          <div className="flex flex-wrap gap-x-5 gap-y-2 text-(--m-muted) text-xs uppercase tracking-[0.18em]">
            <span>
              Slug {/*  */}
              {markdown.slug}
            </span>
            <span>
              Created {/*  */}
              {formatStamp(markdown.createdAt)}
            </span>
            <span>
              Updated {/*  */}
              {formatStamp(markdown.updatedAt)}
            </span>
          </div>
        </div>
        <Link href="/markdown" className="marathon-btn marathon-btn--ghost">
          Back
        </Link>
      </header>

      <section className="marathon-frame p-4 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3 border-(--m-line) border-b border-dashed pb-3">
          <p className="marathon-label">Rendered payload</p>
          <div className="marathon-dots" aria-hidden="true">
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
            <span />
          </div>
        </div>
        <div className="marathon-prose">
          <MarkdownComponent>{markdown.content}</MarkdownComponent>
        </div>
      </section>
    </article>
  );
}
