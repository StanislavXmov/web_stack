"use client";

import { Timeline, type TimelineYear } from "@/widgets/timeline";

export function Time({ items }: { items: readonly TimelineYear[] }) {
  return (
    <Timeline.Root items={items} initialYear={2005}>
      <Timeline.Title>Гордимся каждым годом</Timeline.Title>
      <Timeline.Navigation>
        <Timeline.Previous />
        <Timeline.Content>
          {items.map((item) => (
            <Timeline.Item key={item.year} year={item.year}>
              <Timeline.Dot />
              <Timeline.Tick />
              <Timeline.YearLabel />
            </Timeline.Item>
          ))}
        </Timeline.Content>
        <Timeline.Next />
      </Timeline.Navigation>
      <Timeline.Events />
      <Timeline.Empty />
    </Timeline.Root>
  );
}
