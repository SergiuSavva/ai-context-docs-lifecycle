# ADR-005: Merge Skills (Module 2) into Project Context (Module 1)

**Status:** Accepted
**Date:** 2026-02-22
**Context:** Module 2 (Skills) had no independent operational spine — no bootstrap workflow, no CLI command, no standalone adoption path. Skills are Activation-tier content alongside `docs/`, loaded on-demand. The CLI already delivered both modules together via `npx @acdl/cli init`. Maintaining them separately caused phantom skills, stale cross-references, and a confusing user journey.

## Decision

Merge Module 2 (Skills) into Module 1 (Project Context) and renumber subsequent modules:

| Before | After |
|--------|-------|
| 1. Project Context (AGENTS.md + docs/) | 1. Project Context (AGENTS.md + docs/ + .agents/skills/) |
| 2. Skills (.agents/skills/) | *(merged into Module 1)* |
| 3. Feature Development | 2. Feature Development |
| 4. Project Planning | 3. Project Planning |

Module 1 now has three adoption tiers: Basic (AGENTS.md only), Standard (+ docs/), Full (+ .agents/skills/).

## Rationale

| Concern | Separate modules (status quo) | Merged (chosen) |
|---------|------------------------------|-----------------|
| Adoption path | Skills required a separate "adopt Module 2" step with no CLI support | Skills are an optional tier within Module 1 — no separate adoption step |
| Bootstrap workflow | Skills had no bootstrap phase; users had to discover them separately | Bootstrap workflow Phase 4.3 now handles skills setup |
| CLI delivery | `npx @acdl/cli init` already copied both modules together | Single module, single delivery — no conceptual mismatch |
| Cross-references | 30+ files referenced "Module 2: Skills" with frequent staleness | Skills documented inline in Module 1 README — single source of truth |
| Progressive disclosure | Skills and docs are both Activation-tier content | Unified under one module matches the runtime loading model |
| Maintenance | Two READMEs, two template paths, duplicated tool-compat tables | One README, one template path, one tool-compat table |

## Consequences

- Module count reduced from 4 to 3
- Skill templates live at `content/modules/01-project-context/templates/.agents/skills/`
- Module 1 README includes a full skills section (~80 lines)
- Bootstrap workflow includes optional skills setup (Phase 4.3)
- AGENTS.md templates use concrete skill routing comments instead of "If Module 2 is adopted"
- CLI init output simplified to a single bootstrap prompt
- All guides, project files, and mkdocs.yml updated with new module numbers
- ADR-004 references to `content/modules/02-skills/` are now historical

## Related

- `content/modules/01-project-context/README.md`
- `content/guides/skills-catalog.md`
- `docs/decisions/004-methodology-skills.md`
