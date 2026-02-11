import { describe, it, expect } from "vitest";
import {
  wrapWithMarkers,
  extractManagedBlocks,
  replaceManagedBlock,
  validateMarkers,
  hasManagedMarkers,
} from "../src/lib/ownership.js";

describe("wrapWithMarkers", () => {
  it("wraps content with start and end markers", () => {
    const content = "Hello world";
    const result = wrapWithMarkers(content, "test-block");

    expect(result).toBe(
      "<!-- acdl:managed:start:test-block -->\nHello world\n<!-- acdl:managed:end:test-block -->"
    );
  });

  it("handles multiline content", () => {
    const content = "Line 1\nLine 2\nLine 3";
    const result = wrapWithMarkers(content, "multi");
    const lines = result.split("\n");

    expect(lines[0]).toBe("<!-- acdl:managed:start:multi -->");
    expect(lines[1]).toBe("Line 1");
    expect(lines[2]).toBe("Line 2");
    expect(lines[3]).toBe("Line 3");
    expect(lines[4]).toBe("<!-- acdl:managed:end:multi -->");
  });
});

describe("extractManagedBlocks", () => {
  it("extracts a single block", () => {
    const content = [
      "before",
      "<!-- acdl:managed:start:block-1 -->",
      "managed content",
      "<!-- acdl:managed:end:block-1 -->",
      "after",
    ].join("\n");

    const blocks = extractManagedBlocks(content);
    expect(blocks.size).toBe(1);
    expect(blocks.get("block-1")).toBe("managed content");
  });

  it("extracts multiple blocks", () => {
    const content = [
      "<!-- acdl:managed:start:a -->",
      "content a",
      "<!-- acdl:managed:end:a -->",
      "user content",
      "<!-- acdl:managed:start:b -->",
      "content b",
      "<!-- acdl:managed:end:b -->",
    ].join("\n");

    const blocks = extractManagedBlocks(content);
    expect(blocks.size).toBe(2);
    expect(blocks.get("a")).toBe("content a");
    expect(blocks.get("b")).toBe("content b");
  });

  it("handles multiline block content", () => {
    const content = [
      "<!-- acdl:managed:start:multi -->",
      "line 1",
      "line 2",
      "line 3",
      "<!-- acdl:managed:end:multi -->",
    ].join("\n");

    const blocks = extractManagedBlocks(content);
    expect(blocks.get("multi")).toBe("line 1\nline 2\nline 3");
  });

  it("returns empty map for no markers", () => {
    const blocks = extractManagedBlocks("just plain text");
    expect(blocks.size).toBe(0);
  });
});

describe("replaceManagedBlock", () => {
  it("replaces block content while preserving surrounding text", () => {
    const content = [
      "before",
      "<!-- acdl:managed:start:block-1 -->",
      "old content",
      "<!-- acdl:managed:end:block-1 -->",
      "after",
    ].join("\n");

    const result = replaceManagedBlock(content, "block-1", "new content");
    expect(result).not.toBeNull();

    const lines = result!.split("\n");
    expect(lines[0]).toBe("before");
    expect(lines[1]).toBe("<!-- acdl:managed:start:block-1 -->");
    expect(lines[2]).toBe("new content");
    expect(lines[3]).toBe("<!-- acdl:managed:end:block-1 -->");
    expect(lines[4]).toBe("after");
  });

  it("returns null if marker ID not found", () => {
    const content = "no markers here";
    const result = replaceManagedBlock(content, "nonexistent", "new");
    expect(result).toBeNull();
  });

  it("preserves other managed blocks untouched", () => {
    const content = [
      "<!-- acdl:managed:start:a -->",
      "content a",
      "<!-- acdl:managed:end:a -->",
      "gap",
      "<!-- acdl:managed:start:b -->",
      "content b",
      "<!-- acdl:managed:end:b -->",
    ].join("\n");

    const result = replaceManagedBlock(content, "a", "new a");
    expect(result).toContain("new a");
    expect(result).toContain("content b");
  });
});

describe("validateMarkers", () => {
  it("returns no issues for valid markers", () => {
    const content = [
      "<!-- acdl:managed:start:block-1 -->",
      "content",
      "<!-- acdl:managed:end:block-1 -->",
    ].join("\n");

    const issues = validateMarkers(content);
    expect(issues).toHaveLength(0);
  });

  it("detects unclosed markers", () => {
    const content = [
      "<!-- acdl:managed:start:block-1 -->",
      "content",
    ].join("\n");

    const issues = validateMarkers(content);
    expect(issues).toHaveLength(1);
    expect(issues[0].type).toBe("unclosed");
    expect(issues[0].id).toBe("block-1");
  });

  it("detects orphan end markers", () => {
    const content = [
      "content",
      "<!-- acdl:managed:end:block-1 -->",
    ].join("\n");

    const issues = validateMarkers(content);
    expect(issues).toHaveLength(1);
    expect(issues[0].type).toBe("orphan-end");
  });

  it("detects mismatched markers", () => {
    const content = [
      "<!-- acdl:managed:start:a -->",
      "content",
      "<!-- acdl:managed:end:b -->",
    ].join("\n");

    const issues = validateMarkers(content);
    expect(issues.length).toBeGreaterThan(0);
    const hasMismatch = issues.some((i) => i.type === "mismatched");
    expect(hasMismatch).toBe(true);
  });

  it("returns no issues for content without markers", () => {
    const issues = validateMarkers("plain text, no markers");
    expect(issues).toHaveLength(0);
  });
});

describe("hasManagedMarkers", () => {
  it("returns true when markers exist", () => {
    const content = "<!-- acdl:managed:start:block-1 -->\ncontent\n<!-- acdl:managed:end:block-1 -->";
    expect(hasManagedMarkers(content)).toBe(true);
  });

  it("returns false for plain text", () => {
    expect(hasManagedMarkers("no markers here")).toBe(false);
  });
});
