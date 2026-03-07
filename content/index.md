# AI Context Docs Lifecycle

> Docs-first methodology kit for AI-assisted development

---

## What Is This?

**AI Context Docs Lifecycle** is a docs-first methodology kit for AI-assisted development. It gives AI coding assistants structured context and workflows for understanding your project and building features consistently.

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

### CLI Setup (Recommended)

From your project root:

```bash
npx @acdl/cli init
```

Then tell your AI assistant:

```text
Bootstrap AGENTS.md for this project.
load skill `acdl`
```

This installs methodology skills/templates into your project and lets the AI generate project-specific context files from `.agents/skills/acdl/`.

If the installed assets already exist:

```bash
npx @acdl/cli init --force
```

### Manual Setup (Module 1)

1. Copy the [`AGENTS-single-app.md`](https://github.com/SergiuSavva/ai-context-docs-lifecycle/blob/main/content/modules/01-project-context/skills/acdl/templates/AGENTS-single-app.md) template to your project root as `AGENTS.md`
2. Create `docs/` with reference doc templates from [`skills/acdl/templates/docs/`](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/01-project-context/skills/acdl/templates/docs/)
3. Fill in your project details
4. Done! AI agents now have context.

### Interactive Bootstrap (Module 1)

Tell your AI assistant:

```
Bootstrap AGENTS.md for this project.
load skill `acdl`
```

This runs a comprehensive analysis and generates `AGENTS.md` with detected tech stack, commands, and structure.

If your tool cannot load skills by name, point it to the installed skill file:

```text
Bootstrap AGENTS.md for this project.
Follow: .agents/skills/acdl/SKILL.md
```

If you are not using the CLI, use the remote skill URL instead:

```
Bootstrap AGENTS.md for this project.
Follow: https://raw.githubusercontent.com/sergiusavva/ai-context-docs-lifecycle/main/content/modules/01-project-context/skills/acdl/SKILL.md
```

### Full Setup

Tell your AI assistant:

```
Apply AI Context Docs Lifecycle from https://github.com/sergiusavva/ai-context-docs-lifecycle

I want:
- Module 1 (Project Context) - AGENTS.md + docs/ + skills
- Module 2 (Feature Development) - workflows for building features

My tech stack: [YOUR STACK]
```

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
