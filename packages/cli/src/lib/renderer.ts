import { existsSync, mkdirSync, cpSync, rmSync } from "node:fs";
import { resolve } from "node:path";
import { getBundledContentDir } from "./paths.js";

/**
 * Copy the full methodology content/ to .acdl/content/.
 * This includes guides, modules, templates, and examples.
 */
export function copyContentToProject(projectDir: string): void {
  const bundledContentDir = getBundledContentDir();
  const projectContentDir = resolve(projectDir, ".acdl", "content");

  if (!existsSync(bundledContentDir)) {
    throw new Error(
      `Bundled content not found at ${bundledContentDir}. Package may be corrupted.`
    );
  }

  // Ensure .acdl/ exists
  mkdirSync(resolve(projectDir, ".acdl"), { recursive: true });

  if (existsSync(projectContentDir)) {
    rmSync(projectContentDir, { recursive: true, force: true });
  }

  cpSync(bundledContentDir, projectContentDir, { recursive: true });
}
