import { existsSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import chalk from "chalk";
import { copyContentToProject } from "../lib/renderer.js";
import { getCliVersion } from "../lib/version.js";
import { getAcdlDir } from "../lib/paths.js";

interface InitOptions {
  force: boolean;
}

export async function initCommand(options: InitOptions): Promise<void> {
  const projectDir = process.cwd();
  const acdlDir = getAcdlDir(projectDir);

  // 1. Check for existing .acdl/
  if (existsSync(acdlDir) && !options.force) {
    console.error(
      chalk.red(
        `\nError: ${acdlDir} already exists.\n` +
          `Use ${chalk.bold("--force")} to re-initialize.\n`
      )
    );
    process.exit(1);
  }

  const version = getCliVersion();

  console.log("");
  console.log(chalk.bold("Initializing AI Context Docs..."));
  console.log("");

  try {
    // 2. Copy methodology content to .acdl/content/
    copyContentToProject(projectDir);
    console.log(`  ${chalk.green("✓")} Copied methodology to .acdl/content/`);

    // 3. Write version file
    writeFileSync(resolve(acdlDir, "version"), version, "utf-8");
    console.log(`  ${chalk.green("✓")} Created .acdl/version (${version})`);

    // 4. Print summary
    printSummary(version);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red(`\nError during init: ${message}\n`));
    process.exit(1);
  }
}

function printSummary(version: string): void {
  console.log("");
  console.log(chalk.bold("Done!") + ` (v${version})`);
  console.log("");
  console.log(chalk.bold("Next steps:"));
  console.log("");
  console.log(`  1. Paste this into your AI agent to bootstrap project context:`);
  console.log("");
  console.log(chalk.cyan(`     Bootstrap AGENTS.md for this project.`));
  console.log(chalk.cyan(`     Follow: .acdl/content/modules/01-project-context/bootstrap-workflow.md`));
  console.log("");
  console.log(`  2. After bootstrap, set up on-demand skills:`);
  console.log("");
  console.log(chalk.cyan(`     Set up skills for this project.`));
  console.log(chalk.cyan(`     Methodology skills: .acdl/content/modules/02-skills/templates/.agents/skills/`));
  console.log(chalk.cyan(`     Read: .acdl/content/modules/02-skills/README.md`));
  console.log("");
  console.log(`  3. Commit ${chalk.bold(".acdl/")} to git`);
  console.log("");
}
