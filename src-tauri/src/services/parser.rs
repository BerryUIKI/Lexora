use crate::services::highlighter;
use crate::state::TocEntry;
use pulldown_cmark::{CodeBlockKind, Event, HeadingLevel, Options, Parser, Tag, TagEnd, html};

/// Convert a Markdown string to HTML with full GFM support, syntect code highlighting, math, and mermaid diagram wrappers.
pub fn markdown_to_html(markdown: &str) -> String {
    let options = gfm_options();
    let parser = Parser::new_ext(markdown, options);

    let mut events = Vec::new();
    let mut in_code_block = false;
    let mut code_lang = String::new();
    let mut code_buffer = String::new();

    for event in parser {
        match event {
            Event::Start(Tag::CodeBlock(kind)) => {
                in_code_block = true;
                code_buffer.clear();
                code_lang = match kind {
                    CodeBlockKind::Fenced(lang) => lang.to_string(),
                    CodeBlockKind::Indented => String::new(),
                };
            }
            Event::Text(text) if in_code_block => {
                code_buffer.push_str(&text);
            }
            Event::End(TagEnd::CodeBlock) => {
                in_code_block = false;
                let lang = code_lang.trim();

                let code_html = if lang == "mermaid" {
                    format!(
                        r#"<div class="mermaid-diagram my-6 p-4 rounded-lg bg-[var(--color-bg-secondary)] border border-[var(--color-border)] text-center overflow-x-auto select-none">
                            <pre class="mermaid text-sm">{}</pre>
                        </div>"#,
                        html_escape(&code_buffer)
                    )
                } else if lang == "math" || lang == "katex" {
                    format!(
                        r#"<div class="math-block my-4 p-4 text-center overflow-x-auto text-base font-serif bg-[var(--color-bg-secondary)] rounded-lg border border-[var(--color-border)]">
                            $${}$$
                        </div>"#,
                        html_escape(&code_buffer)
                    )
                } else {
                    let highlighted = if !lang.is_empty() {
                        highlighter::highlight(&code_buffer, lang).ok()
                    } else {
                        None
                    };

                    let lang_display = if lang.is_empty() { "text" } else { lang };
                    let escaped_code = html_escape(&code_buffer);

                    if let Some(highlighted_inner) = highlighted {
                        format!(
                            r#"<div class="code-block-wrapper relative group my-4 rounded-lg overflow-hidden border border-[var(--color-border)]">
                                <div class="flex items-center justify-between px-3 py-1.5 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-mono select-none">
                                    <span class="uppercase font-semibold tracking-wider">{}</span>
                                    <button class="copy-code-btn px-2 py-0.5 rounded bg-[var(--color-hover)] hover:text-[var(--color-text-primary)] transition-colors text-[11px]" onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('.code-container, pre').innerText)">Copy</button>
                                </div>
                                <div class="code-container p-4 overflow-x-auto text-sm">{}</div>
                            </div>"#,
                            lang_display,
                            highlighted_inner
                        )
                    } else {
                        format!(
                            r#"<div class="code-block-wrapper relative group my-4 rounded-lg overflow-hidden border border-[var(--color-border)]">
                                <div class="flex items-center justify-between px-3 py-1.5 bg-[var(--color-bg-secondary)] border-b border-[var(--color-border)] text-xs text-[var(--color-text-secondary)] font-mono select-none">
                                    <span class="uppercase font-semibold tracking-wider">{}</span>
                                    <button class="copy-code-btn px-2 py-0.5 rounded bg-[var(--color-hover)] hover:text-[var(--color-text-primary)] transition-colors text-[11px]" onclick="navigator.clipboard.writeText(this.closest('.code-block-wrapper').querySelector('pre, code').innerText)">Copy</button>
                                </div>
                                <pre class="p-4 overflow-x-auto text-sm"><code>{}</code></pre>
                            </div>"#,
                            lang_display,
                            escaped_code
                        )
                    }
                };

                events.push(Event::Html(code_html.into()));
            }
            _ if !in_code_block => {
                events.push(event);
            }
            _ => {}
        }
    }

    let mut html_output = String::new();
    html::push_html(&mut html_output, events.into_iter());
    html_output
}

/// Simple HTML character escape helper.
fn html_escape(s: &str) -> String {
    s.replace('&', "&amp;")
        .replace('<', "&lt;")
        .replace('>', "&gt;")
        .replace('"', "&quot;")
        .replace('\'', "&#39;")
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
    fn test_mermaid_block() {
        let md = "```mermaid\ngraph TD;\nA-->B;\n```";
        let result = markdown_to_html(md);
        assert!(result.contains("mermaid-diagram"));
        assert!(result.contains("class=\"mermaid"));
    }

    #[test]
    fn test_highlighted_code_block() {
        let md = "```rust\nfn main() {}\n```";
        let result = markdown_to_html(md);
        assert!(result.contains("code-block-wrapper"));
        assert!(result.contains("copy-code-btn"));
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
