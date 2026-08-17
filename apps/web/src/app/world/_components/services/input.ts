export type KeyAxis = {
  w: boolean;
  a: boolean;
  s: boolean;
  d: boolean;
};

export const keyAxis: KeyAxis = {
  w: false,
  a: false,
  s: false,
  d: false,
};

export function setKeyAxis(code: string, down: boolean): void {
  switch (code) {
    case "KeyW":
    case "ArrowUp":
      keyAxis.w = down;
      break;
    case "KeyA":
    case "ArrowLeft":
      keyAxis.a = down;
      break;
    case "KeyS":
    case "ArrowDown":
      keyAxis.s = down;
      break;
    case "KeyD":
    case "ArrowRight":
      keyAxis.d = down;
      break;
    default:
      break;
  }
}

export function resetKeyAxis(): void {
  keyAxis.w = false;
  keyAxis.a = false;
  keyAxis.s = false;
  keyAxis.d = false;
}

export function rawAxisFromKeys(): { x: number; z: number } {
  return {
    x: (keyAxis.d ? 1 : 0) - (keyAxis.a ? 1 : 0),
    z: (keyAxis.w ? 1 : 0) - (keyAxis.s ? 1 : 0),
  };
}
