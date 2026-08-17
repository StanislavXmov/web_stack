"use client";

import { useWorld } from "koota/react";
import { useCallback, useEffect, useMemo } from "react";
import type { InstancedMesh } from "three";
import {
  Color,
  DynamicDrawUsage,
  IcosahedronGeometry,
  Matrix4,
  MeshStandardMaterial,
} from "three";
import { SWARM_COUNT } from "@/app/world/_components/ecs/constants";
import { SwarmMesh } from "@/app/world/_components/ecs/traits";

const hiddenMatrix = new Matrix4().makeScale(0, 0, 0);
const white = new Color(1, 1, 1);

export function SwarmInstances() {
  const world = useWorld();
  const geometry = useMemo(() => new IcosahedronGeometry(1, 1), []);
  const material = useMemo(
    () =>
      new MeshStandardMaterial({
        roughness: 0.35,
        metalness: 0.08,
      }),
    [],
  );

  useEffect(() => {
    return () => {
      geometry.dispose();
      material.dispose();
    };
  }, [geometry, material]);

  const attachMesh = useCallback(
    (node: InstancedMesh | null) => {
      const existing = world.queryFirst(SwarmMesh);
      if (existing) {
        existing.destroy();
      }

      if (!node) return;

      node.instanceMatrix.setUsage(DynamicDrawUsage);
      for (let index = 0; index < node.count; index++) {
        node.setMatrixAt(index, hiddenMatrix);
        node.setColorAt(index, white);
      }
      node.instanceMatrix.needsUpdate = true;
      if (node.instanceColor) {
        node.instanceColor.needsUpdate = true;
      }

      world.spawn(SwarmMesh({ object: node }));
    },
    [world],
  );

  return (
    <instancedMesh
      ref={attachMesh}
      args={[geometry, material, SWARM_COUNT]}
      frustumCulled={false}
    />
  );
}
