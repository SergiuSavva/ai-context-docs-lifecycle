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
  "_integration-update"
);
const CLI_BIN = resolve(import.meta.dirname, "../../dist/bin.js");

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

describe("acdl update", () => {
  it("fails without init", () => {
    const { exitCode, stdout } = run(["update"], FIXTURE_DIR);
    expect(exitCode).toBe(1);
    expect(stdout).toContain("acdl init");
  });

  it("reports no changes after fresh init (idempotent)", () => {
    run(["init", "--yes"], FIXTURE_DIR);
    const { exitCode, stdout } = run(["update"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
    expect(stdout).toContain("No managed changes to apply");
  });

  it("detects changes when managed content is modified", () => {
    run(["init", "--yes", "--with-docs", "architecture"], FIXTURE_DIR);

    // Modify managed content in AGENTS.md
    const agentsPath = resolve(FIXTURE_DIR, "AGENTS.md");
    let content = readFileSync(agentsPath, "utf-8");
    content = content.replace(
      "{{project-name}}",
      "My Modified Project"
    );
    writeFileSync(agentsPath, content, "utf-8");

    const { exitCode, stdout } = run(["update"], FIXTURE_DIR);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Changed");
  });

  it("applies changes with --apply", () => {
    run(["init", "--yes", "--with-docs", "architecture"], FIXTURE_DIR);

    // Modify managed content
    const agentsPath = resolve(FIXTURE_DIR, "AGENTS.md");
    let content = readFileSync(agentsPath, "utf-8");
    content = content.replace(
      "{{project-name}}",
      "My Modified Project"
    );
    writeFileSync(agentsPath, content, "utf-8");

    const { exitCode, stdout } = run(["update", "--apply"], FIXTURE_DIR);
    expect(exitCode).toBe(0);
    expect(stdout).toContain("Patched");

    // Content should be restored to template
    const restored = readFileSync(agentsPath, "utf-8");
    expect(restored).toContain("{{project-name}}");
    expect(restored).not.toContain("My Modified Project");
  });

  it("preserves user content outside managed markers", () => {
    run(["init", "--yes", "--with-docs", "architecture"], FIXTURE_DIR);

    // Add user content outside markers
    const agentsPath = resolve(FIXTURE_DIR, "AGENTS.md");
    let content = readFileSync(agentsPath, "utf-8");
    content = "# My Custom Header\n\n" + content + "\n\n# My Custom Footer\n";
    writeFileSync(agentsPath, content, "utf-8");

    // Modify managed content to trigger a change
    content = readFileSync(agentsPath, "utf-8");
    content = content.replace(
      "{{project-name}}",
      "Modified"
    );
    writeFileSync(agentsPath, content, "utf-8");

    run(["update", "--apply"], FIXTURE_DIR);

    const result = readFileSync(agentsPath, "utf-8");
    expect(result).toContain("# My Custom Header");
    expect(result).toContain("# My Custom Footer");
    expect(result).toContain("{{project-name}}");
  });
});

describe("acdl doctor", () => {
  it("passes after fresh init", () => {
    run(["init", "--yes"], FIXTURE_DIR);
    const { exitCode, stdout } = run(["doctor"], FIXTURE_DIR);

    expect(exitCode).toBe(0);
    expect(stdout).toContain("All checks passed");
  });

  it("fails without init", () => {
    const { exitCode, stdout } = run(["doctor"], FIXTURE_DIR);
    expect(exitCode).toBe(1);
  });

  it("detects missing managed file", () => {
    run(["init", "--yes", "--with-docs", "architecture"], FIXTURE_DIR);

    // Delete a managed file
    rmSync(resolve(FIXTURE_DIR, "docs", "architecture.md"));

    const { exitCode, stdout } = run(["doctor"], FIXTURE_DIR);
    expect(exitCode).toBe(1);
    expect(stdout).toContain("missing");
  });

  it("detects removed markers", () => {
    run(["init", "--yes", "--with-docs", "architecture"], FIXTURE_DIR);

    // Remove markers from AGENTS.md
    const agentsPath = resolve(FIXTURE_DIR, "AGENTS.md");
    writeFileSync(agentsPath, "# Plain content, no markers\n", "utf-8");

    const { exitCode, stdout } = run(["doctor"], FIXTURE_DIR);
    expect(exitCode).toBe(1);
    expect(stdout).toContain("no managed markers");
  });
});
