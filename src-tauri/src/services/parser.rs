use crate::state::TocEntry;
use pulldown_cmark::{Event, HeadingLevel, Options, Parser, Tag, TagEnd, html};

/// Convert a Markdown string to HTML with full GFM support.
pub fn markdown_to_html(markdown: &str) -> String {
    let options = gfm_options();
    let parser = Parser::new_ext(markdown, options);
    let mut html_output = String::new();
    html::push_html(&mut html_output, parser);
    html_output
}

/// Extract table-of-contents entries from Markdown headings.
pub fn extract_toc(markdown: &str) -> Vec<TocEntry> {
    let options = gfm_options();
    let parser = Parser::new_ext(markdown, options);

    let mut toc = Vec::new();
    let mut in_heading = false;
    let mut current_level: u8 = 0;
    let mut current_text = String::new();

    for event in parser {
        match event {
            Event::Start(Tag::Heading { level, .. }) => {
                in_heading = true;
                current_level = heading_level_to_u8(level);
                current_text.clear();
            }
            Event::Text(text) if in_heading => {
                current_text.push_str(&text);
            }
            Event::Code(code) if in_heading => {
                current_text.push_str(&code);
            }
            Event::End(TagEnd::Heading(_)) => {
                in_heading = false;
                let id = slugify(&current_text);
                toc.push(TocEntry {
                    level: current_level,
                    text: current_text.clone(),
                    id,
                });
            }
            _ => {}
        }
    }

    toc
}

/// Count words in a markdown string (plain text, ignoring syntax).
pub fn count_words(markdown: &str) -> usize {
    let options = gfm_options();
    let parser = Parser::new_ext(markdown, options);
    let mut count = 0;

    for event in parser {
        if let Event::Text(text) = event {
            count += text.split_whitespace().count();
        }
    }

    count
}

/// Shared GFM parser options.
fn gfm_options() -> Options {
    let mut options = Options::empty();
    options.insert(Options::ENABLE_TABLES);
    options.insert(Options::ENABLE_FOOTNOTES);
    options.insert(Options::ENABLE_STRIKETHROUGH);
    options.insert(Options::ENABLE_TASKLISTS);
    options.insert(Options::ENABLE_HEADING_ATTRIBUTES);
    options
}

/// Convert a heading level enum to a u8.
fn heading_level_to_u8(level: HeadingLevel) -> u8 {
    match level {
        HeadingLevel::H1 => 1,
        HeadingLevel::H2 => 2,
        HeadingLevel::H3 => 3,
        HeadingLevel::H4 => 4,
        HeadingLevel::H5 => 5,
        HeadingLevel::H6 => 6,
    }
}

/// Create a URL-friendly slug from heading text.
fn slugify(text: &str) -> String {
    text.to_lowercase()
        .chars()
        .map(|c| if c.is_alphanumeric() || c == '-' || c == '_' { c } else { '-' })
        .collect::<String>()
        .split('-')
        .filter(|s| !s.is_empty())
        .collect::<Vec<_>>()
        .join("-")
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

    #[test]
    fn test_extract_toc() {
        let md = "# Title\n## Section 1\n### Sub Section\n## Section 2";
        let toc = extract_toc(md);
        assert_eq!(toc.len(), 4);
        assert_eq!(toc[0].level, 1);
        assert_eq!(toc[0].text, "Title");
        assert_eq!(toc[1].level, 2);
        assert_eq!(toc[2].level, 3);
    }

    #[test]
    fn test_count_words() {
        let md = "Hello world, this is **bold** and `code`.";
        let count = count_words(md);
        assert!(count >= 6);
    }

    #[test]
    fn test_slugify() {
        assert_eq!(slugify("Hello World"), "hello-world");
        assert_eq!(slugify("Section 1.2: Details"), "section-1-2-details");
    }
}
