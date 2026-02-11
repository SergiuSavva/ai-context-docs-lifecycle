import { Command } from "commander";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initCommand } from "./commands/init.js";
import { updateCommand } from "./commands/update.js";
import { doctorCommand } from "./commands/doctor.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf-8")
);

const program = new Command();

program
  .name("acdl")
  .description("Initialize and maintain AI Context Docs in any project")
  .version(pkg.version);

program
  .command("init")
  .description(
    "Initialize .acdl/ control plane and render AGENTS.md + docs/ from templates"
  )
  .option(
    "--with-docs <docs>",
    "Comma-separated list of docs to enable (architecture,api,auth,data_model,scripts)",
    "architecture,api,auth,data_model,scripts"
  )
  .option("--force", "Re-initialize over existing .acdl/", false)
  .option("--yes", "Skip confirmation prompts and use defaults", false)
  .action(initCommand);

program
  .command("update")
  .description(
    "Compare managed content against templates and optionally apply changes"
  )
  .option("--apply", "Apply changes (default is dry-run)", false)
  .option("--verbose", "Show full diff output", false)
  .action(updateCommand);

program
  .command("doctor")
  .description("Check .acdl/ integrity: config, markers, and file drift")
  .action(doctorCommand);

program.parse();
