import { Component, Show } from "solid-js";
import {
  updateModalOpen,
  setUpdateModalOpen,
  updateInfo,
  openReleaseDownload,
} from "../../lib/updater";
import { t } from "../../i18n";

export const UpdateModal: Component = () => {
  const info = () => updateInfo();

  return (
    <Show when={updateModalOpen() && info()}>
      <div
        class="fixed inset-0 z-50 flex items-center justify-center bg-black/45 backdrop-blur-xs select-none no-select animate-in fade-in duration-150"
        onClick={() => setUpdateModalOpen(false)}
      >
        <div
          class="w-full max-w-lg mx-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6 shadow-2xl space-y-5 text-[var(--color-text-primary)] animate-in zoom-in-95 duration-150 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div
                class={`w-10 h-10 rounded-xl flex items-center justify-center border ${
                  info()?.hasUpdate
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-[var(--color-accent)]/30"
                    : "bg-green-500/15 text-green-500 border-green-500/30"
                }`}
              >
                <Show
                  when={info()?.hasUpdate}
                  fallback={
                    <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  }
                >
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </Show>
              </div>

              <div>
                <h3 class="text-base font-bold tracking-tight">
                  {info()?.hasUpdate ? t("update.updateAvailable") : t("update.upToDate")}
                </h3>
                <p class="text-xs text-[var(--color-text-secondary)]">
                  {info()?.hasUpdate
                    ? `v${info()?.latestVersion}`
                    : t("update.upToDateDesc")}
                </p>
              </div>
            </div>

            <button
              class="p-1 rounded-lg hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setUpdateModalOpen(false)}
            >
              <svg class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Version Comparison Tag */}
          <div class="flex items-center gap-3 py-2 px-3 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs">
            <div>
              <span class="text-[var(--color-text-secondary)]">{t("update.currentVersion")}: </span>
              <span class="font-mono font-semibold">v{info()?.currentVersion}</span>
            </div>
            <span class="text-[var(--color-border)]">&bull;</span>
            <div>
              <span class="text-[var(--color-text-secondary)]">{t("update.latestVersion")}: </span>
              <span class="font-mono font-semibold text-[var(--color-accent)]">
                v{info()?.latestVersion}
              </span>
            </div>
          </div>

          {/* Release Notes Scrollbox */}
          <Show when={info()?.releaseNotes}>
            <div class="space-y-1.5">
              <label class="text-[11px] font-semibold uppercase tracking-wider text-[var(--color-text-secondary)]">
                {t("update.releaseNotes")}
              </label>
              <div class="max-h-48 overflow-y-auto rounded-xl p-3.5 bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs text-[var(--color-text-primary)] font-mono leading-relaxed whitespace-pre-wrap select-text">
                {info()?.releaseNotes}
              </div>
            </div>
          </Show>

          {/* Actions */}
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
            <button
              class="px-3.5 py-2 rounded-xl text-xs font-semibold hover:bg-[var(--color-hover)] text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              onClick={() => setUpdateModalOpen(false)}
            >
              {info()?.hasUpdate ? t("update.remindLater") : t("dialogs.close")}
            </button>

            <Show when={info()?.hasUpdate}>
              <button
                class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-accent)] hover:opacity-90 text-white font-semibold text-xs transition-all shadow-xs active:scale-95"
                onClick={() => {
                  if (info()?.releaseUrl) {
                    openReleaseDownload(info()!.releaseUrl);
                    setUpdateModalOpen(false);
                  }
                }}
              >
                <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                <span>{t("update.downloadUpdate")}</span>
              </button>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
};
