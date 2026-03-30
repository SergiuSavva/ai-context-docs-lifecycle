# Tool Compatibility Guide

> **Use one tool only?** Read the [Quick Setup baseline](#quick-setup) below and stop there — you don't need the rest of this page. Multi-tool and migration guidance is in the [Advanced](#advanced-multi-tool-setup) section.

---

## Overview

AI coding tools vary in config formats, but the same core context stays portable:

```
┌─────────────────────────────────────────────────────┐
│  AGENTS.md (always-on project router)               │
├─────────────────────────────────────────────────────┤
│  .agents/skills/*/SKILL.md (on-demand patterns)     │
├─────────────────────────────────────────────────────┤
│  docs/* (reference knowledge + ADR history)         │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
         Optional tool bridges (Cursor / Claude / Copilot)
```

Use tool-specific files for extra ergonomics (globs, UI actions), not as your primary source of truth.

---

## Quick Setup

### Recommended Baseline (Any Tool)

> **Solo user using one tool?** This section is all you need.

1. Create `AGENTS.md` at project root from:
   `content/modules/01-foundation/skills/acdl/templates/AGENTS-single-app.md`
2. Create `docs/` from Module 1 template catalog (only the docs your project needs).
3. Optionally create `.agents/skills/` from Module 1-2 skill templates for deep patterns.
4. Optionally keep feature workflow templates in `specs/` (Module 2 Dev Workflow).

Works with every agent that can read markdown files. No tool-specific config required.

```
project/
├── AGENTS.md              # Source of truth
├── docs/                  # Only the docs your project needs
│   ├── scripts.md
│   └── decisions/
└── .agents/skills/        # Optional: on-demand patterns
    └── {skill}/SKILL.md
```

---

## Tool-Specific Optional Bridges

> These are optional convenience additions. They do not replace the portable baseline above.

### Cursor

Add `.cursor/rules/00-index.mdc` for glob-based auto-attach and activation modes:

```markdown
---
description: Cursor bridge to universal ACDL context
globs:
  - "**/*"
---

Read @AGENTS.md first.
Use `@docs/...` references and load relevant skills from `.agents/skills/`.
```

### Claude Code

```bash
ln -s AGENTS.md CLAUDE.md
```

Optional `.claude/rules/*.md` for Claude-specific behavior, but keep project facts in universal files.

### GitHub Copilot

Use `.github/copilot-instructions.md` as a thin pointer:

```markdown
For project context, read /AGENTS.md.
For deep task patterns, use .agents/skills/*/SKILL.md.
For system reference, use /docs/*.
```

### Other Tools

| Tool | Baseline Support | Optional Bridge |
|------|------------------|-----------------|
| **OpenAI Codex** | `AGENTS.md` + markdown docs | None required |
| **Zed** | `AGENTS.md` | None required |
| **Windsurf** | Markdown context files | `.windsurfrules` pointer to `AGENTS.md` |
| **Cline** | Markdown context files | `.clinerules` pointer to `AGENTS.md` |
| **Aider** | Read files manually | Add `/read AGENTS.md` in workflow |

---

## Advanced: Multi-Tool Setup

> Only relevant if your team uses multiple tools on the same project.

### Project Structure (Multi-Tool Team)

```
project/
├── AGENTS.md                            # Source of truth
├── CLAUDE.md -> AGENTS.md               # Optional bridge
├── .agents/skills/                      # Shared deep patterns
├── docs/                                # Shared reference context
├── .cursor/rules/00-index.mdc           # Optional Cursor bridge
├── .claude/rules/                       # Optional Claude-only notes
└── .github/copilot-instructions.md      # Optional Copilot bridge
```

### Setup Commands

```bash
# Claude Code compatibility
ln -s AGENTS.md CLAUDE.md

# Optional tool folders
mkdir -p .cursor/rules
mkdir -p .claude/rules
mkdir -p .github
```

### Monorepo

```
monorepo/
├── AGENTS.md                            # Root router
├── .agents/skills/                      # Shared cross-project skills
├── docs/                                # Shared reference docs
├── packages/
│   ├── api/AGENTS.md                    # Local context (nearest wins)
│   └── web/AGENTS.md
└── specs/
```

---

## Migration Guide

> Only relevant if migrating from a tool-specific setup.

### From Tool-Only Rules to ACDL Baseline

1. Consolidate universal instructions into `AGENTS.md`.
2. Move deep procedures into `.agents/skills/*/SKILL.md`.
3. Move reference knowledge into `docs/` (only docs that match your project).
4. Reduce tool-specific files to thin pointers.

### From `.cursorrules` to ACDL

```bash
mv .cursorrules AGENTS.md
ln -s AGENTS.md .cursorrules   # optional backwards compatibility
mkdir -p .cursor/rules
```

### From `CLAUDE.md` to ACDL

```bash
mv CLAUDE.md AGENTS.md
ln -s AGENTS.md CLAUDE.md
```

---

## Best Practices

1. **Keep universal content portable** — project facts, boundaries, commands in `AGENTS.md`
2. **Put deep procedures in skills** — multi-step implementation patterns in `.agents/skills/*/SKILL.md`
3. **System truth belongs in docs/** — include only the docs your project needs
4. **Use tool files as bridges** — they should point to universal files, not duplicate them

---

## Troubleshooting

### AGENTS.md Not Loaded
- Ensure filename is exactly `AGENTS.md`
- Ensure file is in project root
- Ensure no ignore rule excludes it

### Skills Not Used
- Ensure `SKILL.md` files exist under `.agents/skills/<name>/SKILL.md`
- Add explicit routing hints in `AGENTS.md` Context Loading table

### Bridge Drift Across Tools
- Remove duplicated instructions from tool files
- Keep only pointers in tool-specific files
- Update universal files first (`AGENTS.md`, skills, docs)

---

## See Also

- [AGENTS.md Best Practices](./agents-md-best-practices.md)
- [Module 1: Foundation](../modules/01-foundation/README.md)
- [Module 2: Dev Workflow](../modules/02-dev-workflow/README.md)
- [Getting Started](./getting-started.md)
