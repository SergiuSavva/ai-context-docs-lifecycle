# TaskFlow

> Team task management with real-time collaboration.

## Stack

| Tech | Version |
|------|---------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5 (strict mode) |
| Database | Supabase (PostgreSQL 16) |
| Styling | Tailwind CSS 4 + shadcn/ui |
| State | React Query v5 |
| Testing | Vitest + Storybook + Playwright |

## Commands

```bash
npm run dev            # Dev server (localhost:3000)
npm run build          # Production build
npm run test           # Vitest watch mode
npm run test:run       # Vitest single run
npm run storybook      # Storybook (localhost:6006)
npm run db:types       # Regenerate Supabase types
npm run db:migrate     # Apply migrations
npm run db:reset       # Reset + migrate + seed (dev only)
```

## Structure

```
src/
├── app/               # Next.js App Router
├── features/          # Feature modules
│   ├── tasks/         #   Task CRUD, board, filters
│   ├── projects/      #   Project management
│   ├── auth/          #   Authentication flows
│   └── notifications/ #   Real-time notifications
├── shared/
│   ├── ui/            # shadcn/ui components
│   ├── lib/           # Utilities, helpers
│   └── services/      # Supabase clients, external APIs
└── __tests__/e2e/     # Playwright E2E tests
```

## Conventions

- **Server Components by default** — `'use client'` only for hooks/browser APIs
- **Path aliases** — `@/shared/ui/button`, never relative across features
- **Async params** — route params are Promises in Next.js 15
- **Naming** — camelCase functions, PascalCase components, kebab-case files
- **Server Actions for mutations** — not API routes
- **Semantic colors only** — `bg-primary`, never `bg-blue-600`
- **React Query for client state** — never `useEffect` for data fetching

## Context Loading

| Task | Read |
|------|------|
| Project architecture | @docs/architecture.md |
| Database schema | @docs/data-model.md |
| Server actions & API | @docs/api.md |
| Auth flows | @docs/auth.md |
| Architecture decisions | @docs/decisions/ |

| Task | Load Skill |
|------|------------|
| Building pages / layouts | `nextjs-app-router` |
| Database / auth / storage | `database` |
| Writing tests / stories | `testing` |
| UI components / theming | `ui-components` |

## Boundaries

### Always
- Server Components by default
- `npm run test:run` before committing
- `npm run db:types` after any schema change
- Query keys from `@/shared/services/queries/keys`

### Ask First
- Adding new dependencies
- Database schema changes
- New feature modules

### Never
- Commit `.env` or `.env.local`
- Hardcode colors (theming support)
- Skip RLS policies on new tables
- Use `useEffect` for data fetching (@docs/decisions/002-react-query.md)
