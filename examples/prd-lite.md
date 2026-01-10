# Feature: [Feature Name]

> **EXAMPLE**: Lightweight PRD for feature specification.
> Place in: `/docs/specs/<feature-name>.md` or `/docs/specs/<phase>/<feature-name>.md`

> **Status:** Draft | In Progress | Complete  
> **Priority:** P0 (Critical) | P1 (High) | P2 (Medium)  
> **Estimated Effort:** [X days/hours]

---

## Problem

[1-2 sentences describing what pain point this feature solves. Be specific about who has the problem and why it matters.]

**Example**:
> Users currently cannot see their booking history, making it difficult to track past reservations or reference previous visits. This leads to support requests and poor user experience.

---

## Success Metrics

How do we know this feature is successful?

- [ ] Users can view booking history within 2 clicks
- [ ] 90% of users can complete the flow without errors
- [ ] Support tickets about booking history reduced by 50%

---

## Scope

### In Scope

- List of past bookings with status
- Filter by date range
- View booking details
- Download receipt/invoice

### Out of Scope

- Modifying past bookings (separate feature)
- Analytics/insights on bookings (Phase 2)
- Export to calendar (future enhancement)

---

## Key User Stories

### Primary Story

**As a** registered user  
**I want** to view my past bookings  
**So that** I can reference previous reservations and track my activity

### Supporting Stories

1. **As a** user, **I want** to filter bookings by date **so that** I can find specific reservations
2. **As a** user, **I want** to download a receipt **so that** I have records for expenses

---

## User Flow

```
Dashboard
    ↓
"My Bookings" link
    ↓
Booking History (list view)
    ↓
Click booking → Detail view
    ↓
Download receipt (optional)
```

---

## Technical Approach

_Skip if implementation is straightforward._

### Key Decisions

| Decision | Approach | Rationale |
|----------|----------|-----------|
| Data source | Existing bookings table | No new tables needed |
| Pagination | Cursor-based | Better performance for large lists |

### Dependencies

- Auth feature (user must be logged in)
- Existing bookings API

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large booking history slow | Medium | Implement pagination, lazy loading |
| Receipt generation complex | Low | Use existing PDF library |

---

## Open Questions

- [ ] Should cancelled bookings appear in history?
- [ ] How far back should history go?

---

## Related Documents

- Feature docs: [/docs/features/booking-history/](../features/booking-history/)
- Tasks: [/docs/TASKS.md](../TASKS.md)
