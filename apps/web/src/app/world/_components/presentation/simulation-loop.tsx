"use client";

import { useFrame } from "@react-three/fiber";
import { useWorld } from "koota/react";
import { runSchedule } from "@/app/world/_components/ecs/systems/run-schedule";
import { useWorldStore } from "@/app/world/_components/store";

export function SimulationLoop() {
  const world = useWorld();

  useFrame((_, delta) => {
    const { paused, timeScale } = useWorldStore.getState();
    runSchedule(world, delta, { paused, timeScale });
  });

  return null;
}
