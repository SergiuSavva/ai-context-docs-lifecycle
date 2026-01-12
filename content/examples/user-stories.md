# User Stories: Booking History

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/user-stories.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> Place in: `/docs/features/<feature-name>/user-stories.md`

---

## Actors

| Actor | Description |
|-------|-------------|
| **User** | Registered SpaceBooker user with at least one booking |
| **Admin** | Platform administrator (future) |

---

## Stories Overview

| ID | Title | Actor | Priority |
|----|-------|-------|----------|
| US-001 | View booking history | User | P0 |
| US-002 | Filter bookings | User | P1 |
| US-003 | View booking details | User | P0 |
| US-004 | Download receipt | User | P2 |

---

## User Stories

### US-001: View Booking History

**Priority:** P0 (Critical)

**As a** registered SpaceBooker user  
**I want** to see a list of all my bookings  
**So that** I can track my reservation history

#### Acceptance Criteria

- [x] **AC-001.1**: Given I am logged in, when I navigate to "My Bookings", then I see a list of all my bookings
- [x] **AC-001.2**: Given I have bookings, when the list loads, then each booking shows: space name, date, status, total price
- [x] **AC-001.3**: Given I have no bookings, when I view the list, then I see an empty state with a CTA to browse spaces

#### Notes

- List should be paginated (20 items per page)
- Most recent bookings appear first
- Include loading skeleton while fetching

---

### US-002: Filter Bookings

**Priority:** P1 (High)

**As a** user with many bookings  
**I want** to filter my booking history  
**So that** I can quickly find specific reservations

#### Acceptance Criteria

- [ ] **AC-002.1**: Given I am viewing booking history, when I select a status filter, then only bookings with that status appear
- [ ] **AC-002.2**: Given I am viewing booking history, when I select a date range, then only bookings within that range appear
- [ ] **AC-002.3**: Given I have applied filters, when I clear filters, then all bookings appear again

#### Notes

- Filters should be combinable (status AND date range)
- URL should reflect filter state (shareable links)
- Persist filter preference in localStorage

---

### US-003: View Booking Details

**Priority:** P0 (Critical)

**As a** user  
**I want** to view the full details of a booking  
**So that** I can see all information about my reservation

#### Acceptance Criteria

- [x] **AC-003.1**: Given I click on a booking, when the detail page loads, then I see: space details, booking dates/times, price breakdown, status
- [ ] **AC-003.2**: Given the booking is upcoming, when I view details, then I see cancellation options
- [ ] **AC-003.3**: Given the booking is completed, when I view details, then I see option to download receipt

#### Notes

- Include link back to space page (if space still exists)
- Show host contact info for confirmed bookings
- Display cancellation policy for upcoming bookings

---

### US-004: Download Receipt

**Priority:** P2 (Medium)

**As a** user  
**I want** to download a receipt for completed bookings  
**So that** I have documentation for expense tracking

#### Acceptance Criteria

- [ ] **AC-004.1**: Given a completed booking, when I click "Download Receipt", then a PDF downloads
- [ ] **AC-004.2**: Given the receipt, when I view it, then it includes: booking ID, dates, price breakdown, payment info, space details, SpaceBooker logo

#### Notes

- PDF should be printer-friendly
- Include SpaceBooker logo and contact info
- Receipt should work for tax purposes

---

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| User has 1000+ bookings | Pagination handles gracefully, no performance issues |
| Booking cancelled by host | Shows "Cancelled by host" status, refund info if applicable |
| Space no longer exists | Shows booking with space name snapshot, "Space unavailable" note |
| Booking in disputed status | Shows "Under Review" with support contact |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Performance | List loads in < 2s |
| Accessibility | WCAG 2.1 AA compliant |
| Mobile | Fully responsive |
| Browser Support | Chrome, Firefox, Safari, Edge (latest 2 versions) |

---

## Related Documents

- [Feature README](./README.md)
- [Tasks](./tasks.md)
