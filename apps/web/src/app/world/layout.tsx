import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "World",
};

export default function WorldLayout({ children }: { children: ReactNode }) {
  return <div className="h-dvh overflow-hidden">{children}</div>;
}
