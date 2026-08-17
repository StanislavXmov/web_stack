"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useWorld } from "koota/react";
import { Vector3 } from "three";
import { Player, Position } from "@/app/world/_components/ecs/traits";

const offset = new Vector3(12, 10, 12);
const desired = new Vector3();
const look = new Vector3();

export function FollowCamera() {
  const world = useWorld();
  const camera = useThree((state) => state.camera);

  useFrame((_, delta) => {
    const player = world.queryFirst(Player, Position);
    const position = player?.get(Position);
    if (!position) return;

    desired.set(position.x, position.y, position.z).add(offset);
    const t = 1 - Math.exp(-6 * delta);
    camera.position.lerp(desired, t);
    look.set(position.x, 0.75, position.z);
    camera.lookAt(look);
  });

  return null;
}
