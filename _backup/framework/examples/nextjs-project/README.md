# Example: Next.js Project Setup

> A concrete example of the framework applied to a Next.js 15 + React 19 project.

---

## Directory Structure

```
my-nextjs-app/
├── app/                          # Next.js App Router
│   ├── layout.tsx
│   ├── page.tsx
│   └── [feature]/
│       └── page.tsx
│
├── features/                     # Feature modules
│   ├── auth/
│   ├── [feature]/
│   └── ...
│
├── shared/                       # Shared code
│   ├── ui/                       # UI components (shadcn/ui)
│   ├── lib/                      # Utilities
│   └── components/               # Shared components
│
├── __tests__/                    # Tests
│
├── docs/                         # Documentation ← Framework lives here
│   ├── reference/
│   │   ├── architecture.md
│   │   ├── code-map.md
│   │   └── data-model.md
│   ├── specs/
│   │   └── YYYY-MM-DD-feature/
│   ├── decisions/
│   │   └── ADR-001-*.md
│   └── _archive/
│
├── .cursor/rules/                # AI rules
│   ├── 00-index.mdc
│   ├── project.mdc
│   ├── architecture.mdc
│   ├── typescript-react.mdc
│   ├── testing.mdc
│   └── ui-design.mdc
│
└── [config files]
```

---

## Example: code-map.md

```markdown
# Code Map

> Last Updated: 2025-01-02

## Entry Points

| Path | Purpose | When to Start Here |
|------|---------|-------------------|
| `app/layout.tsx` | Root layout | Adding providers, global styles |
| `app/page.tsx` | Home page | Understanding app structure |
| `app/api/` | API routes | Adding backend endpoints |
| `middleware.ts` | Request middleware | Auth, redirects |

## Directory Structure

\`\`\`
my-nextjs-app/
├── app/                    # Routes (file-based routing)
│   ├── (auth)/            # Auth route group
│   ├── (dashboard)/       # Dashboard route group
│   └── api/               # API routes
│
├── features/              # Feature modules
│   ├── auth/              # Authentication
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── types.ts
│   │   └── index.ts
│   └── [feature]/
│
├── shared/                # Shared across features
│   ├── ui/               # shadcn/ui components
│   ├── lib/              # Utilities (cn, supabase client)
│   └── components/       # Shared React components
│
└── __tests__/            # Test files mirror source structure
\`\`\`

## Key Modules

### features/auth/

**Purpose**: User authentication (login, logout, session)

**Key Files**:
| File | Purpose |
|------|---------|
| `hooks/use-auth.ts` | Auth state hook |
| `components/LoginForm.tsx` | Login UI |
| `types.ts` | Auth types |

**Used by**: All protected routes

### shared/ui/

**Purpose**: shadcn/ui component library

**Pattern**: Components are copied from shadcn, not imported as package.

**Key Files**:
| File | Purpose |
|------|---------|
| `button.tsx` | Button variants |
| `input.tsx` | Form inputs |
| `card.tsx` | Card container |

## Quick Find

| Looking For | Location |
|-------------|----------|
| Add new page | `app/[route]/page.tsx` |
| Add API endpoint | `app/api/[endpoint]/route.ts` |
| Add UI component | `shared/ui/` |
| Feature logic | `features/[feature]/` |
| Database types | `shared/lib/supabase/database.types.ts` |
| Tests | `__tests__/` |
```

---

## Example: project.mdc

```markdown
---
description: Next.js project rules for AI assistants
globs:
  - "**/*"
---

# MyApp - AI Agent Rules

## Project Context

**What**: A [description] built with Next.js 15 and React 19.

**Tech Stack**:
- Frontend: Next.js 15, React 19, TypeScript 5.x
- Styling: Tailwind CSS 4, shadcn/ui
- Database: Supabase (PostgreSQL)
- Testing: Vitest, Storybook, Playwright

## Quick Start

\`\`\`bash
npm install
npm run dev        # localhost:3000
npm test           # Vitest
npm run storybook  # localhost:6006
\`\`\`

## Critical Rules

### Path Aliases - ALWAYS Use

\`\`\`tsx
// ✅ CORRECT
import { Button } from '@/shared/ui/button'
import { useAuth } from '@/features/auth'

// ❌ WRONG - Never do this
import { Button } from '../../../shared/ui/button'
\`\`\`

### Server vs Client Components

\`\`\`tsx
// Server Component (default) - NO 'use client'
// ✅ Can: fetch data, access backend, async
// ❌ Cannot: useState, useEffect, event handlers

// Client Component - ADD 'use client'
'use client'
// ✅ Can: hooks, interactivity, browser APIs
// ❌ Cannot: direct database access
\`\`\`

### Component Structure

\`\`\`tsx
// 1. Directive (if needed)
'use client'

// 2. Imports (external → internal → relative)
import { useState } from 'react'
import { Button } from '@/shared/ui/button'
import { helperFn } from './utils'

// 3. Types
interface Props {
  title: string
  onSubmit: () => void
}

// 4. Component
export function MyComponent({ title, onSubmit }: Props) {
  // hooks first
  const [state, setState] = useState('')
  
  // handlers
  const handleClick = () => { ... }
  
  // render
  return (...)
}
\`\`\`

## Data Fetching

### Server Components (Preferred)

\`\`\`tsx
// app/users/page.tsx
import { createServerClient } from '@/shared/lib/supabase/server'

export default async function UsersPage() {
  const supabase = createServerClient()
  const { data } = await supabase.from('users').select()
  return <UserList users={data} />
}
\`\`\`

### Client Components (When needed)

\`\`\`tsx
'use client'
import { useQuery } from '@tanstack/react-query'
import { getUsers } from '@/features/users/api'

export function UserList() {
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  })
  // ...
}
\`\`\`

## Testing

- **Vitest**: Unit/integration tests in `__tests__/`
- **Storybook**: Visual development in `stories/`
- **Playwright**: E2E for critical flows only

\`\`\`tsx
// __tests__/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import { Button } from '@/shared/ui/button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })
})
\`\`\`

## Current Work

**Active Spec**: `docs/specs/2025-01-02-user-dashboard/spec.md`

## Resources

- Code map: `docs/reference/code-map.md`
- Architecture: `docs/reference/architecture.md`
```

---

## Example: Spec for a Feature

`docs/specs/2025-01-02-user-dashboard/spec.md`:

```markdown
# User Dashboard

> **Status**: In Progress
> **Owner**: Frontend Team
> **Created**: 2025-01-02

## Why

Users need a central place to see their activity, bookings, and account status.

## What

### In Scope
- [ ] Dashboard page at `/dashboard`
- [ ] Recent bookings widget (last 5)
- [ ] Account summary card
- [ ] Quick actions (new booking, edit profile)

### Out of Scope
- Analytics/charts (future)
- Notifications center (separate spec)

## Acceptance Criteria

- [ ] **AC1**: `/dashboard` accessible when logged in
- [ ] **AC2**: Redirects to `/login` when not authenticated
- [ ] **AC3**: Shows last 5 bookings with status
- [ ] **AC4**: Shows user name and email in account card
- [ ] **AC5**: "New Booking" button links to `/spaces`
- [ ] **AC6**: Page loads in <500ms

## Technical Approach

### Key Files
- `app/(dashboard)/dashboard/page.tsx` - Main page (server component)
- `features/dashboard/components/RecentBookings.tsx` - Bookings widget
- `features/dashboard/components/AccountCard.tsx` - Account summary

### Data
- Fetch from `bookings` table (user's bookings)
- Fetch from `users` table (profile info)

## Doc Impact

- [ ] Update `code-map.md` with dashboard module
- [ ] No ADR needed (standard patterns)

## Tasks

- [ ] T1: Create dashboard page skeleton
- [ ] T2: Implement RecentBookings component
- [ ] T3: Implement AccountCard component
- [ ] T4: Add quick action buttons
- [ ] T5: Add loading states
- [ ] T6: Write tests
```

---

## Example: ADR

`docs/decisions/ADR-001-react-query-over-swr.md`:

```markdown
# ADR-001: React Query over SWR for Data Fetching

> **Status**: Accepted
> **Date**: 2025-01-02
> **Deciders**: Tech Lead

## Context

We need a client-side data fetching library for:
- Caching API responses
- Background refetching
- Optimistic updates
- Query invalidation

Both React Query (TanStack Query) and SWR are popular choices.

## Decision

We will use **React Query v5** for all client-side data fetching.

## Alternatives Considered

### Option 1: SWR

**Pros**:
- Simpler API
- Smaller bundle size
- Made by Vercel (Next.js team)

**Cons**:
- Less powerful mutation handling
- Fewer features for complex scenarios
- Manual cache invalidation

### Option 2: React Query ← Chosen

**Pros**:
- Powerful mutation/invalidation
- DevTools for debugging
- Better TypeScript support
- Query cancellation built-in
- Optimistic updates are easier

**Cons**:
- Slightly larger bundle
- More concepts to learn

**Why chosen**: Our app has complex booking flows that benefit from React Query's mutation handling and automatic cache invalidation.

## Consequences

### Positive
- Easier optimistic updates for bookings
- Better DevTools debugging
- Consistent patterns across features

### Negative
- Slightly larger bundle (+10kb gzipped)
- Team needs to learn React Query patterns

### Mitigation
- Document patterns in `.cursor/rules/`
- Use code splitting to minimize impact

## References

- [React Query Docs](https://tanstack.com/query)
- [Comparison article](https://...)
```

---

## Adapting to Your Project

1. **Copy this structure** as a starting point
2. **Modify paths** to match your conventions
3. **Add domain-specific rules** as you develop
4. **Create specs** for your actual features

The framework is flexible - use what helps, skip what doesn't.

