import {
  existsSync,
  mkdirSync,
  cpSync,
  readdirSync,
  statSync,
} from "node:fs";
import { resolve, dirname, join } from "node:path";
import { getBundledContentDir } from "./paths.js";

export interface AssetMapping {
  src: string;
  dest: string;
}

export interface ModuleDefinition {
  id: number;
  name: string;
  description: string;
  skillsDir: string;
  skills: string[];
  extras: AssetMapping[];
  defaultSelected: boolean;
}

export interface InstallResult {
  moduleId: number;
  moduleName: string;
  installed: string[];
  skipped: string[];
  warnings: string[];
}

export const MODULE_DEFINITIONS: ModuleDefinition[] = [
  {
    id: 1,
    name: "Project Context",
    description: "AGENTS.md bootstrap, reference doc templates, doc-writing skills",
    skillsDir: "modules/01-project-context/skills",
    defaultSelected: true,
    skills: ["acdl", "agents-md", "doc-writing"],
    extras: [],
  },
  {
    id: 2,
    name: "Feature Development",
    description: "feature workflow skills, spec templates, optional Cursor bridge",
    skillsDir: "modules/02-feature-development/skills",
    defaultSelected: true,
    skills: ["feature-workflow", "spec-writing", "workflow-guide"],
    extras: [
      {
        src: "feature-workflow/cursor-bridge.mdc",
        dest: ".cursor/rules/feature-workflow.mdc",
      },
    ],
  },
  {
    id: 3,
    name: "Project Planning",
    description: "project planning skill with roadmap, backlog, tasks, PRD templates",
    skillsDir: "modules/03-project-planning/skills",
    defaultSelected: false,
    skills: ["project-planning"],
    extras: [],
  },
];

function walkFiles(dir: string, base = ""): string[] {
  const entries = readdirSync(dir, { withFileTypes: true });
  const files: string[] = [];
  for (const entry of entries) {
    const rel = base ? `${base}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      files.push(...walkFiles(resolve(dir, entry.name), rel));
    } else {
      files.push(rel);
    }
  }
  return files;
}

export function installModule(
  projectDir: string,
  moduleDef: ModuleDefinition,
  force: boolean,
  dryRun = false
): InstallResult {
  const contentDir = getBundledContentDir();
  const skillsDir = resolve(contentDir, moduleDef.skillsDir);
  const installed: string[] = [];
  const skipped: string[] = [];
  const warnings: string[] = [];

  // Install each skill directory into .agents/skills/<skill-name>/
  for (const skillName of moduleDef.skills) {
    const srcSkillDir = resolve(skillsDir, skillName);
    const stat = statSync(srcSkillDir, { throwIfNoEntry: false });

    if (!stat) {
      warnings.push(`Skill not found: ${skillName} (in ${moduleDef.skillsDir})`);
      continue;
    }

    for (const file of walkFiles(srcSkillDir)) {
      // Skip cursor-bridge.mdc — handled via extras
      if (file === "cursor-bridge.mdc") continue;

      const srcPath = resolve(srcSkillDir, file);
      const destRel = join(".agents", "skills", skillName, file);
      const destPath = resolve(projectDir, destRel);

      if (existsSync(destPath) && !force) {
        skipped.push(destRel);
      } else {
        if (!dryRun) {
          mkdirSync(dirname(destPath), { recursive: true });
          cpSync(srcPath, destPath);
        }
        installed.push(destRel);
      }
    }
  }

  // Install extras (non-skill file mappings, e.g. cursor bridge)
  for (const extra of moduleDef.extras) {
    const srcPath = resolve(skillsDir, extra.src);
    const stat = statSync(srcPath, { throwIfNoEntry: false });

    if (!stat) {
      warnings.push(`Extra asset not found: ${extra.src} (in ${moduleDef.skillsDir})`);
      continue;
    }

    const destPath = resolve(projectDir, extra.dest);
    if (existsSync(destPath) && !force) {
      skipped.push(extra.dest);
    } else {
      if (!dryRun) {
        mkdirSync(dirname(destPath), { recursive: true });
        cpSync(srcPath, destPath);
      }
      installed.push(extra.dest);
    }
  }

  return {
    moduleId: moduleDef.id,
    moduleName: moduleDef.name,
    installed,
    skipped,
    warnings,
  };
}

export function getDefaultModuleIds(): number[] {
  return MODULE_DEFINITIONS.filter((m) => m.defaultSelected).map((m) => m.id);
}

export function parseModulesFlag(value: string): number[] {
  if (value.toLowerCase() === "all") {
    return MODULE_DEFINITIONS.map((m) => m.id);
  }
  const ids = value.split(",").map((s) => Number(s.trim()));
  const valid = MODULE_DEFINITIONS.map((m) => m.id);
  for (const id of ids) {
    if (!valid.includes(id)) {
      throw new Error(
        `Unknown module: ${id}. Valid modules: ${valid.join(", ")} or "all"`
      );
    }
  }
  return ids;
}
