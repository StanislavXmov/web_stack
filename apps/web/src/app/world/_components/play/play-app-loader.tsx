"use client";

import dynamic from "next/dynamic";

const PlayApp = dynamic(() => import("@/app/world/_components/play/play-app"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh items-center justify-center bg-zinc-950 text-sm text-zinc-400">
      Loading player…
    </div>
  ),
});

export function PlayAppLoader() {
  return <PlayApp />;
}
