import { act, fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { Timeline } from "./timeline";
import type { TimelineYear } from "./types";

const carousel = vi.hoisted(() => {
  type Handler = (api: unknown) => void;

  const listeners = new Map<string, Set<Handler>>();
  const state = {
    visible: [0, 1, 2, 3, 4, 5],
    snap: 0,
    progress: 0,
    snaps: Array.from({ length: 7 }, (_, index) => index / 6),
    options: null as null | {
      startIndex?: number;
      slidesToScroll?: number;
      watchDrag?: (
        api: unknown,
        event: { target: EventTarget | null },
      ) => boolean;
    },
  };

  const updateVisible = () => {
    state.visible = Array.from({ length: 6 }, (_, index) => state.snap + index);
  };

  const api = {
    on(event: string, handler: Handler) {
      if (!listeners.has(event)) listeners.set(event, new Set());
      listeners.get(event)?.add(handler);
      return api;
    },
    off(event: string, handler: Handler) {
      listeners.get(event)?.delete(handler);
      return api;
    },
    slidesInView: vi.fn(() => state.visible),
    selectedScrollSnap: vi.fn(() => state.snap),
    scrollProgress: vi.fn(() => state.progress),
    scrollSnapList: vi.fn(() => state.snaps),
    scrollNext: vi.fn(() => {
      state.snap = Math.min(state.snap + 1, state.snaps.length - 1);
      updateVisible();
    }),
    scrollPrev: vi.fn(() => {
      state.snap = Math.max(state.snap - 1, 0);
      updateVisible();
    }),
    scrollTo: vi.fn((snap: number) => {
      state.snap = snap;
      updateVisible();
    }),
  };

  return {
    api,
    listeners,
    state,
    emit(event: string) {
      for (const handler of listeners.get(event) ?? []) handler(api);
    },
  };
});

vi.mock("embla-carousel-react", () => ({
  default: (options: NonNullable<typeof carousel.state.options>) => {
    carousel.state.options = options;
    return [() => {}, carousel.api];
  },
}));

const years = [
  2005, 2006, 2008, 2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2019,
] as const;

const items: readonly TimelineYear[] = years.map((year) => ({
  year,
  events: [{ id: `event-${year}`, text: `Event ${year}` }],
}));

function renderTimeline(initialYear?: number) {
  return render(
    <Timeline.Root items={items} initialYear={initialYear}>
      <Timeline.Title>Timeline</Timeline.Title>
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
    </Timeline.Root>,
  );
}

function yearButton(year: number) {
  const button = screen.getByRole("button", {
    name: new RegExp(`^${year}\\b`),
  });
  if (!(button instanceof HTMLButtonElement)) {
    throw new Error(`Year ${year} is not a button`);
  }
  return button;
}

function navigationButtons() {
  const [previous, next] = screen
    .getAllByRole("button")
    .filter((button) => !button.hasAttribute("data-timeline-year"));
  if (
    !(previous instanceof HTMLButtonElement) ||
    !(next instanceof HTMLButtonElement)
  ) {
    throw new Error("Timeline navigation buttons are missing");
  }
  return [previous, next] as const;
}

function markerLabel() {
  return document
    .querySelector('span[class*="clip-path"]')
    ?.closest("button")
    ?.getAttribute("aria-label");
}

beforeEach(() => {
  carousel.listeners.clear();
  carousel.state.visible = [0, 1, 2, 3, 4, 5];
  carousel.state.snap = 0;
  carousel.state.progress = 0;
  carousel.state.options = null;
});

describe("Timeline", () => {
  it("forwards refs, classes, and DOM props through compound parts", () => {
    const rootRef = createRef<HTMLElement>();
    const contentRef = createRef<HTMLDivElement>();
    const itemRef = createRef<HTMLButtonElement>();

    render(
      <Timeline.Root
        items={items}
        ref={rootRef}
        className="custom-root"
        data-testid="timeline-root"
      >
        <Timeline.Title>Timeline</Timeline.Title>
        <Timeline.Content
          ref={contentRef}
          className="custom-content"
          data-testid="timeline-content"
        >
          <Timeline.Item
            year={2005}
            ref={itemRef}
            className="custom-item"
            data-testid="timeline-item"
          >
            <Timeline.Dot />
            <Timeline.YearLabel />
          </Timeline.Item>
        </Timeline.Content>
      </Timeline.Root>,
    );

    expect(rootRef.current).toBe(screen.getByTestId("timeline-root"));
    expect(contentRef.current).toBe(screen.getByTestId("timeline-content"));
    expect(itemRef.current).toBe(screen.getByTestId("timeline-item"));
    expect(rootRef.current?.className).toContain("custom-root");
    expect(contentRef.current?.className).toContain("custom-content");
    expect(itemRef.current?.className).toContain("custom-item");
  });

  it("renders an empty timeline without year buttons", () => {
    render(
      <Timeline.Root items={[]}>
        <Timeline.Title>Empty timeline</Timeline.Title>
        <Timeline.Empty />
      </Timeline.Root>,
    );

    expect(
      screen.getByRole("heading", { name: "Empty timeline" }),
    ).toBeDefined();
    expect(screen.queryAllByRole("button")).toHaveLength(0);
  });

  it("renders the requested initial year and its events", () => {
    renderTimeline(2008);

    expect(yearButton(2008).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Event 2008")).toBeDefined();
    expect(carousel.state.options?.startIndex).toBe(2);
    expect(carousel.state.options?.slidesToScroll).toBe(1);
  });

  it("falls back to the first year when initialYear is missing", () => {
    renderTimeline(1900);

    expect(yearButton(2005).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Event 2005")).toBeDefined();
  });

  it("selects a clicked year without scrolling the track", () => {
    renderTimeline();

    fireEvent.click(yearButton(2010));

    expect(yearButton(2010).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Event 2010")).toBeDefined();
    expect(carousel.api.scrollNext).not.toHaveBeenCalled();
    expect(carousel.api.scrollPrev).not.toHaveBeenCalled();
    expect(carousel.api.scrollTo).not.toHaveBeenCalled();
  });

  it("scrolls one snap when the right arrow selects an off-screen year", () => {
    renderTimeline(2011);
    const [, next] = navigationButtons();

    fireEvent.click(next);

    expect(yearButton(2012).getAttribute("aria-pressed")).toBe("true");
    expect(carousel.api.scrollNext).toHaveBeenCalledTimes(1);
    expect(carousel.api.scrollTo).not.toHaveBeenCalled();
    expect(carousel.state.visible).toEqual([1, 2, 3, 4, 5, 6]);
  });

  it("does not scroll when an arrow selects a year already in view", () => {
    renderTimeline();
    const [, next] = navigationButtons();

    fireEvent.click(next);

    expect(yearButton(2006).getAttribute("aria-pressed")).toBe("true");
    expect(carousel.api.scrollNext).not.toHaveBeenCalled();
    expect(carousel.api.scrollPrev).not.toHaveBeenCalled();
  });

  it("scrolls one snap when the left arrow selects an off-screen year", () => {
    carousel.state.snap = 6;
    carousel.state.visible = [6, 7, 8, 9, 10, 11];
    renderTimeline(2012);
    const [previous] = navigationButtons();

    fireEvent.click(previous);

    expect(yearButton(2011).getAttribute("aria-pressed")).toBe("true");
    expect(carousel.api.scrollPrev).toHaveBeenCalledTimes(1);
    expect(carousel.api.scrollTo).not.toHaveBeenCalled();
    expect(carousel.state.visible).toEqual([5, 6, 7, 8, 9, 10]);
  });

  it("disables arrows at the first and last years", () => {
    renderTimeline();
    const [previous, next] = navigationButtons();

    expect(previous.disabled).toBe(true);
    expect(next.disabled).toBe(false);

    fireEvent.click(yearButton(2019));

    expect(previous.disabled).toBe(false);
    expect(next.disabled).toBe(true);
  });

  it("keeps the marker on a clicked year until it leaves the visible area", () => {
    renderTimeline();
    fireEvent.click(yearButton(2010));

    act(() => carousel.emit("pointerDown"));
    carousel.state.visible = [2, 3, 4, 5, 6, 7];
    carousel.state.progress = 2 / 6;
    act(() => carousel.emit("scroll"));

    expect(markerLabel()).toMatch(/^2010\b/);
    expect(screen.getByText("Event 2010")).toBeDefined();

    carousel.state.visible = [5, 6, 7, 8, 9, 10];
    carousel.state.snap = 1;
    carousel.state.progress = 5 / 6;
    act(() => carousel.emit("scroll"));

    expect(markerLabel()).toMatch(/^2011\b/);
    expect(screen.getByText("Event 2010")).toBeDefined();

    act(() => carousel.emit("pointerUp"));

    expect(yearButton(2011).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Event 2011")).toBeDefined();
    expect(carousel.api.scrollTo).toHaveBeenCalledWith(5);
  });

  it("moves the marker to the nearest visible year when dragging backward", () => {
    carousel.state.snap = 6;
    carousel.state.visible = [6, 7, 8, 9, 10, 11];
    carousel.state.progress = 1;
    renderTimeline(2014);

    act(() => carousel.emit("pointerDown"));
    carousel.state.visible = [1, 2, 3, 4, 5, 6];
    carousel.state.snap = 5;
    carousel.state.progress = 1 / 6;
    act(() => carousel.emit("scroll"));

    expect(markerLabel()).toMatch(/^2012\b/);
    expect(screen.getByText("Event 2014")).toBeDefined();

    act(() => carousel.emit("pointerUp"));

    expect(yearButton(2012).getAttribute("aria-pressed")).toBe("true");
    expect(screen.getByText("Event 2012")).toBeDefined();
    expect(carousel.api.scrollTo).toHaveBeenCalledWith(1);
  });

  it("does not start a drag on a year button but allows the free track", () => {
    renderTimeline();
    const watchDrag = carousel.state.options?.watchDrag;
    const button = yearButton(2005);
    const slide = button.parentElement;

    expect(watchDrag).toBeTypeOf("function");
    expect(slide).not.toBeNull();
    expect(watchDrag?.(carousel.api, { target: button })).toBe(false);
    expect(watchDrag?.(carousel.api, { target: button.lastElementChild })).toBe(
      false,
    );
    expect(watchDrag?.(carousel.api, { target: slide })).toBe(true);
  });
});
