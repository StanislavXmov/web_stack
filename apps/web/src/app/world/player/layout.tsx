import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
  title: "World / Player",
};

export default function PlayerLayout({ children }: { children: ReactNode }) {
  return children;
}
