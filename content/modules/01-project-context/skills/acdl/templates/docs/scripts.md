# Command Catalog

> Canonical runnable commands for this project. Load this file only for implementation, verification, or release tasks.

## Policy

- Do not invent commands.
- Prefer commands explicitly defined in project config (`package.json`, `Makefile`, `pyproject.toml`, `Cargo.toml`, `Taskfile`, etc.).
- Mark each command as `verified` or `inferred`.
- Before running destructive commands, ask first.

## Environment

| Key | Value |
|-----|-------|
| Package manager | {{e.g., pnpm, pip, cargo, go}} |
| Runtime | {{e.g., Node.js 20, Python 3.12, Go 1.22}} |
| Working directory | {{e.g., repo root or package dir}} |

## Core Commands

| Task | Command | Status | Source |
|------|---------|--------|--------|
| Install dependencies | `{{command}}` | `verified` | `{{source file}}` |
| Start dev server | `{{command}}` | `verified` | `{{source file}}` |
| Run tests | `{{command}}` | `verified` | `{{source file}}` |
| Lint / typecheck | `{{command}}` | `verified` | `{{source file}}` |
| Build | `{{command}}` | `verified` | `{{source file}}` |

## Optional Commands

| Task | Command | Status | Source |
|------|---------|--------|--------|
| {{task description}} | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |
| {{task description}} | `{{command}}` | `{{verified|inferred}}` | `{{source}}` |

<!-- Add project-specific commands here. Common examples:
     - Run migrations, seed database
     - Start documentation server
     - Run E2E / integration tests
     - Deploy to staging / production
     - Generate code / types
     Only include commands that actually exist in the project. -->

## Verification Metadata

| Field | Value |
|-------|-------|
| Last verified date | {{YYYY-MM-DD}} |
| Verified by | {{human or automation}} |
| Notes | {{Assumptions, prerequisites, known caveats}} |

## Related

<!-- Link to other project docs that exist. Remove entries for docs not in this project. -->
- {{@docs/architecture.md — system overview}}
- {{Other relevant project docs}}
