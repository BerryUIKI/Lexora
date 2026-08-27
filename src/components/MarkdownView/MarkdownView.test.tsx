import { render } from "solid-js/web";
import { afterEach, describe, expect, it, vi } from "vitest";
import { MarkdownView } from "./MarkdownView";

const renderMarkdownMock = vi.hoisted(() => vi.fn());

vi.mock("../../lib/tauri/commands", () => ({
  renderMarkdown: renderMarkdownMock,
}));

describe("MarkdownView", () => {
  let dispose: (() => void) | undefined;

  afterEach(() => {
    dispose?.();
    dispose = undefined;
    renderMarkdownMock.mockReset();
  });

  it("renders fresh Markdown for a newly created document", async () => {
    const result = {
      html: '<h1 id="draft">Draft</h1>',
      toc: [{ level: 1, text: "Draft", id: "draft" }],
      word_count: 1,
    };
    renderMarkdownMock.mockResolvedValue(result);
    const onRendered = vi.fn();
    const container = document.createElement("div");

    dispose = render(
      () => (
        <MarkdownView
          content="# Draft"
          renderedContent=""
          html=""
          externallyModified={false}
          onReload={() => undefined}
          onRendered={onRendered}
        />
      ),
      container
    );

    await vi.waitFor(() => {
      expect(container.querySelector("h1")?.textContent).toBe("Draft");
    });
    expect(renderMarkdownMock).toHaveBeenCalledWith("# Draft");
    expect(onRendered).toHaveBeenCalledWith("# Draft", result);
  });
});
