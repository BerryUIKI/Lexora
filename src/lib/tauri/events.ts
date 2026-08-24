import { listen, type UnlistenFn } from "@tauri-apps/api/event";

export interface FileChangedPayload {
  path: string;
}

/**
 * Listen for file-changed-on-disk events from the Rust backend.
 */
export async function onFileChanged(
  callback: (payload: FileChangedPayload) => void
): Promise<UnlistenFn> {
  return listen<FileChangedPayload>("file-changed", (event) => {
    callback(event.payload);
  });
}
