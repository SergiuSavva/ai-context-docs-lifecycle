# Feature: Booking History

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/feature-readme.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> Place in: `/docs/features/<feature-name>/README.md`

---

## Metadata

| Field | Value |
|-------|-------|
| **Slug** | booking-history |
| **Status** | In Progress |
| **Last Updated** | 2025-01-09 |
| **Tags** | mvp, user-facing |

---

## Overview

Users can view their complete booking history, including past and upcoming reservations on SpaceBooker. This feature provides transparency and helps users track their activity on the platform.

---

## Goals

- [x] Users can access booking history from dashboard
- [x] History displays all booking statuses (completed, cancelled, upcoming)
- [ ] Users can filter and search their bookings
- [ ] Users can download receipts for completed bookings

---

## User Impact

**Who benefits:** All registered SpaceBooker users with at least one booking

**How they benefit:**
- Easy reference to past reservations
- Quick access to booking details and receipts
- Better tracking of spending and activity
- Documentation for expense reports

---

## Scope

### In Scope
- List view of all bookings (paginated)
- Filter by status (completed, cancelled, upcoming)
- Filter by date range
- Booking detail view
- Receipt download (PDF)

### Out of Scope
- Modifying past bookings
- Rebooking from history
- Analytics dashboard
- Calendar export

---

## Code Touchpoints

### Frontend

| Type | Location |
|------|----------|
| Routes | `app/(protected)/bookings/page.tsx` |
| | `app/(protected)/bookings/[id]/page.tsx` |
| Components | `features/bookings/components/BookingList.tsx` |
| | `features/bookings/components/BookingCard.tsx` |
| | `features/bookings/components/BookingDetail.tsx` |
| | `features/bookings/components/BookingFilters.tsx` |
| Hooks | `features/bookings/hooks/useBookings.ts` |
| | `features/bookings/hooks/useBookingDetail.ts` |

### Backend

| Type | Location |
|------|----------|
| API Routes | `app/api/bookings/route.ts` |
| | `app/api/bookings/[id]/route.ts` |
| | `app/api/bookings/[id]/receipt/route.ts` |
| Database | `bookings` table (existing) |
| Services | `lib/bookings/queries.ts` |
| | `lib/bookings/receipt.ts` |

---

## Dependencies

### Requires
- Authentication (user must be logged in)
- Existing bookings data
- Spaces data (for space details)

### Enables
- Receipt generation feature
- Booking analytics (future)
- Expense tracking integration (future)

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Cursor pagination | Better performance for users with many bookings |
| Server-side filtering | Reduce data transfer, faster filtering |
| Store space snapshot | Preserve booking details even if space deleted |

---

## Success Metrics

- [x] Page loads in < 2 seconds
- [ ] Users can find a booking in < 30 seconds
- [ ] Receipt downloads work on all supported browsers

---

## Related Documents

- [User Stories](./user-stories.md)
- [Tasks](./tasks.md)
- [PRD-lite](/docs/specs/booking-history.md)
- [ADR: Pagination](/docs/decisions/005-pagination-approach.md)
