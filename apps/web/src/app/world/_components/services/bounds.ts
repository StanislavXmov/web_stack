import { WORLD_EXTENT } from "@/app/world/_components/ecs/constants";
import type { Vec3 } from "@/app/world/_components/services/rng";

export function bounceInBounds(
  position: Vec3,
  velocity: Vec3,
  extent = WORLD_EXTENT,
): void {
  if (position.x > extent) {
    position.x = extent;
    velocity.x *= -1;
  } else if (position.x < -extent) {
    position.x = -extent;
    velocity.x *= -1;
  }

  if (position.y > extent) {
    position.y = extent;
    velocity.y *= -1;
  } else if (position.y < -extent) {
    position.y = -extent;
    velocity.y *= -1;
  }

  if (position.z > extent) {
    position.z = extent;
    velocity.z *= -1;
  } else if (position.z < -extent) {
    position.z = -extent;
    velocity.z *= -1;
  }
}
