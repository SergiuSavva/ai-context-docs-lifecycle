# ADR-002: React Query Over useEffect for Data Fetching

**Status:** Accepted
**Date:** 2026-01-18
**Context:** Standardizing client-side data fetching approach

## Decision

Use **React Query v5** for all client-side data fetching and cache management. Never use `useEffect` + `useState` for fetching data.

## Rationale

| Concern | useEffect | React Query |
|---------|-----------|-------------|
| Caching | Manual (re-fetch every mount) | Automatic (staleTime, gcTime) |
| Deduplication | None (duplicate requests) | Built-in (same queryKey = one request) |
| Loading/error states | Manual booleans | Automatic (`isLoading`, `isError`) |
| Optimistic updates | Complex (manual rollback) | Built-in (`onMutate`, `onError`) |
| Refetch on focus | Manual | Built-in |
| Pagination | Manual | Built-in (`useInfiniteQuery`) |

## Consequences

- All data fetching hooks use `useQuery` / `useMutation`
- Query keys centralized in `@/shared/services/queries/keys`
- Server Components fetch directly (no React Query needed)
- React Query only used in Client Components that need caching or reactivity

## Examples

```typescript
// ❌ Never do this
useEffect(() => {
  fetch('/api/tasks').then(r => r.json()).then(setTasks)
}, [])

// ✅ Always do this
const { data: tasks, isLoading } = useTasks(projectId)
```

## Related

- Query hook patterns: load skill `database` (React Query Integration section)
- Server-side fetching: @docs/decisions/001-server-first.md
- Query keys catalog: @docs/api.md
