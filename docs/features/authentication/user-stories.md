# User Stories: Authentication

## Actors

| Actor | Description |
|-------|-------------|
| **Guest** | Unauthenticated visitor |
| **User** | Authenticated user with an account |

---

## Stories Overview

| ID | Title | Actor | Priority | Status |
|----|-------|-------|----------|--------|
| US-001 | User Registration | Guest | P0 | ✅ Done |
| US-002 | User Login | Guest | P0 | ✅ Done |
| US-003 | User Logout | User | P0 | ✅ Done |
| US-004 | Password Reset | Guest | P0 | 🔄 In Progress |
| US-005 | Session Persistence | User | P1 | ✅ Done |

---

## User Stories

### US-001: User Registration

**Priority:** P0 (Critical) ✅ Complete

**As a** guest  
**I want** to create an account with my email and password  
**So that** I can access protected features

#### Acceptance Criteria

- [x] **AC-001.1**: Given I'm on the signup page, when I enter valid email and password, then my account is created
- [x] **AC-001.2**: Given I enter an email that's already registered, when I submit, then I see an error message
- [x] **AC-001.3**: Given I enter a weak password, when I submit, then I see password requirements
- [x] **AC-001.4**: Given registration succeeds, when complete, then I'm redirected to the dashboard

#### Notes

- Password minimum: 8 characters
- Email format validated client and server side
- Rate limiting: 5 attempts per minute per IP

---

### US-002: User Login

**Priority:** P0 (Critical) ✅ Complete

**As a** guest  
**I want** to log in with my email and password  
**So that** I can access my account

#### Acceptance Criteria

- [x] **AC-002.1**: Given I have an account, when I enter correct credentials, then I'm logged in
- [x] **AC-002.2**: Given I enter wrong credentials, when I submit, then I see a generic error (no info leak)
- [x] **AC-002.3**: Given I'm logged in, when I visit login page, then I'm redirected to dashboard

#### Notes

- Generic error message: "Invalid email or password"
- Rate limiting: 5 attempts per minute per account

---

### US-003: User Logout

**Priority:** P0 (Critical) ✅ Complete

**As a** user  
**I want** to log out of my account  
**So that** my session is ended securely

#### Acceptance Criteria

- [x] **AC-003.1**: Given I'm logged in, when I click logout, then my session is terminated
- [x] **AC-003.2**: Given I've logged out, when I try to access protected pages, then I'm redirected to login

---

### US-004: Password Reset

**Priority:** P0 (Critical) 🔄 In Progress

**As a** guest  
**I want** to reset my forgotten password  
**So that** I can regain access to my account

#### Acceptance Criteria

- [ ] **AC-004.1**: Given I'm on forgot-password page, when I enter my email, then I receive a reset link
- [ ] **AC-004.2**: Given I click the reset link, when I enter a new password, then my password is updated
- [ ] **AC-004.3**: Given the reset link is expired (>1 hour), when I click it, then I see an expiry message
- [ ] **AC-004.4**: Given I reset my password, when complete, then all other sessions are invalidated

#### Notes

- Reset link valid for 1 hour
- One active reset link per account
- Email sent even if account doesn't exist (prevent enumeration)

---

### US-005: Session Persistence

**Priority:** P1 (High) ✅ Complete

**As a** user  
**I want** my session to persist across browser closes  
**So that** I don't have to log in every time

#### Acceptance Criteria

- [x] **AC-005.1**: Given I'm logged in, when I close and reopen browser, then I'm still logged in
- [x] **AC-005.2**: Given my session is 7+ days old without activity, when I return, then I need to log in again

#### Notes

- Session lifetime: 7 days of inactivity
- Refresh token rotated on use

---

## Edge Cases

| Scenario | Expected Behavior |
|----------|-------------------|
| Multiple tabs logged in | All tabs share session |
| Login on new device | Creates new session, old remains valid |
| Password change | Other sessions invalidated |
| Account deletion | All sessions immediately invalidated |

---

## Non-Functional Requirements

| Requirement | Target |
|-------------|--------|
| Login response time | < 500ms |
| Concurrent sessions | Up to 5 per user |
| Password storage | bcrypt with cost factor 12 |

---

## Related Documents

- [Feature README](./README.md)
- [Tasks](./tasks.md)

---

*Last updated: 2025-01-01*
