# AI Context Docs Lifecycle

> Modular toolkit for giving AI coding assistants structured project context.

## Overview

Documentation-as-memory methodology with 5 progressive modules. Users adopt what they need - from minimal AGENTS.md to full project planning.

## Stack

| Tech | Version |
|------|---------|
| Docs | MkDocs + Material |
| Language | Markdown |
| Build | Python 3.x |

## Commands

```bash
pip install -r requirements.txt   # Install deps
mkdocs serve                      # Dev server (localhost:8000)
mkdocs build                      # Build to site/
```

## Structure

```
content/
├── modules/           # 5 core modules with templates
│   ├── 01-quick-start/
│   ├── 02-coding-standards/
│   ├── 03-feature-development/
│   ├── 04-reference-docs/
│   └── 05-project-planning/
└── guides/            # Adoption guides
specs/                 # Active feature specs (ephemeral)
decisions/             # Architecture decisions (permanent)
```

## Context Loading

| Task | Read First |
|------|------------|
| Implementation workflow | @decisions/001-implementation-flow.md |
| Module templates | @content/modules/[module]/templates/ |
| Writing guides | @content/guides/README.md |
| Code style | @.cursor/rules/code-style.mdc |
| Doc style | @.cursor/rules/doc-style.mdc |

## Boundaries

### Always
- Follow existing doc structure
- Use templates from modules
- Keep examples minimal and focused

### Ask First
- Adding new modules
- Changing template structure
- Major methodology changes

### Never
- Commit generated site/ changes (auto-built by CI)
- Add tool-specific features to universal templates
- Break backward compatibility without migration guide
