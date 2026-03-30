import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdirSync,
  rmSync,
  existsSync,
  readFileSync,
  writeFileSync,
} from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { execFileSync } from "node:child_process";

const __test_dirname = dirname(fileURLToPath(import.meta.url));

const FIXTURE_DIR = resolve(
  __test_dirname,
  "../fixtures",
  "_integration-init"
);
const CLI_BIN = resolve(__test_dirname, "../../dist/bin.js");
const CLI_PACKAGE_JSON = resolve(__test_dirname, "../../package.json");
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
  it("does not create .acdl/ directory", () => {
    run(["init"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(false);
  });

  it("does NOT create AGENTS.md or docs/ (AI agent decides)", () => {
    run(["init"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, "AGENTS.md"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });

  it("allows running init twice (idempotent, skips existing)", () => {
    run(["init", "--modules", "1"], FIXTURE_DIR);
    const { exitCode, stdout } = run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
    expect(stdout).toContain("skipped");
  });

  it("allows re-init with --force", () => {
    run(["init", "--modules", "1"], FIXTURE_DIR);
    const { exitCode } = run(["init", "--force", "--modules", "1"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
  });

  it("prints next steps with load skill acdl", () => {
    const { stdout } = run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(stdout).toContain("Bootstrap AGENTS.md for this project.");
    expect(stdout).toContain("load skill `acdl`");
    expect(stdout).not.toContain(".acdl/content/");
  });

  it("skips module installation in non-TTY without --modules", () => {
    const { stdout } = run(["init"], FIXTURE_DIR);

    expect(stdout).toContain("Skipped module installation");
    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
  });
});

describe("acdl init --modules", () => {
  it("installs Module 1 (Foundation) skills with --modules 1", () => {
    run(["init", "--modules", "1"], FIXTURE_DIR);

    // Skills installed: acdl + docs
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "SKILL.md"))).toBe(true);

    // Old skill names NOT installed
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "agents-md"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "doc-writing"))).toBe(false);

    // AGENTS.md templates in acdl
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "templates", "AGENTS-single-app.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "templates", "AGENTS-monorepo-root.md"))).toBe(true);

    // Reference doc templates in docs skill (not in acdl)
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "templates", "docs", "api.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "templates", "docs", "architecture.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "templates", "docs", "decisions", "adr.md"))).toBe(true);

    // No docs/ at project root
    expect(existsSync(resolve(FIXTURE_DIR, "docs"))).toBe(false);
  });

  it("installs Module 2 (Dev Workflow) skills with --modules 2", () => {
    run(["init", "--modules", "2"], FIXTURE_DIR);

    // Skills installed: feature + patterns
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "patterns", "SKILL.md"))).toBe(true);

    // Old skill names NOT installed
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature-workflow"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "spec-writing"))).toBe(false);

    // Feature templates
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "templates", "spec.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "templates", "tasks.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "templates", "design.md"))).toBe(true);

    // ADR template NOT in feature (lives in docs skill now)
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "templates", "adr.md"))).toBe(false);

    // Patterns skill has no templates (discovery-first)
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "patterns", "templates"))).toBe(false);

    // No tool-specific files installed
    expect(existsSync(resolve(FIXTURE_DIR, ".cursor"))).toBe(false);
  });

  it("installs Module 3 (Project Planning) skill with --modules 3", () => {
    run(["init", "--modules", "3"], FIXTURE_DIR);

    // Skill installed
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "SKILL.md"))).toBe(true);

    // Old skill name NOT installed
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project-planning"))).toBe(false);

    // Templates inside project skill
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "templates", "ROADMAP.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "templates", "BACKLOG.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "templates", "TASKS.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "templates", "PROJECT-PRD.md"))).toBe(true);

    // Templates NOT at project root
    expect(existsSync(resolve(FIXTURE_DIR, "ROADMAP.md"))).toBe(false);
  });

  it("installs multiple modules with --modules 1,2", () => {
    run(["init", "--modules", "1,2"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "patterns", "SKILL.md"))).toBe(true);
  });

  it("installs all modules with --modules all", () => {
    run(["init", "--modules", "all"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "patterns", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project", "SKILL.md"))).toBe(true);
  });

  it("skips module installation with --skip-install", () => {
    run(["init", "--skip-install"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(false);
  });

  it("rejects invalid module IDs", () => {
    const { exitCode, stdout } = run(["init", "--modules", "5"], FIXTURE_DIR);

    expect(exitCode).toBe(1);
    expect(stdout).toContain("Unknown module");
  });

  it("installs default modules with -y flag", () => {
    run(["init", "-y"], FIXTURE_DIR);

    // Module 1 (Foundation) — default
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "docs", "SKILL.md"))).toBe(true);

    // Module 2 (Dev Workflow) — default
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "feature", "SKILL.md"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "patterns", "SKILL.md"))).toBe(true);

    // Module 3 NOT installed by default
    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "project"))).toBe(false);
  });

  it("installs default modules with --yes flag", () => {
    const { stdout } = run(["init", "--yes"], FIXTURE_DIR);

    expect(existsSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"))).toBe(true);
    expect(stdout).toContain("Installed Foundation");
    expect(stdout).toContain("Installed Dev Workflow");
  });
});

describe("module conflict handling", () => {
  it("skips existing files without --force", () => {
    mkdirSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "custom content");

    const { stdout } = run(["init", "--modules", "1"], FIXTURE_DIR);

    expect(readFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "utf-8")).toBe(
      "custom content"
    );
    expect(stdout).toContain("skipped");
  });

  it("overwrites existing files with --force", () => {
    mkdirSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "custom content");

    run(["init", "--force", "--modules", "1"], FIXTURE_DIR);

    expect(
      readFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "utf-8")
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
    mkdirSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "custom content");

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
    expect(stdout).toContain("Would install Foundation");

    expect(existsSync(resolve(FIXTURE_DIR, ".agents"))).toBe(false);
  });

  it("shows skipped files in dry-run when conflicts exist", () => {
    mkdirSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl"), { recursive: true });
    writeFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "custom");

    const { stdout } = run(
      ["init", "--dry-run", "--modules", "1"],
      FIXTURE_DIR
    );

    expect(stdout).toContain("skipped");
    expect(readFileSync(resolve(FIXTURE_DIR, ".agents", "skills", "acdl", "SKILL.md"), "utf-8")).toBe(
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

    expect(stdout).toContain("Foundation");
    expect(stdout).toContain("Dev Workflow");
    expect(stdout).toContain("Project Planning");
  });
});
