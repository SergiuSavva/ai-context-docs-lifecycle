import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import { copyContentToProject } from "../lib/renderer.js";
import { getCliVersion } from "../lib/version.js";
import { getAcdlDir } from "../lib/paths.js";
import {
  MODULE_DEFINITIONS,
  installModule,
  parseModulesFlag,
  getDefaultModuleIds,
  type InstallResult,
} from "../lib/modules.js";
import { promptModuleSelection } from "../lib/prompts.js";

interface InitOptions {
  force: boolean;
  yes?: boolean;
  modules?: string;
  skipInstall?: boolean;
  dryRun?: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  const projectDir = process.cwd();
  const acdlDir = getAcdlDir(projectDir);

  if (existsSync(acdlDir) && !options.force) {
    console.error(
      chalk.red(
        `\nError: ${acdlDir} already exists.\n` +
          `Use ${chalk.bold("--force")} to re-initialize.\n`
      )
    );
    process.exit(1);
  }

  if (options.modules) {
    try {
      parseModulesFlag(options.modules);
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err);
      console.error(chalk.red(`\nError: ${message}\n`));
      process.exit(1);
    }
  }

  const version = getCliVersion();
  const dryRun = options.dryRun ?? false;

  console.log("");
  if (dryRun) {
    console.log(chalk.bold("Dry run — no files will be written."));
    console.log("");
  }
  console.log(chalk.bold("Initializing AI Context Docs..."));
  console.log("");

  try {
    if (!dryRun) {
      copyContentToProject(projectDir);
    }
    console.log(`  ${chalk.green("✓")} Copied methodology to .acdl/content/`);

    if (!dryRun) {
      writeFileSync(resolve(acdlDir, "version"), version, "utf-8");
    }
    console.log(`  ${chalk.green("✓")} Created .acdl/version (${version})`);

    const results = await installSelectedModules(projectDir, options, dryRun);

    printSummary(version, results, dryRun);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red(`\nError during init: ${message}\n`));
    process.exit(1);
  }
}

async function installSelectedModules(
  projectDir: string,
  options: InitOptions,
  dryRun: boolean
): Promise<InstallResult[]> {
  if (options.skipInstall) return [];

  let selectedIds: number[];

  if (options.modules) {
    selectedIds = parseModulesFlag(options.modules);
  } else if (options.yes) {
    selectedIds = getDefaultModuleIds();
  } else if (process.stdin.isTTY) {
    console.log("");
    selectedIds = await promptModuleSelection();
  } else {
    console.log("");
    console.log(
      `  ${chalk.dim("·")} Skipped module installation (non-interactive)`
    );
    console.log(
      chalk.dim(
        '    Use -y for defaults, or --modules 1,2,3 to select specific modules.'
      )
    );
    return [];
  }

  if (selectedIds.length === 0) return [];

  if (options.force && !dryRun) {
    const names = selectedIds
      .map((id) => MODULE_DEFINITIONS.find((m) => m.id === id)?.name)
      .filter(Boolean);
    console.log("");
    console.log(
      chalk.yellow(
        `  ⚠ --force: existing files from ${names.join(", ")} will be overwritten`
      )
    );
  }

  console.log("");
  const results: InstallResult[] = [];
  for (const id of selectedIds) {
    const mod = MODULE_DEFINITIONS.find((m) => m.id === id);
    if (!mod) continue;
    const result = installModule(projectDir, mod, options.force, dryRun);
    results.push(result);
    printModuleResult(result, dryRun);
  }

  return results;
}

function printModuleResult(result: InstallResult, dryRun: boolean): void {
  const { moduleName, installed, skipped, warnings } = result;
  const verb = dryRun ? "Would install" : "Installed";
  const parts = [`${installed.length} files`];
  if (skipped.length > 0) parts.push(`${skipped.length} skipped`);

  console.log(
    `  ${chalk.green("✓")} ${verb} ${moduleName} (${parts.join(", ")})`
  );

  if (skipped.length > 0) {
    console.log(
      chalk.dim(`    Skipped (already exist): ${skipped.join(", ")}`)
    );
    console.log(chalk.dim("    Use --force to overwrite existing files."));
  }

  for (const warning of warnings) {
    console.log(`  ${chalk.yellow("⚠")} ${warning}`);
  }
}

function printSummary(
  version: string,
  results: InstallResult[],
  dryRun: boolean
): void {
  console.log("");
  console.log(chalk.bold("Done!") + ` (v${version})`);

  if (dryRun) {
    console.log("");
    console.log(
      chalk.dim("  This was a dry run. Run without --dry-run to apply changes.")
    );
    console.log("");
    return;
  }

  console.log("");
  console.log(chalk.bold("Next steps:"));
  console.log("");
  console.log(
    "  1. Paste this into your AI agent to bootstrap project context:"
  );
  console.log("");
  console.log(
    chalk.cyan(
      "     Bootstrap AGENTS.md for this project."
    )
  );
  console.log(
    chalk.cyan(
      "     Follow: .acdl/content/modules/01-project-context/bootstrap-workflow.md"
    )
  );
  console.log("");

  const hasModules = results.some((r) => r.installed.length > 0);
  console.log(
    `  2. Commit ${chalk.bold(".acdl/")}${hasModules ? " and installed files" : ""} to git`
  );
  console.log("");
}
