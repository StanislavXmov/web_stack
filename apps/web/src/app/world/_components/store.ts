import { create } from "zustand";

type WorldUiState = {
  paused: boolean;
  timeScale: number;
  showGrid: boolean;
  setPaused: (paused: boolean) => void;
  togglePaused: () => void;
  setTimeScale: (timeScale: number) => void;
  setShowGrid: (showGrid: boolean) => void;
};

export const useWorldStore = create<WorldUiState>((set) => ({
  paused: false,
  timeScale: 1,
  showGrid: true,
  setPaused: (paused) => set({ paused }),
  togglePaused: () => set((state) => ({ paused: !state.paused })),
  setTimeScale: (timeScale) => set({ timeScale }),
  setShowGrid: (showGrid) => set({ showGrid }),
}));
