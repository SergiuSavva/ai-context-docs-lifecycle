import { Command } from "commander";
import { readFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { initCommand } from "./commands/init.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read version from package.json
const pkg = JSON.parse(
  readFileSync(resolve(__dirname, "../package.json"), "utf-8")
);

const program = new Command();

program
  .name("acdl")
  .description("Initialize AI Context Docs in any project")
  .version(pkg.version);

const initCmd = program
  .command("init")
  .description(
    "Initialize .acdl/ with methodology content and templates"
  )
  .option("--force", "Re-initialize over existing .acdl/", false)
  .option("-y, --yes", "Accept default module selection without prompting")
  .option("--modules <list>", 'Modules to install: comma-separated (1,2,3) or "all"')
  .option("--skip-install", "Skip installing module assets into project")
  .option("--dry-run", "Preview what would be installed without writing files")
  .action(initCommand);

initCmd.addHelpText(
  "after",
  `
Available modules:
  1  Project Context        — skills, docs/ templates
  2  Feature Development    — workflow skills, cursor rules, spec templates
  3  Project Planning       — roadmap, backlog, tasks, PRD templates

Modules 1 and 2 are selected by default when using -y or the interactive prompt.
`
);

program.parse();
