# User Stories: OAuth Authentication

> **Example**: This is a filled-in user stories document demonstrating the Complex Flow.

---

## US-01: Login with Google

**As a** new or returning user
**I want to** log in with my Google account
**So that** I don't need to create or remember another password

### Acceptance Criteria

- [x] AC-01: "Login with Google" button visible on login page
- [x] AC-02: Clicking button redirects to Google consent screen
- [x] AC-03: After Google approval, user redirected to dashboard
- [x] AC-04: User's Google profile (name, avatar) stored in database

### Scenario

**Given** I am on the login page
**When** I click "Login with Google"
**Then** I am redirected to Google's OAuth consent screen
**And** after I approve, I am logged in and see my dashboard

---

## US-02: Access Protected Routes

**As a** logged-in user
**I want to** access protected pages
**So that** I can use the app's features

### Acceptance Criteria

- [x] AC-05: Logged-in users can access /dashboard
- [x] AC-06: Non-logged users redirected to /login when accessing /dashboard
- [x] AC-07: Session persists across page refreshes
- [x] AC-08: Session persists after browser restart (within expiry)

### Scenario

**Given** I am logged in
**When** I navigate to /dashboard
**Then** I see the dashboard content

**Given** I am NOT logged in
**When** I navigate to /dashboard
**Then** I am redirected to /login

---

## US-03: Logout

**As a** logged-in user
**I want to** log out securely
**So that** my session is terminated and my account is protected

### Acceptance Criteria

- [x] AC-09: Logout button visible in header when logged in
- [x] AC-10: Clicking logout clears the session
- [x] AC-11: After logout, user redirected to homepage
- [x] AC-12: After logout, protected routes are inaccessible

### Scenario

**Given** I am logged in
**When** I click the "Logout" button
**Then** my session is cleared
**And** I am redirected to the homepage
**And** I can no longer access /dashboard without logging in again

---

## US-04: View Profile

**As a** logged-in user
**I want to** see my profile information
**So that** I know which account I'm logged in as

### Acceptance Criteria

- [x] AC-13: User avatar displayed in header
- [x] AC-14: User name displayed in header or dropdown
- [x] AC-15: Profile page shows email and avatar

### Scenario

**Given** I am logged in
**When** I look at the header
**Then** I see my Google avatar and name

---

## Acceptance Criteria Summary

| ID | Criterion | Story | Status |
|----|-----------|-------|--------|
| AC-01 | Login button visible | US-01 | [x] |
| AC-02 | Redirect to Google | US-01 | [x] |
| AC-03 | Redirect to dashboard after login | US-01 | [x] |
| AC-04 | Profile stored in database | US-01 | [x] |
| AC-05 | Access /dashboard when logged in | US-02 | [x] |
| AC-06 | Redirect to /login when not logged in | US-02 | [x] |
| AC-07 | Session persists on refresh | US-02 | [x] |
| AC-08 | Session persists on browser restart | US-02 | [x] |
| AC-09 | Logout button visible | US-03 | [x] |
| AC-10 | Logout clears session | US-03 | [x] |
| AC-11 | Redirect to homepage after logout | US-03 | [x] |
| AC-12 | Protected routes inaccessible after logout | US-03 | [x] |
| AC-13 | Avatar in header | US-04 | [x] |
| AC-14 | Name in header | US-04 | [x] |
| AC-15 | Profile page with details | US-04 | [x] |

---

## Edge Cases

- **User denies Google consent**: Show error message, stay on login page
- **Google OAuth error**: Show generic error, allow retry
- **Session expires while using app**: Redirect to login on next protected request
- **User revokes app access in Google**: Session invalidated on next request

---

## Out of Scope for This Feature

- Password reset (no passwords)
- Email verification (Google verifies)
- Account deletion
- Multiple account support
