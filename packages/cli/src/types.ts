/**
 * Shared types for the ACDL CLI.
 */

/** v0.1.0 config schema — single-app only */
export interface AcdlConfig {
  version: number;
  project_type: "single-app";
  template_version: string;
  paths: AcdlPaths;
  docs: AcdlDocs;
  ownership: AcdlOwnership;
}

export interface AcdlPaths {
  root: string;
  agents: string;
  docs_dir: string;
  acdl_dir: string;
}

export interface AcdlDocs {
  architecture: boolean;
  data_model: boolean;
  api: boolean;
  auth: boolean;
  scripts: boolean;
}

export interface AcdlOwnership {
  managed_marker_start: string;
  managed_marker_end: string;
  strict: boolean;
}

/** A single entry in the render plan */
export interface RenderEntry {
  /** Relative path to the source template inside .acdl/templates/ */
  source: string;
  /** Relative path to the destination file in the project */
  destination: string;
  /** Human-readable marker ID for this file */
  markerId: string;
}

/** Result of diffing a managed file */
export interface DiffResult {
  filePath: string;
  markerId: string;
  status: "unchanged" | "changed" | "missing" | "new";
  patch?: string;
}

/** Summary printed after init or update */
export interface OperationSummary {
  created: string[];
  patched: string[];
  unchanged: string[];
  skipped: string[];
  errors: string[];
}

/** Doctor check result */
export interface DoctorIssue {
  severity: "error" | "warning";
  file: string;
  message: string;
  suggestion?: string;
}

/** Available doc names that can be toggled */
export const DOC_NAMES = [
  "architecture",
  "data_model",
  "api",
  "auth",
  "scripts",
] as const;

export type DocName = (typeof DOC_NAMES)[number];
