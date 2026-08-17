import type { World } from "koota";
import { PLAYER_SPEED } from "@/app/world/_components/ecs/constants";
import {
  Input,
  MoveTarget,
  Player,
  Position,
  Velocity,
} from "@/app/world/_components/ecs/traits";

export function playerControl(world: World): void {
  const input = world.get(Input);
  const axisX = input?.x ?? 0;
  const axisZ = input?.z ?? 0;
  const inputLength = Math.hypot(axisX, axisZ);

  world
    .query(Position, Velocity, MoveTarget, Player)
    .updateEach(([position, velocity, target]) => {
      if (inputLength > 0.01) {
        const inv = 1 / inputLength;
        velocity.x = axisX * inv * PLAYER_SPEED;
        velocity.y = 0;
        velocity.z = axisZ * inv * PLAYER_SPEED;
        target.active = false;
        position.y = 0;
        return;
      }

      if (target.active) {
        const dx = target.x - position.x;
        const dz = target.z - position.z;
        const dist = Math.hypot(dx, dz);
        if (dist < 0.2) {
          velocity.x = 0;
          velocity.y = 0;
          velocity.z = 0;
          target.active = false;
          position.y = 0;
          return;
        }
        const inv = PLAYER_SPEED / dist;
        velocity.x = dx * inv;
        velocity.y = 0;
        velocity.z = dz * inv;
        position.y = 0;
        return;
      }

      velocity.x = 0;
      velocity.y = 0;
      velocity.z = 0;
      position.y = 0;
    });
}
