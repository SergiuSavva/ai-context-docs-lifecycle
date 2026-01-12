# SpaceBooker - AI Agent Instructions

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/AGENTS.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.

---

## Quick Start

```bash
# Installation
npm install

# Development  
npm run dev

# Tests
npm test

# Database
npx prisma db push
npx prisma studio
```

---

## Project Overview

A SaaS platform for booking creative workspaces, connecting artists with studio owners.

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
spacebooker/
├── app/                    # Next.js App Router
│   ├── (public)/          # Public routes (landing, login)
│   ├── (protected)/       # Auth-required routes
│   └── api/               # API routes
│
├── components/            # Shared UI components
│   ├── ui/               # Base primitives (Button, Input)
│   └── common/           # Layout components (Header, Footer)
│
├── features/             # Feature modules
│   ├── auth/            # Authentication
│   ├── bookings/        # Booking system
│   ├── spaces/          # Space management
│   └── payments/        # Payment processing
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
- **Client state**: Zustand for UI state (modals, sidebar)
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

4. **Bookings**: Always validate space availability before creating booking.

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
