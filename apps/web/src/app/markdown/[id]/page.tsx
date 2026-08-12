import { getMarkdownById } from "@/generated/api";
import { Display } from "../_components/display";
import { Label } from "../_components/label";
import Markdown from "../_components/markdown";

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
        <Label>[SYSTEM STATUS: CRITICAL]</Label>
        <Display className="text-4xl text-white">Markdown not found</Display>
        <p className="text-(--m-muted) text-sm tracking-wide">
          Transmission `{id}` is missing from the archive.
        </p>
      </div>
    );
  }

  return <Markdown markdown={data} />;
}
