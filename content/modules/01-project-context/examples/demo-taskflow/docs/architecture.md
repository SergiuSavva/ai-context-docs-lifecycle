# Architecture

> How TaskFlow is structured and why.

## System Overview

```mermaid
flowchart TB
    subgraph Client
        Browser[Browser]
    end

    subgraph "Next.js 15"
        MW[Middleware<br/>Auth + Redirect]
        SC[Server Components<br/>Data Fetching]
        CC[Client Components<br/>Interactivity]
        SA[Server Actions<br/>Mutations]
    end

    subgraph Supabase
        Auth[Auth Service]
        DB[(PostgreSQL)]
        Storage[File Storage]
        RT[Realtime]
    end

    Browser --> MW
    MW --> SC
    MW --> CC
    CC --> SA
    SC --> DB
    SA --> DB
    SA --> Storage
    CC --> RT
    MW --> Auth
```

## Request Flow

```mermaid
sequenceDiagram
    participant B as Browser
    participant M as Middleware
    participant P as Page (Server)
    participant A as Action (Server)
    participant S as Supabase

    B->>M: GET /tasks
    M->>M: Validate session cookie
    M->>P: Forward (authenticated)
    P->>S: Query tasks (RLS filtered)
    S-->>P: Task data
    P-->>B: Rendered HTML + RSC payload

    B->>A: POST createTask (Server Action)
    A->>S: Insert task
    S-->>A: Created task
    A->>A: revalidatePath('/tasks')
    A-->>B: Updated page
```

## Layer Architecture

```
┌─────────────────────────────────────────────────┐
│  Presentation Layer                              │
│  app/ — Pages, layouts, loading/error states     │
│  Route: URL → Page → Server Component            │
├─────────────────────────────────────────────────┤
│  Feature Layer                                   │
│  features/ — Domain logic grouped by feature     │
│  Each: components/ + hooks/ + actions/ + types   │
├─────────────────────────────────────────────────┤
│  Shared Layer                                    │
│  shared/ui/ — shadcn/ui components (design sys)  │
│  shared/lib/ — Utilities, cn(), formatters       │
│  shared/services/ — Supabase clients, queries    │
├─────────────────────────────────────────────────┤
│  Data Layer                                      │
│  Supabase — PostgreSQL + Auth + Storage          │
│  RLS policies enforce access at DB level         │
│  React Query — Client-side cache + mutations     │
└─────────────────────────────────────────────────┘
```

## Dependency Rules

```mermaid
flowchart TD
    app["app/ (pages)"]
    features["features/ (domain)"]
    shared["shared/ (ui, lib, services)"]
    supabase["Supabase (data)"]

    app --> features
    app --> shared
    features --> shared
    shared --> supabase

    features -.-x|"❌ never"| app
    shared -.-x|"❌ never"| features
    shared -.-x|"❌ never"| app
```

| Rule | Description |
|------|-------------|
| `app/` imports from `features/` and `shared/` | Pages compose features |
| `features/` imports from `shared/` only | Features are independent |
| `shared/` imports from external packages only | No upward dependencies |
| Features never import from each other | Use shared layer for cross-cutting |

## Key Decisions

| Decision | Rationale | ADR |
|----------|-----------|-----|
| Server-first rendering | Performance, security, simplicity | @docs/decisions/001-server-first.md |
| React Query over useEffect | Caching, dedup, optimistic updates | @docs/decisions/002-react-query.md |

## Related

- Data model: @docs/data-model.md
- API surface: @docs/api.md
- Auth flows: @docs/auth.md
