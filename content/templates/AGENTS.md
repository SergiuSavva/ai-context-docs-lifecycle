<!-- site:
title: AGENTS.md Template
description: Root context file that gives AI instant understanding of your project
purpose: AGENTS.md is the entry point for AI agents. It provides instant context about your project — what it does, how to run it, and where to find things.
updateWhen: Architecture changes, new patterns emerge, or tech stack changes.
wrapInCodeBlock: false
-->

# [Project Name] - AI Agent Instructions

> **TEMPLATE**: Copy this file to your project root as `AGENTS.md`.
> Replace all `[bracketed]` placeholders with your project's values.
> See `../examples/AGENTS.md` for a filled-in example.

---

## Quick Start

```bash
# Installation
[install command]

# Development  
[dev command]

# Tests
[test command]
```

---

## Project Overview

[Brief description of what this project does - 1-2 sentences]

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | [Language] |
| **Framework** | [Framework + version] |
| **Database** | [Database + ORM] |
| **Styling** | [CSS framework] |
| **Auth** | [Auth solution] |
| **Testing** | [Test frameworks] |

---

## File Organization

```
[project-name]/
├── [source-folder]/         # [Description]
│   ├── [subfolder]/        # [Description]
│   └── [subfolder]/        # [Description]
│
├── [components-folder]/     # Shared UI components
│
├── [features-folder]/       # Feature modules
│   ├── [feature-1]/
│   └── [feature-2]/
│
├── [lib-folder]/            # Core utilities
│
└── [types-folder]/          # Shared types
```

---

## Key Patterns

### State Management
- **Server state**: [Approach]
- **Client state**: [Approach]
- See: `.cursor/rules/state-management.mdc`

### Components
- [Pattern 1]
- [Pattern 2]
- See: `.cursor/rules/coding-patterns.mdc`

### API
- [API approach]
- [Database access approach]
- [Validation approach]

---

## Common Gotchas

1. **[Gotcha 1]**: [Description and solution]

2. **[Gotcha 2]**: [Description and solution]

3. **[Gotcha 3]**: [Description and solution]

---

## Documentation

| For | Location | Purpose |
|-----|----------|---------|
| AI (detailed) | `.cursor/rules/*.mdc` | Patterns & rules |
| AI (quick) | `AGENTS.md` | This file |
| Humans | `docs/INDEX.md` | Navigation |
| Tasks | `docs/TASKS.md` | Progress tracking |

---

## Need Help?

- Architecture: `.cursor/rules/project-architecture.mdc`
- Code patterns: `.cursor/rules/coding-patterns.mdc`
- State/data: `.cursor/rules/state-management.mdc`
- Testing: `.cursor/rules/testing-strategy.mdc`
