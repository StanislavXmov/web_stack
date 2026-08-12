import type { ReactNode } from "react";

const grainSvg =
  "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")";

export default function Shell({
  children,
  railLabel = "MARKDOWN",
}: {
  children: ReactNode;
  railLabel?: string;
}) {
  return (
    <div className="marathon-shell font-(family-name:--font-marathon-mono) relative min-h-dvh overflow-x-clip bg-(--m-cobalt) text-(--m-white)">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-1 animate-[marathon-grain_0.9s_ease-out_both] opacity-[0.18] mix-blend-soft-light motion-reduce:animate-none"
        style={{ backgroundImage: grainSvg }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 z-0 opacity-35"
        style={{
          backgroundImage: `
            radial-gradient(
              circle,
              color-mix(in srgb, var(--m-white) 18%, transparent) 1px,
              transparent 1.5px
            ),
            repeating-linear-gradient(
              -18deg,
              transparent,
              transparent 11px,
              color-mix(in srgb, var(--m-white) 8%, transparent) 11px,
              color-mix(in srgb, var(--m-white) 8%, transparent) 12px
            )
          `,
          backgroundSize: "18px 18px, auto",
          backgroundPosition: "8px 8px, 0 0",
        }}
      />
      <aside
        aria-hidden="true"
        className="fixed top-0 right-0 z-30 flex h-dvh w-13 animate-[marathon-rail-in_420ms_cubic-bezier(0.22,1,0.36,1)_both] items-center justify-center bg-(--m-lime) text-(--m-ink) shadow-[-2px_0_0_var(--m-ink)] motion-reduce:animate-none"
      >
        <span className="font-(family-name:--font-marathon-display) rotate-180 select-none font-bold text-[clamp(1.75rem,4vw,2.75rem)] uppercase leading-none tracking-[0.18em] [writing-mode:vertical-rl]">
          {railLabel}
        </span>
      </aside>
      <div className="relative z-2 min-h-dvh p-6 pr-18 pb-10 md:p-10 md:pr-22 md:pb-12">
        {children}
      </div>
    </div>
  );
}
