import { Component, Show, onMount, onCleanup } from "solid-js";
import { t } from "../../i18n";

export interface CloseConfirmModalProps {
  isOpen: boolean;
  filename: string;
  onSave: () => void;
  onDiscard: () => void;
  onCancel: () => void;
}

export const CloseConfirmModal: Component<CloseConfirmModalProps> = (props) => {
  const handleKeyDown = (e: KeyboardEvent) => {
    if (!props.isOpen) return;
    if (e.key === "Escape") {
      e.preventDefault();
      props.onCancel();
    } else if (e.key === "Enter") {
      e.preventDefault();
      props.onSave();
    } else if ((e.key === "d" || e.key === "D") && (e.altKey || !e.ctrlKey)) {
      e.preventDefault();
      props.onDiscard();
    }
  };

  onMount(() => {
    window.addEventListener("keydown", handleKeyDown);
  });

  onCleanup(() => {
    window.removeEventListener("keydown", handleKeyDown);
  });

  const titleText = () => {
    const raw = t("dialogs.unsavedCloseTitle");
    return raw.replace("{filename}", props.filename);
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs select-none no-select animate-in fade-in duration-150"
        onClick={props.onCancel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="close-confirm-title"
        data-modal="close-confirm"
      >
        <div
          class="w-full max-w-md mx-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-bg-primary)] p-6 shadow-2xl space-y-5 text-[var(--color-text-primary)] animate-in zoom-in-95 duration-150 text-left"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header with Warning Icon */}
          <div class="flex items-start gap-3.5">
            <div class="w-10 h-10 rounded-xl bg-amber-500/15 text-amber-500 flex-shrink-0 flex items-center justify-center border border-amber-500/20 shadow-xs mt-0.5">
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
                <line x1="12" y1="9" x2="12" y2="13" />
                <line x1="12" y1="17" x2="12.01" y2="17" />
              </svg>
            </div>
            <div class="space-y-1 min-w-0 flex-1">
              <h3 id="close-confirm-title" class="text-sm font-semibold leading-snug break-words">
                {titleText()}
              </h3>
              <p class="text-xs text-[var(--color-text-secondary)] leading-relaxed">
                {t("dialogs.unsavedCloseMessage")}
              </p>
            </div>
          </div>

          {/* Action Buttons: Cancel, Don't Save, Save */}
          <div class="flex items-center justify-end gap-2 pt-2 border-t border-[var(--color-border)]">
            <button
              class="px-3.5 py-1.5 rounded-lg border border-[var(--color-border)] hover:bg-[var(--color-hover)] text-xs font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors cursor-pointer"
              onClick={props.onCancel}
              data-action="cancel"
            >
              {t("dialogs.cancel")}
            </button>
            <button
              class="px-3.5 py-1.5 rounded-lg border border-red-500/30 bg-red-500/10 hover:bg-red-500/20 text-red-600 dark:text-red-400 text-xs font-medium transition-colors cursor-pointer"
              onClick={props.onDiscard}
              title="Alt+D"
              data-action="discard"
            >
              {t("dialogs.dontSave")}
            </button>
            <button
              class="px-4 py-1.5 rounded-lg bg-[var(--color-accent)] hover:opacity-90 text-white text-xs font-semibold transition-all shadow-xs cursor-pointer"
              onClick={props.onSave}
              title="Enter"
              data-action="save"
            >
              {t("dialogs.save")}
            </button>
          </div>
        </div>
      </div>
    </Show>
  );
};
