"use client";

import {
  createContext,
  type ReactNode,
  use,
  useCallback,
  useMemo,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import "./tokens.css";

export type MarathonTheme = "light" | "dark";
export type MarathonDensity = "field" | "compact";

type MarathonUiContextValue = {
  theme: MarathonTheme;
  density: MarathonDensity;
  setTheme: (theme: MarathonTheme) => void;
  setDensity: (density: MarathonDensity) => void;
  toggleTheme: () => void;
  toggleDensity: () => void;
};

const MarathonUiContext = createContext<MarathonUiContextValue | null>(null);

export function useMarathonUi() {
  const value = use(MarathonUiContext);
  if (!value) {
    throw new Error("useMarathonUi must be used within MarathonUiProvider");
  }
  return value;
}

export function MarathonUiProvider({
  children,
  className,
  defaultTheme = "light",
  defaultDensity = "field",
}: {
  children: ReactNode;
  className?: string;
  defaultTheme?: MarathonTheme;
  defaultDensity?: MarathonDensity;
}) {
  const [theme, setTheme] = useState<MarathonTheme>(defaultTheme);
  const [density, setDensity] = useState<MarathonDensity>(defaultDensity);

  const toggleTheme = useCallback(() => {
    setTheme((t) => (t === "light" ? "dark" : "light"));
  }, []);

  const toggleDensity = useCallback(() => {
    setDensity((d) => (d === "field" ? "compact" : "field"));
  }, []);

  const value = useMemo(
    () => ({
      theme,
      density,
      setTheme,
      setDensity,
      toggleTheme,
      toggleDensity,
    }),
    [theme, density, toggleTheme, toggleDensity],
  );

  return (
    <MarathonUiContext value={value}>
      <div
        className={cn("marathon-ui", className)}
        data-theme={theme}
        data-density={density}
      >
        {children}
      </div>
    </MarathonUiContext>
  );
}
