# [Project Name] - Claude Code Instructions

> **EXAMPLE**: Adapt this for your project. Replace all [bracketed] content.
>
> **What is CLAUDE.md?** This file provides context to Claude Code (Anthropic's CLI agent).
> Claude Code automatically reads this file when working in your project.

---

## Project Overview

[Brief description - 1-2 sentences]

**Example**: "A SaaS platform for booking creative workspaces, connecting artists with studio owners."

---

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

---

## Tech Stack

| Category | Technology |
|----------|------------|
| **Language** | TypeScript |
| **Framework** | Next.js 15 (App Router) |
| **Database** | PostgreSQL + Prisma |
| **Styling** | Tailwind CSS |
| **Auth** | NextAuth.js |
| **Testing** | Vitest + Playwright |

---

## Project Structure

```
project/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes
│   ├── (protected)/       # Auth-required routes
│   └── api/               # API routes
│
├── components/            # Shared UI components
│   ├── ui/               # Base primitives (Button, Input)
│   └── common/           # Common components (Header, Footer)
│
├── features/             # Feature modules
│   ├── auth/            # Authentication
│   ├── bookings/        # Booking system
│   └── spaces/          # Space management
│
├── lib/                  # Core utilities
│   ├── api/             # API client
│   ├── db/              # Database utilities
│   └── utils/           # Helper functions
│
├── docs/                 # Project documentation
│   ├── specs/           # Feature specifications (PRD-lite)
│   ├── features/        # Feature documentation
│   └── decisions/       # Architecture Decision Records
│
└── types/               # Shared TypeScript types
```

---

## Key Patterns

### State Management
- **Server state**: React Query for all API data
- **Client state**: Zustand for UI state
- **Form state**: React Hook Form + Zod validation

### Components
- Functional components only
- Props interfaces for all components
- Collocate styles with components

### API Design
- REST endpoints in `/app/api/`
- Prisma for database access
- Zod for request/response validation

### Testing
- Unit tests: Vitest
- Integration tests: Vitest + Testing Library
- E2E tests: Playwright

---

## Code Style

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Use `interface` for objects, `type` for unions/primitives

### Imports
- Use `@/` path alias for all imports
- Group: external → internal → relative → types

### Naming
- Components: PascalCase
- Functions/variables: camelCase
- Constants: SCREAMING_SNAKE_CASE
- Files: kebab-case (except components)

---

## Common Gotchas

1. **Server vs Client Components**: Default to Server Components. Add `'use client'` only when needed (hooks, interactivity).

2. **Path Aliases**: Always use `@/` imports, never relative paths beyond the current directory.

3. **Auth**: Protected routes require session check in layout, not individual pages.

4. **Database**: Always use Prisma transactions for multi-table operations.

5. **Error Handling**: Use error boundaries for UI, try-catch for API routes.

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
4. **Run tests first**: `npm test` to ensure baseline is passing

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
