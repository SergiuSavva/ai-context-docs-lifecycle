import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import { loadConfig, getAcdlDir, getProjectTemplatesDir } from "../lib/config.js";
import { buildRenderPlan } from "../lib/renderer.js";
import {
  validateMarkers,
  hasManagedMarkers,
  extractManagedBlocks,
} from "../lib/ownership.js";
import type { DoctorIssue } from "../types.js";

export async function doctorCommand(): Promise<void> {
  const projectDir = process.cwd();
  const issues: DoctorIssue[] = [];

  console.log("");
  console.log(chalk.bold("Running ACDL doctor..."));
  console.log("");

  // 1. Check .acdl/ directory exists
  const acdlDir = getAcdlDir(projectDir);
  if (!existsSync(acdlDir)) {
    console.error(
      chalk.red(
        '  ✗ No .acdl/ directory found. Run "acdl init" first.\n'
      )
    );
    process.exit(1);
  }
  console.log(`  ${chalk.green("✓")} .acdl/ directory exists`);

  // 2. Validate config
  let config;
  try {
    config = loadConfig(projectDir);
    if (!config) {
      issues.push({
        severity: "error",
        file: ".acdl/config.toml",
        message: "Config file not found",
        suggestion: 'Run "acdl init" to create it.',
      });
    } else {
      console.log(`  ${chalk.green("✓")} .acdl/config.toml is valid`);
    }
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    issues.push({
      severity: "error",
      file: ".acdl/config.toml",
      message: `Invalid config: ${message}`,
      suggestion: "Fix the config file or re-run init with --force.",
    });
  }

  if (!config) {
    printIssues(issues);
    process.exit(1);
  }

  // 3. Check .acdl/templates/ exists
  const templatesDir = getProjectTemplatesDir(projectDir);
  if (!existsSync(templatesDir)) {
    issues.push({
      severity: "error",
      file: ".acdl/templates/",
      message: "Templates directory missing",
      suggestion: 'Run "acdl init --force" to restore templates.',
    });
  } else {
    console.log(`  ${chalk.green("✓")} .acdl/templates/ exists`);
  }

  // 4. Check all expected files from render plan
  const plan = buildRenderPlan(config);

  for (const entry of plan) {
    const filePath = resolve(projectDir, entry.destination);

    // Check file exists
    if (!existsSync(filePath)) {
      issues.push({
        severity: "error",
        file: entry.destination,
        message: "Expected managed file is missing",
        suggestion: `Run "acdl update --apply" to regenerate, or "acdl init --force".`,
      });
      continue;
    }

    // Check file has managed markers
    const content = readFileSync(filePath, "utf-8");

    if (!hasManagedMarkers(content)) {
      issues.push({
        severity: "error",
        file: entry.destination,
        message: "File exists but has no managed markers",
        suggestion:
          "Markers may have been manually removed. Re-run init with --force to restore.",
      });
      continue;
    }

    // Validate marker integrity
    const markerIssues = validateMarkers(content);
    for (const mi of markerIssues) {
      issues.push({
        severity: "error",
        file: entry.destination,
        message: `${mi.type}: ${mi.message}`,
        suggestion: "Fix the markers manually or re-run init with --force.",
      });
    }

    // Check that the expected marker ID exists
    const blocks = extractManagedBlocks(content);
    if (!blocks.has(entry.markerId)) {
      issues.push({
        severity: "warning",
        file: entry.destination,
        message: `Expected managed block "${entry.markerId}" not found`,
        suggestion: `File may have been restructured. Run "acdl update --apply" to refresh.`,
      });
    } else {
      console.log(
        `  ${chalk.green("✓")} ${entry.destination} — markers valid`
      );
    }

    // Check template source exists in .acdl/templates/
    const templatePath = resolve(templatesDir, entry.source);
    if (!existsSync(templatePath)) {
      issues.push({
        severity: "warning",
        file: `.acdl/templates/${entry.source}`,
        message: "Template source file missing from .acdl/templates/",
        suggestion: 'Run "acdl init --force" to restore template pack.',
      });
    }
  }

  // 5. Print results
  printIssues(issues);

  if (issues.some((i) => i.severity === "error")) {
    process.exit(1);
  }
}

function printIssues(issues: DoctorIssue[]): void {
  const errors = issues.filter((i) => i.severity === "error");
  const warnings = issues.filter((i) => i.severity === "warning");

  console.log("");

  if (errors.length === 0 && warnings.length === 0) {
    console.log(chalk.green(chalk.bold("All checks passed. No issues found.")));
    console.log("");
    return;
  }

  if (errors.length > 0) {
    console.log(chalk.red(chalk.bold(`Errors (${errors.length}):`)));
    for (const issue of errors) {
      console.log(`  ${chalk.red("✗")} ${issue.file}: ${issue.message}`);
      if (issue.suggestion) {
        console.log(`    ${chalk.dim(`→ ${issue.suggestion}`)}`);
      }
    }
    console.log("");
  }

  if (warnings.length > 0) {
    console.log(chalk.yellow(chalk.bold(`Warnings (${warnings.length}):`)));
    for (const issue of warnings) {
      console.log(
        `  ${chalk.yellow("!")} ${issue.file}: ${issue.message}`
      );
      if (issue.suggestion) {
        console.log(`    ${chalk.dim(`→ ${issue.suggestion}`)}`);
      }
    }
    console.log("");
  }
}
