import { Component } from "solid-js";

export interface FileTreeProps {
  rootPath: string;
}

export const FileTree: Component<FileTreeProps> = (props) => {
  // File tree implementation will come in Phase 3
  return (
    <div class="text-sm">
      <p class="text-[var(--color-text-secondary)]">
        Root: {props.rootPath}
      </p>
    </div>
  );
};
