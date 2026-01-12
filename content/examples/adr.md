# ADR-003: State Management Approach

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/adr.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> Place in: `/docs/decisions/NNN-title.md`

> **Status:** Accepted  
> **Date:** 2025-01-09  
> **Decision Makers:** Tech Lead, Senior Engineers

---

## Context

We need to choose a state management approach for SpaceBooker. The app has:
- Server data from APIs (spaces, bookings, users)
- Client UI state (modals, sidebar, filters)
- Form state (booking forms, profile editing)

We need something that handles all three efficiently without over-engineering.

---

## Decision

We will use:
- **React Query** for server state (API data, caching)
- **Zustand** for client-only UI state
- **React Hook Form + Zod** for form state

---

## Rationale

- React Query handles caching, refetching, and synchronization automatically
- Zustand is lightweight (1.2kb) and simpler than Redux for our needs
- Separating server and client state reduces complexity
- Team has experience with all three libraries
- All have excellent TypeScript support
- React Hook Form provides performant form handling without re-renders

---

## Consequences

### Positive

- Automatic cache invalidation and background refetching
- Simpler code than manual fetch + useState
- Built-in loading and error states
- DevTools available for debugging (React Query, Zustand)
- Forms don't cause unnecessary re-renders

### Negative

- Learning curve for team members new to React Query
- Three libraries instead of one unified solution
- Need to be careful about query key consistency
- Zustand stores can become scattered if not organized

### Neutral

- Bundle size increase (~35kb combined)
- Need to set up QueryClient provider in root layout
- Need Zod schemas that mirror Prisma types

---

## Alternatives Considered

### Alternative 1: Redux Toolkit + RTK Query

**Description:** Full Redux ecosystem with RTK Query for data fetching

**Pros:**
- Single unified solution
- Team has Redux experience
- Robust ecosystem
- Good DevTools

**Cons:**
- More boilerplate than React Query
- Overkill for our app size
- RTK Query less mature than React Query

**Why not chosen:** Too heavy for our needs. React Query handles our use cases with less code. We don't need time-travel debugging or complex state graphs.

### Alternative 2: SWR + Jotai

**Description:** Vercel's SWR for data fetching, Jotai for atomic state

**Pros:**
- Lightweight
- Simple APIs
- Good Next.js integration (SWR is from Vercel)

**Cons:**
- SWR mutations less elegant than React Query
- Jotai's atomic model requires mindset shift
- Smaller ecosystem

**Why not chosen:** React Query's mutation handling and DevTools are superior. Team more familiar with store-based state (Zustand).

### Alternative 3: Server Components Only

**Description:** Rely entirely on React Server Components, minimal client state

**Pros:**
- Simplest approach
- No additional libraries
- Best performance for static content

**Cons:**
- Doesn't work for interactive features (booking flow)
- No optimistic updates
- Complex for real-time features

**Why not chosen:** SpaceBooker requires significant interactivity (booking flow, filters, real-time availability). Pure RSC approach doesn't fit.

---

## Implementation Notes

1. Set up QueryClient in `app/providers.tsx` with default options
2. Create query key factory in `lib/query-keys.ts` for consistency
3. Create custom hooks per resource in `features/*/hooks/`
4. Use Zustand stores only for UI state (modals, sidebar, theme)
5. Document query key conventions in `coding-patterns.mdc`
6. Create Zod schemas that can be shared between forms and API validation

---

## Related Decisions

- [ADR-001: Tech Stack Selection](./001-tech-stack.md)
- [ADR-002: Authentication with NextAuth](./002-auth-nextauth.md)
- [ADR-005: Pagination Approach](./005-pagination-approach.md)

---

## References

- [React Query Docs](https://tanstack.com/query)
- [Zustand Docs](https://zustand-demo.pmnd.rs/)
- [React Hook Form Docs](https://react-hook-form.com/)
- Team discussion: Slack #architecture, 2025-01-05

---

*Recorded: 2025-01-09*  
*Last Updated: 2025-01-09*
