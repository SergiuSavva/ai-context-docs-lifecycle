import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdirSync,
  rmSync,
  existsSync,
  readFileSync,
  writeFileSync,
  readdirSync,
} from "node:fs";
import { resolve } from "node:path";
import { execFileSync } from "node:child_process";

const FIXTURE_DIR = resolve(
  import.meta.dirname,
  "../fixtures",
  "_integration-init"
);
const CLI_BIN = resolve(import.meta.dirname, "../../dist/bin.js");
const CLI_PACKAGE_JSON = resolve(import.meta.dirname, "../../package.json");
const CLI_VERSION = JSON.parse(readFileSync(CLI_PACKAGE_JSON, "utf-8")).version;

function run(args: string[], cwd: string): { stdout: string; exitCode: number } {
  try {
    const stdout = execFileSync("node", [CLI_BIN, ...args], {
      cwd,
      encoding: "utf-8",
      env: { ...process.env, FORCE_COLOR: "0" },
    });
    return { stdout, exitCode: 0 };
  } catch (err: any) {
    return {
      stdout: err.stdout?.toString() || err.stderr?.toString() || "",
      exitCode: err.status ?? 1,
    };
  }
}

beforeEach(() => {
  if (existsSync(FIXTURE_DIR)) {
    rmSync(FIXTURE_DIR, { recursive: true });
  }
  mkdirSync(FIXTURE_DIR, { recursive: true });
});

afterEach(() => {
  if (existsSync(FIXTURE_DIR)) {
    rmSync(FIXTURE_DIR, { recursive: true });
  }
});

describe("acdl init", () => {
  it("creates .acdl/ directory", () => {
    const { exitCode } = run(["init"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(true);
  });

  it("copies content to .acdl/content/", () => {
    run(["init"], FIXTURE_DIR);

    const contentDir = resolve(FIXTURE_DIR, ".acdl", "content");
    expect(existsSync(contentDir)).toBe(true);
    expect(
      existsSync(resolve(contentDir, "methodology.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(contentDir, "guides", "getting-started.md"))
    ).toBe(true);
  });

  it("includes templates inside content/", () => {
    run(["init"], FIXTURE_DIR);

    const templatesDir = resolve(
      FIXTURE_DIR,
      ".acdl",
      "content",
      "modules",
      "01-project-context",
      "templates"
    );
    expect(existsSync(templatesDir)).toBe(true);
    expect(
      existsSync(resolve(templatesDir, "AGENTS-single-app.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(templatesDir, "AGENTS-monorepo-root.md"))
    ).toBe(true);
  });

  it("creates the new 3-module structure (no legacy skills module)", () => {
    run(["init"], FIXTURE_DIR);

    const modulesDir = resolve(FIXTURE_DIR, ".acdl", "content", "modules");
    const modules = readdirSync(modulesDir, { withFileTypes: true })
      .filter((entry) => entry.isDirectory())
      .map((entry) => entry.name)
      .sort();

    expect(modules).toEqual([
      "01-project-context",
      "02-feature-development",
      "03-project-planning",
    ]);
    expect(existsSync(resolve(modulesDir, "02-skills"))).toBe(false);
    expect(existsSync(resolve(modulesDir, "04-project-planning"))).toBe(false);
  });

  it("ships skills templates under module 1", () => {
    run(["init"], FIXTURE_DIR);

    const skillsDir = resolve(
      FIXTURE_DIR,
      ".acdl",
      "content",
      "modules",
      "01-project-context",
      "templates",
      ".agents",
      "skills"
    );

    expect(existsSync(resolve(skillsDir, "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(skillsDir, "agents-md", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(skillsDir, "doc-writing", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(skillsDir, "skill-template", "SKILL.md"))).toBe(true);
  });

  it("ships skills and cursor rules under module 2", () => {
    run(["init"], FIXTURE_DIR);

    const mod2Templates = resolve(
      FIXTURE_DIR,
      ".acdl",
      "content",
      "modules",
      "02-feature-development",
      "templates"
    );

    expect(
      existsSync(resolve(mod2Templates, ".agents", "skills", "feature-workflow", "SKILL.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(mod2Templates, ".agents", "skills", "workflow-guide", "SKILL.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(mod2Templates, ".agents", "skills", "spec-writing", "SKILL.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(mod2Templates, ".cursor", "rules", "feature-workflow.mdc"))
    ).toBe(true);
  });

  it("writes .acdl/version with CLI version", () => {
    run(["init"], FIXTURE_DIR);

    const versionPath = resolve(FIXTURE_DIR, ".acdl", "version");
    expect(existsSync(versionPath)).toBe(true);
    expect(readFileSync(versionPath, "utf-8")).toBe(CLI_VERSION);
  });

  it("does NOT create AGENTS.md or docs/ (AI agent decides)", () => {
    run(["init"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, "AGENTS.md"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });

  it("does NOT create a separate .acdl/templates/ directory", () => {
    run(["init"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".acdl", "templates"))).toBe(false);
  });

  it("blocks re-init without --force", () => {
    run(["init"], FIXTURE_DIR);
    const { exitCode, stdout } = run(["init"], FIXTURE_DIR);

    expect(exitCode).toBe(1);
    expect(stdout).toContain("already exists");
  });

  it("allows re-init with --force", () => {
    run(["init"], FIXTURE_DIR);
    const { exitCode } = run(["init", "--force"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
  });

  it("prints next steps with bootstrap workflow path", () => {
    const { stdout } = run(["init"], FIXTURE_DIR);

    expect(stdout).toContain(".acdl/content/");
    expect(stdout).toContain("Bootstrap AGENTS.md for this project.");
    expect(stdout).toContain(
      ".acdl/content/modules/01-project-context/bootstrap-workflow.md"
    );
  });

  it("skips module installation in non-TTY without --modules", () => {
    const { stdout } = run(["init"], FIXTURE_DIR);

    expect(stdout).toContain("Skipped module installation");
    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });
});

describe("acdl init --modules", () => {
  it("installs Module 1 assets with --modules 1", () => {
    run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "agents-md", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "doc-writing", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "skill-template", "SKILL.md"))).toBe(true);

    expect(existsSync(resolve(FIXTURE_DIR, "docs", "api.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "docs", "architecture.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "docs", "decisions", "adr.md"))).toBe(true);

    expect(existsSync(resolve(FIXTURE_DIR, "AGENTS-single-app.md"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "AGENTS-monorepo-root.md"))).toBe(false);
  });

  it("installs Module 2 assets with --modules 2", () => {
    run(["init", "--modules", "2"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature-workflow", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "workflow-guide", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "spec-writing", "SKILL.md"))).toBe(true);

    expect(existsSync(resolve(FIXTURE_DIR, ".cursor", "rules", "feature-workflow.mdc"))).toBe(true);

    expect(existsSync(resolve(FIXTURE_DIR, "specs", "_templates", "spec.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "specs", "_templates", "tasks.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "specs", "_templates", "plan.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "specs", "_templates", "design.md"))).toBe(true);
  });

  it("installs Module 3 assets with --modules 3", () => {
    run(["init", "--modules", "3"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, "ROADMAP.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "BACKLOG.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "TASKS.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "PROJECT-PRD.md"))).toBe(true);
  });

  it("installs multiple modules with --modules 1,2", () => {
    run(["init", "--modules", "1,2"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature-workflow", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".cursor", "rules", "feature-workflow.mdc"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "docs", "api.md"))).toBe(true);
  });

  it("installs all modules with --modules all", () => {
    run(["init", "--modules", "all"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".cursor", "rules", "feature-workflow.mdc"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "ROADMAP.md"))).toBe(true);
  });

  it("skips module installation with --skip-install", () => {
    run(["init", "--skip-install"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });

  it("rejects invalid module IDs", () => {
    const { exitCode, stdout } = run(["init", "--modules", "5"], FIXTURE_DIR);

    expect(exitCode).toBe(1);
    expect(stdout).toContain("Unknown module");
  });

  it("installs default modules with -y flag", () => {
    run(["init", "-y"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".cursor", "rules", "feature-workflow.mdc"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "docs", "api.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "specs", "_templates", "spec.md"))).toBe(true);

    expect(existsSync(resolve(FIXTURE_DIR, "ROADMAP.md"))).toBe(false);
  });

  it("installs default modules with --yes flag", () => {
    const { stdout } = run(["init", "--yes"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(stdout).toContain("Installed Project Context");
    expect(stdout).toContain("Installed Feature Development");
  });
});

describe("module conflict handling", () => {
  it("skips existing files without --force", () => {
    mkdirSync(resolve(FIXTURE_DIR, "docs"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "custom content");

    const { stdout } = run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(readFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "utf-8")).toBe(
      "custom content"
    );
    expect(stdout).toContain("skipped");
  });

  it("overwrites existing files with --force", () => {
    mkdirSync(resolve(FIXTURE_DIR, "docs"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "custom content");

    run(["init", "--force", "--modules", "1"], FIXTURE_DIR);

    expect(
      readFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "utf-8")
    ).not.toBe("custom content");
  });

  it("preserves user files in merged directories", () => {
    mkdirSync(resolve(FIXTURE_DIR, ".agents", "skills", "my-custom-skill"), {
      recursive: true,
    });
    writeFileSync(
      resolve(FIXTURE_DIR, ".agents", "skills", "my-custom-skill", "SKILL.md"),
      "custom"
    );

    run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(
      readFileSync(
        resolve(FIXTURE_DIR, ".agents", "skills", "my-custom-skill", "SKILL.md"),
        "utf-8"
      )
    ).toBe("custom");
    expect(
      existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))
    ).toBe(true);
  });

  it("warns when --force will overwrite module assets", () => {
    mkdirSync(resolve(FIXTURE_DIR, "docs"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "custom content");

    const { stdout } = run(["init", "--force", "--modules", "1"], FIXTURE_DIR);

    expect(stdout).toContain("--force");
    expect(stdout).toContain("overwritten");
  });
});

describe("acdl init --dry-run", () => {
  it("previews module installation without writing files", () => {
    const { stdout, exitCode } = run(
      ["init", "--dry-run", "--modules", "1"],
      FIXTURE_DIR
    );

    expect(exitCode).toBe(0);
    expect(stdout).toContain("Dry run");
    expect(stdout).toContain("Would install Project Context");

    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });

  it("shows skipped files in dry-run when conflicts exist", () => {
    mkdirSync(resolve(FIXTURE_DIR, "docs"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "custom");

    const { stdout } = run(
      ["init", "--dry-run", "--modules", "1"],
      FIXTURE_DIR
    );

    expect(stdout).toContain("skipped");
    expect(readFileSync(resolve(FIXTURE_DIR, "docs", "api.md"), "utf-8")).toBe(
      "custom"
    );
  });

  it("prints re-run hint after dry-run", () => {
    const { stdout } = run(
      ["init", "--dry-run", "-y"],
      FIXTURE_DIR
    );

    expect(stdout).toContain("without --dry-run");
  });
});

describe("acdl init --help", () => {
  it("lists available modules in help output", () => {
    const { stdout } = run(["init", "--help"], FIXTURE_DIR);

    expect(stdout).toContain("Project Context");
    expect(stdout).toContain("Feature Development");
    expect(stdout).toContain("Project Planning");
  });
});
