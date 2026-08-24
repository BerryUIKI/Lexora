use crate::services::fs_service;
use crate::state::AppState;
use tauri::State;

/// Open a file and return its contents.
#[tauri::command]
pub async fn open_file(
    path: String,
    state: State<'_, AppState>,
) -> Result<String, String> {
    let content = fs_service::read_file(&path)
        .await
        .map_err(|e| e.to_string())?;

    // Cache the document in app state
    if let Ok(mut docs) = state.open_documents.lock() {
        docs.insert(path, content.clone());
    }

    Ok(content)
}

/// Save content to a file using atomic write.
#[tauri::command]
pub async fn save_file(
    path: String,
    content: String,
    state: State<'_, AppState>,
) -> Result<(), String> {
    fs_service::write_file_atomic(&path, &content)
        .await
        .map_err(|e| e.to_string())?;

    // Update cached state
    if let Ok(mut docs) = state.open_documents.lock() {
        docs.insert(path, content);
    }

    Ok(())
}
