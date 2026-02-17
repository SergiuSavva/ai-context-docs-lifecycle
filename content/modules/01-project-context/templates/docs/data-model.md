# Data Model

> Database schema, relationships, and access patterns.

## Entity Relationship Diagram

```mermaid
erDiagram
    {{entity_1}} ||--o{ {{entity_2}} : "{{relationship}}"
    {{entity_2}} ||--o{ {{entity_3}} : "{{relationship}}"

    {{entity_1}} {
        {{id_type}} id PK
        {{type}} {{field_name}}
        {{type}} created_at
    }

    {{entity_2}} {
        {{id_type}} id PK
        {{id_type}} {{entity_1}}_id FK
        {{type}} {{field_name}}
        {{type}} created_at
    }
```

<!-- Replace with your actual entity relationships.
     Adapt ID types to match your database (uuid, integer, ObjectId, etc.) -->

## Tables / Collections

### Core

| Name | Purpose | Access Control |
|------|---------|----------------|
| `{{table_1}}` | {{Description}} | {{e.g., public read, authenticated write}} |
| `{{table_2}}` | {{Description}} | {{e.g., owner-only}} |

<!-- Use "Tables" for SQL databases, "Collections" for document stores.
     Access Control column: describe who can read/write (RLS policies, middleware checks, etc.) -->

## Enums / Constants

| Name | Values | Meaning |
|------|--------|---------|
| `{{enum_name}}` | `{{value_1}}`, `{{value_2}}` | {{Description}} |

<!-- Define enums in whatever format your stack uses:
     - SQL: CREATE TYPE ... AS ENUM
     - TypeScript: union types or enum
     - Python: Enum class
     - Document DB: allowed values in schema validation -->

## Access Patterns

### Common Queries

| Query | Table(s) / Collection(s) | Index |
|-------|--------------------------|-------|
| {{Description}} | `{{table}}` | `{{index_name}}` |

## Generated Types

```{{language}}
// Types generated from or representing your data model
type {{Entity}} = {{type definition or ORM model reference}}

// Joined / populated types for common queries
type {{EntityWithRelation}} = {{Entity}} & {
  {{relation}}: {{RelatedEntity}} | null
}
```

<!-- Replace with your actual type generation pattern:
     - Supabase: Tables<'table_name'>
     - Prisma: Prisma.EntityGetPayload<{}>
     - SQLAlchemy: model classes
     - Mongoose: Schema.Types
     Omit this section if types are defined inline with the ORM. -->

## Related

<!-- Link to other project docs that exist. Remove entries for docs not in this project. -->
- {{@docs/architecture.md — system overview}}
- {{@docs/api.md — API surface that uses this data model}}
