"use client";

import { Canvas } from "@react-three/fiber";
import { FollowCamera } from "@/app/world/_components/play/follow-camera";
import { InputCollector } from "@/app/world/_components/play/input-collector";
import { PlayEnvironment } from "@/app/world/_components/play/play-environment";
import { PlaySimulationLoop } from "@/app/world/_components/play/play-simulation-loop";
import { PlayerMesh } from "@/app/world/_components/play/player-mesh";
import { SwarmInstances } from "@/app/world/_components/presentation/swarm-instances";

export function PlayCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [12, 10, 12], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#09090b"]} />
      <PlayEnvironment />
      <SwarmInstances />
      <PlayerMesh />
      <InputCollector />
      <FollowCamera />
      <PlaySimulationLoop />
    </Canvas>
  );
}
