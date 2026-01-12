# Feature: Booking History

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/prd-lite.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> Place in: `/docs/specs/<feature-name>.md`

> **Status:** In Progress  
> **Priority:** P1 (High)  
> **Estimated Effort:** 3 days

---

## Problem

Users currently cannot see their booking history, making it difficult to track past reservations or reference previous visits. This leads to support requests and poor user experience on SpaceBooker.

---

## Success Metrics

How do we know this feature is successful?

- [x] Users can view booking history within 2 clicks from dashboard
- [ ] 90% of users can complete the flow without errors
- [ ] Support tickets about booking history reduced by 50%

---

## Scope

### In Scope

- List of past bookings with status (completed, cancelled, upcoming)
- Filter by date range
- Filter by status
- View booking details
- Download receipt/invoice (PDF)

### Out of Scope

- Modifying past bookings (separate feature)
- Analytics/insights on bookings (Phase 2)
- Export to calendar (future enhancement)
- Rebooking from history (future enhancement)

---

## Key User Stories

### Primary Story

**As a** registered SpaceBooker user  
**I want** to view my past bookings  
**So that** I can reference previous reservations and track my activity

### Supporting Stories

1. **As a** user, **I want** to filter bookings by date **so that** I can find specific reservations
2. **As a** user, **I want** to download a receipt **so that** I have records for expense tracking
3. **As a** user, **I want** to see booking status **so that** I know which bookings are confirmed vs cancelled

---

## User Flow

```
Dashboard
    ↓
"My Bookings" link (sidebar)
    ↓
Booking History (list view, paginated)
    ↓
Click booking → Detail view
    ↓
Download receipt (optional)
```

---

## Technical Approach

### Key Decisions

| Decision | Approach | Rationale |
|----------|----------|-----------|
| Data source | Existing `bookings` table | No new tables needed |
| Pagination | Cursor-based | Better performance for large lists |
| Filtering | Server-side | Reduce data transfer, faster filtering |
| PDF generation | `@react-pdf/renderer` | Existing dependency, good React integration |

### Dependencies

- Auth feature (user must be logged in)
- Existing bookings API
- Spaces data (for space details in history)

---

## Risks & Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| Large booking history slow | Medium | Cursor pagination, lazy loading |
| Receipt generation complex | Low | Use existing PDF library |
| Space deleted but booking exists | Low | Store space name snapshot in booking |

---

## Open Questions

- [x] Should cancelled bookings appear in history? **Yes, with clear status**
- [x] How far back should history go? **All time, paginated**
- [ ] Should we show refund info for cancelled bookings?

---

## Related Documents

- Feature docs: [/docs/features/booking-history/](../features/booking-history/)
- Tasks: [/docs/TASKS.md](../TASKS.md)
- ADR: [/docs/decisions/005-pagination-approach.md](../decisions/005-pagination-approach.md)
