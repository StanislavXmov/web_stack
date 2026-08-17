"use client";

import { useActions, useQuery } from "koota/react";
import { useEffect, useState } from "react";
import { worldActions } from "@/app/world/_components/ecs/actions";
import { SWARM_COUNT } from "@/app/world/_components/ecs/constants";
import { Agent } from "@/app/world/_components/ecs/traits";
import { useWorldStore } from "@/app/world/_components/store";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

function useFps() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let frame = 0;

    const loop = (now: number) => {
      frames += 1;
      if (now - last >= 250) {
        setFps(Math.round((frames * 1000) / (now - last)));
        frames = 0;
        last = now;
      }
      frame = requestAnimationFrame(loop);
    };

    frame = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frame);
  }, []);

  return fps;
}

export function WorldHud() {
  const agents = useQuery(Agent);
  const { spawnSwarm, resetSwarm } = useActions(worldActions);
  const paused = useWorldStore((state) => state.paused);
  const timeScale = useWorldStore((state) => state.timeScale);
  const showGrid = useWorldStore((state) => state.showGrid);
  const setPaused = useWorldStore((state) => state.setPaused);
  const togglePaused = useWorldStore((state) => state.togglePaused);
  const setTimeScale = useWorldStore((state) => state.setTimeScale);
  const setShowGrid = useWorldStore((state) => state.setShowGrid);
  const fps = useFps();

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        (target.tagName === "INPUT" || target.tagName === "TEXTAREA")
      ) {
        return;
      }

      if (event.code === "Space") {
        event.preventDefault();
        togglePaused();
      }

      if (event.code === "KeyR") {
        event.preventDefault();
        resetSwarm(SWARM_COUNT);
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [resetSwarm, togglePaused]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 p-4">
      <Card
        className="pointer-events-auto w-80 bg-card/90 backdrop-blur-sm"
        size="sm"
      >
        <CardHeader>
          <CardTitle>World</CardTitle>
          <CardDescription>R3F presents. ECS simulates.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="secondary">{agents.length} agents</Badge>
            <Badge variant={paused ? "outline" : "default"}>
              {paused ? "paused" : "live"}
            </Badge>
            <Badge variant="outline">{fps} fps</Badge>
          </div>

          <Separator />

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="world-paused">Pause</Label>
            <Switch
              id="world-paused"
              checked={paused}
              onCheckedChange={setPaused}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <Label htmlFor="world-grid">Grid</Label>
            <Switch
              id="world-grid"
              checked={showGrid}
              onCheckedChange={setShowGrid}
            />
          </div>

          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <Label>Time scale</Label>
              <span className="text-muted-foreground text-xs">
                {timeScale.toFixed(2)}x
              </span>
            </div>
            <Slider
              min={0.25}
              max={2}
              step={0.25}
              value={[timeScale]}
              onValueChange={(value) => {
                const next = Array.isArray(value) ? value[0] : value;
                if (typeof next === "number") setTimeScale(next);
              }}
            />
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1"
              variant="outline"
              onClick={() => spawnSwarm(SWARM_COUNT)}
            >
              Spawn {SWARM_COUNT}
            </Button>
            <Button className="flex-1" onClick={() => resetSwarm(SWARM_COUNT)}>
              Reset
            </Button>
          </div>

          <p className="text-muted-foreground text-xs">
            <Kbd>Space</Kbd> pause · <Kbd>R</Kbd> reset
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
