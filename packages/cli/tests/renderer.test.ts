import { describe, it, expect } from "vitest";
import { buildRenderPlan } from "../src/lib/renderer.js";
import { createDefaultConfig } from "../src/lib/config.js";
import type { AcdlDocs } from "../src/types.js";

describe("buildRenderPlan", () => {
  it("includes AGENTS.md for single-app", () => {
    const docs: AcdlDocs = {
      architecture: false,
      data_model: false,
      api: false,
      auth: false,
      scripts: false,
    };
    const config = createDefaultConfig("0.1.0", docs);
    const plan = buildRenderPlan(config);

    expect(plan.length).toBe(1);
    expect(plan[0].source).toBe("AGENTS-single-app.md");
    expect(plan[0].destination).toBe("AGENTS.md");
    expect(plan[0].markerId).toBe("agents-md");
  });

  it("includes enabled docs in the plan", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: false,
      api: true,
      auth: false,
      scripts: true,
    };
    const config = createDefaultConfig("0.1.0", docs);
    const plan = buildRenderPlan(config);

    // AGENTS.md + 3 docs
    expect(plan.length).toBe(4);

    const destinations = plan.map((e) => e.destination);
    expect(destinations).toContain("AGENTS.md");
    expect(destinations).toContain("docs/architecture.md");
    expect(destinations).toContain("docs/api.md");
    expect(destinations).toContain("docs/scripts.md");
    expect(destinations).not.toContain("docs/data-model.md");
    expect(destinations).not.toContain("docs/auth.md");
  });

  it("includes all docs when all enabled", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: true,
      api: true,
      auth: true,
      scripts: true,
    };
    const config = createDefaultConfig("0.1.0", docs);
    const plan = buildRenderPlan(config);

    // AGENTS.md + 5 docs
    expect(plan.length).toBe(6);
  });

  it("each entry has a unique markerId", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: true,
      api: true,
      auth: true,
      scripts: true,
    };
    const config = createDefaultConfig("0.1.0", docs);
    const plan = buildRenderPlan(config);

    const ids = plan.map((e) => e.markerId);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("uses custom paths from config", () => {
    const docs: AcdlDocs = {
      architecture: true,
      data_model: false,
      api: false,
      auth: false,
      scripts: false,
    };
    const config = createDefaultConfig("0.1.0", docs);
    config.paths.agents = "MY-AGENTS.md";
    config.paths.docs_dir = "documentation";

    const plan = buildRenderPlan(config);
    const destinations = plan.map((e) => e.destination);

    expect(destinations).toContain("MY-AGENTS.md");
    expect(destinations).toContain("documentation/architecture.md");
  });
});
