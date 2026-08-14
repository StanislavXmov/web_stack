import type { Metadata } from "next";
import { JetBrains_Mono, Roboto_Condensed } from "next/font/google";
import type { ReactNode } from "react";

const display = Roboto_Condensed({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mu-display",
  weight: ["700", "900"],
});

const mono = JetBrains_Mono({
  subsets: ["latin", "cyrillic"],
  variable: "--font-mu-mono",
  weight: ["400", "500", "700", "800"],
});

export const metadata: Metadata = {
  title: "Marathon UI",
  description: "Полевая дизайн-система Marathon UI",
};

export default function MarathonUiLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className={`${display.variable} ${mono.variable}`}>{children}</div>
  );
}
