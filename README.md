# AI Context Docs Lifecycle

> **Skill-driven methodology kit for AI-assisted development**

**Live Site:** [https://sergiusavva.github.io/ai-context-docs-lifecycle](https://sergiusavva.github.io/ai-context-docs-lifecycle)

---

## What is This?

Most AI development tools are **spec-driven** — specs go in, code comes out, and project knowledge evaporates when the feature ships.

ACDL is **skill-driven**. It ships portable skills that teach AI agents how to understand your project, build features consistently, and grow project knowledge that compounds across sessions. Not scaffolding you discard — persistent memory that makes every session smarter than the last.

### The Problem

AI coding assistants have no lasting knowledge of your project:

- Every session starts from zero — constant re-explaining
- Generic, inconsistent code that ignores your patterns
- Specs drive one feature but nothing carries forward

### The Solution

**Skills** — on-demand instruction packages that AI agents load when the task matches. Each skill bundles workflow instructions and templates in a single portable `SKILL.md` file.

| Skill | What it teaches the AI |
| --- | --- |
| `acdl` | Bootstrap AGENTS.md and project docs from your codebase |
| `feature-workflow` | Four-phase workflow: Research → Plan → Implement → Verify |
| `spec-writing` | Write quality specs with acceptance criteria and scoping |
| `agents-md` | Author and maintain effective AGENTS.md files |
| `doc-writing` | Write reference docs, ADRs, and templates |
| `debug-workflow` | Systematic debugging: reproduce, hypothesize, investigate, fix, verify |
| `testing` | Test strategy, TDD guidance, and test quality checks |
| `project-planning` | Manage roadmap, backlog, and multi-feature progress |

Skills produce three types of project knowledge:

| Knowledge type | Lifecycle | Purpose |
| --- | --- | --- |
| **Specs** | Ephemeral — delete after feature ships | Drive the current feature |
| **Reference** | Evergreen — always current or deleted | Carry project knowledge forward |
| **Decisions** | Permanent — never rewritten | Record the *why* behind choices |

**Pick the modules you need:**

| Module | Skills | Purpose |
| --- | --- | --- |
| **1. Project Context** | `acdl`, `agents-md`, `doc-writing` | AGENTS.md + docs/ + project skills |
| **2. Feature Development** | `feature-workflow`, `spec-writing`, `debug-workflow`, `testing` | Workflows for building features |
| **3. Project Planning** | `project-planning` | Multi-feature management (optional) |

### Why Not Existing SDD Tools?

Spec-Driven Development tools ([GSD](https://github.com/gsd-build/get-shit-done), [BMAD](https://docs.bmad-method.org), [Spec Kit](https://github.com/github/spec-kit), [cc-sdd](https://github.com/gotalab/cc-sdd)) solve the same root problem but tend to be agent-locked, all-or-nothing, runtime-dependent, and process-heavy. Specs drive one feature, then knowledge evaporates.

ACDL is different: pure markdown (no runtime), works with any AI agent, three independent modules you adopt incrementally, and a memory model where project knowledge compounds across features instead of being discarded.

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

Then tell your AI: `load skill `feature-workflow``

See [Quick Start](content/quick-start.md) for the full progressive path.

---

## How Skills Work

Skills load on demand via `AGENTS.md` routing. The AI reads the compact router (~700 tokens), matches the task to a skill, and loads only what's needed.

```
AGENTS.md (always loaded, ~700 tokens)
    ↓ routes to
.agents/skills/{skill}/SKILL.md (loaded on demand, ~1,000-2,500 tokens each)
    ↓ references
docs/ (loaded when implementation needs them)
```

Each skill bundles its own templates inside `SKILL.md`'s directory — no separate template installation step.

---

## Repository Structure

```
ai-context-docs-lifecycle/
├── content/
│   ├── methodology.md        # Full methodology explanation
│   ├── modules/              # 3 independent modules
│   │   ├── README.md              # Module overview + adoption path
│   │   ├── 01-project-context/    # Skills: acdl, agents-md, doc-writing
│   │   ├── 02-feature-development/# Skills: feature-workflow, spec-writing
│   │   └── 03-project-planning/   # Skill: project-planning
│   └── guides/               # Adoption guides
│       ├── getting-started.md
│       ├── new-project.md
│       ├── existing-project.md
│       ├── agents-md-best-practices.md
│       ├── skills-catalog.md
│       ├── skill-routing.md
│       └── tool-compatibility.md
├── packages/cli/             # acdl CLI tool
├── docs/                     # Reference documentation (this repo)
└── README.md                 # This file
```

---

## Module Overview

### Module 1: Project Context

**Skills**: `acdl`, `agents-md`, `doc-writing`

The `acdl` skill bootstraps your project: scans the codebase, generates `AGENTS.md`, and creates only the `docs/` files your project needs. The `agents-md` and `doc-writing` skills provide ongoing guidance for maintaining project context.

```
project/
├── AGENTS.md              # Router: always loaded (~700 tokens)
├── docs/                  # Reference docs (on-demand)
│   ├── {relevant docs}.md
│   └── decisions/         # ADRs (permanent)
└── .agents/skills/        # Skills (loaded when task matches)
    ├── acdl/SKILL.md
    ├── agents-md/SKILL.md
    └── doc-writing/SKILL.md
```

[Go to Module 1 →](content/modules/01-project-context/)

### Module 2: Feature Development

**Skills**: `feature-workflow`, `spec-writing`, `debug-workflow`, `testing`

The `feature-workflow` skill drives the four-phase workflow (Research → Plan → Implement → Verify) with task tracking, verification checklists, and state inspection. The `spec-writing` skill teaches quality spec content. The `debug-workflow` skill provides systematic debugging, and `testing` covers test strategy and quality.

| Situation | Docs Needed |
| --- | --- |
| **Bug fix** | None |
| **Feature** | `spec.md` + `tasks.md` (minimum) |
| **Complex** | All docs + ADR |

[Go to Module 2 →](content/modules/02-feature-development/)

### Module 3: Project Planning (Optional)

**Skill**: `project-planning`

For teams managing multiple features. Provides templates for roadmap, backlog, global task tracking, and product vision.

```
project/
├── PROJECT-PRD.md     # Project vision
├── BACKLOG.md         # Feature priorities
├── ROADMAP.md         # Phase planning
└── TASKS.md           # Global progress
```

[Go to Module 3 →](content/modules/03-project-planning/)

---

## Examples

See complete walkthroughs:

- [Simple Todo Feature](content/modules/02-feature-development/examples/simple-todo/) — Standard Flow
- [OAuth Authentication](content/modules/02-feature-development/examples/complex-auth/) — Complex Flow

---

## Tool Compatibility

Works with every AI coding agent:

| Agent | AGENTS.md | Skills | @docs/ refs |
| --- | --- | --- | --- |
| **Cursor** | Auto-reads | `@skill-name` | `@docs/file.md` |
| **Claude Code** | `CLAUDE.md` symlink | `load skill` | Direct read |
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
| --- | --- |
| [GSD](https://github.com/gsd-build/get-shit-done) | Wave-based parallel execution, atomic git commits, verification phase |
| [BMAD Method](https://docs.bmad-method.org) | Adaptive guidance ("what's next?"), phase-based planning |
| [Spec-Kit](https://github.com/github/spec-kit) | Structured spec workflow, Constitution concept, feature branching |
| [cc-sdd](https://github.com/gotalab/cc-sdd) | Kiro-style SDD, EARS requirements format, parallel task markers |
| [Spec-Flow](https://github.com/ChrisLally/Spec-Flow) | Work sizing, quality gates |
| [OpenSpec](https://github.com/openspec-ai/openspec) | Delta format for changes |

---

## License

MIT License — Use freely in your projects.
