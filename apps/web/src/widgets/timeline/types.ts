import type useEmblaCarousel from "embla-carousel-react";
import type { UseEmblaCarouselType } from "embla-carousel-react";
import type { ComponentPropsWithRef } from "react";

export type TimelineEvent = {
  id: string;
  text: string;
};

export type TimelineYear = {
  year: number;
  events: readonly TimelineEvent[];
};

export type EmblaApi = NonNullable<UseEmblaCarouselType[1]>;

export type RootProps = ComponentPropsWithRef<"section"> & {
  items: readonly TimelineYear[];
  initialYear?: number;
  opts?: Parameters<typeof useEmblaCarousel>[0];
  plugins?: Parameters<typeof useEmblaCarousel>[1];
};

export type ItemProps = ComponentPropsWithRef<"button"> & { year: number };
export type ArrowProps = ComponentPropsWithRef<"button">;
export type ArrowPlaceholderProps = { direction: "left" | "right" };
export type TitleProps = ComponentPropsWithRef<"h2">;
export type NavigationProps = ComponentPropsWithRef<"div">;
export type ContentProps = ComponentPropsWithRef<"div">;
export type DotProps = ComponentPropsWithRef<"span">;
export type TickProps = ComponentPropsWithRef<"span">;
export type YearLabelProps = ComponentPropsWithRef<"span">;
export type EventProps = ComponentPropsWithRef<"article">;
export type EventsProps = ComponentPropsWithRef<"div">;
export type EmptyProps = ComponentPropsWithRef<"p">;

export type TimelineContextValue = {
  items: readonly TimelineYear[];
  activeIndex: number;
  markerIndex: number;
  activeItem: TimelineYear | undefined;
  titleId: string;
  helpId: string;
  emblaRef: UseEmblaCarouselType[0];
  selectPrevious: () => void;
  selectNext: () => void;
  selectYear: (index: number) => void;
};
