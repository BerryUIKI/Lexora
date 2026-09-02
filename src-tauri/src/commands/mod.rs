pub mod file;
pub mod markdown;
pub mod plugin;
pub mod search;
pub mod theme;
pub mod window;

/// A simple greet command to verify IPC round-trip.
#[tauri::command]
pub fn greet(name: &str) -> String {
    format!("Hello, {}! Welcome to Taleno.", name)
}
