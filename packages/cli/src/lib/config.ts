import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import TOML from "@iarna/toml";
import type { AcdlConfig, AcdlDocs, DOC_NAMES } from "../types.js";

const CONFIG_FILENAME = "config.toml";

/**
 * Build the default config for a single-app project.
 */
export function createDefaultConfig(
  templateVersion: string,
  docs: AcdlDocs
): AcdlConfig {
  return {
    version: 1,
    project_type: "single-app",
    template_version: templateVersion,
    paths: {
      root: ".",
      agents: "AGENTS.md",
      docs_dir: "docs",
      acdl_dir: ".acdl",
    },
    docs,
    ownership: {
      managed_marker_start: "<!-- acdl:managed:start:{id} -->",
      managed_marker_end: "<!-- acdl:managed:end:{id} -->",
      strict: true,
    },
  };
}

/**
 * Write config to `.acdl/config.toml`.
 */
export function writeConfig(projectDir: string, config: AcdlConfig): void {
  const acdlDir = resolve(projectDir, config.paths.acdl_dir);
  if (!existsSync(acdlDir)) {
    mkdirSync(acdlDir, { recursive: true });
  }
  const configPath = resolve(acdlDir, CONFIG_FILENAME);
  const tomlStr = TOML.stringify(config as unknown as TOML.JsonMap);
  writeFileSync(configPath, tomlStr, "utf-8");
}

/**
 * Load and validate config from `.acdl/config.toml`.
 * Returns null if config file doesn't exist.
 * Throws on parse/validation errors.
 */
export function loadConfig(projectDir: string): AcdlConfig | null {
  const configPath = resolve(projectDir, ".acdl", CONFIG_FILENAME);
  if (!existsSync(configPath)) {
    return null;
  }

  const raw = readFileSync(configPath, "utf-8");
  const parsed = TOML.parse(raw);
  return validateConfig(parsed);
}

/**
 * Validate a parsed TOML object against the AcdlConfig schema.
 */
function validateConfig(parsed: TOML.JsonMap): AcdlConfig {
  // version
  if (parsed.version !== 1) {
    throw new Error(
      `Unsupported config version: ${parsed.version}. Expected 1.`
    );
  }

  // project_type
  if (parsed.project_type !== "single-app") {
    throw new Error(
      `Unsupported project_type: ${parsed.project_type}. v0.1.0 supports "single-app" only.`
    );
  }

  // template_version
  if (typeof parsed.template_version !== "string" || !parsed.template_version) {
    throw new Error("Missing or invalid template_version in config.");
  }

  // paths
  const paths = parsed.paths as Record<string, unknown> | undefined;
  if (!paths || typeof paths !== "object") {
    throw new Error("Missing [paths] section in config.");
  }
  for (const key of ["root", "agents", "docs_dir", "acdl_dir"]) {
    if (typeof paths[key] !== "string") {
      throw new Error(`Missing or invalid paths.${key} in config.`);
    }
  }

  // docs
  const docs = parsed.docs as Record<string, unknown> | undefined;
  if (!docs || typeof docs !== "object") {
    throw new Error("Missing [docs] section in config.");
  }
  for (const key of [
    "architecture",
    "data_model",
    "api",
    "auth",
    "scripts",
  ]) {
    if (typeof docs[key] !== "boolean") {
      throw new Error(`Missing or invalid docs.${key} in config.`);
    }
  }

  // ownership
  const ownership = parsed.ownership as Record<string, unknown> | undefined;
  if (!ownership || typeof ownership !== "object") {
    throw new Error("Missing [ownership] section in config.");
  }
  if (
    typeof ownership.managed_marker_start !== "string" ||
    typeof ownership.managed_marker_end !== "string"
  ) {
    throw new Error("Missing or invalid ownership marker patterns in config.");
  }
  if (typeof ownership.strict !== "boolean") {
    throw new Error("Missing or invalid ownership.strict in config.");
  }

  return parsed as unknown as AcdlConfig;
}

/**
 * Get the path to the .acdl/ directory for a project.
 */
export function getAcdlDir(projectDir: string): string {
  return resolve(projectDir, ".acdl");
}

/**
 * Get the path to .acdl/templates/ for a project.
 */
export function getProjectTemplatesDir(projectDir: string): string {
  return resolve(projectDir, ".acdl", "templates");
}
