# Tasks: OAuth Authentication

> **Example**: This shows tasks.md after implementation is complete.

---

## Setup (Dependencies)

- [x] T-01: Create Google Cloud project and OAuth credentials
- [x] T-02: Add GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET to .env
- [x] T-03: Install NextAuth.js and Prisma adapter
- [x] T-04: Update Prisma schema with User, Account, Session models
- [x] T-05: Run database migration

## Core Implementation

- [x] T-06: Create NextAuth configuration in lib/auth.ts
- [x] T-07: Create API route at app/api/auth/[...nextauth]/route.ts
- [x] T-08: Create SessionProvider wrapper component
- [x] T-09: Add SessionProvider to root layout

## UI Components

- [x] T-10: Create LoginButton component
- [x] T-11: Create LogoutButton component
- [x] T-12: Create UserAvatar component
- [x] T-13: Create login page at app/login/page.tsx
- [x] T-14: Add auth UI to header component

## Route Protection

- [x] T-15: Create auth middleware (middleware.ts)
- [x] T-16: Configure protected route patterns
- [x] T-17: Create dashboard page at app/(protected)/dashboard/page.tsx
- [x] T-18: Test redirect for unauthenticated users

## Testing

- [x] T-19: Test complete login flow
- [x] T-20: Test logout flow
- [x] T-21: Test protected route access
- [x] T-22: Test session persistence

## Documentation

- [x] T-23: Update AGENTS.md with auth patterns
- [x] T-24: Document environment variables in .env.example
- [x] T-25: Create ADR for OAuth decision
- [x] T-26: Create feature README at docs/features/auth/

---

**Progress**: 26/26 (100%)
**Blocked**: None
**In Progress**: None

---

## Implementation Notes

### T-04: Prisma Schema Update

Added models for NextAuth.js:
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  accounts      Account[]
  sessions      Session[]
}

model Account {
  // ... NextAuth required fields
}

model Session {
  // ... NextAuth required fields
}
```

### T-06: NextAuth Configuration

Key configuration choices:
- Database adapter for sessions (not JWT)
- Google provider with profile scope
- Custom pages for login

### T-15: Middleware Configuration

Protected all routes under `/(protected)/`:
```typescript
export const config = {
  matcher: ['/(protected)/:path*']
}
```

---

## Files Created/Modified

**Created**:
- `src/lib/auth.ts`
- `src/app/api/auth/[...nextauth]/route.ts`
- `src/app/login/page.tsx`
- `src/app/(protected)/dashboard/page.tsx`
- `src/components/LoginButton.tsx`
- `src/components/LogoutButton.tsx`
- `src/components/UserAvatar.tsx`
- `src/components/SessionProvider.tsx`
- `src/middleware.ts`
- `docs/features/auth/README.md`
- `docs/decisions/015-oauth-google.md`

**Modified**:
- `prisma/schema.prisma`
- `src/app/layout.tsx`
- `src/components/Header.tsx`
- `.env.example`
- `AGENTS.md`
