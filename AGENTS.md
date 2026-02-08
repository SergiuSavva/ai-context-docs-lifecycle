# AI Context Docs Lifecycle

> Modular toolkit for giving AI coding assistants structured project context.

## Overview

Documentation-as-memory methodology with 4 progressive modules. Users adopt what they need — from minimal AGENTS.md to full project planning.

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
├── modules/           # 4 core modules with templates
│   ├── 01-project-context/    # AGENTS.md + docs/ (Layer 1 + Layer 3)
│   ├── 02-skills/             # .agents/skills/ (Layer 2)
│   ├── 03-feature-development/# Workflows, specs, tasks
│   └── 04-project-planning/   # Backlog, roadmap (optional)
└── guides/            # Adoption guides
specs/                 # Active feature specs (ephemeral)
docs/                  # Reference documentation
└── decisions/         # Architecture decisions (permanent)
```

## Context Loading

| Task | Read First |
|------|------------|
| Module restructure design | @specs/methodology-update/design-module-restructure.md |
| Module templates | @content/modules/[module]/templates/ |
| Writing guides | @content/guides/README.md |
| Demo example | @content/modules/01-project-context/examples/demo-taskflow/ |

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
