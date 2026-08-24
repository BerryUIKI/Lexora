use crate::services::{highlighter, parser};

/// Parse Markdown to HTML.
#[tauri::command]
pub fn parse_markdown(markdown: &str) -> String {
    parser::markdown_to_html(markdown)
}

/// Highlight a code block and return styled HTML.
#[tauri::command]
pub fn highlight_code(code: &str, language: &str) -> Result<String, String> {
    highlighter::highlight(code, language).map_err(|e| e.to_string())
}
