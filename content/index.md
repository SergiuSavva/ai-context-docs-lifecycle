# AI Context Docs Lifecycle

> Knowledge-first methodology kit for AI-assisted development

---

## What Is This?

**AI Context Docs Lifecycle** is a knowledge-first methodology kit for AI-assisted development. It gives AI coding assistants structured context and workflows for understanding your project and building features consistently.

Pick the modules you need:

| # | Module | Purpose |
|---|--------|---------|
| 1 | **Project Context** | AGENTS.md + docs/ + .agents/skills/ |
| 2 | **Feature Development** | Workflows for building features |
| 3 | **Project Planning** | Multi-feature management (optional) |

---

## The Problem

AI coding assistants have a memory problem:

- **No Memory** — Every conversation starts from zero. You explain the same things repeatedly.
- **Generic Code** — Without project context, AI generates boilerplate that doesn't fit your style.
- **Contradictory Advice** — Unaware of past decisions, AI suggests conflicting patterns.

---

## The Solution

**Documentation as AI memory** — encode your patterns once, every session follows them.

| Without This Kit | With This Kit |
|------------------|---------------|
| Re-explain patterns every session | AI reads context automatically |
| Generic suggestions | Suggestions match your stack |
| Conflicting recommendations | Decisions preserved in ADRs |
| No structured workflow | Three workflow tracks |

---

## AI Agent Workflow (Default)

For feature work, agents should follow this order:

1. Read `AGENTS.md` for project constraints and routing.
2. Read current feature docs in `specs/<feature>/` (`spec.md` + `tasks.md` minimum).
3. Load only relevant skills from `.agents/skills/`.
4. Pull targeted reference docs from `docs/` when implementation needs them.
5. Implement, then update reference docs and add an ADR for significant decisions.

---

## Quick Start

> **Solo side project or new to ACDL?** [Quick Start →](quick-start.md) covers the minimum useful setup in three steps.

### Fastest Path

```bash
npx @acdl/cli init
```

Then tell your AI assistant:

```text
Bootstrap AGENTS.md for this project.
load skill `acdl`
```

This installs methodology skills/templates directly into your project. The `acdl` skill scans your repo, generates `AGENTS.md`, and creates only the `docs/` files your project actually needs. Nothing more.

See [Quick Start](quick-start.md) for the full progressive path, manual setup, and how to add feature workflows when you need them.

[Get Started](quick-start.md){ .md-button .md-button--primary }
[View Modules](modules/README.md){ .md-button }

---

## Three Workflow Tracks

Module 2 provides structured workflows based on what you're building:

### Quick Flow

**For**: Bug fixes, typos, config changes

No templates needed. Just fix and commit.

### Standard Flow

**For**: Any feature that is not a bug fix

Feature spec + task tracking.

### Complex Flow

**For**: New systems, external integrations, or research-heavy work

Research, spec, tasks, ADR.

---

## Tool Agnostic

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

## Examples

See complete walkthroughs in the repository:

- [**Simple Todo Feature**](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/02-feature-development/examples/simple-todo/) — Standard Flow example
- [**OAuth Authentication**](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/02-feature-development/examples/complex-auth/) — Complex Flow example

[View All Modules](modules/README.md){ .md-button }
