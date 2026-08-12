"use client";

import Link from "next/link";
import { useGetMarkdownList } from "@/generated/api";

export default function List() {
  const { data, isLoading, error } = useGetMarkdownList();

  if (isLoading) {
    return <p className="marathon-label py-6">[SYSTEM STATUS: LOADING]</p>;
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
        <p className="marathon-label">[SYSTEM STATUS: EMPTY]</p>
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
          <Link href={`/markdown/${item.id}`} className="marathon-row">
            <span className="flex min-w-0 flex-col gap-1">
              <span className="marathon-display text-xl md:text-2xl">
                {item.title}
              </span>
              <span className="truncate text-xs uppercase tracking-[0.18em] opacity-70">
                {item.slug}
              </span>
            </span>
            <span className="shrink-0 text-xs tabular-nums tracking-[0.2em] opacity-70">
              {String(index + 1).padStart(2, "0")}
            </span>
          </Link>
        </li>
      ))}
    </ul>
  );
}
