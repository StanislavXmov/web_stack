import { createWorld } from "koota";
import { Time } from "@/app/world/_components/ecs/traits";

export function createSimWorld() {
  return createWorld(Time);
}
