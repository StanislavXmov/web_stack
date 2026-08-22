"use client";

import Konva from "konva";
import { useEffect, useMemo, useRef } from "react";
import { Circle, Layer, Stage } from "react-konva";
import frameData from "@/app/canvas/_assets/frame_halftone.json";

type HalftoneFrame = {
  width: number;
  height: number;
  bg: number[];
  dot: number[];
  dots: number[][];
};

const frame = frameData as HalftoneFrame;
const bgFill = `rgb(${frame.bg.join(",")})`;
const dotFill = `rgb(${frame.dot.join(",")})`;

type Dot = {
  x: number;
  y: number;
  r: number;
  startX: number;
  startY: number;
};

function scatterDots(): Dot[] {
  return frame.dots.map(([x, y, r]) => ({
    x,
    y,
    r,
    startX: Math.random() * frame.width,
    startY: Math.random() * frame.height,
  }));
}

function playSettle(layer: Konva.Layer, dots: Dot[]) {
  const tweens: Konva.Tween[] = [];

  layer.getChildren().forEach((node, i) => {
    const target = dots[i];
    if (!target) return;

    const tween = new Konva.Tween({
      node,
      x: target.x,
      y: target.y,
      duration: 0.9 + (target.y / frame.height) * 0.8,
      easing: Konva.Easings.EaseOut,
    });
    tween.play();
    tweens.push(tween);
  });

  return () => {
    for (const tween of tweens) {
      tween.destroy();
    }
  };
}

export default function Canvas() {
  const layerRef = useRef<Konva.Layer>(null);
  const dots = useMemo(scatterDots, []);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer) return;
    return playSettle(layer, dots);
  }, [dots]);

  return (
    <div
      className="flex h-dvh items-center justify-center"
      style={{ background: bgFill }}
    >
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
