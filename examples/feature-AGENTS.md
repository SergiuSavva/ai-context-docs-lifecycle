# Feature: [Feature Name] - AI Context

> **EXAMPLE**: Use this for complex features that need dedicated AI context.
> Place in: `/features/<feature-name>/AGENTS.md`

---

## Overview

[1-2 sentences describing what this feature does]

**Example**: "Handles user authentication including login, registration, password reset, and session management."

---

## Key Files

| Type | Location | Purpose |
|------|----------|---------|
| Components | `./components/` | UI components |
| Hooks | `./hooks/` | Feature hooks |
| Utils | `./utils/` | Helper functions |
| Types | `./types.ts` | TypeScript types |
| API | `/app/api/auth/` | API endpoints |

---

## Patterns for This Feature

### Authentication Flow

```
1. User submits credentials
2. API validates against database
3. Session created with NextAuth
4. Redirect to dashboard
```

### State Management

- Session state: NextAuth `useSession()`
- Form state: React Hook Form
- Server state: React Query for user data

### Key Components

| Component | Purpose |
|-----------|---------|
| `LoginForm` | Email/password login |
| `RegisterForm` | New user registration |
| `AuthProvider` | Session context wrapper |

---

## Dependencies

### Requires
- Database (users table)
- Email service (for password reset)

### Used By
- All protected routes
- User profile feature
- Booking feature (for user context)

---

## Important Notes

1. **Never** store passwords in plain text - always hash with bcrypt
2. **Always** validate email format before API call
3. **Session** expires after 7 days of inactivity
4. **Protected routes** check auth in middleware, not components

---

## Related Docs

- Feature docs: `/docs/features/auth/`
- ADR: `/docs/decisions/002-auth-approach.md`
- Global tasks: `/docs/TASKS.md#authentication`
