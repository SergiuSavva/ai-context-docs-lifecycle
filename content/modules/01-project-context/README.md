# Module 1: Project Context

> **Give AI agents complete context about your project** with AGENTS.md and reference docs.

---

## The Problem

AI coding assistants have no memory. Every session starts fresh, leading to:
- Generic code that doesn't match your patterns
- Repeated explanations of your tech stack
- Suggestions that conflict with past decisions

**The solution**: A lightweight context file + reference docs that AI reads on-demand.

---

## What This Module Does

Sets up a three-stage loading model:

1. **Discovery** — `AGENTS.md` (always loaded, compact routing context)
2. **Activation** — domain docs in `docs/` (loaded when task-relevant)
3. **Execution** — command catalog in `docs/scripts.md` (loaded only when running/verifying commands)

Together they form **Progressive Disclosure**: minimal upfront context with deep knowledge available on-demand.

### How Progressive Disclosure Works

| Stage | What | When Loaded | Token Cost |
|-------|------|-------------|------------|
| **Discovery: AGENTS.md** | Stack, structure, boundaries, routing hints | Every session | ~500-700 |
| **Activation: docs/** | Project-specific domain docs (varies by project) | When task-relevant | ~1,000-1,200 each |
| **Execution: docs/scripts.md** | Verified runnable commands + provenance | Only when executing/verifying | ~300-700 |

**Always-on context:** Only AGENTS.md = ~500-700 tokens.
**Typical plan/research session:** AGENTS.md + 1-2 docs = ~1,500-3,000 tokens.
**Typical implementation session:** AGENTS.md + domain docs + scripts doc = task-relevant execution context.

**Single App:**

```
Discovery (Always)             Activation (On-demand)          Execution (On-demand)
┌─────────────────────┐        ┌────────────────────────┐
│ AGENTS.md           │  ───►  │ @docs/ (only the docs  │
│ • Stack, structure  │        │  this project needs)   │
│ • Routing hints     │        │ @docs/decisions/       │
│ • Task mode policy  │        │                        │
│ • Boundaries        │        │                        │
└─────────────────────┘        └────────────────────────┘
                                      │
                                      └──────────────►  @docs/scripts.md
```

**Monorepo:**

```
Discovery (Always)             Activation (Subproject + docs)   Execution (On-demand)
┌─────────────────────┐        ┌─────────────────────┐       ┌──────────────────┐
│ Root AGENTS.md      │        │ {{subproject}}/      │       │ @docs/ (only the │
│ • Structure         │  ───►  │   AGENTS.md          │ ───►  │  docs this proj  │
│ • Subproject Routes │        │ • Local routing      │       │  actually needs) │
│ • Global boundaries │        │ • Context Loading    │       │                  │
└─────────────────────┘        └─────────────────────┘       └──────────────────┘
                                                                 │
                                                                 └──► @docs/scripts.md
```

---

## What You Get

```
your-project/
├── AGENTS.md                    # Discovery: always loaded (~80 lines)
└── docs/
    ├── {{relevant-docs}}.md     # Activation: only the docs your project needs
    ├── scripts.md               # Execution: canonical command catalog
    └── decisions/               # Architecture Decision Records
        └── NNN-decision.md      # Permanent, never deleted
```

The contents of `docs/` vary by project. A simple CLI might only have `scripts.md`. A full-stack app might have `architecture.md`, `data-model.md`, `api.md`, `auth.md`, and `scripts.md`. The AI agent or you decide what's relevant — see the template catalog below.

---

## Choose Your Template

### AGENTS.md Templates

| Template | Use When |
|----------|----------|
| [Single App](./templates/AGENTS-single-app.md) | Standard apps, libraries, CLIs |
| [Monorepo Root](./templates/AGENTS-monorepo-root.md) | Monorepo root (routes to subprojects) |
| [Monorepo Subproject](./templates/AGENTS-monorepo-subproject.md) | Each package/service in monorepo |

### Reference Doc Templates (pick what fits your project)

These are a **template catalog** — use only the ones that match your project. The AI agent selects from this catalog during bootstrap, or you can pick manually.

| Template | Include When | Purpose |
|----------|-------------|---------|
| [architecture.md](./templates/docs/architecture.md) | Project has multiple layers or services | System overview, layers, dependency rules |
| [data-model.md](./templates/docs/data-model.md) | Project has a database | Schema, ERD, relationships, access patterns |
| [api.md](./templates/docs/api.md) | Project exposes or consumes APIs | Endpoints, actions, or API surface catalog |
| [auth.md](./templates/docs/auth.md) | Project has authentication | Auth flows, middleware, role-based access |
| [scripts.md](./templates/docs/scripts.md) | Project has runnable commands | Canonical commands with verification metadata |
| [decisions/adr.md](./templates/docs/decisions/adr.md) | Significant technical decision made | Architecture Decision Record template |

You can also create **project-specific docs** not in this catalog (e.g., `docs/integrations.md`, `docs/deployment.md`, `docs/testing.md`). The catalog covers common patterns — your project may need different ones.

---

## Setup

### 1. CLI Setup (Recommended)

From your project root:

```bash
npx @acdl/cli init
```

Then ask your AI agent to bootstrap from the local workflow file:

```text
Bootstrap AGENTS.md for this project.
Follow: .acdl/content/modules/01-project-context/bootstrap-workflow.md
```

If `.acdl/` already exists:

```bash
npx @acdl/cli init --force
```

### 2. Manual Setup (Simple)

1. Copy the right AGENTS.md template to your project root
2. Fill in the placeholders (stack, structure, conventions, boundaries)
3. Create `docs/` with only the reference doc templates that apply to your project
4. Fill in the Context Loading table in AGENTS.md with only the docs you created
5. Done!

### 3. Interactive Bootstrap (Smart)

Ask your AI agent to "bootstrap AGENTS.md" following the local workflow file in `.acdl/`:

`.acdl/content/modules/01-project-context/bootstrap-workflow.md`

If you are not using the CLI, use the repository workflow:
[Bootstrap Workflow](./bootstrap-workflow.md).

The AI will:
1. Detect if single-app or monorepo
2. Scan project structure
3. Auto-detect tech stack and which reference docs are relevant
4. Mark commands as verified vs inferred in `docs/scripts.md`
5. Generate `AGENTS.md` + only the `docs/` files that match detected signals

---

## Reference Docs: What to Include

Not every project needs every doc. Only create docs that match your project:

| Doc | Include When | Update When |
|-----|-------------|-------------|
| `architecture.md` | Project has multiple layers or services | Architecture changes |
| `data-model.md` | Project has a database | Schema changes |
| `api.md` | Project has an API / server actions | New endpoints or actions |
| `auth.md` | Project has authentication | Auth flow changes |
| `scripts.md` | Project has runnable commands | Tooling/script changes |
| `decisions/NNN-*.md` | Significant technical decision made | Never (permanent record) |
| `{{custom}}.md` | Project has a domain not covered above | When that domain changes |

**A simple CLI** may only need `scripts.md`. **A full-stack web app** may need all five. **A library** might only need `architecture.md` and `scripts.md`. Let the project's actual needs drive what docs you create.

### Doc Freshness Rules

Docs are **evergreen** — always current or deleted. Never stale.

| Rule | Why |
|------|-----|
| Update docs in the same PR as code changes | Prevents drift |
| Delete docs for removed features | No dead references |
| ADRs are permanent | Record of reasoning, even if decision is later reversed |
| Update `scripts.md` when scripts/tooling change | Prevents command drift |
| Review docs quarterly | Catch gradual drift |

### Cross-Reference Convention

Docs reference each other and skills using a standard format:

| Referencing | Format | Example |
|-------------|--------|---------|
| A doc file | `@docs/<path>` | `@docs/architecture.md` |
| A skill | `load skill \`<name>\`` | `load skill \`database\`` |
| An ADR | `@docs/decisions/<NNN>-<name>.md` | `@docs/decisions/001-server-first.md` |
| Command catalog | `@docs/scripts.md` | `@docs/scripts.md` |

Only cross-reference docs that exist in the project.

---

## Tool Compatibility

| Agent | AGENTS.md | @docs/ References |
|-------|-----------|-------------------|
| **Cursor** | Auto-reads | `@docs/file.md` |
| **Claude Code** | Via `CLAUDE.md` symlink | Direct read |
| **GitHub Copilot** | Auto-reads | Direct read |
| **Cline** | Via `.clinerules` | Direct read |
| **OpenCode** | Auto-reads | Direct read |
| **Windsurf** | Auto-reads | Direct read |
| **Aider** | Via `/read` | Via `/read` |

AGENTS.md works with **every** AI coding agent. No tool-specific files required.

---

## What's Next?

| Signal | What It Means | Add Module |
|--------|---------------|------------|
| Deep patterns repeated to AI | Need on-demand skill packages | [Module 2: Skills](../02-skills/README.md) |
| Building features > 3 files | Need structured workflow | [Module 3: Feature Development](../03-feature-development/README.md) |
| Managing multiple features | Need project-level planning | [Module 4: Project Planning](../04-project-planning/README.md) |

**Rule of thumb**: Short conventions go inline in AGENTS.md. Deep patterns become Skills (Module 2).

---

## Learn More

- [AGENTS.md Best Practices](../../guides/agents-md-best-practices.md) — Research-backed writing guide
- [Tool Compatibility](../../guides/tool-compatibility.md) — Setup for Cursor, Claude Code, Copilot
- [Bootstrap Workflow](./bootstrap-workflow.md) — AI-assisted project initialization
