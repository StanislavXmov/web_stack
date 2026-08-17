import type { World } from "koota";
import { movement } from "@/app/world/_components/ecs/systems/movement";
import { syncInstances } from "@/app/world/_components/ecs/systems/sync-instances";
import { updateTime } from "@/app/world/_components/ecs/systems/update-time";
import { wander } from "@/app/world/_components/ecs/systems/wander";

export function runSchedule(
  world: World,
  rawDelta: number,
  options: { paused: boolean; timeScale: number },
): void {
  if (!options.paused) {
    updateTime(world, rawDelta, options.timeScale);
    wander(world);
    movement(world);
  }

  syncInstances(world);
}
