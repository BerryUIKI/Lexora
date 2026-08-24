import { createSignal, createEffect } from "solid-js";

export type Theme = "light" | "dark" | "system";

function getSystemTheme(): "light" | "dark" {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function getInitialTheme(): Theme {
  const stored = localStorage.getItem("lexora-theme");
  if (stored === "light" || stored === "dark" || stored === "system") {
    return stored;
  }
  return "system";
}

const [theme, setTheme] = createSignal<Theme>(getInitialTheme());
const [resolvedTheme, setResolvedTheme] = createSignal<"light" | "dark">(
  getInitialTheme() === "system" ? getSystemTheme() : (getInitialTheme() as "light" | "dark")
);

// React to theme changes
createEffect(() => {
  const current = theme();
  localStorage.setItem("lexora-theme", current);

  const resolved = current === "system" ? getSystemTheme() : current;
  setResolvedTheme(resolved);
  document.documentElement.setAttribute("data-theme", resolved);
});

// Listen for OS theme changes
if (typeof window !== "undefined") {
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", () => {
      if (theme() === "system") {
        const resolved = getSystemTheme();
        setResolvedTheme(resolved);
        document.documentElement.setAttribute("data-theme", resolved);
      }
    });
}

const [fontSize, setFontSize] = createSignal(16);
const [workspacePath, setWorkspacePath] = createSignal<string | null>(null);

export {
  theme,
  setTheme,
  resolvedTheme,
  fontSize,
  setFontSize,
  workspacePath,
  setWorkspacePath,
};

export function cycleTheme() {
  const current = theme();
  if (current === "light") setTheme("dark");
  else if (current === "dark") setTheme("system");
  else setTheme("light");
}
