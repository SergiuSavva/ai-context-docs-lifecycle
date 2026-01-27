# {{monorepo-name}}

> **AI Agent Instructions** - Monorepo router.
> Copy to monorepo root as `AGENTS.md` and commit to version control.

## Overview

{{One sentence describing what this monorepo contains}}

## Structure

```
{{monorepo-name}}/
├── packages/           # Shared packages
│   ├── {{web}}/       # {{Description}}
│   ├── {{api}}/       # {{Description}}
│   └── {{shared}}/    # {{Description}}
├── services/          # Deployable services
│   ├── {{service-1}}/ # {{Description}}
│   └── {{service-2}}/ # {{Description}}
└── infrastructure/    # IaC, CI/CD
```

## Global Commands

```bash
{{package-manager}} install          # Install all deps
{{package-manager}} build            # Build all packages
{{package-manager}} test             # Test all packages
{{package-manager}} lint             # Lint all packages
```

## Subproject Routing

**Read the AGENTS.md in the relevant subproject before working there:**

| Working On | Read First |
|------------|------------|
| Web frontend | @packages/web/AGENTS.md |
| API backend | @packages/api/AGENTS.md |
| Shared libraries | @packages/shared/AGENTS.md |
| {{Service 1}} | @services/{{service-1}}/AGENTS.md |
| {{Service 2}} | @services/{{service-2}}/AGENTS.md |
| Infrastructure | @infrastructure/AGENTS.md |

## Cross-Cutting Concerns

| Topic | Read |
|-------|------|
| Code style | @.cursor/rules/code-style.mdc |
| Git workflow | @docs/git-workflow.md |
| CI/CD | @docs/ci-cd.md |
| Architecture | @docs/architecture.md |

## Global Boundaries

### Always
- Run affected tests before committing
- Follow package-specific patterns (read its AGENTS.md)
- Use workspace dependencies, not external duplicates

### Ask First
- Adding new packages/services
- Cross-package breaking changes
- Shared dependency version bumps

### Never
- Commit secrets or .env files
- Modify another package without reading its AGENTS.md
- Push directly to main branch

---

## Tool Compatibility

| Tool | Discovery Method | Extra Setup |
|------|------------------|-------------|
| **Cursor** | Auto-reads `AGENTS.md` at project root | Nested `.cursor/rules/` per package for glob-based rules |
| **Claude Code** | Reads `CLAUDE.md` at project root | Create symlink: `ln -s AGENTS.md CLAUDE.md` |
| **GitHub Copilot** | Reads `.github/copilot-instructions.md` | Use for repo-wide rules |
| **Windsurf** | Auto-reads `AGENTS.md` or `.windsurfrules` | No extra setup needed |
