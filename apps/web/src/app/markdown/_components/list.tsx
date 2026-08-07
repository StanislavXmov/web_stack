"use client";

import Link from "next/link";
import { useGetMarkdownList } from "@/generated/api";

export default function List() {
  const { data, isLoading, error } = useGetMarkdownList();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return <div>No data</div>;

  return (
    <div>
      {data?.data.map((item) => (
        <div key={item.id}>
          <Link href={`/markdown/${item.id}`}>{item.title}</Link>
        </div>
      ))}
    </div>
  );
}
