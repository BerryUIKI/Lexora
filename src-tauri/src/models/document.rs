use serde::{Deserialize, Serialize};

/// Represents a document's metadata.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct DocumentMeta {
    pub path: String,
    pub title: String,
    pub is_dirty: bool,
}

/// Represents a file entry in the file tree.
#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct FileEntry {
    pub name: String,
    pub path: String,
    pub is_directory: bool,
    pub children: Option<Vec<FileEntry>>,
}
