import { createActions, type World } from "koota";
import { worldActions } from "@/app/world/_components/ecs/actions";
import { SWARM_COUNT } from "@/app/world/_components/ecs/constants";
import {
  MoveTarget,
  Player,
  Position,
  Velocity,
} from "@/app/world/_components/ecs/traits";

function destroyPlayers(world: World) {
  for (const entity of world.query(Player)) {
    entity.destroy();
  }
}

function spawnPlayerInto(world: World) {
  destroyPlayers(world);
  world.spawn(
    Player,
    Position({ x: 0, y: 0, z: 0 }),
    Velocity,
    MoveTarget({ x: 0, z: 0, active: false }),
  );
}

export const playActions = createActions((world) => {
  const swarm = worldActions(world);

  return {
    spawnSwarm: swarm.spawnSwarm,
    spawnPlayer: () => {
      spawnPlayerInto(world);
    },
    resetPlay: (count = SWARM_COUNT) => {
      swarm.destroyAllAgents();
      spawnPlayerInto(world);
      swarm.spawnSwarm(count);
    },
    destroyPlay: () => {
      swarm.destroyAllAgents();
      destroyPlayers(world);
    },
  };
});
