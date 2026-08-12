import { Markdown as MarkdownComponent } from "@tanstack/markdown/react";
import type { MarkdownDto } from "@/generated/api";
import { ButtonLink } from "./button";
import { Display } from "./display";
import { Dots } from "./dots";
import { Frame } from "./frame";
import { Label } from "./label";
import { Prose } from "./prose";

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
          <Label>System {/* Detail */}</Label>
          <Display className="text-[clamp(2.2rem,7vw,4.5rem)] text-white">
            {markdown.title}
          </Display>
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
        <ButtonLink href="/markdown" variant="ghost">
          Back
        </ButtonLink>
      </header>

      <Frame className="p-4 md:p-6">
        <div className="mb-5 flex items-center justify-between gap-3 border-(--m-line) border-b border-dashed pb-3">
          <Label>Rendered payload</Label>
          <Dots count={12} />
        </div>
        <Prose>
          <MarkdownComponent>{markdown.content}</MarkdownComponent>
        </Prose>
      </Frame>
    </article>
  );
}
