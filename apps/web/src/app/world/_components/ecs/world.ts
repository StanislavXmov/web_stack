import { createWorld } from "koota";
import { Input, Time } from "@/app/world/_components/ecs/traits";

export function createSimWorld() {
  return createWorld(Time);
}

export function createPlayWorld() {
  return createWorld(Time, Input);
}
