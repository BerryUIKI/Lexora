use crate::services::updater_service::{fetch_latest_release, GithubRelease};

/// Check latest release from GitHub API directly via native HTTPS in Rust
#[tauri::command]
pub async fn check_github_update() -> Result<GithubRelease, String> {
    let repo = "BerryUIKI/Lexora";
    fetch_latest_release(repo)
        .await
        .map_err(|e| e.to_string())
}

/// Get current runtime application version
#[tauri::command]
pub fn get_app_version() -> String {
    env!("CARGO_PKG_VERSION").to_string()
}
