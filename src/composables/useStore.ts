import { ref, watch } from "vue";

// Mode
export const modes = [
  "1-10",
  "10-20",
  "addition",
  "div-2",
  "div-3",
  "div-mult",
  "div-mult-rest",
  "20-div-mult",
] as const;
export type Mode = (typeof modes)[number];
const mode = ref<Mode>(
  (window.localStorage?.getItem("mode") as Mode) || "1-10",
);

// Landscape
const landscape = ref<boolean>(
  (window.localStorage?.getItem("landscape") || "false") === "true",
);

// Difficulty
export const difficulties = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof difficulties)[number];
const difficulty = ref<Difficulty>(
  (window.localStorage?.getItem("difficulty") as Difficulty) || "easy",
);

// Theme
export const themes = [
  "default",
  "dim",
  "cupcake",
  "valentine",
  "gold",
] as const;
export type Theme = (typeof themes)[number];
const theme = ref<Theme>(
  (window.localStorage?.getItem("theme") as Theme) || "default",
);
if (theme.value === "default") {
  delete document.documentElement.dataset.theme;
} else {
  document.documentElement.dataset.theme = theme.value;
}

export function useStore() {
  watch(difficulty, (value) => {
    window.localStorage?.setItem("difficulty", value);
  });

  watch(mode, (value) => {
    window.localStorage?.setItem("mode", value);
  });

  watch(landscape, (value) => {
    window.localStorage?.setItem("landscape", String(value));
  });

  watch(theme, (value) => {
    if (theme.value === "default") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme.value;
    }
    window.localStorage?.setItem("theme", value);
  });

  return { difficulty, theme, mode, landscape };
}
