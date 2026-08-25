import { Component, Show } from "solid-js";
import {
  updateModalOpen,
  setUpdateModalOpen,
  updateInfo,
  openReleaseDownload,
  REPO_RELEASES_URL,
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
              {/* Dynamic Icon */}
              <div
                class={`w-10 h-10 rounded-xl flex items-center justify-center border shadow-xs ${
                  info()?.status === "update_available"
                    ? "bg-[var(--color-accent)]/15 text-[var(--color-accent)] border-[var(--color-accent)]/30"
                    : info()?.status === "ahead_of_release"
                    ? "bg-purple-500/15 text-purple-400 border-purple-500/30"
                    : info()?.status === "error"
                    ? "bg-amber-500/15 text-amber-400 border-amber-500/30"
                    : "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                }`}
              >
                <Show when={info()?.status === "update_available"}>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </Show>

                <Show when={info()?.status === "ahead_of_release"}>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                </Show>

                <Show when={info()?.status === "up_to_date"}>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </Show>

                <Show when={info()?.status === "error"}>
                  <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <line x1="12" y1="8" x2="12" y2="12" />
                    <line x1="12" y1="16" x2="12.01" y2="16" />
                  </svg>
                </Show>
              </div>

              <div>
                <h3 class="text-base font-bold tracking-tight">
                  <Show when={info()?.status === "update_available"}>
                    {t("update.updateAvailable")}
                  </Show>
                  <Show when={info()?.status === "ahead_of_release"}>
                    {t("update.aheadTitle")}
                  </Show>
                  <Show when={info()?.status === "up_to_date"}>
                    {t("update.upToDate")}
                  </Show>
                  <Show when={info()?.status === "error"}>
                    {info()?.releaseTitle || "Network Error"}
                  </Show>
                </h3>
                <p class="text-xs text-[var(--color-text-secondary)]">
                  <Show when={info()?.status === "update_available"}>
                    v{info()?.latestVersion}
                  </Show>
                  <Show when={info()?.status === "ahead_of_release"}>
                    {t("update.aheadDesc", {
                      current: `v${info()?.currentVersion}`,
                      latest: `v${info()?.latestVersion}`,
                    })}
                  </Show>
                  <Show when={info()?.status === "up_to_date"}>
                    {t("update.upToDateDesc")}
                  </Show>
                  <Show when={info()?.status === "error"}>
                    {info()?.releaseNotes}
                  </Show>
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
          <div class="flex items-center justify-between py-2.5 px-3.5 rounded-xl bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-xs">
            <div class="flex items-center gap-3">
              <div>
                <span class="text-[var(--color-text-secondary)]">{t("update.currentVersion")}: </span>
                <span class="font-mono font-semibold">v{info()?.currentVersion}</span>
              </div>
              <span class="text-[var(--color-border)]">&bull;</span>
              <div>
                <span class="text-[var(--color-text-secondary)]">{t("update.latestVersion")}: </span>
                <span class={`font-mono font-semibold ${info()?.status === "update_available" ? "text-[var(--color-accent)]" : ""}`}>
                  v{info()?.latestVersion}
                </span>
              </div>
            </div>

            <Show when={info()?.status === "ahead_of_release"}>
              <span class="text-[11px] font-bold px-2 py-0.5 rounded-md bg-purple-500/10 text-purple-400 border border-purple-500/20">
                {t("update.aheadBadge")}
              </span>
            </Show>
          </div>

          {/* Release Notes Scrollbox */}
          <Show when={info()?.status === "update_available" && info()?.releaseNotes}>
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
              {info()?.status === "update_available" ? t("update.remindLater") : t("dialogs.close")}
            </button>

            <Show when={info()?.status === "update_available"}>
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

            <Show when={info()?.status === "ahead_of_release"}>
              <button
                class="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--color-accent)] hover:opacity-90 text-white font-semibold text-xs transition-all shadow-xs active:scale-95"
                onClick={() => {
                  openReleaseDownload(REPO_RELEASES_URL);
                  setUpdateModalOpen(false);
                }}
              >
                <span>{t("help.github")}</span>
              </button>
            </Show>
          </div>
        </div>
      </div>
    </Show>
  );
};
