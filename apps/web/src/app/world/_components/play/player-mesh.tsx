"use client";

import { useFrame } from "@react-three/fiber";
import { useWorld } from "koota/react";
import { useRef } from "react";
import type { Mesh } from "three";
import { Player, Position } from "@/app/world/_components/ecs/traits";

export function PlayerMesh() {
  const world = useWorld();
  const ref = useRef<Mesh>(null);

  useFrame(() => {
    const mesh = ref.current;
    if (!mesh) return;
    const player = world.queryFirst(Player, Position);
    const position = player?.get(Position);
    if (!position) return;
    mesh.position.set(position.x, 0.75, position.z);
  });

  return (
    <mesh ref={ref} castShadow>
      <capsuleGeometry args={[0.35, 0.8, 4, 8]} />
      <meshStandardMaterial color="#fbbf24" roughness={0.4} metalness={0.1} />
    </mesh>
  );
}
