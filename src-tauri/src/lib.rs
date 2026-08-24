mod commands;
mod models;
mod services;
mod state;

use state::AppState;
use std::sync::Mutex;

/// Holds the file watcher so it doesn't get dropped.
struct WatcherState {
    _watcher: Mutex<Option<notify::RecommendedWatcher>>,
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_shell::init())
        .manage(AppState::default())
        .manage(WatcherState {
            _watcher: Mutex::new(None),
        })
        .invoke_handler(tauri::generate_handler![
            commands::greet,
            commands::file::open_file,
            commands::file::save_file,
            commands::file::get_active_document,
            commands::file::list_directory_tree,
            commands::file::create_entry,
            commands::file::delete_entry,
            commands::file::rename_entry,
            commands::markdown::render_markdown,
            commands::markdown::highlight_code,
            start_watching_file,
            stop_watching_file,
        ])
        .run(tauri::generate_context!())
        .expect("error while running Lexora");
}

/// Start watching a file for external changes.
#[tauri::command]
fn start_watching_file(
    app_handle: tauri::AppHandle,
    path: String,
    watcher_state: tauri::State<'_, WatcherState>,
) -> Result<(), String> {
    let watcher = services::watcher::watch_file(app_handle, path)?;
    if let Ok(mut w) = watcher_state._watcher.lock() {
        *w = Some(watcher);
    }
    Ok(())
}

/// Stop watching the current file.
#[tauri::command]
fn stop_watching_file(
    watcher_state: tauri::State<'_, WatcherState>,
) -> Result<(), String> {
    if let Ok(mut w) = watcher_state._watcher.lock() {
        *w = None;
    }
    Ok(())
}
