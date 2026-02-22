import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdirSync,
  rmSync,
  existsSync,
  readFileSync,
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

    const skillsTemplate = resolve(
      FIXTURE_DIR,
      ".acdl",
      "content",
      "modules",
      "01-project-context",
      "templates",
      ".agents",
      "skills",
      "feature-workflow",
      "SKILL.md"
    );

    expect(existsSync(skillsTemplate)).toBe(true);
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
});
