# GitHub Copilot Instructions

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/copilot-instructions.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> **Location**: Save as `.github/copilot-instructions.md` in your project.

---

## Project Overview

SpaceBooker: A SaaS platform for booking creative workspaces.

---

## Tech Stack

- **Language**: TypeScript (strict mode)
- **Framework**: Next.js 15 (App Router)
- **Database**: PostgreSQL with Prisma ORM
- **Styling**: Tailwind CSS
- **Testing**: Vitest + Playwright

---

## Code Style Guidelines

### TypeScript
- Use strict TypeScript - no `any` types
- Prefer `interface` for object shapes, `type` for unions
- Always add explicit return types to functions
- Use optional chaining (`?.`) and nullish coalescing (`??`)

### React/Next.js
- Default to Server Components
- Add `'use client'` only when hooks or interactivity needed
- Use named exports for components
- Props interfaces named `ComponentNameProps`

### Imports
- Use `@/` path alias for all project imports
- Order: external packages → internal modules → relative → types
- No default exports except pages/layouts

### Naming Conventions
- Components: `PascalCase` (files and exports)
- Functions/variables: `camelCase`
- Constants: `SCREAMING_SNAKE_CASE`
- Files: `kebab-case` (except React components)

---

## Project Structure

```
app/           → Next.js App Router pages and API routes
components/    → Shared React components
  ui/          → Base primitives (Button, Input, etc.)
  common/      → Layout components (Header, Footer)
features/      → Feature modules with collocated code
  auth/        → Authentication
  bookings/    → Booking system
  spaces/      → Space management
lib/           → Utilities, API clients, database
types/         → Shared TypeScript types
docs/          → Project documentation
```

---

## Patterns to Follow

### State Management
- Server state: React Query (`@tanstack/react-query`)
- Client state: Zustand (minimal stores)
- Form state: React Hook Form + Zod

### Data Fetching
- Use Server Components for initial data
- Client-side mutations via React Query
- API routes return typed responses

### Error Handling
- Use Error Boundaries for UI errors
- try-catch in API routes with proper status codes
- Zod for validation with helpful error messages

### Testing
- Unit tests next to source files (`*.test.ts`)
- Integration tests in `__tests__/` directories
- E2E tests in `e2e/` folder

---

## Component Template

When creating React components, follow this pattern:

```tsx
interface BookingCardProps {
  booking: Booking;
  onCancel?: (id: string) => void;
  className?: string;
}

export function BookingCard({ booking, onCancel, className }: BookingCardProps) {
  return (
    <div className={className}>
      <h3>{booking.space.name}</h3>
      <p>{formatDate(booking.date)}</p>
      {onCancel && (
        <button onClick={() => onCancel(booking.id)}>Cancel</button>
      )}
    </div>
  );
}
```

---

## API Route Template

When creating API routes, follow this pattern:

```ts
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { prisma } from '@/lib/db';

const CreateBookingSchema = z.object({
  spaceId: z.string().uuid(),
  date: z.string().datetime(),
  duration: z.number().min(1).max(8),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const data = CreateBookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        ...data,
        userId: session.user.id,
      },
    });

    return NextResponse.json({ success: true, data: booking });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: error.errors }, { status: 400 });
    }
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
```

---

## Common Gotchas

1. **Server Components**: Cannot use hooks or browser APIs
2. **Client Components**: Must add `'use client'` directive
3. **Path aliases**: Always use `@/` not relative paths
4. **Prisma**: Run `npx prisma generate` after schema changes
5. **Environment**: Check `.env.example` for required variables
6. **Bookings**: Always check availability before creating

---

## Documentation

- Specs (what to build): `docs/specs/`
- Features (implementation details): `docs/features/`
- Decisions (why we chose X): `docs/decisions/`
- Progress tracking: `docs/TASKS.md`

---

## Before Suggesting Code

1. Check if similar patterns exist in codebase
2. Follow established naming conventions
3. Consider Server vs Client Component requirements
4. Add appropriate TypeScript types
5. Include error handling
6. For bookings, check availability logic
