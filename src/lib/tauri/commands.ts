import { invoke } from "@tauri-apps/api/core";

export interface TocEntry {
  level: number;
  text: string;
  id: string;
}

export interface OpenFileResponse {
  path: string;
  filename: string;
  content: string;
  html: string;
  toc: TocEntry[];
  word_count: number;
}

export interface RenderResult {
  html: string;
  toc: TocEntry[];
  word_count: number;
}

/**
 * Open a file by path: read, parse, and return full render data.
 */
export async function openFile(path: string): Promise<OpenFileResponse> {
  return invoke<OpenFileResponse>("open_file", { path });
}

/**
 * Save content to a file.
 */
export async function saveFile(
  path: string,
  content: string
): Promise<OpenFileResponse> {
  return invoke<OpenFileResponse>("save_file", { path, content });
}

/**
 * Get the currently active document.
 */
export async function getActiveDocument(): Promise<OpenFileResponse | null> {
  return invoke<OpenFileResponse | null>("get_active_document");
}

/**
 * Render markdown string to HTML with TOC and word count.
 */
export async function renderMarkdown(
  markdown: string
): Promise<RenderResult> {
  return invoke<RenderResult>("render_markdown", { markdown });
}

/**
 * Highlight a code block.
 */
export async function highlightCode(
  code: string,
  language: string
): Promise<string> {
  return invoke<string>("highlight_code", { code, language });
}

/**
 * Start watching a file for external changes.
 */
export async function startWatchingFile(path: string): Promise<void> {
  return invoke<void>("start_watching_file", { path });
}

/**
 * Stop watching the current file.
 */
export async function stopWatchingFile(): Promise<void> {
  return invoke<void>("stop_watching_file");
}

/**
 * Greet command — used to verify IPC round-trip works.
 */
export async function greet(name: string): Promise<string> {
  return invoke<string>("greet", { name });
}
