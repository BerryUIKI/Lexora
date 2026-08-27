use syntect::html::{ClassStyle, ClassedHTMLGenerator};
use syntect::parsing::SyntaxSet;
use syntect::util::LinesWithEndings;
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

    let syntax = ss
        .find_syntax_by_token(language)
        .ok_or_else(|| HighlightError::UnsupportedLanguage(language.to_string()))?;

    let class_style = ClassStyle::SpacedPrefixed { prefix: "syn-" };
    let mut generator = ClassedHTMLGenerator::new_with_class_style(syntax, &ss, class_style);
    let mut normalized = code.to_string();
    if !normalized.ends_with('\n') {
        normalized.push('\n');
    }

    for line in LinesWithEndings::from(&normalized) {
        generator.parse_html_for_line_which_includes_newline(line)?;
    }

    let tokens = generator.finalize();
    let html = format!(r#"<pre><code class="syn-code">{tokens}</code></pre>"#);

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
        assert!(html.contains("class=\"syn-code\""));
        assert!(html.contains("syn-"));
        assert!(!html.contains("style="));
    }

    #[test]
    fn test_unsupported_language() {
        let result = highlight("code", "nonexistent_lang_xyz");
        assert!(result.is_err());
    }
}
