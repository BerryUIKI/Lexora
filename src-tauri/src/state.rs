use std::collections::HashMap;
use std::sync::Mutex;

/// Global application state managed by Tauri.
#[derive(Debug, Default)]
pub struct AppState {
    /// Currently open documents: path -> content
    pub open_documents: Mutex<HashMap<String, String>>,
    /// The workspace root folder (if any)
    pub workspace_root: Mutex<Option<String>>,
}
