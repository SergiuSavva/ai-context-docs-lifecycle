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

Sets up two layers of project context:

1. **AGENTS.md** — A compact index (~80 lines) loaded every session
2. **docs/** — Reference knowledge loaded only when relevant

Together they form **Progressive Disclosure**: minimal upfront context with deep knowledge available on-demand.

### How Progressive Disclosure Works

| Layer | What | When Loaded | Token Cost |
|-------|------|-------------|------------|
| **Layer 1: AGENTS.md** | Stack, commands, structure, conventions, boundaries | Every session | ~700 |
| **Layer 2: docs/** | Architecture, data model, API catalog, auth, ADRs | When task-relevant | ~1,000-1,200 each |

**Always-on context:** Only AGENTS.md = ~700 tokens.
**Typical session:** AGENTS.md + 1-2 docs = ~2,000-3,000 tokens, all task-relevant.

**Single App:**

```
Layer 1 (Always)               Layer 2 (On-demand reference)
┌─────────────────────┐        ┌────────────────────────┐
│ AGENTS.md           │        │ @docs/architecture.md  │
│ • Stack, commands   │  ───►  │ @docs/data-model.md    │
│ • Conventions       │        │ @docs/api.md           │
│ • Context Loading   │        │ @docs/auth.md          │
│ • Boundaries        │        │ @docs/decisions/       │
└─────────────────────┘        └────────────────────────┘
```

**Monorepo:**

```
Layer 1 (Always)               Layer 1.5 (Subproject)        Layer 2 (Reference)
┌─────────────────────┐        ┌─────────────────────┐       ┌──────────────────┐
│ Root AGENTS.md      │        │ packages/web/        │       │ @docs/arch.md    │
│ • Structure         │  ───►  │   AGENTS.md          │ ───►  │ @docs/api.md     │
│ • Package Overview  │        │ • Local conventions  │       │ @docs/auth.md    │
│ • Subproject Routes │        │ • Context Loading    │       │                  │
└─────────────────────┘        └─────────────────────┘       └──────────────────┘
```

---

## What You Get

```
your-project/
├── AGENTS.md                    # Layer 1: Always loaded (~80 lines)
└── docs/
    ├── architecture.md          # System overview, layers, diagrams
    ├── data-model.md            # Schema, ERD, relationships
    ├── api.md                   # API surface / server actions catalog
    ├── auth.md                  # Auth flows, middleware, roles
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
| [decisions/adr.md](./templates/docs/decisions/adr.md) | Architecture Decision Record template |

---

## Setup

### 1. Manual Setup (Simple)

1. Copy the right AGENTS.md template to your project root
2. Fill in the placeholders (stack, commands, structure, conventions)
3. Create `docs/` with the reference doc templates that apply
4. Fill in docs with your project's current state
5. Done!

### 2. Interactive Bootstrap (Smart)

Ask your AI agent to "bootstrap AGENTS.md" following the [Bootstrap Workflow](./bootstrap-workflow.md).

The AI will:
1. Detect if single-app or monorepo
2. Scan project structure
3. Auto-detect commands and tech stack
4. Generate `AGENTS.md` + initial `docs/` files

---

## Reference Docs: What to Include

Not every project needs every doc. Start with what exists, add as needed:

| Doc | Include When | Update When |
|-----|-------------|-------------|
| `architecture.md` | Always (even if simple) | Architecture changes |
| `data-model.md` | Project has a database | Schema changes |
| `api.md` | Project has an API / server actions | New endpoints or actions |
| `auth.md` | Project has authentication | Auth flow changes |
| `decisions/NNN-*.md` | Significant technical decision made | Never (permanent record) |

### Doc Freshness Rules

Docs are **evergreen** — always current or deleted. Never stale.

| Rule | Why |
|------|-----|
| Update docs in the same PR as code changes | Prevents drift |
| Delete docs for removed features | No dead references |
| ADRs are permanent | Record of reasoning, even if decision is later reversed |
| Review docs quarterly | Catch gradual drift |

### Cross-Reference Convention

Docs reference each other and skills using a standard format:

| Referencing | Format | Example |
|-------------|--------|---------|
| A doc file | `@docs/<path>` | `@docs/architecture.md` |
| A skill | `load skill \`<name>\`` | `load skill \`database\`` |
| An ADR | `@docs/decisions/<NNN>-<name>.md` | `@docs/decisions/001-server-first.md` |

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
