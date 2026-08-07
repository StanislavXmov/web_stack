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
    return <div>Markdown not found</div>;
  }

  return (
    <div>
      <h1>Markdown {id}</h1>
      <Markdown markdown={data} />
    </div>
  );
}
