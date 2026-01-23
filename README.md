# AI Context Docs Lifecycle

> **Modular workflows for AI-assisted software development**

🌐 **Live Site:** [https://sergiusavva.github.io/ai-context-docs-lifecycle](https://sergiusavva.github.io/ai-context-docs-lifecycle)

---

## What is This?

A modular toolkit that gives AI coding assistants structured workflows for understanding your project and building features consistently.

### The Problem

AI coding assistants lack memory and context:
- Generic, inconsistent code
- Constant re-explaining
- No structured workflow

### The Solution

**Pick the modules you need:**

| Module | Purpose | Time |
|--------|---------|------|
| **1. Quick Start** | Minimal AI context (AGENTS.md) | 5 min |
| **2. Coding Standards** | Code & doc style rules | 10 min |
| **3. Feature Development** | Workflows for building features | 15 min |
| **4. Reference Docs** | Documentation structure | 20 min |
| **5. Project Planning** | Multi-feature management | 15 min |

---

## Quick Start

### 5-Minute Setup (Module 1)

1. Copy [`content/modules/01-quick-start/templates/AGENTS.md`](content/modules/01-quick-start/templates/AGENTS.md) to your project root
2. Fill in your project details
3. Done! AI agents now have context.

### Full Setup

Tell your AI assistant:

```
Apply AI Context Docs Lifecycle from https://github.com/sergiusavva/ai-context-docs-lifecycle

I want:
- Module 1 (Quick Start) - AGENTS.md
- Module 3 (Feature Development) - workflows for building features

My tech stack: [YOUR STACK]
```

---

## Repository Structure

```
ai-context-docs-lifecycle/
├── content/
│   ├── modules/              # 5 independent modules
│   │   ├── 01-quick-start/
│   │   ├── 02-coding-standards/
│   │   ├── 03-feature-development/
│   │   ├── 04-reference-docs/
│   │   └── 05-project-planning/
│   └── guides/               # Adoption guides
│       ├── getting-started.md
│       ├── new-project.md
│       └── existing-project.md
├── site/                     # Documentation website
├── METHODOLOGY.md            # Full methodology explanation
└── README.md                 # This file
```

---

## Module Overview

### Module 1: Quick Start

**What you get**: `AGENTS.md` - AI context file

```
project/
└── AGENTS.md    # Quick start, tech stack, patterns
```

[Go to Module 1 →](content/modules/01-quick-start/)

### Module 2: Coding Standards

**What you get**: `.cursor/rules/` with code and doc style rules

```
project/
└── .cursor/rules/
    ├── code-style.mdc
    └── doc-style.mdc
```

[Go to Module 2 →](content/modules/02-coding-standards/)

### Module 3: Feature Development (Core)

**What you get**: Three-phase workflow + templates for building features

```
Research → Plan → Implement
```

| Situation | Docs Needed |
|-----------|-------------|
| **Bug fix** | None |
| **Feature** | `spec.md` + `tasks.md` (minimum) |
| **Complex** | All docs + ADR |

```
project/
├── specs/[feature]/
│   ├── spec.md
│   └── tasks.md
└── decisions/
    └── NNN-[decision].md
```

[Go to Module 3 →](content/modules/03-feature-development/)

### Module 4: Reference Docs

**What you get**: Documentation structure + freshness rules

```
project/
├── AGENTS.md              # Full version
├── docs/
│   ├── INDEX.md
│   ├── features/
│   └── decisions/         # ADRs
└── .cursor/rules/
    └── reference-freshness.mdc
```

[Go to Module 4 →](content/modules/04-reference-docs/)

### Module 5: Project Planning (Optional)

**What you get**: Multi-feature management

```
project/
└── docs/
    ├── PROJECT-PRD.md
    ├── BACKLOG.md
    ├── ROADMAP.md
    └── TASKS.md
```

[Go to Module 5 →](content/modules/05-project-planning/)

---

## Key Concepts

### Three Document Types

| Type | Lifecycle | Example |
|------|-----------|---------|
| **Specs** | Ephemeral (delete after) | spec.md, tasks.md |
| **Reference** | Evergreen (always current) | AGENTS.md, feature README |
| **Decisions** | Permanent (never change) | ADRs |

### Core Rule: Update or Delete

Stale documentation is worse than no documentation. Reference docs are either current or deleted.

### AI Agent Workflow

Three phases: **Research → Plan → Implement**

1. **Research** (optional): Explore unknowns, evaluate options
2. **Plan** (required): Create `spec.md` + `tasks.md`, validate with user
3. **Implement**: Execute tasks, update progress, signal completion

AI decides which optional docs (`research.md`, `design.md`, `plan.md`) are needed.

---

## Examples

See complete walkthroughs:

- [Simple Todo Feature](content/modules/03-feature-development/examples/simple-todo/) - Standard Flow
- [OAuth Authentication](content/modules/03-feature-development/examples/complex-auth/) - Complex Flow

---

## Development

### Local Development

```bash
cd site
npm install
npm run dev
# Open http://localhost:4321
```

### Build

```bash
cd site
npm run build
```

---

## Tool Agnostic

Works with any AI tool:

| Tool | Configuration |
|------|---------------|
| **Cursor** | `.cursor/rules/*.mdc` |
| **Claude Code** | `CLAUDE.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Any AI** | Standard `.md` files |

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
