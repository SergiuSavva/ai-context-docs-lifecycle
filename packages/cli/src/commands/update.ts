import chalk from "chalk";
import { loadConfig } from "../lib/config.js";
import { buildRenderPlan, copyTemplatesToProject } from "../lib/renderer.js";
import {
  diffAll,
  applyDiff,
  formatDiffSummary,
  buildApplySummary,
} from "../lib/diff.js";
import { getCliVersion } from "../lib/version.js";
import { writeConfig } from "../lib/config.js";

interface UpdateOptions {
  apply: boolean;
  verbose: boolean;
}

export async function updateCommand(options: UpdateOptions): Promise<void> {
  const projectDir = process.cwd();

  // 1. Load config
  const config = loadConfig(projectDir);
  if (!config) {
    console.error(
      chalk.red(
        '\nError: No .acdl/config.toml found.\nRun "acdl init" first.\n'
      )
    );
    process.exit(1);
  }

  const cliVersion = getCliVersion();
  const versionChanged = config.template_version !== cliVersion;

  if (versionChanged) {
    console.log("");
    console.log(
      chalk.cyan(
        `Template version change: ${config.template_version} → ${cliVersion}`
      )
    );

    if (!options.apply) {
      console.log(
        chalk.dim(
          "  Templates will be refreshed in .acdl/templates/ on --apply."
        )
      );
    }
  }

  // 2. If version changed and applying, refresh bundled templates
  if (versionChanged && options.apply) {
    copyTemplatesToProject(projectDir);
    console.log(`  ${chalk.green("✓")} Refreshed .acdl/templates/ to ${cliVersion}`);
  }

  // 3. Build render plan
  const plan = buildRenderPlan(config);

  // 4. Diff all managed files
  const results = diffAll(projectDir, plan);

  if (!options.apply) {
    // 5a. Dry-run (default): show diff summary
    console.log(formatDiffSummary(results, options.verbose));
  } else {
    // 5b. Apply mode: patch managed blocks
    console.log("");
    console.log(chalk.bold("Applying managed changes..."));
    console.log("");

    const changed = results.filter((r) => r.status === "changed");
    const missing = results.filter((r) => r.status === "missing");

    if (config.ownership.strict && missing.length > 0) {
      console.error(
        chalk.red(
          `Error: ${missing.length} file(s) have missing managed markers (strict mode).\n` +
            `Run "acdl doctor" for details. No changes applied.\n`
        )
      );
      process.exit(1);
    }

    for (const entry of plan) {
      const result = results.find((r) => r.filePath === entry.destination);
      if (result?.status === "changed") {
        applyDiff(projectDir, entry);
        console.log(`  ${chalk.green("✓")} Patched ${entry.destination}`);
      } else if (result?.status === "unchanged") {
        console.log(`  ${chalk.dim("–")} ${entry.destination} (unchanged)`);
      } else if (result?.status === "missing") {
        console.log(
          `  ${chalk.yellow("!")} ${entry.destination} (marker missing, skipped)`
        );
      }
    }

    // Update template_version in config if it changed
    if (versionChanged) {
      config.template_version = cliVersion;
      writeConfig(projectDir, config);
      console.log(
        `  ${chalk.green("✓")} Updated template_version to ${cliVersion}`
      );
    }

    // Summary
    const summary = buildApplySummary(results);
    console.log("");
    console.log(
      `Patched: ${summary.patched.length}  ` +
        `Unchanged: ${summary.unchanged.length}  ` +
        `Errors: ${summary.errors.length}`
    );
    console.log("");
  }
}
