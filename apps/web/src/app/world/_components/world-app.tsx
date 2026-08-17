"use client";

import { useActions, WorldProvider } from "koota/react";
import { useEffect, useState } from "react";
import { worldActions } from "@/app/world/_components/ecs/actions";
import { SWARM_COUNT } from "@/app/world/_components/ecs/constants";
import { createSimWorld } from "@/app/world/_components/ecs/world";
import { WorldCanvas } from "@/app/world/_components/presentation/world-canvas";
import { WorldHud } from "@/app/world/_components/ui/world-hud";

function WorldBootstrap() {
  const { spawnSwarm, destroyAllAgents } = useActions(worldActions);

  useEffect(() => {
    spawnSwarm(SWARM_COUNT);
    return () => {
      destroyAllAgents();
    };
  }, [destroyAllAgents, spawnSwarm]);

  return null;
}

export default function WorldApp() {
  const [world] = useState(() => createSimWorld());

  return (
    <WorldProvider world={world}>
      <div className="relative h-dvh w-full overflow-hidden bg-zinc-950">
        <WorldCanvas />
        <WorldHud />
        <WorldBootstrap />
      </div>
    </WorldProvider>
  );
}
