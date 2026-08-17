import type { World } from "koota";
import { Time } from "@/app/world/_components/ecs/traits";
import { scaledDelta } from "@/app/world/_components/services/clock";

export function updateTime(
  world: World,
  rawDelta: number,
  timeScale: number,
): void {
  const delta = scaledDelta(rawDelta, timeScale);
  if (!world.has(Time)) {
    world.add(Time);
  }
  world.set(Time, (previous) => ({
    delta,
    elapsed: (previous?.elapsed ?? 0) + delta,
  }));
}
