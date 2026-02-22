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

program
  .command("init")
  .description(
    "Initialize .acdl/ with methodology content and templates"
  )
  .option("--force", "Re-initialize over existing .acdl/", false)
  .action(initCommand);

program.parse();
