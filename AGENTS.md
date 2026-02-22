# AI Context Docs Lifecycle

> Docs-first methodology kit for AI-assisted development.

## Overview

Docs-first, documentation-as-memory methodology with 3 progressive modules. Users adopt what they need — from minimal AGENTS.md context to full project planning.

## Stack

| Tech | Version |
|------|---------|
| Docs | MkDocs + Material |
| Language | Markdown |
| Build | Python 3.x |

## Commands

```bash
pip install -r requirements.txt # Install deps
mkdocs serve                    # Dev server (localhost:8000)
mkdocs build                    # Build to site/
```

## Structure

```
content/
├── modules/           # 3 core modules with templates
│   ├── 01-project-context/    # AGENTS.md + docs/ + .agents/skills/
│   ├── 02-feature-development/# Workflows, specs, tasks
│   └── 03-project-planning/   # Backlog, roadmap (optional)
└── guides/            # Adoption guides
specs/                 # Active feature specs (ephemeral)
docs/                  # Reference documentation
└── decisions/         # Architecture decisions (permanent)
```

## Context Loading

| Task | Read First |
|------|------------|
| Module templates | @content/modules/[module]/templates/ |
| Methodology skills | @content/guides/skills-catalog.md |
| Writing guides | @content/guides/README.md |
| Architecture decisions | @docs/decisions/ |

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
