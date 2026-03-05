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
  templateDir: string;
  assets: AssetMapping[];
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
    description: "skills, docs/ templates",
    templateDir: "modules/01-project-context/templates",
    defaultSelected: true,
    assets: [
      { src: ".agents", dest: ".agents" },
      { src: "docs", dest: "docs" },
    ],
  },
  {
    id: 2,
    name: "Feature Development",
    description: "workflow skills, cursor rules, spec templates",
    templateDir: "modules/02-feature-development/templates",
    defaultSelected: true,
    assets: [
      { src: ".agents", dest: ".agents" },
      { src: ".cursor", dest: ".cursor" },
      { src: "spec.md", dest: "specs/_templates/spec.md" },
      { src: "tasks.md", dest: "specs/_templates/tasks.md" },
      { src: "research.md", dest: "specs/_templates/research.md" },
      { src: "plan.md", dest: "specs/_templates/plan.md" },
      { src: "design.md", dest: "specs/_templates/design.md" },
      { src: "adr.md", dest: "specs/_templates/adr.md" },
      { src: "verify-checklist.md", dest: "specs/_templates/verify-checklist.md" },
      { src: "user-stories.md", dest: "specs/_templates/user-stories.md" },
    ],
  },
  {
    id: 3,
    name: "Project Planning",
    description: "roadmap, backlog, tasks, PRD templates",
    templateDir: "modules/03-project-planning/templates",
    defaultSelected: false,
    assets: [
      { src: "ROADMAP.md", dest: "ROADMAP.md" },
      { src: "BACKLOG.md", dest: "BACKLOG.md" },
      { src: "TASKS.md", dest: "TASKS.md" },
      { src: "PROJECT-PRD.md", dest: "PROJECT-PRD.md" },
    ],
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
  const templatesDir = resolve(contentDir, moduleDef.templateDir);
  const installed: string[] = [];
  const skipped: string[] = [];
  const warnings: string[] = [];

  for (const asset of moduleDef.assets) {
    const srcPath = resolve(templatesDir, asset.src);
    const stat = statSync(srcPath, { throwIfNoEntry: false });
    if (!stat) {
      warnings.push(`Source not found: ${asset.src} (in ${moduleDef.templateDir})`);
      continue;
    }

    if (stat.isDirectory()) {
      for (const file of walkFiles(srcPath)) {
        const destPath = resolve(projectDir, asset.dest, file);
        const destRel = join(asset.dest, file);
        if (existsSync(destPath) && !force) {
          skipped.push(destRel);
        } else {
          if (!dryRun) {
            mkdirSync(dirname(destPath), { recursive: true });
            cpSync(resolve(srcPath, file), destPath);
          }
          installed.push(destRel);
        }
      }
    } else {
      const destPath = resolve(projectDir, asset.dest);
      if (existsSync(destPath) && !force) {
        skipped.push(asset.dest);
      } else {
        if (!dryRun) {
          mkdirSync(dirname(destPath), { recursive: true });
          cpSync(srcPath, destPath);
        }
        installed.push(asset.dest);
      }
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
