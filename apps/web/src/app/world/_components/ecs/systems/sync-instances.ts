import type { World } from "koota";
import { Color, Matrix4, Object3D } from "three";
import {
  AGENT_SCALE,
  SWARM_COUNT,
} from "@/app/world/_components/ecs/constants";
import {
  Agent,
  Color as AgentColor,
  Instance,
  Position,
  SwarmMesh,
} from "@/app/world/_components/ecs/traits";

const dummy = new Object3D();
const dummyColor = new Color();
const hiddenMatrix = new Matrix4().makeScale(0, 0, 0);
const live = new Uint8Array(SWARM_COUNT);

export function syncInstances(world: World): void {
  const meshEntity = world.queryFirst(SwarmMesh);
  if (!meshEntity) return;

  const mesh = meshEntity.get(SwarmMesh)?.object;
  if (!mesh) return;

  live.fill(0);

  world
    .query(Position, AgentColor, Instance, Agent)
    .updateEach(([position, color, instance]) => {
      const index = instance.index;
      if (index < 0 || index >= SWARM_COUNT) return;

      live[index] = 1;
      dummy.position.set(position.x, position.y, position.z);
      dummy.scale.setScalar(AGENT_SCALE);
      dummy.rotation.set(0, 0, 0);
      dummy.updateMatrix();
      mesh.setMatrixAt(index, dummy.matrix);

      dummyColor.setRGB(color.r, color.g, color.b);
      mesh.setColorAt(index, dummyColor);
    });

  for (let index = 0; index < SWARM_COUNT; index++) {
    if (live[index] === 0) {
      mesh.setMatrixAt(index, hiddenMatrix);
    }
  }

  mesh.instanceMatrix.needsUpdate = true;
  if (mesh.instanceColor) {
    mesh.instanceColor.needsUpdate = true;
  }
}
