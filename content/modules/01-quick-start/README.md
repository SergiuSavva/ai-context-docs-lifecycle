# Module 1: Core Init

> **Comprehensive initialization** to give AI agents complete context about your project.

---

## The Problem

AI coding assistants have no memory. Every session starts fresh, leading to:
- Generic code that doesn't match your patterns
- Repeated explanations of your tech stack
- Suggestions that conflict with past decisions

**The solution**: Give AI a context file it reads first.

---

## What This Module Does

Provides a compact `AGENTS.md` file that AI coding assistants read first to understand your project, plus a `docs/` folder for deeper reference. Uses the **router pattern** - a lean file (50-80 lines, 150 max) that references detailed docs dynamically.

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

### Single App

1. Copy [`templates/AGENTS-single-app.md`](./templates/AGENTS-single-app.md) to project root as `AGENTS.md`
2. Copy `templates/.acdl/` folder to project root
3. Fill in Overview, Stack, Commands
4. Add references to your docs in "Context Loading" section
5. Done!

### Monorepo

1. Copy [`templates/AGENTS-monorepo-root.md`](./templates/AGENTS-monorepo-root.md) to monorepo root as `AGENTS.md`
2. Copy `templates/.acdl/` folder to monorepo root
3. Fill in structure and subproject routing table
4. For each package/service:
   - Copy [`templates/AGENTS-monorepo-subproject.md`](./templates/AGENTS-monorepo-subproject.md)
   - Place as `packages/[name]/AGENTS.md` or `services/[name]/AGENTS.md`
   - Fill in package-specific details
5. Done!

---

## What's Next?

Once you have Core Init working, consider adding more modules. Here's how to know when:

| Signal | What It Means | Add Module |
|--------|---------------|------------|
| AGENTS.md exceeds 150 lines | Too much inline content | Split into reference docs |
| Repeating style guidance to AI | No persistent standards | [Module 2: Coding Standards](../02-coding-standards/README.md) |
| Building features > 3 files | Need structured workflow | [Module 3: Feature Development](../03-feature-development/README.md) |
| Onboarding new contributors | Need comprehensive docs | [Module 4: Reference Docs](../04-reference-docs/README.md) |

**Rule of thumb**: If you're explaining the same thing to AI twice, it belongs in a rule or doc.

---

## Templates

### AGENTS.md Templates

| Template | Lines | Use Case |
|----------|-------|----------|
| [`AGENTS-single-app.md`](./templates/AGENTS-single-app.md) | ~75 | Standard apps, libraries |
| [`AGENTS-monorepo-root.md`](./templates/AGENTS-monorepo-root.md) | ~70 | Monorepo root router |
| [`AGENTS-monorepo-subproject.md`](./templates/AGENTS-monorepo-subproject.md) | ~90 | Each package/service |

### Supporting Templates

- `templates/docs/` - Detailed reference doc templates (see [api.md](./templates/docs/api.md), [architecture.md](./templates/docs/architecture.md), [components.md](./templates/docs/components.md))

---

## Learn More

- [AGENTS.md Best Practices](../../guides/agents-md-best-practices.md) - Research-backed writing guide
- [Tool Compatibility](../../guides/tool-compatibility.md) - Setup for Cursor, Claude Code, Copilot
- **Example**: This project's `AGENTS.md` at repo root - See the router pattern in action