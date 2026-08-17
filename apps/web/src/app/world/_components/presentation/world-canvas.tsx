"use client";

import { Canvas } from "@react-three/fiber";
import { Environment } from "@/app/world/_components/presentation/environment";
import { SimulationLoop } from "@/app/world/_components/presentation/simulation-loop";
import { SwarmInstances } from "@/app/world/_components/presentation/swarm-instances";

export function WorldCanvas() {
  return (
    <Canvas
      className="absolute inset-0"
      camera={{ position: [18, 14, 18], fov: 50, near: 0.1, far: 200 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true }}
    >
      <color attach="background" args={["#09090b"]} />
      <Environment />
      <SwarmInstances />
      <SimulationLoop />
    </Canvas>
  );
}
