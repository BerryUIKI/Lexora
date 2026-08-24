import { createSignal } from "solid-js";

export type Theme = "light" | "dark" | "system";

const [theme, setTheme] = createSignal<Theme>("system");
const [fontSize, setFontSize] = createSignal(16);
const [workspacePath, setWorkspacePath] = createSignal<string | null>(null);

export { theme, setTheme, fontSize, setFontSize, workspacePath, setWorkspacePath };
