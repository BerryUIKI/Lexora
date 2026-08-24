import { invoke } from "@tauri-apps/api/core";

/**
 * Greet command — used to verify IPC round-trip works.
 * Will be replaced with real commands in Phase 2.
 */
export async function greet(name: string): Promise<string> {
  return invoke<string>("greet", { name });
}

/**
 * Open a file and return its contents.
 * Placeholder — implemented in Phase 2.
 */
export async function openFile(path: string): Promise<string> {
  return invoke<string>("open_file", { path });
}

/**
 * Save content to a file.
 * Placeholder — implemented in Phase 2.
 */
export async function saveFile(path: string, content: string): Promise<void> {
  return invoke<void>("save_file", { path, content });
}
