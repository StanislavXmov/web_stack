import { createActions, type World } from "koota";
import {
  AGENT_SPEED,
  SWARM_COUNT,
  WORLD_EXTENT,
} from "@/app/world/_components/ecs/constants";
import {
  Agent,
  Color,
  Instance,
  Position,
  Velocity,
  Wander,
} from "@/app/world/_components/ecs/traits";

import { createRng, simRng } from "@/app/world/_components/services/rng";

function hueToRgb(hue: number) {
  const a = 0.45;
  const l = 0.62;
  const f = (n: number) => {
    const k = (n + hue * 12) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return { r: f(0), g: f(8), b: f(4) };
}

function destroyAgents(world: World) {
  for (const entity of world.query(Agent)) {
    entity.destroy();
  }
}

function spawnAgents(world: World, count: number) {
  const used = new Set<number>();
  world.query(Instance).updateEach(([instance]) => {
    used.add(instance.index);
  });

  const rng = createRng((simRng.next() * 0xffffffff) >>> 0);
  const spawnExtent = WORLD_EXTENT * 0.72;
  let spawned = 0;

  for (let index = 0; index < SWARM_COUNT && spawned < count; index++) {
    if (used.has(index)) continue;

    const direction = rng.unitVec3();
    const speed = rng.range(AGENT_SPEED * 0.5, AGENT_SPEED * 1.3);
    const color = hueToRgb(rng.next());

    world.spawn(
      Agent,
      Instance({ index }),
      Position({
        x: rng.range(-spawnExtent, spawnExtent),
        y: rng.range(-spawnExtent, spawnExtent),
        z: rng.range(-spawnExtent, spawnExtent),
      }),
      Velocity({
        x: direction.x * speed,
        y: direction.y * speed,
        z: direction.z * speed,
      }),
      Color(color),
      Wander({ nextAt: rng.range(0.2, 1.4) }),
    );
    spawned += 1;
  }
}

export const worldActions = createActions((world) => ({
  spawnSwarm: (count = SWARM_COUNT) => {
    spawnAgents(world, count);
  },
  destroyAllAgents: () => {
    destroyAgents(world);
  },
  resetSwarm: (count = SWARM_COUNT) => {
    destroyAgents(world);
    spawnAgents(world, count);
  },
}));
