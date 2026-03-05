import checkbox from "@inquirer/checkbox";
import { MODULE_DEFINITIONS } from "./modules.js";

export async function promptModuleSelection(): Promise<number[]> {
  return checkbox({
    message: "Which modules to install into your project?",
    choices: MODULE_DEFINITIONS.map((m) => ({
      name: `${m.name} — ${m.description}`,
      value: m.id,
      checked: m.defaultSelected,
    })),
  });
}
