"use client";

import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type TimelineEvent = {
  id: string;
  text: string;
};

export type TimelineYear = {
  year: number;
  events: readonly TimelineEvent[];
};

export type TimelineProps = {
  title: string;
  items: readonly TimelineYear[];
  initialYear?: number;
  className?: string;
};

type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

const styles = {
  root: "w-full px-2 py-4 text-zinc-950 sm:px-7 sm:py-6",
  title: "text-xl font-extrabold tracking-tight sm:text-4xl",
  navigation: "mt-6 flex items-center gap-2 sm:mt-16 sm:gap-5",
  navigationButton:
    "relative z-20 flex size-10 shrink-0 items-center justify-center rounded-md bg-transparent text-sky-500 outline-none transition-colors hover:bg-sky-50 focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-30 motion-reduce:transition-none sm:size-12",
  viewport:
    "min-w-0 flex-1 cursor-grab touch-pan-y overflow-hidden select-none active:cursor-grabbing sm:py-2",
  track: "flex h-12 sm:h-28",
  slide:
    "relative min-w-0 shrink-0 grow-0 basis-full px-1 before:pointer-events-none before:absolute before:top-2 before:right-0 before:left-0 before:h-px before:bg-slate-200 sm:before:top-14 md:basis-1/6",
  year: "group relative z-10 flex h-full w-full flex-col items-center rounded-md bg-transparent text-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
  marker:
    "pointer-events-none absolute top-0 left-1/2 hidden h-14 w-15 -translate-x-1/2 bg-sky-500 [clip-path:polygon(0_0,100%_0,100%_64%,50%_100%,0_64%)] sm:block",
  tick: "pointer-events-none absolute top-14 hidden h-3 w-px bg-slate-200 sm:block",
  yearLabel:
    "pointer-events-none absolute top-5 text-base leading-none group-aria-pressed:font-bold sm:top-19 sm:text-lg sm:group-aria-pressed:font-normal",
  eventList: "mt-4 grid gap-6 sm:mt-16 sm:gap-10",
  eventCard:
    "min-w-0 rounded-lg border-3 border-slate-200 bg-white px-4 py-4 text-xs leading-relaxed text-zinc-950 sm:rounded-xl sm:border-4 sm:px-8 sm:py-8 sm:text-2xl",
  emptyState:
    "mt-10 rounded-lg border-2 border-dashed border-slate-200 px-4 py-6 text-sm text-zinc-500 sm:mt-16 sm:px-8 sm:text-base",
} as const;

function ArrowPlaceholder({ direction }: { direction: "left" | "right" }) {
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

function findInitialIndex(
  items: readonly TimelineYear[],
  initialYear: number | undefined,
) {
  if (initialYear === undefined) return 0;

  const initialIndex = items.findIndex((item) => item.year === initialYear);
  return initialIndex === -1 ? 0 : initialIndex;
}

export function Timeline({
  title,
  items,
  initialYear,
  className,
}: TimelineProps) {
  const titleId = useId();
  const helpId = useId();
  const initialIndex = findInitialIndex(items, initialYear);
  const [activeYear, setActiveYear] = useState<number | undefined>(
    () => items[initialIndex]?.year,
  );
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dragStartSnapRef = useRef(0);
  const dragStartProgressRef = useRef(0);
  const dragStartActiveIndexRef = useRef(initialIndex);
  const dragPreviewIndexRef = useRef(initialIndex);
  const dragPreviewSnapRef = useRef(0);
  const dragStartsAtLeftEdgeRef = useRef(false);
  const dragStartsAtRightEdgeRef = useRef(false);
  const dragInProgressRef = useRef(false);
  const dragMovedRef = useRef(false);
  const pointerReleasedRef = useRef(false);
  const suppressYearClickRef = useRef(false);
  const [emblaRef, emblaApi] = useEmblaCarousel({
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
  });

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
          emblaApi.scrollTo(nextIndex);
        }
      }
    },
    [emblaApi, items],
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

    const canMoveMarker = (snapDelta: number) =>
      (snapDelta > 0 && dragStartsAtLeftEdgeRef.current) ||
      (snapDelta < 0 && dragStartsAtRightEdgeRef.current);

    const getDragPreview = (api: EmblaApi) => {
      const progressDelta = api.scrollProgress() - dragStartProgressRef.current;
      if (Math.abs(progressDelta) < 0.001) {
        return {
          index: dragStartActiveIndexRef.current,
          snap: dragStartSnapRef.current,
        };
      }

      const direction = Math.sign(progressDelta);
      if (!canMoveMarker(direction)) {
        return {
          index: dragStartActiveIndexRef.current,
          snap: dragStartSnapRef.current,
        };
      }

      const scrollSnaps = api.scrollSnapList();
      const progress = api.scrollProgress();
      let previewSnap = direction > 0 ? scrollSnaps.length - 1 : 0;

      if (direction > 0) {
        const incomingSnap = scrollSnaps.findIndex((snap) => snap >= progress);
        if (incomingSnap !== -1) previewSnap = incomingSnap;
      } else {
        for (let index = scrollSnaps.length - 1; index >= 0; index -= 1) {
          if (scrollSnaps[index] <= progress) {
            previewSnap = index;
            break;
          }
        }
      }

      const snapDelta = previewSnap - dragStartSnapRef.current;

      return {
        index: Math.min(
          Math.max(dragStartActiveIndexRef.current + snapDelta, 0),
          items.length - 1,
        ),
        snap: previewSnap,
      };
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
      const visibleSlides = api.slidesInView();
      const leftEdgeIndex = visibleSlides[0] ?? activeIndex;
      const rightEdgeIndex = visibleSlides.at(-1) ?? activeIndex;

      dragStartSnapRef.current = api.selectedScrollSnap();
      dragStartProgressRef.current = api.scrollProgress();
      dragStartActiveIndexRef.current = activeIndex;
      dragPreviewIndexRef.current = activeIndex;
      dragPreviewSnapRef.current = dragStartSnapRef.current;
      dragStartsAtLeftEdgeRef.current = activeIndex === leftEdgeIndex;
      dragStartsAtRightEdgeRef.current = activeIndex === rightEdgeIndex;
      dragInProgressRef.current = true;
      dragMovedRef.current = false;
      pointerReleasedRef.current = false;
      setPreviewIndex(activeIndex);
    };

    const handleScroll = (api: EmblaApi) => {
      if (!dragInProgressRef.current) return;

      dragMovedRef.current = true;
      const preview = getDragPreview(api);
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

  if (items.length === 0 || !activeItem) {
    return (
      <section className={cn(styles.root, className)} aria-labelledby={titleId}>
        <h2 id={titleId} className={styles.title}>
          {title}
        </h2>
        <p className={styles.emptyState}>События пока не добавлены.</p>
      </section>
    );
  }

  return (
    <section className={cn(styles.root, className)} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>

      <p id={helpId} className="sr-only">
        Перетаскивайте шкалу мышью или пальцем. Выберите год, чтобы увидеть
        связанные с ним события.
      </p>

      <div className={styles.navigation}>
        <button
          type="button"
          className={styles.navigationButton}
          onClick={selectPrevious}
          disabled={activeIndex === 0}
          aria-label="Выбрать предыдущий год"
        >
          <ArrowPlaceholder direction="left" />
        </button>

        <div
          ref={emblaRef}
          className={styles.viewport}
          aria-describedby={helpId}
        >
          <div className={styles.track}>
            {items.map((item, index) => {
              const isActive = index === activeIndex;
              const hasMarker = index === markerIndex;

              return (
                <div key={item.year} className={styles.slide}>
                  <button
                    type="button"
                    className={styles.year}
                    onClick={() => selectYear(index)}
                    aria-pressed={isActive}
                    aria-label={`${item.year} год`}
                  >
                    {hasMarker ? (
                      <span className={styles.marker} aria-hidden="true" />
                    ) : null}
                    <span className={styles.tick} aria-hidden="true" />
                    <span className={styles.yearLabel}>{item.year}</span>
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          className={styles.navigationButton}
          onClick={selectNext}
          disabled={activeIndex === items.length - 1}
          aria-label="Выбрать следующий год"
        >
          <ArrowPlaceholder direction="right" />
        </button>
      </div>

      <div className={styles.eventList} aria-live="polite" aria-atomic="true">
        {activeItem.events.length > 0 ? (
          activeItem.events.map((event) => (
            <article key={event.id} className={styles.eventCard}>
              {event.text}
            </article>
          ))
        ) : (
          <p className={styles.emptyState}>Для этого года нет событий.</p>
        )}
      </div>
    </section>
  );
}
