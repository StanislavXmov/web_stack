"use client";

import { Grid } from "@react-three/drei";
import { WORLD_EXTENT } from "@/app/world/_components/ecs/constants";
import { useWorldStore } from "@/app/world/_components/store";

export function PlayEnvironment() {
  const showGrid = useWorldStore((state) => state.showGrid);
  const size = WORLD_EXTENT * 2;

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[14, 18, 10]} intensity={1.15} />
      <pointLight position={[-12, -4, -10]} intensity={0.45} color="#7dd3fc" />
      <mesh>
        <boxGeometry args={[size, size, size]} />
        <meshBasicMaterial color="#3f3f46" wireframe />
      </mesh>
      {showGrid ? (
        <Grid
          infiniteGrid
          fadeDistance={48}
          fadeStrength={1.4}
          cellSize={1}
          sectionSize={5}
          cellColor="#27272a"
          sectionColor="#3f3f46"
          position={[0, 0, 0]}
        />
      ) : null}
    </>
  );
}
