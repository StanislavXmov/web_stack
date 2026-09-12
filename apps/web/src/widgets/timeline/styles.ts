export const styles = {
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
  year: "group relative z-10 mx-auto flex h-full w-16 cursor-pointer flex-col items-center rounded-md bg-transparent text-zinc-700 outline-none focus-visible:ring-2 focus-visible:ring-sky-500 focus-visible:ring-offset-2",
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
