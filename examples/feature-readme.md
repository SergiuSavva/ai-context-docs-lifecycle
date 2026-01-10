# Feature: [Feature Name]

> **EXAMPLE**: Feature overview documentation.
> Place in: `/docs/features/<feature-name>/README.md`

---

## Metadata (Optional)

| Field | Value |
|-------|-------|
| **Slug** | booking-history |
| **Status** | In Progress |
| **Last Updated** | 2025-01-09 |
| **Tags** | mvp, user-facing |

---

## Overview

Users can view their complete booking history, including past and upcoming reservations. This feature provides transparency and helps users track their activity on the platform.

---

## Goals

- [ ] Users can access booking history from dashboard
- [ ] History displays all booking statuses (completed, cancelled, upcoming)
- [ ] Users can filter and search their bookings

---

## User Impact

**Who benefits:** All registered users with at least one booking

**How they benefit:**
- Easy reference to past reservations
- Quick access to booking details and receipts
- Better tracking of spending and activity

---

## Scope

### In Scope
- List view of all bookings
- Filter by status (completed, cancelled, upcoming)
- Filter by date range
- Booking detail view
- Receipt download

### Out of Scope
- Modifying past bookings
- Rebooking from history
- Analytics dashboard

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
| Hooks | `features/bookings/hooks/useBookings.ts` |
| | `features/bookings/hooks/useBookingDetail.ts` |

### Backend

| Type | Location |
|------|----------|
| API Routes | `app/api/bookings/route.ts` |
| | `app/api/bookings/[id]/route.ts` |
| Database | `bookings` table (existing) |
| Services | `lib/bookings/queries.ts` |

---

## Dependencies

### Requires
- Authentication (user must be logged in)
- Existing bookings data

### Enables
- Receipt generation feature
- Booking analytics (future)

---

## Key Decisions

| Decision | Rationale |
|----------|-----------|
| Cursor pagination | Better performance for users with many bookings |
| Server-side filtering | Reduce data transfer, faster filtering |

---

## Success Metrics

- [ ] Page loads in < 2 seconds
- [ ] Users can find a booking in < 30 seconds
- [ ] Receipt downloads work on all supported browsers

---

## Related Documents

- [User Stories](./user-stories.md)
- [Tasks](./tasks.md)
- [PRD-lite](/docs/specs/booking-history.md)
