"use client";

import Konva from "konva";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Circle, Layer, Stage } from "react-konva";
import frameData from "@/app/canvas/_assets/frame_halftone.json";
import { Button } from "@/components/ui/button";

type HalftoneFrame = {
  width: number;
  height: number;
  bg: number[];
  dot: number[];
  dots: number[][];
};

type Mode = "idle" | "settle";

type Dot = {
  x: number;
  y: number;
  r: number;
  startX: number;
  startY: number;
};

const frame = frameData as HalftoneFrame;
const bgFill = `rgb(${frame.bg.join(",")})`;
const dotFill = `rgb(${frame.dot.join(",")})`;
const SPEED_MIN = 40;
const SPEED_MAX = 120;

function scatterDots(): Dot[] {
  return frame.dots.map(([x, y, r]) => ({
    x,
    y,
    r,
    startX: Math.random() * frame.width,
    startY: Math.random() * frame.height,
  }));
}

function scatterVelocities(count: number, vx: Float32Array, vy: Float32Array) {
  for (let i = 0; i < count; i++) {
    const speed = SPEED_MIN + Math.random() * (SPEED_MAX - SPEED_MIN);
    const angle = Math.random() * Math.PI * 2;
    vx[i] = Math.cos(angle) * speed;
    vy[i] = Math.sin(angle) * speed;
  }
}

function destroyTweens(tweens: Konva.Tween[]) {
  for (const tween of tweens) {
    tween.destroy();
  }
}

function playSettle(layer: Konva.Layer, dots: Dot[]) {
  const children = layer.getChildren();
  const tweens: Konva.Tween[] = [];
  const count = children.length;

  for (let i = 0; i < count; i++) {
    const node = children[i];
    const target = dots[i];
    if (!node || !target) continue;

    const tween = new Konva.Tween({
      node,
      x: target.x,
      y: target.y,
      duration: 0.9 + (target.y / frame.height) * 0.8,
      easing: Konva.Easings.EaseOut,
    });
    tween.play();
    tweens.push(tween);
  }

  return tweens;
}

export default function Canvas() {
  const layerRef = useRef<Konva.Layer>(null);
  const animationRef = useRef<Konva.Animation | null>(null);
  const tweensRef = useRef<Konva.Tween[]>([]);
  const vxRef = useRef<Float32Array | null>(null);
  const vyRef = useRef<Float32Array | null>(null);
  const [mode, setMode] = useState<Mode>("idle");
  const dots = useMemo(scatterDots, []);

  const clearTweens = useCallback(() => {
    destroyTweens(tweensRef.current);
    tweensRef.current = [];
  }, []);

  const startIdle = useCallback(() => {
    const layer = layerRef.current;
    const vx = vxRef.current;
    const vy = vyRef.current;
    const animation = animationRef.current;
    if (!layer || !vx || !vy || !animation) return;

    clearTweens();
    scatterVelocities(dots.length, vx, vy);
    animation.start();
    setMode("idle");
  }, [clearTweens, dots.length]);

  const startSettle = useCallback(() => {
    const layer = layerRef.current;
    const animation = animationRef.current;
    if (!layer || !animation) return;

    animation.stop();
    clearTweens();
    tweensRef.current = playSettle(layer, dots);
    setMode("settle");
  }, [clearTweens, dots]);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;

    const vx = new Float32Array(dots.length);
    const vy = new Float32Array(dots.length);
    vxRef.current = vx;
    vyRef.current = vy;
    scatterVelocities(dots.length, vx, vy);

    const animation = new Konva.Animation((animFrame) => {
      if (!animFrame) return;
      const dt = animFrame.timeDiff / 1000;
      const children = layer.getChildren();
      const count = children.length;

      for (let i = 0; i < count; i++) {
        const node = children[i];
        const target = dots[i];
        if (!node || !target) continue;

        const r = target.r;
        let x = node.x() + vx[i] * dt;
        let y = node.y() + vy[i] * dt;

        if (x < r) {
          x = r;
          vx[i] *= -1;
        } else if (x > frame.width - r) {
          x = frame.width - r;
          vx[i] *= -1;
        }

        if (y < r) {
          y = r;
          vy[i] *= -1;
        } else if (y > frame.height - r) {
          y = frame.height - r;
          vy[i] *= -1;
        }

        node.x(x);
        node.y(y);
      }
    }, layer);

    animationRef.current = animation;
    animation.start();

    return () => {
      animation.stop();
      destroyTweens(tweensRef.current);
      tweensRef.current = [];
      animationRef.current = null;
    };
  }, [dots]);

  return (
    <div
      className="relative flex h-dvh items-center justify-center"
      style={{ background: bgFill }}
    >
      <div className="pointer-events-none absolute inset-0 z-10 p-4">
        <div className="pointer-events-auto flex gap-2">
          <Button disabled={mode === "settle"} onClick={startSettle}>
            Start
          </Button>
          <Button
            disabled={mode === "idle"}
            variant="outline"
            onClick={startIdle}
          >
            Idle
          </Button>
        </div>
      </div>
      <Stage width={frame.width} height={frame.height}>
        <Layer ref={layerRef} listening={false}>
          {dots.map((dot, i) => (
            <Circle
              key={i}
              x={dot.startX}
              y={dot.startY}
              radius={dot.r}
              fill={dotFill}
              listening={false}
              perfectDrawEnabled={false}
            />
          ))}
        </Layer>
      </Stage>
    </div>
  );
}
