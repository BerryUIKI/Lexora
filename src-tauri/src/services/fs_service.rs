use std::path::Path;
use thiserror::Error;
use tokio::fs;
use tokio::io::AsyncWriteExt;

#[derive(Error, Debug)]
pub enum FsError {
    #[error("Failed to read file: {0}")]
    ReadError(#[from] std::io::Error),
    #[error("File not found: {0}")]
    NotFound(String),
}

/// Read a file's contents as a UTF-8 string.
pub async fn read_file(path: &str) -> Result<String, FsError> {
    let p = Path::new(path);
    if !p.exists() {
        return Err(FsError::NotFound(path.to_string()));
    }
    let content = fs::read_to_string(p).await?;
    Ok(content)
}

/// Write content to a file using atomic write pattern:
/// 1. Write to a temporary file (.tmp)
/// 2. Rename the temp file to the target path
/// This prevents data loss if the app crashes during a write.
pub async fn write_file_atomic(path: &str, content: &str) -> Result<(), FsError> {
    let target = Path::new(path);
    let tmp_path = format!("{}.tmp", path);
    let tmp = Path::new(&tmp_path);

    // Ensure parent directory exists
    if let Some(parent) = target.parent() {
        fs::create_dir_all(parent).await?;
    }

    // Write to temp file
    let mut file = fs::File::create(tmp).await?;
    file.write_all(content.as_bytes()).await?;
    file.flush().await?;
    drop(file);

    // Atomic rename
    fs::rename(tmp, target).await?;

    Ok(())
}
