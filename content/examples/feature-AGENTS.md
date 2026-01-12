# Feature: Authentication - AI Context

> **REFERENCE ONLY**: This is a filled-in example showing the expected format.
> To create your own file, use `../templates/feature-AGENTS.md` and replace the placeholders.
> Do NOT copy this content directly - adapt the STRUCTURE, not the CONTENT.
>
> Place in: `/features/<feature-name>/AGENTS.md`

---

## Overview

Handles user authentication including login, registration, password reset, and session management for SpaceBooker.

---

## Key Files

| Type | Location | Purpose |
|------|----------|---------|
| Components | `./components/` | Login, Register, Forgot Password forms |
| Hooks | `./hooks/` | useAuth, useSession |
| Utils | `./utils/` | Token helpers, validation |
| Types | `./types.ts` | User, Session, AuthState types |
| API | `/app/api/auth/` | NextAuth.js API routes |

---

## Patterns for This Feature

### Authentication Flow

```
1. User submits credentials (email/password)
2. API validates against database (bcrypt compare)
3. Session created with NextAuth.js
4. JWT stored in HTTP-only cookie
5. Redirect to dashboard
```

### State Management

- Session state: NextAuth `useSession()` hook
- Form state: React Hook Form + Zod
- Loading states: Local useState in components

### Key Components

| Component | Purpose |
|-----------|---------|
| `LoginForm` | Email/password login with validation |
| `RegisterForm` | New user registration with email verification |
| `ForgotPasswordForm` | Password reset request |
| `AuthProvider` | Session context wrapper (wraps app) |
| `ProtectedRoute` | HOC for auth-required pages |

---

## Dependencies

### Requires
- Database (users table with email, passwordHash)
- Email service (Resend for password reset emails)
- Environment variables (NEXTAUTH_SECRET, etc.)

### Used By
- All protected routes (dashboard, bookings, profile)
- Booking feature (needs user context)
- Payment feature (needs user for billing)

---

## Important Notes

1. **Never** store passwords in plain text - always hash with bcrypt (cost factor 12)
2. **Always** validate email format and uniqueness before registration
3. **Session** expires after 7 days of inactivity
4. **Protected routes** check auth in middleware (`middleware.ts`), not components
5. **Password reset** tokens expire after 1 hour
6. **Rate limiting** applied to login endpoint (5 attempts per minute)

---

## Related Docs

- Feature docs: `/docs/features/auth/`
- ADR: `/docs/decisions/002-auth-nextauth.md`
- Global tasks: `/docs/TASKS.md#authentication`
