import { displayMode } from "../store/editor";

export type FormatAction =
  | "bold"
  | "italic"
  | "strikethrough"
  | "code_inline"
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "h5"
  | "h6"
  | "paragraph"
  | "bullet_list"
  | "ordered_list"
  | "task_list"
  | "blockquote"
  | "table"
  | "link"
  | "image";

type FormatHandler = (action: FormatAction) => void;

let writingFormatHandler: FormatHandler | null = null;
let codeFormatHandler: FormatHandler | null = null;

export function registerWritingFormatter(handler: FormatHandler | null) {
  writingFormatHandler = handler;
}

export function registerCodeFormatter(handler: FormatHandler | null) {
  codeFormatHandler = handler;
}

/**
 * Dispatches a formatting action to the currently active editor mode (Writing or Code).
 */
export function dispatchFormat(action: FormatAction) {
  const mode = displayMode();
  if (mode === "writing" && writingFormatHandler) {
    writingFormatHandler(action);
  } else if (mode === "code" && codeFormatHandler) {
    codeFormatHandler(action);
  }
}
