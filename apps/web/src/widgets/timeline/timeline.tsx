"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import {
  TimelineContext,
  TimelineItemContext,
  useTimeline,
  useTimelineItem,
} from "./context";
import { styles } from "./styles";
import type {
  ArrowPlaceholderProps,
  ArrowProps,
  ContentProps,
  DotProps,
  EmblaApi,
  EmptyProps,
  EventProps,
  EventsProps,
  ItemProps,
  NavigationProps,
  RootProps,
  TickProps,
  TitleProps,
  YearLabelProps,
} from "./types";
import { findInitialIndex, getDragPreview } from "./utils";

function ArrowPlaceholder({ direction }: ArrowPlaceholderProps) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "size-4 border-current border-t-2 border-r-2 sm:size-5",
        direction === "left" ? "transform-[rotate(-135deg)]" : "rotate-45",
      )}
    />
  );
}

function Root({
  items,
  initialYear,
  opts,
  plugins,
  className,
  children,
  ref,
  ...rest
}: RootProps) {
  const titleId = useId();
  const helpId = useId();
  const initialIndex = findInitialIndex(items, initialYear);
  const [activeYear, setActiveYear] = useState<number | undefined>(
    () => items[initialIndex]?.year,
  );
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dragStartActiveIndexRef = useRef(initialIndex);
  const dragPreviewIndexRef = useRef(initialIndex);
  const dragPreviewSnapRef = useRef(0);
  const dragInProgressRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pointerReleasedRef = useRef(false);
  const suppressYearClickRef = useRef(false);
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      align: "start",
      breakpoints: {
        "(prefers-reduced-motion: reduce)": { duration: 0 },
      },
      containScroll: "trimSnaps",
      dragFree: false,
      inViewThreshold: 0.5,
      loop: false,
      skipSnaps: false,
      slidesToScroll: 1,
      startIndex: initialIndex,
      watchDrag: (_api, event) =>
        !(
          event.target instanceof Element &&
          event.target.closest("[data-timeline-year]")
        ),
      ...opts,
    },
    plugins,
  );

  const matchingActiveIndex = items.findIndex(
    (item) => item.year === activeYear,
  );
  const activeIndex = matchingActiveIndex === -1 ? 0 : matchingActiveIndex;
  const activeItem = items[activeIndex];
  const markerIndex = previewIndex ?? activeIndex;

  const selectIndex = useCallback(
    (nextIndex: number, ensureVisible = false) => {
      const nextItem = items[nextIndex];
      if (!nextItem) return;

      dragInProgressRef.current = false;
      dragMovedRef.current = false;
      pointerReleasedRef.current = false;
      setPreviewIndex(null);
      setActiveYear(nextItem.year);

      if (ensureVisible && emblaApi) {
        const visibleSlides = emblaApi.slidesInView();
        if (!visibleSlides.includes(nextIndex)) {
          if (nextIndex > activeIndex) {
            emblaApi.scrollNext();
          } else {
            emblaApi.scrollPrev();
          }
        }
      }
    },
    [activeIndex, emblaApi, items],
  );

  const selectPrevious = useCallback(() => {
    selectIndex(activeIndex - 1, true);
  }, [activeIndex, selectIndex]);

  const selectNext = useCallback(() => {
    selectIndex(activeIndex + 1, true);
  }, [activeIndex, selectIndex]);

  const selectYear = useCallback(
    (index: number) => {
      if (suppressYearClickRef.current) return;
      if (dragInProgressRef.current && dragMovedRef.current) return;
      selectIndex(index);
    },
    [selectIndex],
  );

  useEffect(() => {
    if (!emblaApi) return;

    const resetDrag = () => {
      dragInProgressRef.current = false;
      dragMovedRef.current = false;
      pointerReleasedRef.current = false;
      setPreviewIndex(null);
    };

    const commitDrag = (api: EmblaApi) => {
      if (!dragInProgressRef.current || !dragMovedRef.current) return false;

      const nextIndex = dragPreviewIndexRef.current;
      if (nextIndex === dragStartActiveIndexRef.current) return false;

      const nextItem = items[nextIndex];
      const nextSnap = dragPreviewSnapRef.current;

      resetDrag();
      if (nextItem) {
        setActiveYear(nextItem.year);
        if (api.selectedScrollSnap() !== nextSnap) api.scrollTo(nextSnap);
      }
      return true;
    };

    const handlePointerDown = (api: EmblaApi) => {
      dragStartActiveIndexRef.current = activeIndex;
      dragPreviewIndexRef.current = activeIndex;
      dragPreviewSnapRef.current = api.selectedScrollSnap();
      dragInProgressRef.current = true;
      dragMovedRef.current = false;
      pointerReleasedRef.current = false;
      setPreviewIndex(activeIndex);
    };

    const handleScroll = (api: EmblaApi) => {
      if (!dragInProgressRef.current) return;

      dragMovedRef.current = true;
      const preview = getDragPreview(api, dragPreviewIndexRef.current);
      dragPreviewIndexRef.current = preview.index;
      dragPreviewSnapRef.current = preview.snap;
      setPreviewIndex(preview.index);
    };

    const handleSelect = (api: EmblaApi) => {
      if (pointerReleasedRef.current) commitDrag(api);
    };

    const handlePointerUp = (api: EmblaApi) => {
      pointerReleasedRef.current = true;

      if (dragMovedRef.current) {
        suppressYearClickRef.current = true;
        window.setTimeout(() => {
          suppressYearClickRef.current = false;
        }, 0);
      }

      if (!commitDrag(api) && !dragMovedRef.current) resetDrag();
    };

    const handleSettle = (api: EmblaApi) => {
      if (!dragInProgressRef.current) return;

      const preview = getDragPreview(api, dragPreviewIndexRef.current);
      dragPreviewIndexRef.current = preview.index;
      dragPreviewSnapRef.current = preview.snap;
      if (!commitDrag(api)) resetDrag();
    };

    emblaApi.on("pointerDown", handlePointerDown);
    emblaApi.on("pointerUp", handlePointerUp);
    emblaApi.on("scroll", handleScroll);
    emblaApi.on("select", handleSelect);
    emblaApi.on("settle", handleSettle);

    return () => {
      emblaApi.off("pointerDown", handlePointerDown);
      emblaApi.off("pointerUp", handlePointerUp);
      emblaApi.off("scroll", handleScroll);
      emblaApi.off("select", handleSelect);
      emblaApi.off("settle", handleSettle);
    };
  }, [activeIndex, emblaApi, items]);

  return (
    <TimelineContext
      value={{
        items,
        activeIndex,
        markerIndex,
        activeItem,
        titleId,
        helpId,
        emblaRef,
        selectPrevious,
        selectNext,
        selectYear,
      }}
    >
      <section
        {...rest}
        ref={ref}
        className={cn(styles.root, className)}
        aria-labelledby={rest["aria-labelledby"] ?? titleId}
      >
        {items.length > 0 ? (
          <p id={helpId} className="sr-only">
            Перетаскивайте шкалу мышью или пальцем. Выберите год, чтобы увидеть
            связанные с ним события.
          </p>
        ) : null}
        {children}
      </section>
    </TimelineContext>
  );
}

function Title({ className, ref, ...rest }: TitleProps) {
  const { titleId } = useTimeline();
  return (
    <h2
      {...rest}
      ref={ref}
      id={rest.id ?? titleId}
      className={cn(styles.title, className)}
    />
  );
}

function Navigation({ className, ref, ...rest }: NavigationProps) {
  const { items } = useTimeline();
  if (items.length === 0) return null;
  return (
    <div {...rest} ref={ref} className={cn(styles.navigation, className)} />
  );
}

function Content({ className, ref, children, ...rest }: ContentProps) {
  const { items, emblaRef, helpId } = useTimeline();
  if (items.length === 0) return null;

  return (
    <div
      {...rest}
      ref={(node) => {
        emblaRef(node);
        if (typeof ref === "function") ref(node);
        else if (ref) ref.current = node;
      }}
      className={cn(styles.viewport, className)}
      aria-describedby={rest["aria-describedby"] ?? helpId}
    >
      <div className={styles.track}>{children}</div>
    </div>
  );
}

function Item({ year, className, ref, children, onClick, ...rest }: ItemProps) {
  const { items, activeIndex, selectYear } = useTimeline();
  const index = items.findIndex((item) => item.year === year);
  if (index === -1) return null;

  return (
    <TimelineItemContext value={index}>
      <div className={styles.slide}>
        <button
          {...rest}
          ref={ref}
          type={rest.type ?? "button"}
          data-timeline-year
          className={cn(styles.year, className)}
          onClick={(event) => {
            onClick?.(event);
            if (!event.defaultPrevented) selectYear(index);
          }}
          aria-pressed={index === activeIndex}
          aria-label={rest["aria-label"] ?? `${year} год`}
        >
          {children}
        </button>
      </div>
    </TimelineItemContext>
  );
}

function Dot({ className, ref, ...rest }: DotProps) {
  const index = useTimelineItem();
  const { markerIndex } = useTimeline();
  if (index !== markerIndex) return null;
  return (
    <span
      {...rest}
      ref={ref}
      className={cn(styles.marker, className)}
      aria-hidden="true"
    />
  );
}

function Tick({ className, ref, ...rest }: TickProps) {
  useTimelineItem();
  return (
    <span
      {...rest}
      ref={ref}
      className={cn(styles.tick, className)}
      aria-hidden="true"
    />
  );
}

function YearLabel({ className, ref, children, ...rest }: YearLabelProps) {
  const index = useTimelineItem();
  const { items } = useTimeline();
  return (
    <span {...rest} ref={ref} className={cn(styles.yearLabel, className)}>
      {children ?? items[index].year}
    </span>
  );
}

function Previous({ className, ref, children, onClick, ...rest }: ArrowProps) {
  const { activeIndex, items, selectPrevious } = useTimeline();
  if (items.length === 0) return null;
  return (
    <button
      {...rest}
      ref={ref}
      type={rest.type ?? "button"}
      className={cn(styles.navigationButton, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) selectPrevious();
      }}
      disabled={rest.disabled || activeIndex === 0}
      aria-label={rest["aria-label"] ?? "Выбрать предыдущий год"}
    >
      {children ?? <ArrowPlaceholder direction="left" />}
    </button>
  );
}

function Next({ className, ref, children, onClick, ...rest }: ArrowProps) {
  const { activeIndex, items, selectNext } = useTimeline();
  if (items.length === 0) return null;
  return (
    <button
      {...rest}
      ref={ref}
      type={rest.type ?? "button"}
      className={cn(styles.navigationButton, className)}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) selectNext();
      }}
      disabled={rest.disabled || activeIndex === items.length - 1}
      aria-label={rest["aria-label"] ?? "Выбрать следующий год"}
    >
      {children ?? <ArrowPlaceholder direction="right" />}
    </button>
  );
}

function Event({ className, ref, ...rest }: EventProps) {
  return (
    <article {...rest} ref={ref} className={cn(styles.eventCard, className)} />
  );
}

function Empty({ className, ref, children, ...rest }: EmptyProps) {
  const { items } = useTimeline();
  if (items.length > 0) return null;
  return (
    <p {...rest} ref={ref} className={cn(styles.emptyState, className)}>
      {children ?? "События пока не добавлены."}
    </p>
  );
}

function Events({ className, ref, children, ...rest }: EventsProps) {
  const { activeItem } = useTimeline();
  if (!activeItem) return null;
  return (
    <div
      {...rest}
      ref={ref}
      className={cn(styles.eventList, className)}
      aria-live={rest["aria-live"] ?? "polite"}
      aria-atomic={rest["aria-atomic"] ?? "true"}
    >
      {activeItem.events.length > 0
        ? activeItem.events.map((event) => (
            <Event key={event.id}>{event.text}</Event>
          ))
        : (children ?? (
            <p className={styles.emptyState}>Для этого года нет событий.</p>
          ))}
    </div>
  );
}

export const Timeline = Object.assign(Root, {
  Root,
  Title,
  Navigation,
  Content,
  Item,
  Dot,
  Tick,
  YearLabel,
  Previous,
  Next,
  Event,
  Events,
  Empty,
});
