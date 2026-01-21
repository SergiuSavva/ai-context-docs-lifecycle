# AI Context Docs Lifecycle

> Modular workflows for AI-assisted software development

---

## What Is This?

**AI Context Docs Lifecycle** is a modular toolkit that gives AI coding assistants structured workflows for understanding your project and building features consistently.

Pick the modules you need:

| # | Module | Purpose | Time |
|---|--------|---------|------|
| 1 | **Quick Start** | Minimal AI context (AGENTS.md) | 5 min |
| 2 | **Coding Standards** | Code and doc style rules | 10 min |
| 3 | **Feature Development** | Workflows for building features | 15 min |
| 4 | **Reference Docs** | Documentation structure | 20 min |
| 5 | **Project Planning** | Multi-feature management | 15 min |

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

## Quick Start

### 5-Minute Setup (Module 1)

Copy `AGENTS.md` to your project root and fill in your project details. Done!

```
Apply AI Context Docs Lifecycle from https://github.com/SergiuSavva/ai-context-docs-lifecycle

I want Module 1 (Quick Start) - just AGENTS.md for now.
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

**For**: Small features (less than 5 files)

Feature spec + task tracking.

### Complex Flow

**For**: Large features, new systems

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
