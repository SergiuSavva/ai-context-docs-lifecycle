# Module 2: Dev Workflow

> Feature workflow and stack pattern skills — structured development with AI agents.

**Default module** — installed automatically by `npx @acdl/cli init`.

---

## What This Module Does

Provides structured workflows for building features and encoding stack-specific patterns:

1. **Feature workflow** — seven-phase lifecycle (spec, research, design, tasks, build, verify, closeout)
2. **Stack patterns** — skill for documenting your project's coding conventions and idioms

---

## Skills

### `feature`

Structured feature development with spec writing, task tracking, debugging, testing, and closeout.

- **Location**: `skills/feature/SKILL.md`
- **Templates**: `skills/feature/templates/`
  - `spec.md`, `tasks.md`, `research.md`, `design.md`, `plan.md`, `user-stories.md`, `verify-checklist.md`
- **Cursor bridge**: `skills/feature/cursor-bridge.mdc` (installed as `.cursor/rules/feature-workflow.mdc`)

**Usage**: `load skill feature`

**Phases**: spec, research, design, tasks, build, verify, closeout

### `patterns`

Guidance for documenting stack-specific patterns and coding conventions as skills.

- **Location**: `skills/patterns/SKILL.md`

**Usage**: `load skill patterns`

---

## Three Workflow Tracks

| Track | When | Docs Needed |
|-------|------|-------------|
| **Quick Flow** | Bug fix, typo, config change | None |
| **Standard Flow** | Any feature (not a bug fix) | `spec.md` + `tasks.md` |
| **Complex Flow** | New systems, integrations, research-heavy | `research.md` + `spec.md` + `tasks.md` + ADR |

---

## Setup

```bash
npx @acdl/cli init              # installs this module by default
```

Then tell your AI: `load skill feature`

---

## Related Modules

- [Module 1: Foundation](../01-foundation/README.md) — AGENTS.md + reference docs (prerequisite)
- [Module 3: Project Planning](../03-project-planning/README.md) — multi-feature management
