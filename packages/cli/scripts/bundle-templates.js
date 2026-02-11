#!/usr/bin/env node

/**
 * Bundle templates from content/ into packages/cli/templates/
 * Runs as prebuild step before tsup compilation.
 *
 * v0.1.0: single-app templates only (no monorepo, no .acdl/ spec templates)
 */

import { cpSync, mkdirSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_ROOT = resolve(__dirname, "..");
const REPO_ROOT = resolve(CLI_ROOT, "../..");
const TEMPLATES_SRC = resolve(
  REPO_ROOT,
  "content/modules/01-project-context/templates"
);
const TEMPLATES_DEST = resolve(CLI_ROOT, "templates");

// Clean previous bundle
if (existsSync(TEMPLATES_DEST)) {
  rmSync(TEMPLATES_DEST, { recursive: true });
}
mkdirSync(TEMPLATES_DEST, { recursive: true });

// Copy single-app AGENTS template
const singleAppSrc = resolve(TEMPLATES_SRC, "AGENTS-single-app.md");
if (!existsSync(singleAppSrc)) {
  console.error(`ERROR: Template not found: ${singleAppSrc}`);
  process.exit(1);
}
cpSync(singleAppSrc, resolve(TEMPLATES_DEST, "AGENTS-single-app.md"));
console.log("  Copied AGENTS-single-app.md");

// Copy docs/ templates
const docsSrc = resolve(TEMPLATES_SRC, "docs");
const docsDest = resolve(TEMPLATES_DEST, "docs");
if (existsSync(docsSrc)) {
  cpSync(docsSrc, docsDest, { recursive: true });
  console.log("  Copied docs/ templates");
} else {
  console.warn(`  WARN: docs/ directory not found at ${docsSrc}`);
}

console.log("Templates bundled successfully.");
