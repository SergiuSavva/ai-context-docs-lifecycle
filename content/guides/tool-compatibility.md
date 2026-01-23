# Tool Compatibility Guide

> **Set up AI context docs** for Cursor, Claude Code, GitHub Copilot, and other tools.

---

## Overview

AI coding tools each have their own configuration formats. This guide shows how to use AGENTS.md as a single source of truth while leveraging tool-specific features.

```
┌─────────────────────────────────────────────────────┐
│  AGENTS.md (Universal - works everywhere)           │
└─────────────────────────────────────────────────────┘
                        │
        ┌───────────────┼───────────────┐
        ▼               ▼               ▼
┌─────────────┐ ┌─────────────┐ ┌─────────────┐
│   Cursor    │ │ Claude Code │ │   Copilot   │
│ .cursor/    │ │ .claude/    │ │  .github/   │
│ rules/*.mdc │ │ rules/*.md  │ │ copilot-    │
│             │ │ CLAUDE.md   │ │ instructions│
└─────────────┘ └─────────────┘ └─────────────┘
```

---

## Quick Setup

### Minimal (Any Tool)

```bash
# Just create AGENTS.md at project root
cp templates/AGENTS.md ./AGENTS.md
# Edit with your project details
```

Works with: Cursor, Copilot, Zed, OpenAI Codex, Windsurf, and 20+ other tools.

### Full Setup (All Tools)

```bash
# 1. Create AGENTS.md (source of truth)
cp templates/AGENTS.md ./AGENTS.md

# 2. Symlink for Claude Code
ln -s AGENTS.md CLAUDE.md

# 3. Create tool-specific rules
mkdir -p .cursor/rules
mkdir -p .claude/rules
mkdir -p .github

# 4. Add tool-specific features (optional)
```

---

## Tool-Specific Setup

### Cursor

**Files:**
```
project/
├── AGENTS.md                    # Universal context
└── .cursor/
    └── rules/
        ├── 00-index.mdc         # Rules router
        ├── code-style.mdc       # Code patterns
        └── doc-style.mdc        # Documentation style
```

**Features:**
- `.mdc` files support YAML frontmatter with globs
- Auto-attach rules based on file patterns
- Activation modes: Always, Auto, Agent Requested, Manual

**Example `.cursor/rules/code-style.mdc`:**
```markdown
---
description: TypeScript and React code patterns
globs:
  - "src/**/*.ts"
  - "src/**/*.tsx"
---

# Code Style

## TypeScript
- Use strict mode
- Prefer `type` over `interface` for simple types
- Use explicit return types for exported functions

## React
- Functional components only
- Custom hooks in `src/hooks/`
- Co-locate tests as `*.test.tsx`
```

**Reference AGENTS.md from rules:**
```markdown
---
description: Project context router
globs:
  - "**/*"
---

# Project Context

For universal project context, read @AGENTS.md

## Cursor-Specific Rules
| File Pattern | Rule |
|--------------|------|
| `src/**/*.ts` | @.cursor/rules/code-style.mdc |
| `docs/**/*.md` | @.cursor/rules/doc-style.mdc |
```

---

### Claude Code

**Files:**
```
project/
├── AGENTS.md                    # Universal context
├── CLAUDE.md -> AGENTS.md       # Symlink (or reference)
└── .claude/
    └── rules/
        ├── security.md          # Security rules
        └── testing.md           # Testing rules
```

**Features:**
- `@path/to/file.md` syntax for dynamic loading
- Recursive imports (up to 5 levels)
- Directory-aware context loading
- Path-scoped rules with YAML frontmatter

**Option 1: Symlink**
```bash
ln -s AGENTS.md CLAUDE.md
```

**Option 2: Reference**
```markdown
# CLAUDE.md

Read @AGENTS.md for project context.

## Claude-Specific Instructions

- Use the TodoWrite tool for multi-step tasks
- Prefer Edit over Write for existing files
```

**Path-scoped rules in `.claude/rules/`:**
```markdown
---
paths:
  - "src/api/**"
  - "src/server/**"
---

# API Development Rules

- All endpoints must have input validation
- Use Zod schemas from `src/schemas/`
- Return consistent error format
```

---

### GitHub Copilot

**Files:**
```
project/
├── AGENTS.md                           # Universal context
└── .github/
    └── copilot-instructions.md         # Copilot-specific
```

**Features:**
- Workspace-level instructions
- GitHub Actions integration
- Custom agents via `agents.md` files (new feature)

**Example `.github/copilot-instructions.md`:**
```markdown
# Copilot Instructions

For full project context, see /AGENTS.md

## Additional Context

- This is a GitHub-hosted project
- Use conventional commits
- PRs require passing CI checks

## Preferred Patterns

- Use GitHub Actions for CI/CD
- Store secrets in GitHub Secrets
- Use Dependabot for updates
```

---

### Other Tools

| Tool | Config File | Notes |
|------|------------|-------|
| **Zed** | `AGENTS.md` | Native support |
| **Windsurf** | `.windsurfrules` | Symlink to AGENTS.md |
| **Cline** | `.clinerules` | Symlink to AGENTS.md |
| **OpenAI Codex** | `AGENTS.md` | Native support |
| **Aider** | `.aider.conf.yml` | Reference AGENTS.md in read |

**Symlink approach for legacy tools:**
```bash
# For tools that don't support AGENTS.md natively
ln -s AGENTS.md .windsurfrules
ln -s AGENTS.md .clinerules
```

---

## Recommended Project Structure

### Simple Project (Single Tool)

```
project/
├── AGENTS.md              # Universal context
└── .cursor/rules/         # If using Cursor
    └── code-style.mdc
```

### Multi-Tool Team

```
project/
├── AGENTS.md                           # Universal (source of truth)
├── CLAUDE.md -> AGENTS.md              # Claude Code symlink
├── .cursor/
│   └── rules/
│       ├── 00-index.mdc               # References AGENTS.md
│       ├── code-style.mdc
│       └── doc-style.mdc
├── .claude/
│   └── rules/
│       └── testing.md                 # Claude-specific
└── .github/
    └── copilot-instructions.md        # Copilot-specific
```

### Monorepo

```
monorepo/
├── AGENTS.md                           # Global context
├── CLAUDE.md -> AGENTS.md
├── packages/
│   ├── api/
│   │   ├── AGENTS.md                  # API-specific
│   │   └── .cursor/rules/
│   └── web/
│       ├── AGENTS.md                  # Web-specific
│       └── .cursor/rules/
└── .cursor/
    └── rules/                         # Global rules
```

---

## Migration Guide

### From `.cursorrules` to AGENTS.md

```bash
# 1. Rename to AGENTS.md
mv .cursorrules AGENTS.md

# 2. Create symlink for backward compatibility (optional)
ln -s AGENTS.md .cursorrules

# 3. Extract tool-specific rules to .cursor/rules/
mkdir -p .cursor/rules
# Move glob-based rules to .mdc files
```

### From `CLAUDE.md` to AGENTS.md

```bash
# 1. Rename to AGENTS.md
mv CLAUDE.md AGENTS.md

# 2. Create symlink for Claude Code
ln -s AGENTS.md CLAUDE.md

# 3. Keep Claude-specific content in .claude/rules/
```

---

## Best Practices

### 1. Single Source of Truth

Keep universal content in AGENTS.md only. Don't duplicate across tool files.

### 2. Tool-Specific Features in Tool Files

Use `.cursor/rules/*.mdc` for:
- Glob-based auto-attach
- Activation modes
- File-pattern-specific rules

Use `.claude/rules/*.md` for:
- Path-scoped rules
- Claude-specific instructions

### 3. Test with Multiple Tools

After setup, verify each tool reads the context correctly:
- Cursor: Check rules load in agent mode
- Claude Code: Run `/memory` to see loaded files
- Copilot: Verify instructions appear in completions

---

## Troubleshooting

### AGENTS.md Not Loaded

- Ensure file is at project root
- Check file name is exactly `AGENTS.md` (case-sensitive)
- Verify no `.gitignore` rules excluding it

### Symlink Issues

```bash
# Check symlink is correct
ls -la CLAUDE.md
# Should show: CLAUDE.md -> AGENTS.md

# Fix broken symlink
rm CLAUDE.md
ln -s AGENTS.md CLAUDE.md
```

### Rules Not Auto-Attaching (Cursor)

- Check YAML frontmatter syntax
- Verify glob patterns match your files
- Ensure `.mdc` extension (not `.md`)

---

## See Also

- [AGENTS.md Best Practices](./agents-md-best-practices.md) - Writing effective content
- [Module 2: Coding Standards](../modules/02-coding-standards/) - Rule templates
- [Getting Started](./getting-started.md) - Choose your setup
