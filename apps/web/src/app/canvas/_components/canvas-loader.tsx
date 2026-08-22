"use client";

import dynamic from "next/dynamic";

const Canvas = dynamic(() => import("@/app/canvas/_components/canvas"), {
  ssr: false,
  loading: () => (
    <div className="flex h-dvh items-center justify-center bg-white text-sm text-zinc-400">
      Loading canvas…
    </div>
  ),
});

export function CanvasLoader() {
  return <Canvas />;
}
