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
| **Activation: docs/** | Architecture, data model, API catalog, auth, ADRs | When task-relevant | ~1,000-1,200 each |
| **Execution: docs/scripts.md** | Verified runnable commands + provenance | Only when executing/verifying | ~300-700 |

**Always-on context:** Only AGENTS.md = ~500-700 tokens.
**Typical plan/research session:** AGENTS.md + 1-2 docs = ~1,500-3,000 tokens.
**Typical implementation session:** AGENTS.md + domain docs + scripts doc = task-relevant execution context.

**Single App:**

```
Discovery (Always)             Activation (On-demand)          Execution (On-demand)
┌─────────────────────┐        ┌────────────────────────┐
│ AGENTS.md           │  ───►  │ @docs/architecture.md  │
│ • Stack, structure  │        │ @docs/data-model.md    │
│ • Routing hints     │        │ @docs/api.md           │
│ • Task mode policy  │        │ @docs/auth.md          │
│ • Boundaries        │        │ @docs/decisions/       │
└─────────────────────┘        └────────────────────────┘
                                      │
                                      └──────────────►  @docs/scripts.md
```

**Monorepo:**

```
Discovery (Always)             Activation (Subproject + docs)   Execution (On-demand)
┌─────────────────────┐        ┌─────────────────────┐       ┌──────────────────┐
│ Root AGENTS.md      │        │ packages/web/        │       │ @docs/arch.md    │
│ • Structure         │  ───►  │   AGENTS.md          │ ───►  │ @docs/api.md     │
│ • Package Overview  │        │ • Local routing      │       │ @docs/auth.md    │
│ • Subproject Routes │        │ • Context Loading    │       │                  │
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
    ├── architecture.md          # Activation: system overview, layers, diagrams
    ├── data-model.md            # Activation: schema, ERD, relationships
    ├── api.md                   # Activation: API surface / server actions catalog
    ├── auth.md                  # Activation: auth flows, middleware, roles
    ├── scripts.md               # Execution: canonical command catalog
    └── decisions/               # Architecture Decision Records
        └── NNN-decision.md      # Permanent, never deleted
```

---

## Choose Your Template

### AGENTS.md Templates

| Template | Use When |
|----------|----------|
| [Single App](./templates/AGENTS-single-app.md) | Standard apps, libraries, CLIs |
| [Monorepo Root](./templates/AGENTS-monorepo-root.md) | Monorepo root (routes to subprojects) |
| [Monorepo Subproject](./templates/AGENTS-monorepo-subproject.md) | Each package/service in monorepo |

### Reference Doc Templates

| Template | Purpose |
|----------|---------|
| [architecture.md](./templates/docs/architecture.md) | System overview, layers, dependency rules |
| [data-model.md](./templates/docs/data-model.md) | Database schema, ERD, relationships, access patterns |
| [api.md](./templates/docs/api.md) | API endpoints or Server Actions catalog |
| [auth.md](./templates/docs/auth.md) | Auth flows, middleware, role-based access |
| [scripts.md](./templates/docs/scripts.md) | Canonical runnable commands with verification metadata |
| [decisions/adr.md](./templates/docs/decisions/adr.md) | Architecture Decision Record template |

---

## Setup

### 1. Manual Setup (Simple)

1. Copy the right AGENTS.md template to your project root
2. Fill in the placeholders (stack, structure, conventions, boundaries)
3. Create `docs/` with the reference doc templates that apply
4. Put executable commands in `docs/scripts.md` (with status + source)
5. Fill in the other docs with your project's current state
6. Done!

### 2. Interactive Bootstrap (Smart)

Ask your AI agent to "bootstrap AGENTS.md" following the [Bootstrap Workflow](./bootstrap-workflow.md).

The AI will:
1. Detect if single-app or monorepo
2. Scan project structure
3. Auto-detect tech stack and candidate commands
4. Mark commands as verified vs inferred in `docs/scripts.md`
5. Generate `AGENTS.md` + initial `docs/` files

---

## Reference Docs: What to Include

Not every project needs every doc. Start with what exists, add as needed:

| Doc | Include When | Update When |
|-----|-------------|-------------|
| `architecture.md` | Always (even if simple) | Architecture changes |
| `data-model.md` | Project has a database | Schema changes |
| `api.md` | Project has an API / server actions | New endpoints or actions |
| `auth.md` | Project has authentication | Auth flow changes |
| `scripts.md` | Project has runnable commands | Tooling/script changes |
| `decisions/NNN-*.md` | Significant technical decision made | Never (permanent record) |

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

## Example

See the complete [demo-taskflow](./examples/demo-taskflow/README.md) example showing AGENTS.md + docs/ + Skills working together with cross-references.

---

## Learn More

- [AGENTS.md Best Practices](../../guides/agents-md-best-practices.md) — Research-backed writing guide
- [Tool Compatibility](../../guides/tool-compatibility.md) — Setup for Cursor, Claude Code, Copilot
- [Bootstrap Workflow](./bootstrap-workflow.md) — AI-assisted project initialization
