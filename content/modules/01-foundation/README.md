# Module 1: Foundation

> AGENTS.md bootstrap and reference doc templates — the base layer for AI-assisted development.

**Default module** — installed automatically by `npx @acdl/cli init`.

---

## What This Module Does

Gives AI agents the context they need to understand your project:

1. **AGENTS.md** — always-loaded project summary (stack, commands, structure, boundaries)
2. **Reference docs** — durable knowledge in `docs/` (architecture, API, auth, data model, scripts, ADRs)

---

## Skills

### `acdl`

Bootstraps your project with AGENTS.md. Scans your repo, detects your stack, and generates a tailored context file.

- **Location**: `skills/acdl/SKILL.md`
- **Templates**: `skills/acdl/templates/`
  - `AGENTS-single-app.md` — single app template
  - `AGENTS-monorepo-root.md` — monorepo root router
  - `AGENTS-monorepo-subproject.md` — monorepo subproject

**Usage**: `load skill acdl`

### `docs`

Templates and guidance for writing reference documentation, guides, and ADRs.

- **Location**: `skills/docs/SKILL.md`
- **Templates**: `skills/docs/templates/docs/`
  - `architecture.md`, `api.md`, `auth.md`, `data-model.md`, `scripts.md`
  - `decisions/adr.md` — ADR template

**Usage**: `load skill docs`

---

## Choose Your Template

Only create the docs your project actually needs:

| Template | When to Use |
|----------|-------------|
| `scripts.md` | Project has runnable commands (most projects) |
| `architecture.md` | Multiple layers, services, or significant structure |
| `data-model.md` | Project has a database |
| `api.md` | Exposes or consumes APIs |
| `auth.md` | Has authentication/authorization |

---

## Setup

```bash
npx @acdl/cli init              # installs this module by default
```

Then tell your AI: `load skill acdl`

---

## Related Modules

- [Module 2: Dev Workflow](../02-dev-workflow/README.md) — feature workflow + stack patterns
- [Module 3: Project Planning](../03-project-planning/README.md) — multi-feature management
