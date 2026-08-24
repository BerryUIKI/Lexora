/// Full-text search across workspace files.
/// Placeholder — will be implemented in Phase 4+.
#[tauri::command]
pub fn search_files(_query: &str, _root: &str) -> Vec<String> {
    // TODO: Implement full-text search
    Vec::new()
}
