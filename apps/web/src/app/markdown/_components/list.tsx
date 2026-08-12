"use client";

import { useGetMarkdownList } from "@/generated/api";
import { Display } from "./display";
import { Label } from "./label";
import { Row } from "./row";

export default function List() {
  const { data, isLoading, error } = useGetMarkdownList();

  if (isLoading) {
    return <Label className="py-6">[SYSTEM STATUS: LOADING]</Label>;
  }

  if (error) {
    return (
      <p className="py-6 font-medium text-(--m-lime) tracking-wide">
        [SYSTEM STATUS: CRITICAL] {error.message}
      </p>
    );
  }

  if (!data?.data?.length) {
    return (
      <div className="space-y-3 py-6">
        <Label>[SYSTEM STATUS: EMPTY]</Label>
        <p className="text-(--m-muted) text-sm">
          No transmissions on file. Create the first entry.
        </p>
      </div>
    );
  }

  return (
    <ul className="flex flex-col">
      {data.data.map((item, index) => (
        <li key={item.id}>
          <Row href={`/markdown/${item.id}`}>
            <span className="flex min-w-0 flex-col gap-1">
              <Display as="span" className="text-xl md:text-2xl">
                {item.title}
              </Display>
              <span className="truncate text-xs uppercase tracking-[0.18em] opacity-70">
                {item.slug}
              </span>
            </span>
            <span className="shrink-0 text-xs tabular-nums tracking-[0.2em] opacity-70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Row>
        </li>
      ))}
    </ul>
  );
}
