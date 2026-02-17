# API Reference

> All endpoints, server actions, or API surface for this project.

## Endpoints / Actions

### {{Resource Name}}

| Method / Action | Path / Signature | Description | Auth |
|----------------|-----------------|-------------|------|
| {{GET / action}} | {{/items or getItems()}} | {{List items}} | {{Yes/No}} |
| {{POST / action}} | {{/items or createItem()}} | {{Create item}} | {{Yes/No}} |
| {{GET / action}} | {{/items/:id or getItem(id)}} | {{Get single item}} | {{Yes/No}} |

### {{Resource Name}}

| Method / Action | Path / Signature | Description | Auth |
|----------------|-----------------|-------------|------|
| {{Method}} | {{Path}} | {{Description}} | {{Yes/No}} |

<!-- Adapt the table format to match your API style:
     - REST: Method + Path
     - GraphQL: Query/Mutation + Signature
     - gRPC: Service.Method
     - Server Actions: function signature
     Group by resource or domain area. -->

## Error Handling

{{Describe error return pattern: thrown exceptions, error objects, HTTP codes, etc.}}

```{{language}}
// Example error pattern
{{code example}}
```

## Related

<!-- Link to other project docs that exist. Remove entries for docs not in this project. -->
- {{@docs/data-model.md — data model backing these endpoints}}
- {{@docs/auth.md — authentication and authorization rules}}
- {{@docs/architecture.md — system overview}}
