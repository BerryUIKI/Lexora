use crate::models::document::FileEntry;
use std::path::Path;
use thiserror::Error;
use tokio::fs;
use tokio::io::AsyncWriteExt;

#[derive(Error, Debug)]
pub enum FsError {
    #[error("Failed I/O operation: {0}")]
    IoError(#[from] std::io::Error),
    #[error("File or directory not found: {0}")]
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
pub async fn write_file_atomic(path: &str, content: &str) -> Result<(), FsError> {
    let target = Path::new(path);
    let tmp_path = format!("{}.tmp", path);
    let tmp = Path::new(&tmp_path);

    if let Some(parent) = target.parent() {
        fs::create_dir_all(parent).await?;
    }

    let mut file = fs::File::create(tmp).await?;
    file.write_all(content.as_bytes()).await?;
    file.flush().await?;
    drop(file);

    fs::rename(tmp, target).await?;
    Ok(())
}

/// Recursively read a directory tree, sorting directories first and filtering out hidden/build folders.
pub async fn read_dir_tree(path: &str) -> Result<FileEntry, FsError> {
    let root = Path::new(path);
    if !root.exists() {
        return Err(FsError::NotFound(path.to_string()));
    }

    let name = root
        .file_name()
        .map(|n| n.to_string_lossy().to_string())
        .unwrap_or_else(|| path.to_string());

    let is_dir = root.is_dir();
    let mut entry = FileEntry {
        name,
        path: path.to_string(),
        is_directory: is_dir,
        children: if is_dir { Some(Vec::new()) } else { None },
    };

    if is_dir {
        let mut children = Vec::new();
        let mut read_dir = fs::read_dir(root).await?;

        while let Some(child) = read_dir.next_entry().await? {
            let child_path = child.path();
            let child_name = child.file_name().to_string_lossy().to_string();

            // Skip ignored directories & files
            if child_name.starts_with('.')
                || child_name == "node_modules"
                || child_name == "target"
                || child_name == "dist"
                || child_name == "build"
            {
                continue;
            }

            let child_path_str = child_path.to_string_lossy().to_string();
            if child_path.is_dir() {
                if let Ok(sub_tree) = Box::pin(read_dir_tree(&child_path_str)).await {
                    children.push(sub_tree);
                }
            } else {
                children.push(FileEntry {
                    name: child_name,
                    path: child_path_str,
                    is_directory: false,
                    children: None,
                });
            }
        }

        // Sort: directories first, then alphabetical
        children.sort_by(|a, b| {
            if a.is_directory == b.is_directory {
                a.name.to_lowercase().cmp(&b.name.to_lowercase())
            } else if a.is_directory {
                std::cmp::Ordering::Less
            } else {
                std::cmp::Ordering::Greater
            }
        });

        entry.children = Some(children);
    }

    Ok(entry)
}

/// Create a new file or directory.
pub async fn create_file_entry(path: &str, is_dir: bool) -> Result<(), FsError> {
    let p = Path::new(path);
    if is_dir {
        fs::create_dir_all(p).await?;
    } else {
        if let Some(parent) = p.parent() {
            fs::create_dir_all(parent).await?;
        }
        let _ = fs::File::create(p).await?;
    }
    Ok(())
}

/// Delete a file or directory.
pub async fn delete_file_entry(path: &str) -> Result<(), FsError> {
    let p = Path::new(path);
    if !p.exists() {
        return Err(FsError::NotFound(path.to_string()));
    }
    if p.is_dir() {
        fs::remove_dir_all(p).await?;
    } else {
        fs::remove_file(p).await?;
    }
    Ok(())
}

/// Rename a file or directory.
pub async fn rename_file_entry(old_path: &str, new_path: &str) -> Result<(), FsError> {
    let old_p = Path::new(old_path);
    if !old_p.exists() {
        return Err(FsError::NotFound(old_path.to_string()));
    }
    fs::rename(old_p, Path::new(new_path)).await?;
    Ok(())
}

#[cfg(test)]
mod tests {
    use super::*;

    #[tokio::test]
    async fn test_atomic_write_and_read() {
        let temp_dir = std::env::temp_dir();
        let test_file = temp_dir.join("lexora_test_atomic.md");
        let test_path = test_file.to_string_lossy().to_string();

        let content = "# Hello Lexora Atomic Write";
        let res = write_file_atomic(&test_path, content).await;
        assert!(res.is_ok());

        let read_back = read_file(&test_path).await;
        assert!(read_back.is_ok());
        assert_eq!(read_back.unwrap(), content);

        let del_res = delete_file_entry(&test_path).await;
        assert!(del_res.is_ok());
    }

    #[tokio::test]
    async fn test_read_dir_tree() {
        let temp_dir = std::env::temp_dir().join("lexora_test_tree");
        let temp_path = temp_dir.to_string_lossy().to_string();

        let _ = fs::create_dir_all(&temp_dir).await;
        let sub_file = temp_dir.join("test_note.md");
        let _ = write_file_atomic(&sub_file.to_string_lossy(), "content").await;

        let tree = read_dir_tree(&temp_path).await;
        assert!(tree.is_ok());
        let tree_res = tree.unwrap();
        assert!(tree_res.is_directory);
        assert!(tree_res.children.is_some());

        let _ = fs::remove_dir_all(&temp_dir).await;
    }
}
