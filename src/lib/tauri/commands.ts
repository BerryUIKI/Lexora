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
 * Get command line file arguments passed when opening files from Windows Explorer.
 */
export async function getCliArgs(): Promise<string[]> {
  return invoke<string[]>("get_cli_args");
}

/**
 * Minimize the application window.
 */
export async function minimizeWindow(): Promise<void> {
  return invoke<void>("minimize_window");
}

/**
 * Toggle maximize / restore for the application window.
 */
export async function toggleMaximizeWindow(): Promise<void> {
  return invoke<void>("toggle_maximize_window");
}

/**
 * Close the application window.
 */
export async function closeWindow(): Promise<void> {
  return invoke<void>("close_window");
}

/**
 * Check if the application window is currently maximized.
 */
export async function isWindowMaximized(): Promise<boolean> {
  return invoke<boolean>("is_window_maximized");
}

/**
 * Start dragging the application window.
 */
export async function startDrag(): Promise<void> {
  return invoke<void>("start_drag");
}

/**
 * Greet command — used to verify IPC round-trip works.
 */
export async function greet(name: string): Promise<string> {
  return invoke<string>("greet", { name });
}

export interface FileEntry {
  name: string;
  path: string;
  is_directory: boolean;
  children?: FileEntry[];
}

/**
 * List a workspace directory recursively.
 */
export async function listDirectoryTree(path: string): Promise<FileEntry> {
  return invoke<FileEntry>("list_directory_tree", { path });
}

/**
 * Create a new file or folder.
 */
export async function createEntry(
  path: string,
  isDirectory: boolean
): Promise<void> {
  return invoke<void>("create_entry", { path, isDirectory });
}

/**
 * Delete a file or folder.
 */
export async function deleteEntry(path: string): Promise<void> {
  return invoke<void>("delete_entry", { path });
}

/**
 * Rename a file or folder.
 */
export async function renameEntry(
  oldPath: string,
  newPath: string
): Promise<void> {
  return invoke<void>("rename_entry", { oldPath, newPath });
}

/**
 * Export document to standalone HTML/PDF.
 */
export async function exportDocument(
  markdown: string,
  title: string,
  outputPath: string
): Promise<void> {
  return invoke<void>("export_document", {
    markdown,
    title,
    outputPath,
  });
}

export interface SearchMatch {
  file_path: string;
  file_name: string;
  line_number: number;
  line_content: string;
  match_start: number;
  match_end: number;
}

/**
 * Perform workspace full-text search.
 */
export async function searchWorkspace(
  query: string,
  rootPath: string
): Promise<SearchMatch[]> {
  return invoke<SearchMatch[]>("search_workspace", {
    query,
    rootPath,
  });
}



