# ADR-001: [Decision Title]

> **Status:** Proposed  
> **Date:** YYYY-MM-DD  
> **Decision Makers:** [Names/Roles]

---

## Context

[Describe the context and problem. What issue or question prompted this decision? Include relevant background information.]

Example:
> We need to choose a state management approach for our React application. The app will have both server data (from APIs) and client UI state. We need something that handles both efficiently without over-engineering.

---

## Decision

[State the decision clearly and concisely.]

Example:
> We will use React Query for server state and React's built-in useState/useContext for local UI state.

---

## Rationale

[Explain why this decision was made. What factors were considered?]

Example:
> - React Query handles caching, refetching, and synchronization automatically
> - Separating server and client state reduces complexity
> - Built-in React state is sufficient for UI-only concerns
> - Team has experience with this pattern

---

## Consequences

### Positive

- [Benefit 1]
- [Benefit 2]
- [Benefit 3]

### Negative

- [Drawback 1]
- [Drawback 2]

### Neutral

- [Side effect that's neither good nor bad]

---

## Alternatives Considered

### Alternative 1: [Name]

**Description:** [Brief description]

**Pros:**
- [Pro]

**Cons:**
- [Con]

**Why not chosen:** [Reason]

### Alternative 2: [Name]

**Description:** [Brief description]

**Why not chosen:** [Reason]

---

## Implementation Notes

[Any notes about how to implement this decision]

---

## Related Decisions

- [ADR-XXX: Related Decision](./XXX-related.md)

---

## References

- [Link to relevant documentation]
- [Link to discussion/issue]

---

*Recorded: [Date]*  
*Last Updated: [Date]*
