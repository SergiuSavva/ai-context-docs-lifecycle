# AI Context Docs Lifecycle

> Docs-first methodology kit for AI-assisted development

---

## What Is This?

**AI Context Docs Lifecycle** is a docs-first methodology kit for AI-assisted development. It gives AI coding assistants structured context and workflows for understanding your project and building features consistently.

Pick the modules you need:

| # | Module | Purpose |
|---|--------|---------|
| 1 | **Project Context** | AGENTS.md + docs/ (always-loaded context + reference) |
| 2 | **Skills** | On-demand instruction packages (.agents/skills/) |
| 3 | **Feature Development** | Workflows for building features |
| 4 | **Project Planning** | Multi-feature management (optional) |

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

### Quick Setup (Module 1)

Copy `AGENTS.md` to your project root and fill in your project details. Done!

```
Apply AI Context Docs Lifecycle from https://github.com/SergiuSavva/ai-context-docs-lifecycle

I want Module 1 (Project Context) - AGENTS.md + docs/ only for now.
My tech stack: [YOUR STACK]
```

[Get Started](quick-start.md){ .md-button .md-button--primary }
[View Modules](modules/README.md){ .md-button }

---

## Three Workflow Tracks

Module 3 provides structured workflows based on what you're building:

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

Works with any AI tool:

| Tool | Configuration |
|------|---------------|
| **Cursor** | `.cursor/rules/*.mdc` |
| **Claude Code** | `CLAUDE.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Any LLM** | Standard Markdown files |

---

## Examples

See complete walkthroughs in the repository:

- **Simple Todo Feature** — Standard Flow example
- **OAuth Authentication** — Complex Flow example

[View All Modules](modules/README.md){ .md-button }
