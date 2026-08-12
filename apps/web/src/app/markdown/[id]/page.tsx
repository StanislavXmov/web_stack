import { getMarkdownById } from "@/generated/api";
import Markdown from "./_components/markdown";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { data } = await getMarkdownById(id);

  if (!data) {
    return (
      <div className="space-y-4">
        <p className="marathon-label">[SYSTEM STATUS: CRITICAL]</p>
        <h1 className="marathon-display text-4xl text-white">
          Markdown not found
        </h1>
        <p className="text-(--m-muted) text-sm tracking-wide">
          Transmission `{id}` is missing from the archive.
        </p>
      </div>
    );
  }

  return <Markdown markdown={data} />;
}
