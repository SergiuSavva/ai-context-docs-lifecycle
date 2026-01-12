---
title: Project Structure
description: Required folder structure and file organization for any project
head: []
---

## Purpose

Every project using AI Context Docs Lifecycle needs this minimum structure. It provides consistent locations for AI context, rules, and documentation.

---

## Project Types

The structure adapts based on your project type:

| Type | Detection Markers | AGENTS.md Location |
|------|-------------------|-------------------|
| Single App | No workspace markers | Root only |
| Package Monorepo | `packages/`, `apps/`, `turbo.json`, `nx.json`, `pnpm-workspace.yaml` | Root + each package |
| Service Monorepo | `services/`, `docker-compose.yml` | Root + each service |

---

## Single App Structure

```
project/
├── AGENTS.md                    # Root AI context (REQUIRED)
├── .cursor/
│   └── rules/
│       └── 00-index.mdc        # Rule index (REQUIRED)
└── docs/
    ├── INDEX.md                # Navigation (REQUIRED)
    ├── TASKS.md                # Progress tracking (REQUIRED)
    ├── specs/                  # Feature specifications
    │   └── _archive/           # Completed specs
    ├── features/               # Feature documentation
    └── decisions/              # Architecture decisions (ADRs)
```

---

## Package Monorepo Structure

For Turborepo, Nx, Lerna, or pnpm workspaces:

```
monorepo/
├── AGENTS.md                    # Root overview (REQUIRED)
├── .cursor/
│   └── rules/
│       └── 00-index.mdc        # Shared rules (REQUIRED)
├── packages/                    # or apps/
│   ├── web/
│   │   ├── AGENTS.md           # Web app context (REQUIRED)
│   │   ├── package.json
│   │   └── src/
│   ├── api/
│   │   ├── AGENTS.md           # API context (REQUIRED)
│   │   ├── package.json
│   │   └── src/
│   └── shared/
│       ├── AGENTS.md           # Shared lib context (REQUIRED)
│       ├── package.json
│       └── src/
└── docs/
    ├── INDEX.md                # Navigation (REQUIRED)
    ├── TASKS.md                # Cross-package tracking (REQUIRED)
    ├── specs/
    ├── features/
    └── decisions/
```

**Key principles:**
- `.cursor/rules/` stays at root — shared across all packages
- Each package gets its own `AGENTS.md` — focused context
- `docs/` stays at root — centralized documentation

---

## Service Monorepo Structure

For microservices with Docker Compose:

```
monorepo/
├── AGENTS.md                    # Root overview (REQUIRED)
├── .cursor/
│   └── rules/
│       └── 00-index.mdc        # Shared rules (REQUIRED)
├── services/
│   ├── auth/
│   │   ├── AGENTS.md           # Auth service context (REQUIRED)
│   │   ├── Dockerfile
│   │   └── src/
│   ├── payments/
│   │   ├── AGENTS.md           # Payments context (REQUIRED)
│   │   ├── Dockerfile
│   │   └── src/
│   └── gateway/
│       ├── AGENTS.md           # Gateway context (REQUIRED)
│       ├── Dockerfile
│       └── src/
├── docker-compose.yml
└── docs/
    ├── INDEX.md                # Navigation (REQUIRED)
    ├── TASKS.md                # Cross-service tracking (REQUIRED)
    ├── specs/
    ├── features/
    └── decisions/
```

**Key principles:**
- `.cursor/rules/` stays at root — shared patterns
- Each service gets its own `AGENTS.md` — service-specific context
- `docs/` stays at root — system-wide documentation

---

## Setup Commands

### Single App

```bash
mkdir -p .cursor/rules docs/specs/_archive docs/features docs/decisions
touch AGENTS.md .cursor/rules/00-index.mdc docs/INDEX.md docs/TASKS.md
```

### Package Monorepo

```bash
# Root structure
mkdir -p .cursor/rules docs/specs/_archive docs/features docs/decisions
touch AGENTS.md .cursor/rules/00-index.mdc docs/INDEX.md docs/TASKS.md

# Per-package AGENTS.md (repeat for each package)
touch packages/web/AGENTS.md
touch packages/api/AGENTS.md
touch packages/shared/AGENTS.md
```

### Service Monorepo

```bash
# Root structure
mkdir -p .cursor/rules docs/specs/_archive docs/features docs/decisions
touch AGENTS.md .cursor/rules/00-index.mdc docs/INDEX.md docs/TASKS.md

# Per-service AGENTS.md (repeat for each service)
touch services/auth/AGENTS.md
touch services/payments/AGENTS.md
touch services/gateway/AGENTS.md
```

---

## File Purposes

### AGENTS.md

Root-level AI context. First thing any AI agent reads.

**Contains:**
- Quick start commands
- Tech stack overview
- File organization
- Key patterns
- Links to detailed docs

**Update when:** Architecture changes, patterns change, tech stack changes

→ [Full template](/templates/agents-md/)

---

### .cursor/rules/00-index.mdc

Index of all AI rules. Always loaded by Cursor.

**Contains:**
- List of all rule files
- Purpose of each rule
- Quick reference

**Update when:** Adding or removing rules

→ [Full template](/templates/cursor-rules/)

---

### docs/INDEX.md

Navigation hub for all documentation.

→ [Full template](/templates/docs-index/)

---

### docs/TASKS.md

Global progress tracking across all features.

→ [Full template](/templates/docs-index/)

---

### docs/specs/

Feature specifications written BEFORE building.

**Organization options:**

```
# Flat (simple projects)
docs/specs/
├── feature-a.md
├── feature-b.md
└── _archive/

# Phased (milestone projects)
docs/specs/
├── phase-1/
├── phase-2/
└── _archive/

# Release-based (versioned products)
docs/specs/
├── v1.0/
├── v2.0/
└── _archive/
```

→ [PRD-lite template](/templates/prd-lite/)

---

### docs/features/

Living documentation for each feature.

```
docs/features/
├── auth/
│   ├── README.md
│   ├── user-stories.md
│   └── tasks.md
└── dashboard/
    └── README.md
```

→ [Feature docs template](/templates/feature-docs/)

---

### docs/decisions/

Architecture Decision Records.

```
docs/decisions/
├── README.md
├── ADR-001-database.md
├── ADR-002-auth.md
└── ADR-003-api.md
```

→ [ADR template](/templates/adr/)

---

## Tool-Specific Notes

| Tool | Configuration |
|------|---------------|
| **Cursor** | `.cursor/rules/` with `.mdc` files |
| **Claude Code** | `CLAUDE.md` at root |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Other AI** | Standard `.md` files anywhere |

---

## Verification Checklist

### All Project Types

- [ ] `AGENTS.md` exists at root
- [ ] `.cursor/rules/00-index.mdc` exists
- [ ] `docs/INDEX.md` exists
- [ ] `docs/TASKS.md` exists
- [ ] `docs/specs/` folder exists
- [ ] `docs/specs/_archive/` folder exists
- [ ] `docs/features/` folder exists
- [ ] `docs/decisions/` folder exists

### Monorepos Only (Additional)

- [ ] Root `AGENTS.md` lists all packages/services
- [ ] Each package/service has its own `AGENTS.md`
- [ ] Package `AGENTS.md` files focus on that component only
- [ ] Root `AGENTS.md` explains how packages relate to each other
