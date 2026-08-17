"use client";

import dynamic from "next/dynamic";

const WorldApp = dynamic(() => import("@/app/world/_components/world-app"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh items-center justify-center bg-zinc-950 text-sm text-zinc-400">
      Loading world…
    </div>
  ),
});

export function WorldAppLoader() {
  return <WorldApp />;
}
