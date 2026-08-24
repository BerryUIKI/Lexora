use syntect::highlighting::ThemeSet;
use syntect::html::highlighted_html_for_string;
use syntect::parsing::SyntaxSet;
use thiserror::Error;

#[derive(Error, Debug)]
pub enum HighlightError {
    #[error("Unsupported language: {0}")]
    UnsupportedLanguage(String),
    #[error("Highlighting failed: {0}")]
    SyntectError(#[from] syntect::Error),
}

/// Highlight a code string for a given language and return styled HTML.
pub fn highlight(code: &str, language: &str) -> Result<String, HighlightError> {
    let ss = SyntaxSet::load_defaults_newlines();
    let ts = ThemeSet::load_defaults();

    let syntax = ss
        .find_syntax_by_token(language)
        .ok_or_else(|| HighlightError::UnsupportedLanguage(language.to_string()))?;

    let theme = &ts.themes["base16-ocean.dark"];
    let html = highlighted_html_for_string(code, &ss, syntax, theme)?;

    Ok(html)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_highlight_rust() {
        let result = highlight("fn main() {}", "rs");
        assert!(result.is_ok());
        let html = result.unwrap();
        assert!(html.contains("<span"));
    }

    #[test]
    fn test_unsupported_language() {
        let result = highlight("code", "nonexistent_lang_xyz");
        assert!(result.is_err());
    }
}
