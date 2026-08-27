import {
  Component,
  createSignal,
  For,
  onCleanup,
  onMount,
  Show,
} from "solid-js";
import {
  MARKDOWN_THEME_OPTIONS,
  automaticUpdateChecks,
  elementShadows,
  markdownTheme,
  setElementShadows,
  setAutomaticUpdateChecks,
  setMarkdownTheme,
  setTheme,
  theme,
  type Theme,
} from "../../store/settings";
import { t } from "../../i18n";

export interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const colorModes: Array<{
  id: Theme;
  labelKey: "lightTheme" | "darkTheme" | "systemTheme";
}> = [
  { id: "light", labelKey: "lightTheme" },
  { id: "dark", labelKey: "darkTheme" },
  { id: "system", labelKey: "systemTheme" },
];

export const SettingsModal: Component<SettingsModalProps> = (props) => {
  const [activeTab, setActiveTab] = createSignal<"theme" | "updates">("theme");
  const handleKeyDown = (event: KeyboardEvent) => {
    if (props.isOpen && event.key === "Escape") props.onClose();
  };

  onMount(() => window.addEventListener("keydown", handleKeyDown));
  onCleanup(() => window.removeEventListener("keydown", handleKeyDown));

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-[80] flex items-center justify-center bg-black/35 backdrop-blur-[2px]"
        onMouseDown={(event) => {
          if (event.target === event.currentTarget) props.onClose();
        }}
      >
        <div
          class="w-full max-w-3xl max-h-[82vh] mx-4 overflow-hidden rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-2xl flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label={t("settings.title")}
        >
          <header class="h-14 px-5 flex items-center justify-between border-b border-[var(--color-border)] flex-shrink-0">
            <h2 class="text-base font-semibold">{t("settings.title")}</h2>
            <button
              class="w-8 h-8 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={props.onClose}
              aria-label={t("dialogs.close")}
            >
              ✕
            </button>
          </header>

          <div class="flex flex-1 min-h-0">
            <nav class="w-40 flex-shrink-0 p-3 space-y-1 bg-[var(--color-bg-secondary)] border-r border-[var(--color-border)]">
              <button
                class={`w-full px-3 py-2 rounded-lg text-left text-sm font-semibold ${
                  activeTab() === "theme"
                    ? "bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]"
                }`}
                onClick={() => setActiveTab("theme")}
              >
                {t("settings.themeTab")}
              </button>
              <button
                class={`w-full px-3 py-2 rounded-lg text-left text-sm font-semibold ${
                  activeTab() === "updates"
                    ? "bg-[var(--color-accent)]/12 text-[var(--color-accent)]"
                    : "text-[var(--color-text-secondary)] hover:bg-[var(--color-hover)]"
                }`}
                onClick={() => setActiveTab("updates")}
              >
                {t("settings.updatesTab")}
              </button>
            </nav>

            <section class="flex-1 overflow-y-auto p-6 space-y-8">
              <Show when={activeTab() === "theme"}>
              <div class="space-y-3">
                <div>
                  <h3 class="text-sm font-semibold">{t("settings.markdownTheme")}</h3>
                  <p class="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                    {t("settings.markdownThemeDescription")}
                  </p>
                </div>
                <div class="grid grid-cols-3 gap-3 max-[680px]:grid-cols-1">
                  <For each={MARKDOWN_THEME_OPTIONS}>
                    {(option) => (
                      <button
                        class={`rounded-xl border p-3 text-left transition-colors ${
                          markdownTheme() === option.id
                            ? "border-[var(--color-accent)] bg-[var(--color-accent)]/10"
                            : "border-[var(--color-border)] hover:bg-[var(--color-hover)]"
                        }`}
                        onClick={() => setMarkdownTheme(option.id)}
                        aria-pressed={markdownTheme() === option.id}
                      >
                        <div
                          class={`h-16 rounded-lg border mb-2 overflow-hidden theme-preview-${option.id}`}
                          aria-hidden="true"
                        >
                          <div class="h-4 border-b opacity-70" />
                          <div class="p-2 space-y-1">
                            <div class="h-1.5 w-2/3 rounded-full bg-current opacity-70" />
                            <div class="h-1.5 w-full rounded-full bg-current opacity-25" />
                            <div class="h-1.5 w-4/5 rounded-full bg-current opacity-25" />
                          </div>
                        </div>
                        <span class="text-sm font-semibold">{option.name}</span>
                      </button>
                    )}
                  </For>
                </div>
              </div>

              <div class="space-y-3">
                <div>
                  <h3 class="text-sm font-semibold">{t("settings.colorMode")}</h3>
                  <p class="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                    {t("settings.colorModeDescription")}
                  </p>
                </div>
                <div class="inline-flex rounded-lg border border-[var(--color-border)] p-1 bg-[var(--color-bg-secondary)]">
                  <For each={colorModes}>
                    {(mode) => (
                      <button
                        class={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                          theme() === mode.id
                            ? "bg-[var(--color-bg-primary)] text-[var(--color-text-primary)] shadow-xs"
                            : "text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]"
                        }`}
                        onClick={() => setTheme(mode.id)}
                        aria-pressed={theme() === mode.id}
                      >
                        {t(`view.${mode.labelKey}`)}
                      </button>
                    )}
                  </For>
                </div>
              </div>

              <div class="flex items-center justify-between gap-5 rounded-xl border border-[var(--color-border)] p-4">
                <div>
                  <h3 class="text-sm font-semibold">{t("settings.elementShadows")}</h3>
                  <p class="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                    {t("settings.elementShadowsDescription")}
                  </p>
                </div>
                <button
                  class={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors ${
                    elementShadows()
                      ? "bg-[var(--color-accent)]"
                      : "bg-[var(--color-border)]"
                  }`}
                  onClick={() => setElementShadows((enabled) => !enabled)}
                  role="switch"
                  aria-checked={elementShadows()}
                  aria-label={t("settings.elementShadows")}
                >
                  <span
                    class={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                      elementShadows() ? "translate-x-5" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              </Show>

              <Show when={activeTab() === "updates"}>
                <div class="space-y-5">
                  <div>
                    <h3 class="text-sm font-semibold">{t("settings.automaticUpdateChecks")}</h3>
                    <p class="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                      {t("settings.automaticUpdateChecksDescription")}
                    </p>
                  </div>
                  <div class="flex items-center justify-between gap-5 rounded-xl border border-[var(--color-border)] p-4">
                    <div>
                      <h4 class="text-sm font-semibold">{t("settings.automaticUpdateChecks")}</h4>
                      <p class="mt-1 text-xs leading-5 text-[var(--color-text-secondary)]">
                        {t("settings.stableChannelDescription")}
                      </p>
                    </div>
                    <button
                      class={`relative w-10 h-6 rounded-full flex-shrink-0 transition-colors ${
                        automaticUpdateChecks()
                          ? "bg-[var(--color-accent)]"
                          : "bg-[var(--color-border)]"
                      }`}
                      onClick={() => setAutomaticUpdateChecks((enabled) => !enabled)}
                      role="switch"
                      aria-checked={automaticUpdateChecks()}
                      aria-label={t("settings.automaticUpdateChecks")}
                    >
                      <span
                        class={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                          automaticUpdateChecks() ? "translate-x-5" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </Show>
            </section>
          </div>
        </div>
      </div>
    </Show>
  );
};
