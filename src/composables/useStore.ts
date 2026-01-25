import { ref, watch } from "vue";

export const difficulties = ["easy", "medium", "hard"] as const;
export type Difficulty = (typeof difficulties)[number];
const difficulty = ref<Difficulty>(
  (window.localStorage?.getItem("difficulty") as Difficulty) || "easy",
);

export const themes = ["default", "dim", "cupcake", "valentine"] as const;
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

  watch(theme, (value) => {
    if (theme.value === "default") {
      delete document.documentElement.dataset.theme;
    } else {
      document.documentElement.dataset.theme = theme.value;
    }
    window.localStorage?.setItem("theme", value);
  });

  return { difficulty, theme };
}
