import type { World } from "koota";
import {
  Agent,
  Player,
  Position,
  Time,
  Velocity,
} from "@/app/world/_components/ecs/traits";

import { bounceInBounds } from "@/app/world/_components/services/bounds";

function integrate(
  position: { x: number; y: number; z: number },
  velocity: { x: number; y: number; z: number },
  delta: number,
) {
  position.x += velocity.x * delta;
  position.y += velocity.y * delta;
  position.z += velocity.z * delta;
  bounceInBounds(position, velocity);
}

export function movement(world: World): void {
  const time = world.get(Time);
  if (!time) return;

  const delta = time.delta;

  world.query(Position, Velocity, Agent).updateEach(([position, velocity]) => {
    integrate(position, velocity, delta);
  });

  world.query(Position, Velocity, Player).updateEach(([position, velocity]) => {
    integrate(position, velocity, delta);
    position.y = 0;
    velocity.y = 0;
  });
}
