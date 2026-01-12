# [Project Name] - Claude Code Instructions

> **TEMPLATE**: Copy this file to your project root as `CLAUDE.md`.
> Replace all `[bracketed]` placeholders with your project's values.
> See `../examples/CLAUDE.md` for a filled-in example.
>
> **What is CLAUDE.md?** This file provides context to Claude Code (Anthropic's CLI agent).
> Claude Code automatically reads this file when working in your project.

---

## Project Overview

[Brief description - 1-2 sentences]

---

## Quick Start

```bash
# Install dependencies
[install command]

# Run development server
[dev command]

# Run tests
[test command]

# Build for production
[build command]
```

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

## Project Structure

```
[project-name]/
├── [source-folder]/         # [Description]
│   ├── [subfolder]/        # [Description]
│   └── [subfolder]/        # [Description]
│
├── [components-folder]/     # Shared UI components
│
├── [features-folder]/       # Feature modules
│
├── [lib-folder]/            # Core utilities
│
├── docs/                    # Project documentation
│   ├── specs/              # Feature specifications
│   ├── features/           # Feature documentation
│   └── decisions/          # Architecture Decision Records
│
└── [types-folder]/          # Shared types
```

---

## Key Patterns

### State Management
- **Server state**: [Approach]
- **Client state**: [Approach]
- **Form state**: [Approach]

### Components
- [Pattern 1]
- [Pattern 2]
- [Pattern 3]

### API Design
- [API pattern]
- [Database pattern]
- [Validation pattern]

### Testing
- Unit tests: [Tool]
- Integration tests: [Tool]
- E2E tests: [Tool]

---

## Code Style

### [Language]
- [Style rule 1]
- [Style rule 2]
- [Style rule 3]

### Imports
- [Import convention 1]
- [Import convention 2]

### Naming
- Components: [Convention]
- Functions/variables: [Convention]
- Constants: [Convention]
- Files: [Convention]

---

## Common Gotchas

1. **[Gotcha 1]**: [Description and solution]

2. **[Gotcha 2]**: [Description and solution]

3. **[Gotcha 3]**: [Description and solution]

---

## Documentation Locations

| Document | Location | Purpose |
|----------|----------|---------|
| This file | `CLAUDE.md` | Claude Code context |
| Specs | `docs/specs/` | Feature specifications |
| Features | `docs/features/` | Feature documentation |
| Decisions | `docs/decisions/` | Architecture Decision Records |
| Tasks | `docs/TASKS.md` | Progress tracking |

---

## Before You Code

1. **Check for existing specs**: Look in `docs/specs/` for the feature specification
2. **Read feature docs**: Check `docs/features/<name>/` for context
3. **Review relevant ADRs**: Check `docs/decisions/` for architectural decisions
4. **Run tests first**: `[test command]` to ensure baseline is passing

---

## Task Workflow

When asked to implement a feature:

1. Read the spec in `docs/specs/`
2. Check user stories in `docs/features/<name>/user-stories.md`
3. Follow task list in `docs/features/<name>/tasks.md`
4. Update documentation as you build
5. Run tests before considering complete

---

## What NOT to Do

- Don't create new patterns without checking existing ones first
- Don't skip writing tests for new functionality
- Don't use `any` type - find or create proper types
- Don't commit code that doesn't pass linting
- Don't add dependencies without checking if alternatives exist
