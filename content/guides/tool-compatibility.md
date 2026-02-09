# Tool Compatibility Guide

> **Use ACDL across tools** with a portable baseline first, then optional tool-specific bridges.

---

## Overview

AI coding tools vary in config formats, but the same core context can stay portable:

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

1. Create `AGENTS.md` at project root from:
   `content/modules/01-project-context/templates/AGENTS-single-app.md`
2. Create `docs/` from Module 1 templates (architecture, data-model, api, auth, decisions).
3. Create `.agents/skills/` from Module 2 template for deep domain patterns.
4. Keep feature workflow templates in `specs/` (Module 3).

Works with every agent that can read markdown files.

### Optional Bridge Setup (Multi-Tool Teams)

```bash
# Claude Code compatibility
ln -s AGENTS.md CLAUDE.md

# Optional tool folders
mkdir -p .cursor/rules
mkdir -p .claude/rules
mkdir -p .github
```

---

## Tool-Specific Bridges

### Cursor (Optional)

**Portable baseline files:**

```
project/
├── AGENTS.md
├── .agents/skills/
└── docs/
```

**Optional Cursor bridge files:**

```
project/
└── .cursor/
    └── rules/
        └── 00-index.mdc
```

Use `.mdc` for Cursor-only conveniences:
- glob-based auto-attach
- activation modes
- path-targeted reminders

**Example `.cursor/rules/00-index.mdc`:**

```markdown
---
description: Cursor bridge to universal ACDL context
globs:
  - "**/*"
---

Read @AGENTS.md first.
Use `@docs/...` references and load relevant skills from `.agents/skills/`.
```

### Claude Code (Optional)

**Recommended bridge:**

```bash
ln -s AGENTS.md CLAUDE.md
```

Optional `.claude/rules/*.md` can hold Claude-specific behavior, but keep project facts and deep patterns in universal files.

**Example `CLAUDE.md`:**

```markdown
Read @AGENTS.md for project context.
For task-specific patterns, load relevant SKILL.md files from `.agents/skills/`.
```

### GitHub Copilot (Optional)

Use `.github/copilot-instructions.md` as a thin pointer:

```markdown
For project context, read /AGENTS.md.
For deep task patterns, use .agents/skills/*/SKILL.md.
For system reference, use /docs/*.
```

Keep detailed procedures in `SKILL.md` and `docs/`, not duplicated in Copilot instructions.

### Other Tools

| Tool | Baseline Support | Optional Bridge |
|------|------------------|-----------------|
| **OpenAI Codex** | `AGENTS.md` + markdown docs | None required |
| **Zed** | `AGENTS.md` | None required |
| **Windsurf** | Markdown context files | `.windsurfrules` pointer to `AGENTS.md` |
| **Cline** | Markdown context files | `.clinerules` pointer to `AGENTS.md` |
| **Aider** | Read files manually | Add `/read AGENTS.md` in workflow |

---

## Recommended Project Structure

### Simple Project (Portable Default)

```
project/
├── AGENTS.md
├── .agents/
│   └── skills/
│       ├── database/SKILL.md
│       └── testing/SKILL.md
├── docs/
│   ├── architecture.md
│   ├── data-model.md
│   ├── api.md
│   └── decisions/
└── specs/
```

### Multi-Tool Team

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

### From Tool-Only Rules to ACDL Baseline

1. Consolidate universal instructions into `AGENTS.md`.
2. Move deep procedures into `.agents/skills/*/SKILL.md`.
3. Move architecture/API/data/auth truth into `docs/`.
4. Reduce tool-specific files to thin pointers.

### From `.cursorrules` to ACDL

```bash
# 1. Promote to universal file
mv .cursorrules AGENTS.md

# 2. (Optional) keep backwards compatibility
ln -s AGENTS.md .cursorrules

# 3. Keep Cursor-only behavior in .cursor/rules/
mkdir -p .cursor/rules
```

### From `CLAUDE.md` to ACDL

```bash
# 1. Promote to universal file
mv CLAUDE.md AGENTS.md

# 2. Keep Claude bridge
ln -s AGENTS.md CLAUDE.md
```

---

## Best Practices

### 1. Keep Universal Content Portable

Put project facts, boundaries, commands, and routing in `AGENTS.md`.

### 2. Put Deep Procedures in Skills

Keep multi-step implementation knowledge in `.agents/skills/*/SKILL.md`.

### 3. Keep System Truth in docs/

Architecture, data model, API, auth, and ADRs belong in `docs/`.

### 4. Use Tool Files as Bridges

Tool files should mostly point to universal files, not duplicate them.

### 5. Verify Behavior in Each Tool

- Confirm `AGENTS.md` is loaded
- Confirm skills are discoverable
- Confirm `docs/` references resolve

---

## Troubleshooting

### AGENTS.md Not Loaded

- Ensure filename is exactly `AGENTS.md`
- Ensure file is in project root
- Ensure no ignore rule excludes it

### Skills Not Used

- Ensure `SKILL.md` files exist under `.agents/skills/<name>/SKILL.md`
- Add explicit routing hints in `AGENTS.md` Context Loading table
- Keep skill descriptions specific so routing is obvious

### Bridge Drift Across Tools

- Remove duplicated instructions from tool files
- Keep only pointers in tool-specific files
- Update universal files first (`AGENTS.md`, skills, docs)

---

## See Also

- [AGENTS.md Best Practices](./agents-md-best-practices.md)
- [Module 1: Project Context](../modules/01-project-context/README.md)
- [Module 2: Skills](../modules/02-skills/README.md)
- [Getting Started](./getting-started.md)
