# Command Catalog

> Canonical runnable commands for this project. Load this file only for implementation, verification, or release tasks.

## Policy

- Do not invent commands.
- Prefer commands explicitly defined in project config (`package.json`, `Makefile`, `pyproject.toml`, etc.).
- Mark each command as `verified` or `inferred`.
- Before running destructive commands, ask first.

## Environment

| Key | Value |
|-----|-------|
| Package manager | {{e.g., pnpm}} |
| Runtime | {{e.g., Node.js 20}} |
| Working directory | {{e.g., repo root or package dir}} |

## Core Commands

| Task | Command | Status | Source |
|------|---------|--------|--------|
| Install dependencies | `{{command}}` | `verified` | `{{package.json / Makefile / docs}}` |
| Start dev server | `{{command}}` | `verified` | `{{package.json / Makefile / docs}}` |
| Run tests | `{{command}}` | `verified` | `{{package.json / Makefile / docs}}` |
| Lint / typecheck | `{{command}}` | `verified` | `{{package.json / Makefile / docs}}` |
| Build production artifact | `{{command}}` | `verified` | `{{package.json / Makefile / docs}}` |

## Optional Commands

| Task | Command | Status | Source |
|------|---------|--------|--------|
| Run migrations | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |
| Seed database | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |
| Start Storybook | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |
| Run E2E tests | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |
| Deploy | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |

## Verification Metadata

| Field | Value |
|-------|-------|
| Last verified date | {{YYYY-MM-DD}} |
| Verified by | {{human or automation}} |
| Notes | {{Assumptions, prerequisites, known caveats}} |

## Related

- Architecture: @docs/architecture.md
- API: @docs/api.md
- Auth: @docs/auth.md
- Data model: @docs/data-model.md
