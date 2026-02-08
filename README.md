# AI Context Docs Lifecycle

> **Docs-first methodology kit for AI-assisted development**

**Live Site:** [https://sergiusavva.github.io/ai-context-docs-lifecycle](https://sergiusavva.github.io/ai-context-docs-lifecycle)

---

## What is This?

AI Context Docs Lifecycle is a docs-first methodology kit for AI-assisted development. It gives AI coding assistants structured context and workflows for understanding your project and building features consistently.

### The Problem

AI coding assistants lack memory and context:
- Generic, inconsistent code
- Constant re-explaining
- No structured workflow

### The Solution

**Pick the modules you need:**

| Module | Purpose |
|--------|---------|
| **1. Project Context** | AGENTS.md + docs/ (always-loaded context + reference) |
| **2. Skills** | On-demand instruction packages (.agents/skills/) |
| **3. Feature Development** | Workflows for building features (specs/) |
| **4. Project Planning** | Multi-feature management (optional) |

---

## Quick Start

### Manual Setup (Module 1)

1. Copy [`content/modules/01-project-context/templates/AGENTS-single-app.md`](content/modules/01-project-context/templates/AGENTS-single-app.md) to your project root as `AGENTS.md`
2. Create `docs/` with reference doc templates from [`content/modules/01-project-context/templates/docs/`](content/modules/01-project-context/templates/docs/)
3. Fill in your project details
4. Done! AI agents now have context.

### Interactive Bootstrap (Module 1)

Tell your AI assistant:

```
Bootstrap AGENTS.md for this project.
Follow: https://raw.githubusercontent.com/sergiusavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/bootstrap-workflow.md
```

This runs a comprehensive analysis and generates `AGENTS.md` with detected tech stack, commands, and structure.

### Full Setup

Tell your AI assistant:

```
Apply AI Context Docs Lifecycle from https://github.com/sergiusavva/ai-context-docs-lifecycle

I want:
- Module 1 (Project Context) - AGENTS.md + docs/
- Module 2 (Skills) - on-demand coding patterns
- Module 3 (Feature Development) - workflows for building features

My tech stack: [YOUR STACK]
```

---

## Repository Structure

```
ai-context-docs-lifecycle/
├── content/
│   ├── modules/              # 4 independent modules
│   │   ├── 01-project-context/    # AGENTS.md + docs/ + demo example
│   │   ├── 02-skills/             # SKILL.md template + guide
│   │   ├── 03-feature-development/# Workflows, templates, examples
│   │   └── 04-project-planning/   # PRD, backlog, roadmap (optional)
│   └── guides/               # Adoption guides
│       ├── getting-started.md
│       ├── new-project.md
│       └── existing-project.md
├── specs/                    # Active feature specs (this repo)
├── docs/                     # Reference documentation (this repo)
└── README.md                 # This file
```

---

## Module Overview

### Module 1: Project Context

**What you get**: `AGENTS.md` (~80 lines, always loaded) + `docs/` (on-demand reference)

```
project/
├── AGENTS.md              # Layer 1: Always loaded
└── docs/                  # Layer 3: On-demand reference
    ├── architecture.md
    ├── data-model.md
    ├── api.md
    └── decisions/
```

[Go to Module 1 →](content/modules/01-project-context/)

### Module 2: Skills

**What you get**: `.agents/skills/` with on-demand instruction packages

```
project/
└── .agents/skills/        # Layer 2: Loaded when task matches
    ├── database/SKILL.md
    ├── testing/SKILL.md
    └── ui-components/SKILL.md
```

[Go to Module 2 →](content/modules/02-skills/)

### Module 3: Feature Development

**What you get**: Three-phase workflow + templates for building features

```
Research → Plan → Implement
```

| Situation | Docs Needed |
|-----------|-------------|
| **Bug fix** | None |
| **Feature** | `spec.md` + `tasks.md` (minimum) |
| **Complex** | All docs + ADR |

[Go to Module 3 →](content/modules/03-feature-development/)

### Module 4: Project Planning (Optional)

**What you get**: Multi-feature management

```
project/
├── PROJECT-PRD.md     # Project vision
├── BACKLOG.md         # Feature priorities
├── ROADMAP.md         # Phase planning
└── TASKS.md           # Global progress
```

[Go to Module 4 →](content/modules/04-project-planning/)

---

## Key Concepts

### Three Document Types

| Type | Lifecycle | Example |
|------|-----------|---------|
| **Specs** | Ephemeral (delete after) | spec.md, tasks.md |
| **Reference** | Evergreen (always current) | AGENTS.md, docs/ |
| **Decisions** | Permanent (never change) | ADRs |

### Progressive Disclosure

AGENTS.md is always loaded (~700 tokens). Skills and docs load on-demand when the task requires them. Minimal context upfront, deep knowledge available when needed.

### Core Rule: Update or Delete

Stale documentation is worse than no documentation. Reference docs are either current or deleted.

---

## AI Agent Workflow (Default)

For non-trivial feature work, run this sequence:

1. Read `AGENTS.md` for constraints, stack, and routing.
2. Create or open `specs/<feature>/spec.md` and `specs/<feature>/tasks.md`.
3. Load only relevant skills from `.agents/skills/` when the task matches.
4. Pull targeted references from `docs/` as implementation requires.
5. Ship code, update affected reference docs, and add an ADR for significant decisions.

---

## Examples

See complete walkthroughs:

- [Demo: AGENTS.md + Skills + Docs](content/modules/01-project-context/examples/demo-taskflow/) — Full three-layer example
- [Simple Todo Feature](content/modules/03-feature-development/examples/simple-todo/) — Standard Flow
- [OAuth Authentication](content/modules/03-feature-development/examples/complex-auth/) — Complex Flow

---

## Tool Compatibility

Works with every AI coding agent:

| Agent | AGENTS.md | Skills | @docs/ refs |
|-------|-----------|--------|-------------|
| **Cursor** | Auto-reads | `@skill-name` | `@docs/file.md` |
| **Claude Code** | `CLAUDE.md` symlink | `/skill-name` | Direct read |
| **GitHub Copilot** | Auto-reads | Auto-discovered | Direct read |
| **Cline** | Via `.clinerules` | Auto-discovered | Direct read |
| **OpenCode** | Auto-reads | Via `skill` tool | Direct read |
| **Windsurf** | Auto-reads | Via UI | Direct read |
| **Aider** | Via `/read` | Not supported | Via `/read` |

**Zero tool-specific files required.** Optional bridges available (e.g., `.mdc` rules that point to skills).

---

## Contributing

Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

---

## Inspired By

This methodology draws from several Spec-Driven Development (SDD) approaches:

| Project | Inspiration |
|---------|-------------|
| [Spec-Kit](https://github.com/github/spec-kit) | Structured spec workflow, Constitution concept |
| [cc-sdd](https://github.com/ultrawideturbodev/cc-sdd) | Kiro-style SDD, EARS requirements format |
| [Spec-Flow](https://github.com/ChrisLally/Spec-Flow) | Work sizing, quality gates |
| [OpenSpec](https://github.com/openspec-ai/openspec) | Delta format for changes |

---

## License

MIT License — Use freely in your projects.
