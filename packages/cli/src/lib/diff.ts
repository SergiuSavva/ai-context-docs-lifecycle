import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import { createTwoFilesPatch } from "diff";
import chalk from "chalk";
import type { AcdlConfig, RenderEntry, DiffResult, OperationSummary } from "../types.js";
import { extractManagedBlocks, replaceManagedBlock } from "./ownership.js";
import { getTemplateContent } from "./renderer.js";

/**
 * Diff a single managed file against its template.
 */
export function diffFile(
  projectDir: string,
  entry: RenderEntry
): DiffResult {
  const destPath = resolve(projectDir, entry.destination);

  // File doesn't exist at all
  if (!existsSync(destPath)) {
    return {
      filePath: entry.destination,
      markerId: entry.markerId,
      status: "missing",
    };
  }

  const currentContent = readFileSync(destPath, "utf-8");
  const blocks = extractManagedBlocks(currentContent);
  const currentManaged = blocks.get(entry.markerId);

  // No managed block found in file
  if (currentManaged === undefined) {
    return {
      filePath: entry.destination,
      markerId: entry.markerId,
      status: "missing",
    };
  }

  // Get what the template says the content should be
  const expectedContent = getTemplateContent(projectDir, entry);

  if (currentManaged === expectedContent) {
    return {
      filePath: entry.destination,
      markerId: entry.markerId,
      status: "unchanged",
    };
  }

  // Generate a unified diff
  const patch = createTwoFilesPatch(
    `a/${entry.destination}`,
    `b/${entry.destination}`,
    currentManaged,
    expectedContent,
    "current",
    "template"
  );

  return {
    filePath: entry.destination,
    markerId: entry.markerId,
    status: "changed",
    patch,
  };
}

/**
 * Diff all files in the render plan.
 */
export function diffAll(
  projectDir: string,
  renderPlan: RenderEntry[]
): DiffResult[] {
  return renderPlan.map((entry) => diffFile(projectDir, entry));
}

/**
 * Apply changes to a single managed file.
 */
export function applyDiff(
  projectDir: string,
  entry: RenderEntry
): void {
  const destPath = resolve(projectDir, entry.destination);

  if (!existsSync(destPath)) {
    // File was deleted — skip (doctor will catch this)
    return;
  }

  const currentContent = readFileSync(destPath, "utf-8");
  const newContent = getTemplateContent(projectDir, entry);
  const result = replaceManagedBlock(currentContent, entry.markerId, newContent);

  if (result !== null) {
    writeFileSync(destPath, result, "utf-8");
  }
}

/**
 * Format diff results as a terminal-friendly summary.
 */
export function formatDiffSummary(
  results: DiffResult[],
  verbose: boolean
): string {
  const lines: string[] = [];

  lines.push("");
  lines.push(chalk.bold("Dry-run summary:"));
  lines.push("");

  const changed = results.filter((r) => r.status === "changed");
  const unchanged = results.filter((r) => r.status === "unchanged");
  const missing = results.filter((r) => r.status === "missing");

  if (changed.length > 0) {
    lines.push(chalk.yellow(`  Changed (${changed.length}):`));
    for (const r of changed) {
      lines.push(`    ${chalk.yellow("~")} ${r.filePath}`);
      if (verbose && r.patch) {
        lines.push("");
        lines.push(formatPatch(r.patch));
        lines.push("");
      }
    }
  }

  if (missing.length > 0) {
    lines.push(chalk.red(`  Missing markers (${missing.length}):`));
    for (const r of missing) {
      lines.push(`    ${chalk.red("!")} ${r.filePath} (marker: ${r.markerId})`);
    }
  }

  if (unchanged.length > 0) {
    lines.push(chalk.green(`  Unchanged (${unchanged.length}):`));
    for (const r of unchanged) {
      lines.push(`    ${chalk.green("✓")} ${r.filePath}`);
    }
  }

  lines.push("");
  if (changed.length > 0) {
    lines.push(
      `Run ${chalk.bold("acdl update --apply")} to apply ${changed.length} change(s).`
    );
  } else {
    lines.push("No managed changes to apply.");
  }

  return lines.join("\n");
}

/**
 * Format a unified diff patch with colors.
 */
function formatPatch(patch: string): string {
  return patch
    .split("\n")
    .map((line) => {
      if (line.startsWith("+") && !line.startsWith("+++")) {
        return chalk.green(`      ${line}`);
      }
      if (line.startsWith("-") && !line.startsWith("---")) {
        return chalk.red(`      ${line}`);
      }
      if (line.startsWith("@@")) {
        return chalk.cyan(`      ${line}`);
      }
      return `      ${line}`;
    })
    .join("\n");
}

/**
 * Build an operation summary from diff results after apply.
 */
export function buildApplySummary(
  results: DiffResult[]
): OperationSummary {
  return {
    created: [],
    patched: results
      .filter((r) => r.status === "changed")
      .map((r) => r.filePath),
    unchanged: results
      .filter((r) => r.status === "unchanged")
      .map((r) => r.filePath),
    skipped: [],
    errors: results
      .filter((r) => r.status === "missing")
      .map(
        (r) => `${r.filePath}: managed marker "${r.markerId}" not found`
      ),
  };
}
