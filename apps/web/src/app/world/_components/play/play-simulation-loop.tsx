"use client";

import { useFrame } from "@react-three/fiber";
import { useWorld } from "koota/react";
import { runPlaySchedule } from "@/app/world/_components/play/run-play-schedule";
import { useWorldStore } from "@/app/world/_components/store";

export function PlaySimulationLoop() {
  const world = useWorld();

  useFrame((_, delta) => {
    const { paused, timeScale } = useWorldStore.getState();
    runPlaySchedule(world, delta, { paused, timeScale });
  });

  return null;
}
