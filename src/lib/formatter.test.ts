import { describe, it, expect, vi } from "vitest";
import {
  dispatchFormat,
  registerWritingFormatter,
  registerCodeFormatter,
  type FormatAction,
} from "./formatter";
import { setDisplayMode } from "../store/editor";

describe("Formatter Dispatcher", () => {
  it("dispatches format action to writing formatter when in writing mode", () => {
    setDisplayMode("writing");
    const writingMock = vi.fn();
    const codeMock = vi.fn();

    registerWritingFormatter(writingMock);
    registerCodeFormatter(codeMock);

    dispatchFormat("bold");
    expect(writingMock).toHaveBeenCalledWith("bold");
    expect(codeMock).not.toHaveBeenCalled();

    dispatchFormat("paragraph");
    expect(writingMock).toHaveBeenCalledWith("paragraph");

    registerWritingFormatter(null);
    registerCodeFormatter(null);
  });

  it("dispatches format action to code formatter when in code mode", () => {
    setDisplayMode("code");
    const writingMock = vi.fn();
    const codeMock = vi.fn();

    registerWritingFormatter(writingMock);
    registerCodeFormatter(codeMock);

    dispatchFormat("h1");
    expect(codeMock).toHaveBeenCalledWith("h1");
    expect(writingMock).not.toHaveBeenCalled();

    dispatchFormat("italic");
    expect(codeMock).toHaveBeenCalledWith("italic");

    registerWritingFormatter(null);
    registerCodeFormatter(null);
  });
});
