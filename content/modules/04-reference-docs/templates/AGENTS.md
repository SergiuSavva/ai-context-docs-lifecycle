# [Project Name] - AI Agent Instructions

> **Full template for comprehensive AI context.**
> Copy to project root as `AGENTS.md`.
> Replace all `[bracketed]` placeholders.

---

## Quick Start

```bash
# Install dependencies
[npm install / yarn / pnpm install]

# Start development server
[npm run dev]

# Run tests
[npm test]

# Build for production
[npm run build]

# Database commands (if applicable)
[npx prisma db push]
[npx prisma studio]
```

---

## Project Overview

[2-3 sentences: What is this project? Who is it for? What problem does it solve?]

---

## Tech Stack

| Category | Technology | Notes |
|----------|------------|-------|
| **Language** | [TypeScript] | [Strict mode] |
| **Framework** | [Next.js 15] | [App Router] |
| **Database** | [PostgreSQL + Prisma] | |
| **Auth** | [NextAuth.js] | [Google OAuth] |
| **Styling** | [Tailwind CSS] | |
| **State** | [React Query + Zustand] | [Server/client state] |
| **Testing** | [Vitest + Playwright] | |

---

## File Organization

```
[project-name]/
├── app/                      # Next.js App Router
│   ├── (public)/            # Public routes
│   ├── (protected)/         # Auth-required routes
│   └── api/                 # API routes
│
├── components/              # React components
│   ├── ui/                 # Base UI primitives
│   └── [feature]/          # Feature-specific components
│
├── features/               # Feature modules (if applicable)
│   └── [feature]/
│       ├── components/
│       ├── hooks/
│       └── utils/
│
├── lib/                    # Core utilities
│   ├── api/               # API client
│   ├── db/                # Database utilities
│   └── utils/             # Helper functions
│
├── types/                  # Shared TypeScript types
│
└── docs/                   # Documentation
    ├── features/          # Feature docs
    ├── decisions/         # ADRs
    └── specs/             # Active specs
```

---

## Key Patterns

### State Management
- **Server state**: [React Query for all API data]
- **Client state**: [Zustand for UI state (modals, filters)]
- **Form state**: [React Hook Form + Zod]

### Components
- [Functional components only, no classes]
- [Props interface for all components]
- [Named exports preferred]

### Data Fetching
- [Server Components for initial data]
- [Client-side fetching with React Query]
- [Server Actions for mutations]

### Error Handling
- [try/catch for async operations]
- [Error boundaries for component errors]
- [Toast notifications for user feedback]

### Authentication
- [NextAuth.js for auth flow]
- [Middleware for route protection]
- [Database sessions]

---

## Common Gotchas

1. **[Server vs Client Components]**: Default to Server Components. Add `'use client'` only when needed (hooks, interactivity).

2. **[Path Aliases]**: Always use `@/` imports, never relative paths beyond current directory.

3. **[Auth Checks]**: Protected routes require session check in layout, not individual pages.

4. **[Database Queries]**: Always use Prisma, never raw SQL. Handle connection errors.

5. **[Environment Variables]**: Client-side vars must be prefixed with `NEXT_PUBLIC_`.

---

## Feature Status

| Feature | Status | Docs |
|---------|--------|------|
| [Auth] | [Complete] | [`docs/features/auth/`] |
| [Bookings] | [In Progress] | [`docs/specs/bookings/`] |
| [Payments] | [Planned] | - |

---

## Documentation

| For | Location | Purpose |
|-----|----------|---------|
| AI (this file) | `AGENTS.md` | Quick context |
| AI (rules) | `.cursor/rules/` | Coding patterns |
| Humans | `docs/INDEX.md` | Navigation |
| Features | `docs/features/` | How code works |
| Decisions | `docs/decisions/` | Why we decided |
| Active work | `docs/specs/` | Current features |

---

## Need Help?

- **Code patterns**: `.cursor/rules/*.mdc`
- **Feature docs**: `docs/features/<feature>/README.md`
- **Past decisions**: `docs/decisions/`
- **Current work**: `docs/specs/`
