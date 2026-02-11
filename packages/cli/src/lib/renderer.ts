import {
  readFileSync,
  writeFileSync,
  existsSync,
  mkdirSync,
  cpSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import type { AcdlConfig, RenderEntry } from "../types.js";
import { wrapWithMarkers } from "./ownership.js";
import { getBundledTemplatesDir } from "./paths.js";
import { getProjectTemplatesDir } from "./config.js";

/**
 * Map of doc config keys to their template source and destination paths.
 */
const DOC_MAPPING: Record<
  string,
  { source: string; destination: string; markerId: string }
> = {
  architecture: {
    source: "docs/architecture.md",
    destination: "docs/architecture.md",
    markerId: "doc-architecture",
  },
  data_model: {
    source: "docs/data-model.md",
    destination: "docs/data-model.md",
    markerId: "doc-data-model",
  },
  api: {
    source: "docs/api.md",
    destination: "docs/api.md",
    markerId: "doc-api",
  },
  auth: {
    source: "docs/auth.md",
    destination: "docs/auth.md",
    markerId: "doc-auth",
  },
  scripts: {
    source: "docs/scripts.md",
    destination: "docs/scripts.md",
    markerId: "doc-scripts",
  },
};

/**
 * Build the render plan from config: which templates go where.
 */
export function buildRenderPlan(config: AcdlConfig): RenderEntry[] {
  const entries: RenderEntry[] = [];

  // AGENTS.md is always included for single-app
  entries.push({
    source: "AGENTS-single-app.md",
    destination: config.paths.agents,
    markerId: "agents-md",
  });

  // Add enabled docs
  for (const [key, mapping] of Object.entries(DOC_MAPPING)) {
    if (config.docs[key as keyof typeof config.docs]) {
      entries.push({
        source: mapping.source,
        destination: `${config.paths.docs_dir}/${mapping.destination.replace("docs/", "")}`,
        markerId: mapping.markerId,
      });
    }
  }

  return entries;
}

/**
 * Copy bundled templates into the project's .acdl/templates/ directory.
 */
export function copyTemplatesToProject(projectDir: string): void {
  const bundledDir = getBundledTemplatesDir();
  const projectTemplatesDir = getProjectTemplatesDir(projectDir);

  if (!existsSync(bundledDir)) {
    throw new Error(
      `Bundled templates not found at ${bundledDir}. Package may be corrupted.`
    );
  }

  mkdirSync(projectTemplatesDir, { recursive: true });
  cpSync(bundledDir, projectTemplatesDir, { recursive: true });
}

/**
 * Materialize a single file: read template, wrap with markers, write to destination.
 */
export function materializeFile(
  projectDir: string,
  entry: RenderEntry
): void {
  const templatePath = resolve(
    getProjectTemplatesDir(projectDir),
    entry.source
  );

  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  const templateContent = readFileSync(templatePath, "utf-8");
  const wrapped = wrapWithMarkers(templateContent, entry.markerId);

  const destPath = resolve(projectDir, entry.destination);
  const destDir = dirname(destPath);
  if (!existsSync(destDir)) {
    mkdirSync(destDir, { recursive: true });
  }

  writeFileSync(destPath, wrapped, "utf-8");
}

/**
 * Read the current managed content for a rendered file.
 * Returns the template content that should be in the managed block.
 */
export function getTemplateContent(
  projectDir: string,
  entry: RenderEntry
): string {
  const templatePath = resolve(
    getProjectTemplatesDir(projectDir),
    entry.source
  );

  if (!existsSync(templatePath)) {
    throw new Error(`Template not found: ${templatePath}`);
  }

  return readFileSync(templatePath, "utf-8");
}
