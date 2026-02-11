import { existsSync } from "node:fs";
import chalk from "chalk";
import type { AcdlDocs, DocName } from "../types.js";
import { DOC_NAMES } from "../types.js";
import {
  createDefaultConfig,
  writeConfig,
  getAcdlDir,
} from "../lib/config.js";
import {
  buildRenderPlan,
  copyTemplatesToProject,
  materializeFile,
} from "../lib/renderer.js";
import { getCliVersion } from "../lib/version.js";

interface InitOptions {
  withDocs: string;
  force: boolean;
  yes: boolean;
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

  // 2. Parse --with-docs into config
  const docs = parseDocsOption(options.withDocs);
  const templateVersion = getCliVersion();

  console.log("");
  console.log(chalk.bold("Initializing AI Context Docs..."));
  console.log("");

  // 3. Create config
  const config = createDefaultConfig(templateVersion, docs);

  try {
    // 4. Write config
    writeConfig(projectDir, config);
    console.log(`  ${chalk.green("✓")} Created .acdl/config.toml`);

    // 5. Copy bundled templates to .acdl/templates/
    copyTemplatesToProject(projectDir);
    console.log(`  ${chalk.green("✓")} Copied templates to .acdl/templates/`);

    // 6. Build render plan and materialize files
    const plan = buildRenderPlan(config);
    const created: string[] = [];

    for (const entry of plan) {
      materializeFile(projectDir, entry);
      created.push(entry.destination);
      console.log(`  ${chalk.green("✓")} Created ${entry.destination}`);
    }

    // 7. Print summary
    printSummary(created, config);
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    console.error(chalk.red(`\nError during init: ${message}\n`));
    process.exit(1);
  }
}

function parseDocsOption(withDocs: string): AcdlDocs {
  const requested = withDocs
    .split(",")
    .map((s) => s.trim().toLowerCase());

  const docs: AcdlDocs = {
    architecture: false,
    data_model: false,
    api: false,
    auth: false,
    scripts: false,
  };

  for (const name of requested) {
    if (name in docs) {
      docs[name as DocName] = true;
    } else {
      console.warn(
        chalk.yellow(`  Warning: Unknown doc "${name}", skipping.`)
      );
    }
  }

  return docs;
}

function printSummary(created: string[], config: ReturnType<typeof createDefaultConfig>): void {
  const enabledDocs = Object.entries(config.docs)
    .filter(([, v]) => v)
    .map(([k]) => k);

  console.log("");
  console.log(chalk.bold("Done!"));
  console.log("");
  console.log(`  Project type:      ${config.project_type}`);
  console.log(`  Template version:  ${config.template_version}`);
  console.log(`  Docs enabled:      ${enabledDocs.join(", ")}`);
  console.log(`  Files created:     ${created.length}`);
  console.log("");
  console.log(chalk.dim("  Created files are wrapped in managed markers."));
  console.log(
    chalk.dim("  Fill in {{placeholders}} in AGENTS.md and docs/ with your project details.")
  );
  console.log("");
  console.log("Next steps:");
  console.log(
    `  1. Edit ${chalk.bold("AGENTS.md")} — fill in project name, stack, structure`
  );
  console.log(
    `  2. Edit ${chalk.bold("docs/")} — fill in architecture, data model, etc.`
  );
  console.log(
    `  3. Run ${chalk.bold("acdl doctor")} to verify integrity`
  );
  console.log(
    `  4. Commit ${chalk.bold(".acdl/")} and generated files to git`
  );
  console.log("");
}
