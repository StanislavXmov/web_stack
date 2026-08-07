import { Markdown as MarkdownComponent } from "@tanstack/markdown/react";
import { MarkdownDto } from "@/generated/api";

export default function Markdown({ markdown }: { markdown: MarkdownDto }) {
  return (
    <div>
      <h1>{markdown.title}</h1>
      <MarkdownComponent>{markdown.content}</MarkdownComponent>
    </div>
  );
}
