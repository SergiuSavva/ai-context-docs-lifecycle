# ADR-004: Methodology Skills

**Status:** Accepted
**Date:** 2026-02-15
**Context:** All skill examples were stack-specific (Next.js/Supabase). The methodology workflows had no portable skill equivalents — the feature workflow existed only as a Cursor-specific `.mdc` rule.

## Decision

Add three methodology skills that ship as templates alongside the existing skill template:

| Skill | Purpose |
|-------|---------|
| `feature-workflow` | Three-phase workflow process (Research → Plan → Implement), task execution, progress tracking |
| `agents-md` | AGENTS.md authoring — section anatomy, token budget, router pattern, update triggers |
| `spec-writing` | Spec content quality — problem framing, acceptance criteria, scoping |

These are distinct from stack skills (database, testing, etc.) which users author for their own projects.

## Rationale

| Concern | Docs-only (status quo) | Methodology skills (chosen) |
|---------|----------------------|----------------------------|
| Portability | Feature workflow locked to Cursor `.mdc` | Portable SKILL.md works across all agents |
| Consistency | Agents interpret raw docs differently | Skills give actionable, structured instructions |
| Token efficiency | Must load full README to get workflow rules | Compact skill loads only what's needed (~1,200-1,600 tokens) |
| Discoverability | No routing signal for methodology tasks | AGENTS.md Context Loading table routes to skills |

Key boundary decisions:
- `feature-workflow` owns process (phases, markers, execution) vs `spec-writing` owns content quality (framing, criteria, scoping)
- `spec-writing` defers task formatting to `feature-workflow` via `load skill` cross-reference
- `agents-md` is standalone — references `feature-workflow` but doesn't overlap

## Consequences

- Methodology skills ship in `content/modules/02-skills/templates/.agents/skills/`
- Module 2 README now distinguishes "Methodology Skills" from "Stack Skills"
- AGENTS.md templates (single-app + monorepo) include routing entries for all three
- Skills catalog guide added at `content/guides/skills-catalog.md`
- Cursor `.mdc` feature-workflow rule remains as an optional bridge (not replaced)

## Related

- `content/modules/02-skills/README.md`
- `content/guides/skills-catalog.md`
- `content/guides/skill-routing.md`
- `docs/decisions/003-methodology-modules-and-workflow-update.md`
- load skill `feature-workflow`
- load skill `agents-md`
- load skill `spec-writing`
