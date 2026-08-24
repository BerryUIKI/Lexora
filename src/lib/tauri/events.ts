import { listen, type UnlistenFn } from "@tauri-apps/api/event";

/**
 * Listen for file-changed-on-disk events from the Rust backend.
 * Placeholder — implemented in Phase 2.
 */
export async function onFileChanged(
  callback: (path: string) => void
): Promise<UnlistenFn> {
  return listen<string>("file-changed", (event) => {
    callback(event.payload);
  });
}
