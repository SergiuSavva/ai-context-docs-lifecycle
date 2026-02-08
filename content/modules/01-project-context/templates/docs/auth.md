# Authentication

> Auth provider, session management, and route protection.

## Auth Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant M as Middleware
    participant S as Auth Provider

    Note over B,S: Sign In
    B->>S: {{sign in method}}
    S-->>B: Session + redirect

    Note over B,S: Authenticated Request
    B->>M: Request (with session)
    M->>S: Validate session
    S-->>M: Valid
    M-->>B: Allow

    Note over B,S: Unauthenticated
    B->>M: Request (no session)
    M-->>B: Redirect to /login
```

## Protected Routes

| Route Pattern | Auth Required | Redirect |
|---------------|--------------|----------|
| `/` | No | — |
| `/login`, `/signup` | No (redirect if logged in) | → `/dashboard` |
| `/dashboard/**` | Yes | → `/login` |

## Auth Provider

| Context | Client | Why |
|---------|--------|-----|
| {{Server}} | {{client type}} | {{reason}} |
| {{Client}} | {{client type}} | {{reason}} |

## Role-Based Access

| Role | Permissions |
|------|-------------|
| `{{role_1}}` | {{Description}} |
| `{{role_2}}` | {{Description}} |
| `{{role_3}}` | {{Description}} |

## Related

- Server Actions catalog: @docs/api.md
- Data model (roles table): @docs/data-model.md
