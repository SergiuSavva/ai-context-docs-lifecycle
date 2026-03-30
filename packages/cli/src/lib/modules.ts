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
    name: "Foundation",
    description: "ACDL bootstrap, AGENTS.md authoring, reference docs (acdl, docs skills)",
    skillsDir: "modules/01-foundation/skills",
    defaultSelected: true,
    skills: ["acdl", "docs"],
    extras: [],
  },
  {
    id: 2,
    name: "Dev Workflow",
    description: "spec-driven feature development, codebase pattern discovery (feature, patterns skills)",
    skillsDir: "modules/02-dev-workflow/skills",
    defaultSelected: true,
    skills: ["feature", "patterns"],
    extras: [],
  },
  {
    id: 3,
    name: "Project Planning",
    description: "multi-feature management: roadmap, backlog, PRD (project skill)",
    skillsDir: "modules/03-project-planning/skills",
    defaultSelected: false,
    skills: ["project"],
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
    if (isNaN(id) || !valid.includes(id)) {
      throw new Error(
        `Unknown module: ${id}. Valid modules: ${valid.join(", ")} or "all"`
      );
    }
  }
  return ids;
}
