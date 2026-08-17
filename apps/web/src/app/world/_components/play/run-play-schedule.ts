import type { World } from "koota";
import { movement } from "@/app/world/_components/ecs/systems/movement";
import { playerControl } from "@/app/world/_components/ecs/systems/player-control";
import { syncInstances } from "@/app/world/_components/ecs/systems/sync-instances";
import { updateTime } from "@/app/world/_components/ecs/systems/update-time";
import { wander } from "@/app/world/_components/ecs/systems/wander";

export function runPlaySchedule(
  world: World,
  rawDelta: number,
  options: { paused: boolean; timeScale: number },
): void {
  if (!options.paused) {
    updateTime(world, rawDelta, options.timeScale);
    playerControl(world);
    wander(world);
    movement(world);
  }

  syncInstances(world);
}
