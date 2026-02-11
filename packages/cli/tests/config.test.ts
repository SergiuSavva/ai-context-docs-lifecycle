import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdirSync, rmSync, existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import {
  createDefaultConfig,
  writeConfig,
  loadConfig,
  getAcdlDir,
  getProjectTemplatesDir,
} from "../src/lib/config.js";
import type { AcdlDocs } from "../src/types.js";

const TEST_DIR = resolve(import.meta.dirname, "fixtures", "_config-test");

beforeEach(() => {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true });
  }
  mkdirSync(TEST_DIR, { recursive: true });
});

afterEach(() => {
  if (existsSync(TEST_DIR)) {
    rmSync(TEST_DIR, { recursive: true });
  }
});

describe("createDefaultConfig", () => {
  it("creates a valid default config", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: true,
      api: false,
      auth: false,
      scripts: true,
    };
    const config = createDefaultConfig("0.1.0", docs);

    expect(config.version).toBe(1);
    expect(config.project_type).toBe("single-app");
    expect(config.template_version).toBe("0.1.0");
    expect(config.paths.agents).toBe("AGENTS.md");
    expect(config.docs.architecture).toBe(true);
    expect(config.docs.api).toBe(false);
    expect(config.ownership.strict).toBe(true);
  });
});

describe("writeConfig + loadConfig", () => {
  it("writes and reads config roundtrip", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: true,
      api: true,
      auth: true,
      scripts: true,
    };
    const config = createDefaultConfig("0.1.0", docs);
    writeConfig(TEST_DIR, config);

    const configPath = resolve(TEST_DIR, ".acdl", "config.toml");
    expect(existsSync(configPath)).toBe(true);

    const loaded = loadConfig(TEST_DIR);
    expect(loaded).not.toBeNull();
    expect(loaded!.version).toBe(1);
    expect(loaded!.project_type).toBe("single-app");
    expect(loaded!.template_version).toBe("0.1.0");
    expect(loaded!.docs.architecture).toBe(true);
    expect(loaded!.docs.scripts).toBe(true);
  });

  it("returns null when config does not exist", () => {
    const loaded = loadConfig(TEST_DIR);
    expect(loaded).toBeNull();
  });

  it("creates .acdl/ directory if it does not exist", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: false,
      api: false,
      auth: false,
      scripts: false,
    };
    const config = createDefaultConfig("0.1.0", docs);
    writeConfig(TEST_DIR, config);

    expect(existsSync(resolve(TEST_DIR, ".acdl"))).toBe(true);
  });
});

describe("loadConfig validation", () => {
  it("throws on invalid version", () => {
    mkdirSync(resolve(TEST_DIR, ".acdl"), { recursive: true });
    const badToml = `
version = 2
project_type = "single-app"
template_version = "0.1.0"

[paths]
root = "."
agents = "AGENTS.md"
docs_dir = "docs"
acdl_dir = ".acdl"

[docs]
architecture = true
data_model = true
api = true
auth = true
scripts = true

[ownership]
managed_marker_start = "<!-- acdl:managed:start:{id} -->"
managed_marker_end = "<!-- acdl:managed:end:{id} -->"
strict = true
`;
    writeFileSync(resolve(TEST_DIR, ".acdl", "config.toml"), badToml);

    expect(() => loadConfig(TEST_DIR)).toThrow("Unsupported config version");
  });

  it("throws on missing docs section", () => {
    mkdirSync(resolve(TEST_DIR, ".acdl"), { recursive: true });
    const badToml = `
version = 1
project_type = "single-app"
template_version = "0.1.0"

[paths]
root = "."
agents = "AGENTS.md"
docs_dir = "docs"
acdl_dir = ".acdl"

[ownership]
managed_marker_start = "<!-- acdl:managed:start:{id} -->"
managed_marker_end = "<!-- acdl:managed:end:{id} -->"
strict = true
`;
    writeFileSync(resolve(TEST_DIR, ".acdl", "config.toml"), badToml);

    expect(() => loadConfig(TEST_DIR)).toThrow("Missing [docs] section");
  });
});

describe("getAcdlDir / getProjectTemplatesDir", () => {
  it("returns correct paths", () => {
    expect(getAcdlDir("/foo/bar")).toBe(resolve("/foo/bar", ".acdl"));
    expect(getProjectTemplatesDir("/foo/bar")).toBe(
      resolve("/foo/bar", ".acdl", "templates")
    );
  });
});
