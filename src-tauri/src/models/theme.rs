use serde::{Deserialize, Serialize};

/// Metadata stored on-disk in `theme.json`.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct ThemeManifest {
    pub id: String,
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
    #[serde(rename = "type")]
    pub theme_type: String, // "dark" | "light" | "dual"
    pub accent_color: String,
    pub background_color: String,
    pub text_color: String,
    #[serde(default = "default_entry_file")]
    pub entry_file: String,
    #[serde(default)]
    pub tags: Vec<String>,
}

fn default_entry_file() -> String {
    "theme.css".to_string()
}

/// Remote theme information listed in the official `themes.json` registry.
#[derive(Debug, Clone, Serialize, Deserialize, PartialEq)]
#[serde(rename_all = "camelCase")]
pub struct RemoteTheme {
    pub id: String,
    pub name: String,
    pub version: String,
    pub description: String,
    pub author: String,
    pub repository: Option<String>,
    #[serde(rename = "type")]
    pub theme_type: String,
    pub accent_color: String,
    pub background_color: String,
    pub text_color: String,
    #[serde(default = "default_entry_file")]
    pub entry_file: String,
    pub raw_base_url: String,
    pub min_lexora_version: Option<String>,
    #[serde(default)]
    pub tags: Vec<String>,
}

/// Payload returned by `BerryUIKI/Lexora-Plugins/themes.json`.
#[derive(Debug, Clone, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ThemeRegistryResponse {
    pub version: u32,
    pub themes: Vec<RemoteTheme>,
}
