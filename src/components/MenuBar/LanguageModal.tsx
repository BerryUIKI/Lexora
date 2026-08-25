import { Component, Show, For } from "solid-js";
import {
  SUPPORTED_LOCALES,
  localeSetting,
  setLocale,
  currentLocale,
  t,
} from "../../i18n";
import type { SupportedLocale } from "../../i18n/types";

export interface LanguageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LanguageModal: Component<LanguageModalProps> = (props) => {
  const flags: Record<SupportedLocale, string> = {
    "en-US": "🇺🇸",
    "zh-CN": "🇨🇳",
    "zh-TW": "🇭🇰",
    "ja-JP": "🇯🇵",
    "ko-KR": "🇰🇷",
    "de-DE": "🇩🇪",
    "fr-FR": "🇫🇷",
    "es-ES": "🇪🇸",
    "ru-RU": "🇷🇺",
  };

  const handleSelectLocale = (code: SupportedLocale | "auto") => {
    setLocale(code);
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs select-none no-select animate-in fade-in duration-150"
        onClick={props.onClose}
      >
        <div
          class="w-full max-w-md mx-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6 shadow-2xl space-y-5 text-[var(--color-text-primary)] animate-in zoom-in-95 duration-150 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2.5">
              <div class="w-9 h-9 rounded-xl bg-[var(--color-accent)]/10 text-[var(--color-accent)] flex items-center justify-center border border-[var(--color-accent)]/20 shadow-xs">
                <svg
                  class="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <circle cx="12" cy="12" r="10" />
                  <line x1="2" y1="12" x2="22" y2="12" />
                  <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                </svg>
              </div>
              <div>
                <h3 class="text-base font-bold tracking-tight">
                  {t("menu.language")}
                </h3>
                <p class="text-xs text-[var(--color-text-secondary)]">
                  {t("menu.languageSubtitle")}
                </p>
              </div>
            </div>

            <button
              class="p-1.5 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={props.onClose}
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Auto (Follow System) Card */}
          <div
            class={`flex items-center justify-between p-3 rounded-xl border transition-all cursor-pointer ${
              localeSetting() === "auto"
                ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-xs"
                : "border-[var(--color-border)] hover:bg-[var(--color-hover)] bg-[var(--color-bg-secondary)]"
            }`}
            onClick={() => handleSelectLocale("auto")}
          >
            <div class="flex items-center gap-2.5">
              <span class="text-base">⚙️</span>
              <div>
                <div class="text-xs font-semibold text-[var(--color-text-primary)]">
                  {t("menu.autoLanguage")}
                </div>
                <div class="text-[10px] text-[var(--color-text-secondary)]">
                  {t("menu.autoLanguageDesc", { current: currentLocale() })}
                </div>
              </div>
            </div>

            <Show when={localeSetting() === "auto"}>
              <span class="text-xs font-bold text-[var(--color-accent)] bg-[var(--color-bg-primary)] px-2 py-0.5 rounded-md border border-[var(--color-accent)]/30">
                Active
              </span>
            </Show>
          </div>

          {/* Languages Grid */}
          <div class="space-y-1.5 max-h-64 overflow-y-auto pr-1">
            <For each={SUPPORTED_LOCALES}>
              {(loc) => {
                const isSelected = () => localeSetting() === loc.code;
                return (
                  <button
                    class={`w-full flex items-center justify-between p-2.5 rounded-xl border transition-all text-left ${
                      isSelected()
                        ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10 shadow-xs"
                        : "border-[var(--color-border)] hover:bg-[var(--color-hover)]"
                    }`}
                    onClick={() => handleSelectLocale(loc.code)}
                  >
                    <div class="flex items-center gap-2.5">
                      <span class="text-base">{flags[loc.code] || "🌐"}</span>
                      <div>
                        <div class="text-xs font-semibold text-[var(--color-text-primary)]">
                          {loc.nativeName}
                        </div>
                        <div class="text-[10px] text-[var(--color-text-secondary)]">
                          {loc.name} &bull; <span class="font-mono">{loc.code}</span>
                        </div>
                      </div>
                    </div>

                    <Show when={isSelected()}>
                      <span class="text-xs font-bold text-[var(--color-accent)] flex items-center gap-1">
                        <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </span>
                    </Show>
                  </button>
                );
              }}
            </For>
          </div>

          {/* Footer Action */}
          <div class="pt-2 border-t border-[var(--color-border)] flex justify-end">
            <button
              class="w-full py-2 rounded-xl bg-[var(--color-accent)] hover:opacity-90 text-white font-semibold text-xs transition-opacity active:scale-98 shadow-xs"
              onClick={props.onClose}
            >
              {t("dialogs.ok")}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};
