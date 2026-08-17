"use client";

import { useActions, WorldProvider } from "koota/react";
import { useEffect, useState } from "react";
import { SWARM_COUNT } from "@/app/world/_components/ecs/constants";
import { createPlayWorld } from "@/app/world/_components/ecs/world";
import { playActions } from "@/app/world/_components/play/play-actions";
import { PlayCanvas } from "@/app/world/_components/play/play-canvas";
import { PlayHud } from "@/app/world/_components/play/play-hud";

function PlayBootstrap() {
  const { spawnSwarm, spawnPlayer, destroyPlay } = useActions(playActions);

  useEffect(() => {
    spawnPlayer();
    spawnSwarm(SWARM_COUNT);
    return () => {
      destroyPlay();
    };
  }, [destroyPlay, spawnPlayer, spawnSwarm]);

  return null;
}

export default function PlayApp() {
  const [world] = useState(() => createPlayWorld());

  return (
    <WorldProvider world={world}>
      <div className="relative h-dvh w-full overflow-hidden bg-zinc-950">
        <PlayCanvas />
        <PlayHud />
        <PlayBootstrap />
      </div>
    </WorldProvider>
  );
}
