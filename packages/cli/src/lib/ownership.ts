/**
 * Managed marker engine.
 *
 * Markers delimit content that the CLI owns and can update.
 * Everything outside markers is user-owned and never touched.
 *
 * Format:
 *   <!-- acdl:managed:start:context-loading -->
 *   ...managed content...
 *   <!-- acdl:managed:end:context-loading -->
 */

const MARKER_START_PATTERN =
  /^<!-- acdl:managed:start:([a-z0-9_-]+) -->$/;
const MARKER_END_PATTERN =
  /^<!-- acdl:managed:end:([a-z0-9_-]+) -->$/;

/**
 * Wrap content with managed markers.
 */
export function wrapWithMarkers(content: string, id: string): string {
  const start = `<!-- acdl:managed:start:${id} -->`;
  const end = `<!-- acdl:managed:end:${id} -->`;
  return `${start}\n${content}\n${end}`;
}

/**
 * Extract all managed blocks from file content.
 * Returns a map of marker ID -> block content (without the markers themselves).
 */
export function extractManagedBlocks(
  fileContent: string
): Map<string, string> {
  const blocks = new Map<string, string>();
  const lines = fileContent.split("\n");

  let currentId: string | null = null;
  let currentLines: string[] = [];

  for (const line of lines) {
    const trimmed = line.trim();

    const startMatch = trimmed.match(MARKER_START_PATTERN);
    if (startMatch) {
      currentId = startMatch[1];
      currentLines = [];
      continue;
    }

    const endMatch = trimmed.match(MARKER_END_PATTERN);
    if (endMatch && currentId && endMatch[1] === currentId) {
      blocks.set(currentId, currentLines.join("\n"));
      currentId = null;
      currentLines = [];
      continue;
    }

    if (currentId !== null) {
      currentLines.push(line);
    }
  }

  return blocks;
}

/**
 * Replace the content of a single managed block, preserving everything else.
 * Returns the updated file content, or null if the marker ID wasn't found.
 */
export function replaceManagedBlock(
  fileContent: string,
  id: string,
  newContent: string
): string | null {
  const lines = fileContent.split("\n");
  const result: string[] = [];

  let inside = false;
  let found = false;
  const startMarker = `<!-- acdl:managed:start:${id} -->`;
  const endMarker = `<!-- acdl:managed:end:${id} -->`;

  for (const line of lines) {
    const trimmed = line.trim();

    if (trimmed === startMarker) {
      inside = true;
      found = true;
      result.push(line);
      // Insert new content
      result.push(newContent);
      continue;
    }

    if (trimmed === endMarker && inside) {
      inside = false;
      result.push(line);
      continue;
    }

    // Skip old content inside the block
    if (inside) {
      continue;
    }

    result.push(line);
  }

  return found ? result.join("\n") : null;
}

/**
 * Validate markers in file content.
 * Returns an array of issues found.
 */
export function validateMarkers(
  fileContent: string
): MarkerValidationIssue[] {
  const issues: MarkerValidationIssue[] = [];
  const lines = fileContent.split("\n");

  const openMarkers: { id: string; line: number }[] = [];

  for (let i = 0; i < lines.length; i++) {
    const trimmed = lines[i].trim();

    const startMatch = trimmed.match(MARKER_START_PATTERN);
    if (startMatch) {
      // Check for nested markers
      if (openMarkers.length > 0) {
        issues.push({
          type: "nested",
          id: startMatch[1],
          line: i + 1,
          message: `Nested marker start for "${startMatch[1]}" inside open block "${openMarkers[openMarkers.length - 1].id}"`,
        });
      }
      openMarkers.push({ id: startMatch[1], line: i + 1 });
      continue;
    }

    const endMatch = trimmed.match(MARKER_END_PATTERN);
    if (endMatch) {
      if (openMarkers.length === 0) {
        issues.push({
          type: "orphan-end",
          id: endMatch[1],
          line: i + 1,
          message: `End marker for "${endMatch[1]}" without matching start`,
        });
      } else if (openMarkers[openMarkers.length - 1].id !== endMatch[1]) {
        issues.push({
          type: "mismatched",
          id: endMatch[1],
          line: i + 1,
          message: `End marker "${endMatch[1]}" does not match open marker "${openMarkers[openMarkers.length - 1].id}"`,
        });
      } else {
        openMarkers.pop();
      }
      continue;
    }
  }

  // Any remaining open markers are unclosed
  for (const open of openMarkers) {
    issues.push({
      type: "unclosed",
      id: open.id,
      line: open.line,
      message: `Start marker for "${open.id}" at line ${open.line} is never closed`,
    });
  }

  return issues;
}

export interface MarkerValidationIssue {
  type: "unclosed" | "orphan-end" | "mismatched" | "nested";
  id: string;
  line: number;
  message: string;
}

/**
 * Check if a file has any managed markers.
 */
export function hasManagedMarkers(fileContent: string): boolean {
  const lines = fileContent.split("\n");
  return lines.some((line) => MARKER_START_PATTERN.test(line.trim()));
}
