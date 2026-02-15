# Data Model

> Database schema, relationships, and access patterns.

## Entity Relationship Diagram

```mermaid
erDiagram
    {{entity_1}} ||--o{ {{entity_2}} : "{{relationship}}"
    {{entity_2}} ||--o{ {{entity_3}} : "{{relationship}}"

    {{entity_1}} {
        uuid id PK
        string name
        timestamp created_at
    }

    {{entity_2}} {
        uuid id PK
        uuid {{entity_1}}_id FK
        string title
        timestamp created_at
    }
```

## Tables

### Core

| Table | Purpose | RLS |
|-------|---------|-----|
| `{{table_1}}` | {{Description}} | {{Policy}} |
| `{{table_2}}` | {{Description}} | {{Policy}} |

## Enums

```sql
CREATE TYPE {{enum_name}} AS ENUM ('{{value_1}}', '{{value_2}}', '{{value_3}}');
```

| Value | Meaning |
|-------|---------|
| `{{value_1}}` | {{Description}} |
| `{{value_2}}` | {{Description}} |

## Access Patterns

### Common Queries

| Query | Table(s) | Index |
|-------|----------|-------|
| {{Description}} | `{{table}}` | `idx_{{name}}` |

## TypeScript Types

```typescript
// Generated from database schema
type {{Entity}} = Tables<'{{table}}'>

// Joined types for common queries
type {{EntityWithRelation}} = {{Entity}} & {
  {{relation}}: {{RelatedEntity}} | null
}
```

## Related

- Architecture overview: @docs/architecture.md
- API / Server Actions: @docs/api.md
