use pulldown_cmark::{html, Options, Parser};

/// Convert a Markdown string to HTML.
pub fn markdown_to_html(markdown: &str) -> String {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);

    let parser = Parser::new_ext(markdown, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_heading() {
        let result = markdown_to_html("# Hello");
        assert!(result.contains("<h1>"));
        assert!(result.contains("Hello"));
    }

    #[test]
    fn test_bold() {
        let result = markdown_to_html("**bold text**");
        assert!(result.contains("<strong>"));
    }

    #[test]
    fn test_gfm_table() {
        let md = "| A | B |\n|---|---|\n| 1 | 2 |";
        let result = markdown_to_html(md);
        assert!(result.contains("<table>"));
    }

    #[test]
    fn test_task_list() {
        let md = "- [x] Done\n- [ ] Todo";
        let result = markdown_to_html(md);
        assert!(result.contains("checked") || result.contains("checkbox"));
    }
}
