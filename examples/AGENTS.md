# [Project Name] - AI Agent Instructions

> **EXAMPLE**: Adapt this for your project. Replace all [bracketed] content.

---

## Quick Start

```bash
# Installation
npm install

# Development  
npm run dev

# Tests
npm test
```

---

## Project Overview

[Brief description of what this project does - 1-2 sentences]

**Example**: "A SaaS platform for booking creative workspaces, connecting artists with studio owners."

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

## File Organization

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
└── types/               # Shared TypeScript types
```

---

## Key Patterns

### State Management
- **Server state**: React Query for all API data
- **Client state**: Zustand for UI state
- See: `.cursor/rules/state-management.mdc`

### Components
- Functional components only
- Props interfaces for all components
- See: `.cursor/rules/coding-patterns.mdc`

### API
- REST endpoints in `/app/api/`
- Prisma for database access
- Zod for validation

---

## Common Gotchas

1. **Server vs Client Components**: Default to Server Components. Add `'use client'` only when needed (hooks, interactivity).

2. **Path Aliases**: Always use `@/` imports, never relative paths beyond the current feature.

3. **Auth**: Protected routes require session check in layout, not individual pages.

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
