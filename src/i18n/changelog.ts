import type { SupportedLocale } from "./types";

const LANGUAGE_BLOCK = /<!--\s*lang:([\w-]+)\s*-->([\s\S]*?)<!--\s*\/lang\s*-->/g;

/**
 * Select the release-note block matching the active UI locale.
 * Release descriptions without language markers remain fully compatible.
 */
export function selectLocalizedReleaseNotes(
  notes: string | undefined,
  locale: SupportedLocale
): string {
  if (!notes) return "";

  const localized = new Map<string, string>();
  for (const match of notes.matchAll(LANGUAGE_BLOCK)) {
    localized.set(match[1], match[2].trim());
  }

  if (localized.size === 0) return notes.trim();
  return localized.get(locale) || localized.get("en-US") || "";
}

