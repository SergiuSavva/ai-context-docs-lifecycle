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

## Error Handling

{{Describe error return pattern: thrown exceptions, error objects, HTTP codes, etc.}}

```typescript
// Example error pattern
{{code example}}
```

## Revalidation / Caching

| Mutation | Revalidates |
|----------|-------------|
| {{Create item}} | {{/items path}} |
| {{Update item}} | {{/items path + item-detail tag}} |

## Related

- Data model: @docs/data-model.md
- Auth flows: @docs/auth.md
- Architecture: @docs/architecture.md
