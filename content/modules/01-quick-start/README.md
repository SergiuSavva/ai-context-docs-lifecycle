# Module 1: Quick Start

> **5-minute setup** to give AI agents instant context about your project.

---

## What This Module Does

Provides a compact `AGENTS.md` file that AI coding assistants read first to understand your project. Uses the **router pattern** - a lean file (~50-70 lines) that references detailed docs dynamically.

**Why the router pattern?**
- Token efficiency: Load only relevant context
- Better responses: Less noise = more accurate AI output
- Scalable: Works for single apps and monorepos

---

## Choose Your Template

| Template | Use When |
|----------|----------|
| [Single App](./templates/AGENTS-single-app.md) | Standard apps, libraries, CLIs |
| [Monorepo Root](./templates/AGENTS-monorepo-root.md) | Monorepo root (routes to subprojects) |
| [Monorepo Subproject](./templates/AGENTS-monorepo-subproject.md) | Each package/service in monorepo |

### Single App Structure

```
my-app/
├── AGENTS.md              # Full context (single-app template)
└── docs/
    ├── architecture.md
    └── components.md
```

### Monorepo Structure

```
monorepo/
├── AGENTS.md                    # Router (monorepo-root template)
├── packages/
│   ├── web/
│   │   └── AGENTS.md           # Web context (subproject template)
│   ├── api/
│   │   └── AGENTS.md           # API context (subproject template)
│   └── shared/
│       └── AGENTS.md           # Shared libs (subproject template)
└── services/
    ├── auth-lambda/
    │   └── AGENTS.md           # Lambda context (subproject template)
    └── email-worker/
        └── AGENTS.md           # Worker context (subproject template)
```

---

## Two Ways to Use

### 1. Manual Setup (Simple)

1. Choose the right template (single-app or monorepo)
2. Copy to your project root as `AGENTS.md`
3. Fill in the placeholders
4. Done!

### 2. Interactive Bootstrap (Smart)

Ask your AI agent to "bootstrap AGENTS.md" following the [Bootstrap Workflow](./bootstrap-workflow.md).

The AI will:
1. Detect if single-app or monorepo
2. Scan project structure
3. Auto-detect commands and tech stack
4. Generate appropriate `AGENTS.md` file(s)

---

## Setup Steps

### Single App (5 minutes)

1. Copy [`templates/AGENTS-single-app.md`](./templates/AGENTS-single-app.md) to project root as `AGENTS.md`
2. Fill in Overview, Stack, Commands
3. Add references to your docs in "Context Loading" section
4. Done!

### Monorepo (10-15 minutes)

1. Copy [`templates/AGENTS-monorepo-root.md`](./templates/AGENTS-monorepo-root.md) to monorepo root as `AGENTS.md`
2. Fill in structure and subproject routing table
3. For each package/service:
   - Copy [`templates/AGENTS-monorepo-subproject.md`](./templates/AGENTS-monorepo-subproject.md)
   - Place as `packages/[name]/AGENTS.md` or `services/[name]/AGENTS.md`
   - Fill in package-specific details
4. Done!

---

## What's Next?

Once you have Quick Start working, consider adding:

| Module | When to Add |
|--------|-------------|
| [Module 2: Coding Standards](../02-coding-standards/) | When you want consistent code style |
| [Module 3: Feature Development](../03-feature-development/) | When building features with specs + tasks |
| [Module 4: Reference Docs](../04-reference-docs/) | When you need comprehensive documentation |

---

## Templates

### AGENTS.md Templates

| Template | Lines | Use Case |
|----------|-------|----------|
| [`AGENTS-single-app.md`](./templates/AGENTS-single-app.md) | ~75 | Standard apps, libraries |
| [`AGENTS-monorepo-root.md`](./templates/AGENTS-monorepo-root.md) | ~70 | Monorepo root router |
| [`AGENTS-monorepo-subproject.md`](./templates/AGENTS-monorepo-subproject.md) | ~90 | Each package/service |

### Supporting Templates

- [`templates/docs/`](./templates/docs/) - Detailed reference doc templates

---

## Learn More

- [AGENTS.md Best Practices](../../guides/agents-md-best-practices.md) - Research-backed writing guide
- [Tool Compatibility](../../guides/tool-compatibility.md) - Setup for Cursor, Claude Code, Copilot
