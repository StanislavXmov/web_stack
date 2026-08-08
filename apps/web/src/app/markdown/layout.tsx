import type { Metadata } from "next";
import { IBM_Plex_Mono, Oswald } from "next/font/google";
import type { ReactNode } from "react";
import Shell from "./_components/shell";
import "./_components/marathon.css";

const display = Oswald({
  subsets: ["latin"],
  variable: "--font-marathon-display",
  weight: ["500", "700"],
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  variable: "--font-marathon-mono",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Markdown // Marathon",
};

export default function MarkdownLayout({ children }: { children: ReactNode }) {
  return (
    <div className={`${display.variable} ${mono.variable}`}>
      <Shell>{children}</Shell>
    </div>
  );
}
