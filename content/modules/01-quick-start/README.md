# Module 1: Quick Start

> **5-minute setup** to give AI agents instant context about your project.

---

## What This Module Does

Provides a minimal `AGENTS.md` file that AI coding assistants read first to understand your project.

## Two Ways to Use

### 1. Manual Setup (Simple)
Copy `templates/AGENTS.md` to your project root and fill it in.

### 2. Interactive Bootstrap (Smart)
Ask your AI agent to "bootstrap AGENTS.md" following the [Bootstrap Workflow](./bootstrap-workflow.md).

The AI will:
1. Scan your project structure
2. Auto-detect commands and tech stack
3. Generate a concise `AGENTS.md`
4. Create detailed reference docs if your project is complex

---

## When to Use

- Starting a new project
- Adding AI context to existing project
- Want the simplest possible setup

## What You Get

**Simple Project**:
```
your-project/
└── AGENTS.md          # AI reads this first
```

**Complex Project** (via Bootstrap Workflow):
```
your-project/
├── AGENTS.md          # Concise overview
└── docs/
    ├── architecture.md
    └── components.md
```

## Setup (5 minutes)

### Option A: Manual Setup

1. Copy [`templates/AGENTS.md`](./templates/AGENTS.md) to your project root
2. Fill in Quick Start, Tech Stack, and Overview
3. Done!

### Option B: Interactive Bootstrap

Tell your AI agent:

> "Read content/modules/01-quick-start/bootstrap-workflow.md and bootstrap AGENTS.md for this project."

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

- [`templates/AGENTS.md`](./templates/AGENTS.md) - Main context file
- [`templates/docs/`](./templates/docs/) - Detailed reference templates
