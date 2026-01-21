# ADR-015: OAuth Authentication with Google

> **Example**: This is a filled-in ADR demonstrating the Complex Flow output.

---

## Status

**Accepted**

---

## Context

Users need secure authentication to access the workspace app. We evaluated several options:

1. Build our own email/password authentication
2. Use Google OAuth
3. Use GitHub OAuth
4. Use Auth0 (managed service)

Key requirements:
- Secure, industry-standard authentication
- Easy for users (no new passwords)
- Low maintenance for our team
- Works with Next.js App Router
- Reasonable cost at scale

---

## Decision

Use **Google OAuth 2.0** via **NextAuth.js** with **database-backed sessions**.

---

## Rationale

1. **Widest user reach**: Almost everyone has a Google account, maximizing accessibility
2. **Zero cost**: Google OAuth is free at any scale, unlike Auth0
3. **Excellent Next.js integration**: NextAuth.js is purpose-built for Next.js and handles complexity
4. **Security handled by Google**: Token management, consent flow, and security updates are Google's responsibility
5. **Database sessions over JWT**: Better for session revocation and doesn't expose tokens to client
6. **Easy to extend**: Can add more providers (GitHub, Twitter) later via NextAuth.js

---

## Consequences

### Positive

- No password storage or management
- Industry-standard security (OAuth 2.0)
- Fast implementation (~2 days)
- Low ongoing maintenance
- Users get single sign-on experience
- Session revocation is straightforward

### Negative

- Users without Google accounts cannot log in initially
- Dependency on Google's availability
- Requires Google Cloud project setup
- Database sessions add ~10-20ms per request

---

## Alternatives Considered

### Email/Password Authentication

**What**: Build custom authentication with email and password.

**Rejected because**:
- High security risk (password storage, reset flows, brute force protection)
- More code to maintain
- Worse UX (users must remember another password)
- Requires email verification flow

### GitHub OAuth

**What**: Use GitHub as the OAuth provider.

**Rejected because**:
- Limited user base (not everyone has GitHub)
- Less suitable for non-developer audiences
- Would need to add Google later anyway

### Auth0

**What**: Use Auth0 managed authentication service.

**Rejected because**:
- Costs $23/month at 1000+ monthly active users
- Overkill for our current needs
- Another vendor dependency
- Lock-in concerns

---

## Implementation

- **Auth library**: NextAuth.js v5
- **Session storage**: PostgreSQL via Prisma adapter
- **Route protection**: Next.js middleware
- **Feature docs**: `docs/features/auth/README.md`
- **Code location**: `src/lib/auth.ts`, `src/app/api/auth/`

---

## References

- [Research document](../specs/_archive/oauth-auth/research.md)
- [NextAuth.js Documentation](https://next-auth.js.org/)
- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)

---

## Metadata

- **Date**: 2026-01-19
- **Decision makers**: Engineering team
- **Related feature**: OAuth Authentication
- **Supersedes**: None
