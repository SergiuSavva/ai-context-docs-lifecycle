#!/usr/bin/env node

/**
 * Bundle content/ from the repo root into packages/cli/content/
 * Runs as prebuild step before tsup compilation.
 */

import { cpSync, rmSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const CLI_ROOT = resolve(__dirname, "..");
const REPO_ROOT = resolve(CLI_ROOT, "../..");
const CONTENT_SRC = resolve(REPO_ROOT, "content");
const CONTENT_DEST = resolve(CLI_ROOT, "content");

// Clean previous bundle
if (existsSync(CONTENT_DEST)) {
  rmSync(CONTENT_DEST, { recursive: true });
}

// Copy full methodology content/ scaffold
if (existsSync(CONTENT_SRC)) {
  cpSync(CONTENT_SRC, CONTENT_DEST, { recursive: true });
  console.log("  Copied content/ scaffold");
} else {
  console.error(`  ERROR: content/ directory not found at ${CONTENT_SRC}`);
  process.exit(1);
}

console.log("Content bundled successfully.");
