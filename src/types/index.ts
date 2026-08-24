/** Represents a file entry in the sidebar file tree. */
export interface FileEntry {
  name: string;
  path: string;
  isDirectory: boolean;
  children?: FileEntry[];
}

/** Represents the result of a search operation. */
export interface SearchResult {
  filePath: string;
  lineNumber: number;
  lineContent: string;
  matchStart: number;
  matchEnd: number;
}

/** Represents a Table of Contents entry. */
export interface TocEntry {
  level: number;
  text: string;
  id: string;
}
