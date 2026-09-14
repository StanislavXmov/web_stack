import type { EmblaApi, TimelineYear } from "./types";

export function findInitialIndex(
  items: readonly TimelineYear[],
  initialYear: number | undefined,
) {
  if (initialYear === undefined) return 0;

  const initialIndex = items.findIndex((item) => item.year === initialYear);
  return initialIndex === -1 ? 0 : initialIndex;
}

export function getDragPreview(api: EmblaApi, currentIndex: number) {
  const visibleSlides = api.slidesInView();
  let index = currentIndex;
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

  return { index, snap: previewSnap };
}
