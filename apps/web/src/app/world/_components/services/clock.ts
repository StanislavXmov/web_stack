import { MAX_DELTA } from "@/app/world/_components/ecs/constants";

export function clampDelta(delta: number): number {
  if (delta <= 0) return 0;
  return delta > MAX_DELTA ? MAX_DELTA : delta;
}

export function scaledDelta(rawDelta: number, timeScale: number): number {
  return clampDelta(rawDelta) * timeScale;
}
