import { describe, it, expect, beforeEach, afterEach } from "vitest";
import {
  mkdirSync,
  rmSync,
  existsSync,
  readFileSync,
  writeFileSync,
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
  it("creates .acdl/ directory and config", () => {
    const { exitCode } = run(["init", "--yes"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
    expect(existsSync(resolve(FIXTURE_DIR, ".acdl"))).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, ".acdl", "config.toml"))).toBe(
      true
    );
  });

  it("creates AGENTS.md with managed markers", () => {
    run(["init", "--yes"], FIXTURE_DIR);

    const agentsPath = resolve(FIXTURE_DIR, "AGENTS.md");
    expect(existsSync(agentsPath)).toBe(true);

    const content = readFileSync(agentsPath, "utf-8");
    expect(content).toContain("<!-- acdl:managed:start:agents-md -->");
    expect(content).toContain("<!-- acdl:managed:end:agents-md -->");
    // Template placeholders should be present (not substituted)
    expect(content).toContain("{{project-name}}");
  });

  it("creates enabled doc files", () => {
    run(
      ["init", "--yes", "--with-docs", "architecture,api"],
      FIXTURE_DIR
    );

    expect(
      existsSync(resolve(FIXTURE_DIR, "docs", "architecture.md"))
    ).toBe(true);
    expect(existsSync(resolve(FIXTURE_DIR, "docs", "api.md"))).toBe(true);
    // These were not requested
    expect(
      existsSync(resolve(FIXTURE_DIR, "docs", "auth.md"))
    ).toBe(false);
    expect(
      existsSync(resolve(FIXTURE_DIR, "docs", "data-model.md"))
    ).toBe(false);
  });

  it("copies templates to .acdl/templates/", () => {
    run(["init", "--yes"], FIXTURE_DIR);

    const templatesDir = resolve(FIXTURE_DIR, ".acdl", "templates");
    expect(existsSync(templatesDir)).toBe(true);
    expect(
      existsSync(resolve(templatesDir, "AGENTS-single-app.md"))
    ).toBe(true);
    expect(
      existsSync(resolve(templatesDir, "docs", "architecture.md"))
    ).toBe(true);
  });

  it("blocks re-init without --force", () => {
    run(["init", "--yes"], FIXTURE_DIR);
    const { exitCode, stdout } = run(["init", "--yes"], FIXTURE_DIR);

    expect(exitCode).toBe(1);
    expect(stdout).toContain("already exists");
  });

  it("allows re-init with --force", () => {
    run(["init", "--yes"], FIXTURE_DIR);
    const { exitCode } = run(
      ["init", "--yes", "--force"],
      FIXTURE_DIR
    );

    expect(exitCode).toBe(0);
  });

  it("writes config with correct template version", () => {
    run(["init", "--yes"], FIXTURE_DIR);

    const configContent = readFileSync(
      resolve(FIXTURE_DIR, ".acdl", "config.toml"),
      "utf-8"
    );
    expect(configContent).toContain(`template_version = "${CLI_VERSION}"`);
  });
});
