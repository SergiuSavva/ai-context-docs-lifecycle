# AI Context Docs Lifecycle

> **Knowledge-first methodology kit for AI-assisted development**

**Live Site:** [https://sergiusavva.github.io/ai-context-docs-lifecycle](https://sergiusavva.github.io/ai-context-docs-lifecycle)

---

## What is This?

Most AI development tools are **spec-driven** — specs go in, code comes out, and project knowledge evaporates when the feature ships.

ACDL is **knowledge-first**. It treats documentation as structured project knowledge that compounds with every feature and outlives any single AI tool. Not scaffolding you discard — the persistent memory that makes every session smarter than the last.

### The Problem

AI coding assistants have no lasting knowledge of your project:

- Every session starts from zero — constant re-explaining
- Generic, inconsistent code that ignores your patterns
- Specs drive one feature but nothing carries forward

### The Solution

**Structured knowledge with three lifecycles:**


| Knowledge type | Lifecycle                              | Purpose                         |
| -------------- | -------------------------------------- | ------------------------------- |
| **Specs**      | Ephemeral — delete after feature ships | Drive the current feature       |
| **Reference**  | Evergreen — always current or deleted  | Carry project knowledge forward |
| **Decisions**  | Permanent — never rewritten            | Record the *why* behind choices |


**Pick the modules you need:**


| Module                     | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| **1. Project Context**     | AGENTS.md + docs/ + .agents/skills/      |
| **2. Feature Development** | Workflows for building features (specs/) |
| **3. Project Planning**    | Multi-feature management (optional)      |


### Why Not Existing SDD Tools?

Spec-Driven Development (SDD) tools like [GSD](https://github.com/gsd-build/get-shit-done), [BMAD Method](https://docs.bmad-method.org), [Spec Kit](https://github.com/github/spec-kit), and [cc-sdd](https://github.com/gotalab/cc-sdd) solve the same root problem — AI agents produce inconsistent code without structured context. But they introduce new constraints:


| Limitation                                                                       | Tools affected                                                       | ACDL approach                                                                              |
| -------------------------------------------------------------------------------- | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------ |
| **Agent lock-in** — installs commands/prompts for one or two agents              | GSD (Claude), BMAD (Claude/Cursor), cc-sdd, Spec Kit                 | Pure markdown. Works with every agent that can read files.                                 |
| **All-or-nothing** — full system required to get value                           | GSD, BMAD, cc-sdd                                                    | Three independent modules. Adopt `AGENTS.md` alone or add features/planning as needed.     |
| **Runtime dependency** — requires `npx`, Node.js, or Python to function          | GSD, BMAD, cc-sdd, Spec Kit                                          | Zero runtime. The methodology *is* the files. CLI is optional convenience.                 |
| **Heavy process** — sprint ceremonies, agent personas, multi-agent orchestration | BMAD (5 personas, sprints), GSD (wave orchestration, state machines) | Minimal process. One workflow, four phases, plain checklists.                              |
| **No memory model** — specs drive code but nothing persists across features      | Spec Kit, cc-sdd                                                     | Three document lifecycles: ephemeral specs, evergreen reference docs, permanent decisions. |
| **Context bloat** — loads everything upfront                                     | GSD (PROJECT.md + STATE.md + ROADMAP.md always loaded)               | Progressive disclosure: ~700 tokens always loaded, rest on-demand via skills and docs.     |


Other tools are spec-driven: specs in, code out, knowledge discarded. ACDL is knowledge-first: structured project knowledge that compounds across features, persists across sessions, and moves with you to any AI agent.

---

## Quick Start

> **Solo side project or new to ACDL?** [Quick Start guide →](content/quick-start.md) walks you through the minimum useful setup in three steps.

### Fastest Path

```bash
npx @acdl/cli init          # installs skills and templates into .agents/skills/
```

Then tell your AI assistant:

```text
Bootstrap AGENTS.md for this project.
load skill `acdl`
```

That's it. The `acdl` skill scans your project, generates `AGENTS.md` and only the `docs/` files your project needs, and stops there. No ceremony.

### Manual Setup (no CLI)

1. Copy [AGENTS-single-app.md](content/modules/01-project-context/skills/acdl/templates/AGENTS-single-app.md) to your project root as `AGENTS.md`
2. Fill in your stack, commands, and structure
3. Add `docs/scripts.md` for runnable commands (optional but recommended)
4. Done. AI agents now have context.

### Add More When You Need It

Once you're building real features, add Module 2:

```bash
npx @acdl/cli init --modules 2
```

Then tell your AI: `load skill \`feature-workflow\``

See [Quick Start](content/quick-start.md) for the full progressive path.

---

## Repository Structure

```
ai-context-docs-lifecycle/
├── content/
│   ├── methodology.md        # Full methodology explanation
│   ├── modules/              # 3 independent modules
│   │   ├── README.md              # Module overview + adoption path
│   │   ├── 01-project-context/    # AGENTS.md + docs/ + skills + templates
│   │   ├── 02-feature-development/# Workflows, templates, examples
│   │   └── 03-project-planning/   # PRD, backlog, roadmap (optional)
│   └── guides/               # Adoption guides
│       ├── getting-started.md
│       ├── new-project.md
│       ├── existing-project.md
│       ├── tool-compatibility.md
│       ├── skills-catalog.md
│       └── ...
├── packages/cli/             # acdl CLI tool
├── specs/                    # Active feature specs (this repo)
├── docs/                     # Reference documentation (this repo)
└── README.md                 # This file
```

---

## Module Overview

### Module 1: Project Context

**What you get**: `AGENTS.md` (~80 lines, always loaded) + `docs/` (on-demand reference) + `.agents/skills/` (on-demand instruction packages)

```
project/
├── AGENTS.md              # Discovery: Always loaded
├── docs/                  # Activation: On-demand reference
│   ├── {relevant docs}.md
│   ├── scripts.md         # Execution: Loaded before running commands
│   └── decisions/
└── .agents/skills/        # Activation: Loaded when task matches
    ├── {methodology}/SKILL.md
    └── {stack}/SKILL.md
```

Three adoption tiers: Basic (`AGENTS.md` only), Standard (+ `docs/`), Full (+ `.agents/skills/`). For a solo side project, Standard tier is the recommended starting point.

[Go to Module 1 →](content/modules/01-project-context/)

### Module 2: Feature Development

**What you get**: Structured workflow + templates for building features

```
Research → Plan → Implement → Verify
```


| Situation   | Docs Needed                      |
| ----------- | -------------------------------- |
| **Bug fix** | None                             |
| **Feature** | `spec.md` + `tasks.md` (minimum) |
| **Complex** | All docs + ADR                   |


[Go to Module 2 →](content/modules/02-feature-development/)

### Module 3: Project Planning (Optional)

**What you get**: Multi-feature management

```
project/
├── PROJECT-PRD.md     # Project vision
├── BACKLOG.md         # Feature priorities
├── ROADMAP.md         # Phase planning
└── TASKS.md           # Global progress
```

[Go to Module 3 →](content/modules/03-project-planning/)

---

## Key Concepts

### Three Document Types


| Type          | Lifecycle                  | Example           |
| ------------- | -------------------------- | ----------------- |
| **Specs**     | Ephemeral (delete after)   | spec.md, tasks.md |
| **Reference** | Evergreen (always current) | AGENTS.md, docs/  |
| **Decisions** | Permanent (never change)   | ADRs              |


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

- [Simple Todo Feature](content/modules/02-feature-development/examples/simple-todo/) — Standard Flow
- [OAuth Authentication](content/modules/02-feature-development/examples/complex-auth/) — Complex Flow

---

## Tool Compatibility

Works with every AI coding agent:


| Agent              | AGENTS.md           | Skills           | @docs/ refs     |
| ------------------ | ------------------- | ---------------- | --------------- |
| **Cursor**         | Auto-reads          | `@skill-name`    | `@docs/file.md` |
| **Claude Code**    | `CLAUDE.md` symlink | `/skill-name`    | Direct read     |
| **GitHub Copilot** | Auto-reads          | Auto-discovered  | Direct read     |
| **Cline**          | Via `.clinerules`   | Auto-discovered  | Direct read     |
| **OpenCode**       | Auto-reads          | Via `skill` tool | Direct read     |
| **Windsurf**       | Auto-reads          | Via UI           | Direct read     |
| **Aider**          | Via `/read`         | Not supported    | Via `/read`     |


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


| Project                                              | Inspiration                                                           |
| ---------------------------------------------------- | --------------------------------------------------------------------- |
| [GSD](https://github.com/gsd-build/get-shit-done)    | Wave-based parallel execution, atomic git commits, verification phase |
| [BMAD Method](https://docs.bmad-method.org)          | Adaptive guidance ("what's next?"), phase-based planning              |
| [Spec-Kit](https://github.com/github/spec-kit)       | Structured spec workflow, Constitution concept, feature branching     |
| [cc-sdd](https://github.com/gotalab/cc-sdd)          | Kiro-style SDD, EARS requirements format, parallel task markers       |
| [Spec-Flow](https://github.com/ChrisLally/Spec-Flow) | Work sizing, quality gates                                            |
| [OpenSpec](https://github.com/openspec-ai/openspec)  | Delta format for changes                                              |


---

## License

MIT License — Use freely in your projects.