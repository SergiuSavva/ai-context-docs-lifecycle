# ADR-001: [Decision Title]

> **EXAMPLE**: Architecture Decision Record template.
> Place in: `/docs/decisions/NNN-title.md`

> **Status:** Proposed | Accepted | Deprecated | Superseded  
> **Date:** 2025-01-09  
> **Decision Makers:** [Names/Roles]

---

## Context

[Describe the context and problem. What issue or question prompted this decision?]

**Example**:
> We need to choose a state management approach for our React application. The app will have both server data (from APIs) and client UI state. We need something that handles both efficiently without over-engineering.

---

## Decision

[State the decision clearly and concisely.]

**Example**:
> We will use React Query for server state and Zustand for client-only UI state.

---

## Rationale

[Explain why this decision was made. What factors were considered?]

**Example**:
- React Query handles caching, refetching, and synchronization automatically
- Zustand is lightweight and simpler than Redux for our needs
- Separating server and client state reduces complexity
- Team has experience with both libraries
- Both have excellent TypeScript support

---

## Consequences

### Positive

- Automatic cache invalidation and background refetching
- Simpler code than manual fetch + useState
- Built-in loading and error states
- DevTools available for debugging

### Negative

- Learning curve for team members new to React Query
- Two libraries instead of one unified solution
- Need to be careful about query key consistency

### Neutral

- Bundle size increase (~30kb combined)
- Need to set up QueryClient provider

---

## Alternatives Considered

### Alternative 1: Redux Toolkit + RTK Query

**Description:** Full Redux ecosystem with RTK Query for data fetching

**Pros:**
- Single unified solution
- Team has Redux experience
- Robust ecosystem

**Cons:**
- More boilerplate than React Query
- Overkill for our app size
- RTK Query less mature than React Query

**Why not chosen:** Too heavy for our needs. React Query handles our use cases with less code.

### Alternative 2: SWR

**Description:** Vercel's data fetching library

**Pros:**
- Lightweight
- Simple API
- Good Next.js integration

**Cons:**
- Less features than React Query
- Mutations less elegant
- Smaller ecosystem

**Why not chosen:** React Query's mutation handling and DevTools are superior for our needs.

---

## Implementation Notes

1. Set up QueryClient in `app/providers.tsx`
2. Create custom hooks per resource in `features/*/hooks/`
3. Use Zustand stores only for UI state (modals, sidebars, etc.)
4. Document query key conventions in coding-patterns.mdc

---

## Related Decisions

- [ADR-002: API Design](./002-api-design.md)
- [ADR-005: Error Handling](./005-error-handling.md)

---

## References

- [React Query Docs](https://tanstack.com/query)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- Team discussion: [Link to Slack/Issue]

---

*Recorded: 2025-01-09*  
*Last Updated: 2025-01-09*
