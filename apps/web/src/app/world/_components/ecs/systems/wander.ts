import type { World } from "koota";
import {
  AGENT_SPEED,
  WANDER_MAX,
  WANDER_MIN,
} from "@/app/world/_components/ecs/constants";

import {
  Agent,
  Time,
  Velocity,
  Wander,
} from "@/app/world/_components/ecs/traits";
import { simRng } from "@/app/world/_components/services/rng";

export function wander(world: World): void {
  const time = world.get(Time);
  if (!time) return;

  const elapsed = time.elapsed;

  world.query(Velocity, Wander, Agent).updateEach(([velocity, wanderState]) => {
    if (elapsed < wanderState.nextAt) return;

    const direction = simRng.unitVec3();
    const speed = simRng.range(AGENT_SPEED * 0.45, AGENT_SPEED * 1.4);
    velocity.x = direction.x * speed;
    velocity.y = direction.y * speed;
    velocity.z = direction.z * speed;
    wanderState.nextAt = elapsed + simRng.range(WANDER_MIN, WANDER_MAX);
  });
}
