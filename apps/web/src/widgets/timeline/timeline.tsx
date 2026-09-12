"use client";

import useEmblaCarousel from "embla-carousel-react";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { styles } from "./styles";
import { EmblaApi, TimelineProps, TimelineYear } from "./types";

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
  const dragStartActiveIndexRef = useRef(initialIndex);
  const dragPreviewIndexRef = useRef(initialIndex);
  const dragPreviewSnapRef = useRef(0);
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
    watchDrag: (_api, event) =>
      !(
        event.target instanceof Element &&
        event.target.closest("[data-timeline-year]")
      ),
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

    const getDragPreview = (api: EmblaApi) => {
      const visibleSlides = api.slidesInView();
      let index = dragPreviewIndexRef.current;
      if (visibleSlides.length > 0 && !visibleSlides.includes(index)) {
        index = Math.min(
          Math.max(index, visibleSlides[0]),
          visibleSlides[visibleSlides.length - 1],
        );
      }

      const progress = api.scrollProgress();
      const scrollSnaps = api.scrollSnapList();
      let previewSnap = api.selectedScrollSnap();
      for (let snapIndex = 0; snapIndex < scrollSnaps.length; snapIndex += 1) {
        if (
          Math.abs(scrollSnaps[snapIndex] - progress) <
          Math.abs(scrollSnaps[previewSnap] - progress)
        ) {
          previewSnap = snapIndex;
        }
      }

      return {
        index,
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
      if (!dragInProgressRef.current) return;

      const preview = getDragPreview(api);
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
                    data-timeline-year
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
