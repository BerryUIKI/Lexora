import { describe, it, expect, vi } from "vitest";
import {
  getFileName,
  isImageFile,
  createMarkdownLink,
  isDropOverTabBar,
  processFileDrop,
} from "./dnd";

describe("Drag and Drop Utilities", () => {
  it("extracts filename correctly for POSIX and Windows paths", () => {
    expect(getFileName("/Users/test/docs/guide.md")).toBe("guide.md");
    expect(getFileName("C:\\Users\\test\\docs\\notes.txt")).toBe("notes.txt");
    expect(getFileName("image.png")).toBe("image.png");
  });

  it("identifies image files by extension", () => {
    expect(isImageFile("photo.png")).toBe(true);
    expect(isImageFile("picture.JPG")).toBe(true);
    expect(isImageFile("icon.svg")).toBe(true);
    expect(isImageFile("doc.md")).toBe(false);
    expect(isImageFile("document.pdf")).toBe(false);
  });

  it("creates proper Markdown image and document links", () => {
    expect(createMarkdownLink("C:\\photos\\banner.png")).toBe(
      "![banner.png](C:/photos/banner.png)"
    );
    expect(createMarkdownLink("/docs/reference.md")).toBe(
      "[reference.md](/docs/reference.md)"
    );
  });

  it("determines if drop coordinates are over TabBar element", () => {
    const mockElement = {
      getBoundingClientRect: () => ({
        left: 200,
        right: 800,
        top: 0,
        bottom: 40,
        width: 600,
        height: 40,
      }),
    } as unknown as HTMLElement;

    // Physical position 500, 20 with DPR = 1
    expect(isDropOverTabBar({ x: 500, y: 20 }, mockElement, 1)).toBe(true);
    // Dropped below TabBar (y = 100)
    expect(isDropOverTabBar({ x: 500, y: 100 }, mockElement, 1)).toBe(false);
    // Dropped left of TabBar (x = 100)
    expect(isDropOverTabBar({ x: 100, y: 20 }, mockElement, 1)).toBe(false);
  });

  it("opens file when no document is open", async () => {
    const openFileMock = vi.fn();
    const insertLinkMock = vi.fn();

    await processFileDrop({
      paths: ["C:\\docs\\readme.md"],
      isTabBar: false,
      hasOpenDocument: false,
      onOpenFile: openFileMock,
      onInsertLinks: insertLinkMock,
    });

    expect(openFileMock).toHaveBeenCalledWith("C:\\docs\\readme.md");
    expect(insertLinkMock).not.toHaveBeenCalled();
  });

  it("opens file when dropped on TabBar with open document", async () => {
    const openFileMock = vi.fn();
    const insertLinkMock = vi.fn();

    await processFileDrop({
      paths: ["C:\\docs\\notes.md"],
      isTabBar: true,
      hasOpenDocument: true,
      onOpenFile: openFileMock,
      onInsertLinks: insertLinkMock,
    });

    expect(openFileMock).toHaveBeenCalledWith("C:\\docs\\notes.md");
    expect(insertLinkMock).not.toHaveBeenCalled();
  });

  it("inserts Markdown link when dropped on Text Area with open document", async () => {
    const openFileMock = vi.fn();
    const insertLinkMock = vi.fn();

    await processFileDrop({
      paths: ["C:\\docs\\diagram.png", "C:\\docs\\spec.pdf"],
      isTabBar: false,
      hasOpenDocument: true,
      onOpenFile: openFileMock,
      onInsertLinks: insertLinkMock,
    });

    expect(openFileMock).not.toHaveBeenCalled();
    expect(insertLinkMock).toHaveBeenCalledWith(
      "![diagram.png](C:/docs/diagram.png)\n[spec.pdf](C:/docs/spec.pdf)"
    );
  });
});
