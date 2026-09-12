import { UseEmblaCarouselType } from "embla-carousel-react";

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

export type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;
