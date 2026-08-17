import { trait } from "koota";
import type { InstancedMesh } from "three";

export const Position = trait({ x: 0, y: 0, z: 0 });
export const Velocity = trait({ x: 0, y: 0, z: 0 });
export const Color = trait({ r: 1, g: 1, b: 1 });
export const Instance = trait({ index: 0 });
export const Wander = trait({ nextAt: 0 });
export const Agent = trait();
export const Player = trait();
export const MoveTarget = trait({ x: 0, z: 0, active: false });
export const Input = trait({ x: 0, z: 0 });
export const Time = trait({ delta: 0, elapsed: 0 });
export const SwarmMesh = trait(() => ({
  object: null as InstancedMesh | null,
}));
