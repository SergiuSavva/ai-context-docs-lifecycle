---
title: CLAUDE.md Template
description: Context file for Claude Code CLI
head: []
---

The `CLAUDE.md` file provides project context to [Claude Code](https://docs.anthropic.com/en/docs/agents-and-tools/claude-code/overview), Anthropic's CLI agent. Claude Code automatically reads this file when working in your project.

## When to Use

Use this template if you're using **Claude Code** as your AI assistant. For other tools:
- **Cursor**: Use [AGENTS.md](../agents-md/) + [Cursor Rules](../cursor-rules/)
- **GitHub Copilot**: Use [Copilot Instructions](../copilot-instructions/)

## Location

```
your-project/
└── CLAUDE.md    # Project root
```

## Template

```markdown
# [Project Name] - Claude Code Instructions

## Project Overview

[Brief description - 1-2 sentences]

---

## Quick Start

\`\`\`bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test
\`\`\`

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | TypeScript |
| **Framework** | Next.js 15 (App Router) |
| **Database** | PostgreSQL + Prisma |
| **Styling** | Tailwind CSS |
| **Testing** | Vitest + Playwright |

---

## Project Structure

\`\`\`
project/
├── app/                    # Next.js App Router
├── components/            # Shared UI components
├── features/             # Feature modules
├── lib/                  # Core utilities
├── docs/                 # Project documentation
└── types/               # Shared TypeScript types
\`\`\`

---

## Key Patterns

### State Management
- **Server state**: React Query for API data
- **Client state**: Zustand for UI state

### Components
- Functional components only
- Props interfaces for all components

### API Design
- REST endpoints in `/app/api/`
- Zod for validation

---

## Code Style

### TypeScript
- Strict mode enabled
- Explicit return types for functions

### Imports
- Use `@/` path alias for all imports
- Group: external → internal → relative → types

---

## Common Gotchas

1. **Server vs Client Components**: Default to Server. Add `'use client'` only when needed.
2. **Path Aliases**: Always use `@/` imports.
3. **Auth**: Protected routes require session check in layout.

---

## Documentation Locations

| Document | Location |
|----------|----------|
| Specs | `docs/specs/` |
| Features | `docs/features/` |
| Decisions | `docs/decisions/` |
| Tasks | `docs/TASKS.md` |

---

## Before You Code

1. Check for existing specs in `docs/specs/`
2. Read feature docs in `docs/features/<name>/`
3. Review ADRs in `docs/decisions/`
4. Run tests first: `npm test`

---

## What NOT to Do

- Don't create new patterns without checking existing ones
- Don't skip writing tests
- Don't use `any` type
- Don't add dependencies without checking for alternatives
```

## Key Sections

| Section | Purpose |
|---------|---------|
| **Quick Start** | Commands Claude needs to run the project |
| **Tech Stack** | Technologies in use |
| **Project Structure** | Where code lives |
| **Key Patterns** | How things are done here |
| **Code Style** | Formatting and conventions |
| **Common Gotchas** | Mistakes to avoid |
| **Before You Code** | Checklist before implementing |

## CLAUDE.md vs AGENTS.md

Both serve similar purposes but for different tools:

| Feature | CLAUDE.md | AGENTS.md |
|---------|-----------|-----------|
| **Tool** | Claude Code | Cursor, general |
| **Format** | Markdown | Markdown |
| **Auto-loaded** | Yes | Depends on tool |
| **Location** | Root only | Root + features |

You can use both in the same project if your team uses multiple tools.

## Tips

1. **Keep it current** - Update when architecture changes
2. **Real values only** - No placeholders
3. **Commands that work** - Test all commands before adding
4. **Link to details** - Reference docs/ for comprehensive info
