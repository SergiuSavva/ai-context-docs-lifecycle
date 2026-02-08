# ADR-001: Server-First Architecture

**Status:** Accepted
**Date:** 2026-01-15
**Context:** Choosing rendering strategy for TaskFlow

## Decision

Use **Server Components by default** for all pages and data fetching. Client Components only when interactive state or browser APIs are required.

## Rationale

- **Performance** — less JavaScript shipped to client, faster initial load
- **Simplicity** — direct database access without API layer
- **Security** — sensitive logic stays on server, not exposed to client
- **Caching** — Next.js 15 built-in caching for server fetches

## Consequences

- Server Actions for all mutations (no REST API routes for CRUD)
- `'use client'` boundary pushed as low as possible in component tree
- React Query only for client-side state that needs caching/optimistic updates
- Forms use `useActionState` or native `<form action={}>` pattern

## Trade-offs Accepted

- Cannot use `useState`/`useEffect` in Server Components (by design)
- Real-time features need separate client-side subscription layer
- Testing Server Components requires async test setup
