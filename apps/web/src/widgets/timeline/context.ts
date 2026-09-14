import { createContext, use } from "react";
import type { TimelineContextValue } from "./types";

export const TimelineContext = createContext<TimelineContextValue | null>(null);
export const TimelineItemContext = createContext<number | null>(null);

export function useTimeline() {
  const context = use(TimelineContext);
  if (!context)
    throw new Error("Timeline parts must be used within Timeline.Root");
  return context;
}

export function useTimelineItem() {
  const index = use(TimelineItemContext);
  if (index === null)
    throw new Error("Timeline.Dot must be used within Timeline.Item");
  return index;
}
