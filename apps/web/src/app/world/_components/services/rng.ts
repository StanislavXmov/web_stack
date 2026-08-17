export type Vec3 = { x: number; y: number; z: number };

export type Rng = {
  next: () => number;
  range: (min: number, max: number) => number;
  unitVec3: () => Vec3;
};

export function createRng(seed = 1): Rng {
  let state = seed >>> 0 || 1;

  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 0x100000000;
  };

  const range = (min: number, max: number) => min + next() * (max - min);

  const unitVec3 = (): Vec3 => {
    const x = range(-1, 1);
    const y = range(-1, 1);
    const z = range(-1, 1);
    const length = Math.hypot(x, y, z) || 1;
    return { x: x / length, y: y / length, z: z / length };
  };

  return { next, range, unitVec3 };
}

export const simRng = createRng(42);
