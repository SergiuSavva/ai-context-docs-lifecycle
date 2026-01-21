# API Reference

## Base URL

`[https://api.example.com/v1]`

## Authentication

**Type**: [Bearer / Cookie / API Key]
**Header**: `Authorization: Bearer <token>`

## Endpoints

### [Resource Name]

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/items` | List items | Yes |
| POST | `/items` | Create item | Yes |
| GET | `/items/:id` | Get item | Yes |

### [Resource Name]

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| [Method] | [Path] | [Description] | [Yes/No] |

## Error Codes

| Code | Meaning |
|------|---------|
| 400 | Bad Request |
| 401 | Unauthorized |
| 403 | Forbidden |
| 404 | Not Found |
| 500 | Server Error |
