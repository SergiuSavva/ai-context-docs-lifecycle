# Design: [Feature Name]

> **Template**: Copy to `docs/specs/<feature-name>/design.md` (Complex Flow only)
> Use after research.md to document HOW to build the chosen approach.

---

## Overview

[1-2 paragraphs: What are we building and how? Summary of the technical approach.]

---

## Architecture

### System Context

```
┌─────────────────────────────────────────────────────────────────┐
│                         System Context                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐     ┌─────────────────┐     ┌─────────────────┐   │
│  │  User   │ ──► │   This Feature  │ ──► │ External System │   │
│  └─────────┘     └─────────────────┘     └─────────────────┘   │
│                          │                                      │
│                          ▼                                      │
│                  ┌─────────────────┐                           │
│                  │    Database     │                           │
│                  └─────────────────┘                           │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Component Structure

```
┌─────────────────────────────────────────────────────────────────┐
│                      Feature Components                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────┐     ┌─────────────────┐                   │
│  │   Component A   │ ──► │   Component B   │                   │
│  │   (UI Layer)    │     │  (Logic Layer)  │                   │
│  └─────────────────┘     └────────┬────────┘                   │
│                                   │                             │
│                                   ▼                             │
│                          ┌─────────────────┐                   │
│                          │   Component C   │                   │
│                          │  (Data Layer)   │                   │
│                          └─────────────────┘                   │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Data Model

### New Tables/Entities

| Entity | Purpose | Key Fields |
|--------|---------|------------|
| [entity_name] | [Description] | id, field1, field2 |

### Schema (if applicable)

```sql
-- Example: New table
CREATE TABLE table_name (
  id UUID PRIMARY KEY,
  field1 TEXT NOT NULL,
  field2 INTEGER,
  created_at TIMESTAMP DEFAULT now()
);
```

### Relationships

```
Entity A  1───*  Entity B
    │
    1
    │
    *
Entity C
```

---

## API Design

### Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| GET | `/api/resource` | List resources | Yes |
| POST | `/api/resource` | Create resource | Yes |
| GET | `/api/resource/:id` | Get single | Yes |
| PATCH | `/api/resource/:id` | Update | Yes |
| DELETE | `/api/resource/:id` | Delete | Yes |

### Request/Response Examples

```json
// POST /api/resource
// Request
{
  "name": "Example",
  "description": "Optional"
}

// Response
{
  "data": {
    "id": "uuid",
    "name": "Example",
    "created_at": "2026-01-19T00:00:00Z"
  }
}
```

---

## File Structure

```
features/<feature>/
├── components/
│   ├── ComponentA.tsx
│   └── index.ts
├── hooks/
│   └── useFeature.ts
├── utils/
│   └── helpers.ts
├── types.ts
└── index.ts
```

---

## State Management

| State Type | Location | Why |
|------------|----------|-----|
| Server data | [React Query / SWR / etc.] | Caching, sync |
| Form data | [React Hook Form / etc.] | Validation |
| UI state | useState | Component-local |
| URL state | [nuqs / searchParams] | Shareable |

---

## Error Handling

| Error | User Message | Recovery |
|-------|--------------|----------|
| Network error | "Connection lost" | Auto-retry |
| Validation error | Field-specific | Highlight fields |
| Not found | "Not found" | Redirect to list |
| Unauthorized | "Please log in" | Redirect to login |

---

## Performance Considerations

- [Optimization 1: e.g., pagination for large lists]
- [Optimization 2: e.g., lazy loading]
- [Target metrics: e.g., < 500ms load time]

---

## Security Considerations

- [Auth requirement]
- [Data validation]
- [Access control rules]

---

## Open Questions

- [ ] [Question 1 requiring decision]
- [ ] [Question 2 requiring decision]

---

## Related Documents

- [feature-spec.md](./feature-spec.md) - Requirements
- [research.md](./research.md) - Options evaluated
- [tasks.md](./tasks.md) - Implementation tasks

---

*Created: [Date]*
*Status: Draft | Approved*
