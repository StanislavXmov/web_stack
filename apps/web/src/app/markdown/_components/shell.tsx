import type { ReactNode } from "react";

export default function Shell({
  children,
  railLabel = "MARKDOWN",
}: {
  children: ReactNode;
  railLabel?: string;
}) {
  return (
    <div className="marathon-shell">
      <aside className="marathon-shell__rail" aria-hidden="true">
        <span className="marathon-shell__rail-label">{railLabel}</span>
      </aside>
      <div className="marathon-shell__main">{children}</div>
    </div>
  );
}
