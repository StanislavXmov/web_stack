"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { useWorld } from "koota/react";
import { useEffect } from "react";
import { Vector3 } from "three";
import { WORLD_EXTENT } from "@/app/world/_components/ecs/constants";
import { Input, MoveTarget, Player } from "@/app/world/_components/ecs/traits";
import {
  rawAxisFromKeys,
  resetKeyAxis,
  setKeyAxis,
} from "@/app/world/_components/services/input";

const forward = new Vector3();
const right = new Vector3();
const desired = new Vector3();

function isTypingTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
  );
}

export function InputCollector() {
  const world = useWorld();
  const camera = useThree((state) => state.camera);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (isTypingTarget(event.target)) return;
      setKeyAxis(event.code, true);
    };
    const onKeyUp = (event: KeyboardEvent) => {
      setKeyAxis(event.code, false);
    };
    const onBlur = () => {
      resetKeyAxis();
    };

    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("blur", onBlur);
      resetKeyAxis();
    };
  }, []);

  useFrame(() => {
    if (!world.has(Input)) {
      world.add(Input);
    }

    const axis = rawAxisFromKeys();
    camera.getWorldDirection(forward);
    forward.y = 0;
    if (forward.lengthSq() < 1e-6) {
      forward.set(0, 0, -1);
    } else {
      forward.normalize();
    }
    right.set(forward.z, 0, -forward.x);

    desired
      .set(0, 0, 0)
      .addScaledVector(right, axis.x)
      .addScaledVector(forward, axis.z);

    if (desired.lengthSq() > 1) {
      desired.normalize();
    }

    world.set(Input, { x: desired.x, z: desired.z });
  });

  return (
    <mesh
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
      onPointerDown={(event) => {
        event.stopPropagation();
        const player = world.queryFirst(Player);
        if (!player) return;
        player.set(MoveTarget, {
          x: event.point.x,
          z: event.point.z,
          active: true,
        });
      }}
    >
      <planeGeometry args={[WORLD_EXTENT * 2, WORLD_EXTENT * 2]} />
      <meshBasicMaterial transparent opacity={0} depthWrite={false} />
    </mesh>
  );
}
