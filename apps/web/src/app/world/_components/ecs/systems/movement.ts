import type { World } from "koota";
import {
  Agent,
  Position,
  Time,
  Velocity,
} from "@/app/world/_components/ecs/traits";

import { bounceInBounds } from "@/app/world/_components/services/bounds";

export function movement(world: World): void {
  const time = world.get(Time);
  if (!time) return;

  const delta = time.delta;

  world.query(Position, Velocity, Agent).updateEach(([position, velocity]) => {
    position.x += velocity.x * delta;
    position.y += velocity.y * delta;
    position.z += velocity.z * delta;
    bounceInBounds(position, velocity);
  });
}
