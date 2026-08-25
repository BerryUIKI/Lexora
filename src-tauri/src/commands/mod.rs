pub mod file;
pub mod markdown;
pub mod search;
pub mod updater;
pub mod window;

/// A simple greet command to verify IPC round-trip.
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Lexora.", name)
}
