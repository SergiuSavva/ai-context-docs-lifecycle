---
title: AGENTS.md Template
description: Root context file that gives AI instant understanding of your project
head: []
---

## Purpose

AGENTS.md is the entry point for AI agents. It provides instant context about your project — what it does, how to run it, and where to find things.

**Update when:** Architecture changes, new patterns emerge, or tech stack changes.

---

## Choose Your Template

| Project Type | Template |
|--------------|----------|
| Single App | [Single App Template](#single-app-template) |
| Package Monorepo | [Root Template](#monorepo-root-template) + [Package Template](#package-template) |
| Service Monorepo | [Root Template](#monorepo-root-template) + [Service Template](#service-template) |

---

## Single App Template

````markdown
# [Project Name] - AI Agent Instructions

> Quick context for AI coding assistants

## Quick Start

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Build for production
npm run build
```

## Project Overview

[1-2 sentences about what this project does]

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| Framework | [Framework] |
| Database | [Database] |
| Testing | [Test framework] |

## File Organization

```
src/
├── components/     # Reusable UI components
├── pages/          # Page components / routes
├── services/       # API and business logic
├── utils/          # Helper functions
└── types/          # TypeScript types
```

## Key Patterns

### [Pattern 1 Name]
[Brief description of how this is done in this project]

### [Pattern 2 Name]
[Brief description]

## Important Conventions

- [Convention 1]
- [Convention 2]
- [Convention 3]

## Active Work

See `docs/TASKS.md` for current progress.

## Need Help?

| Topic | Location |
|-------|----------|
| Architecture patterns | `.cursor/rules/project-architecture.mdc` |
| Coding conventions | `.cursor/rules/coding-patterns.mdc` |
| Feature specs | `docs/specs/` |
| Feature docs | `docs/features/` |
| Decisions | `docs/decisions/` |
````

---

## Customization Tips

1. **Be specific** — Replace all `[placeholders]` with real values
2. **Keep it current** — Update when major changes happen
3. **Quick Start matters** — Commands should work copy-paste
4. **Link to details** — AGENTS.md is overview, link to deep dives

---

## Example: Real Project

````markdown
# TechDocRAG - AI Agent Instructions

> RAG system for technical documentation search

## Quick Start

```bash
python -m venv venv && source venv/bin/activate
pip install -r requirements.txt
python -m src.cli embed ./docs
python -m src.cli ask "How do I configure logging?"
```

## Project Overview

A retrieval-augmented generation (RAG) system that indexes technical documentation and provides context-aware answers using local LLMs via Ollama.

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | Python 3.11 |
| LLM | Ollama (mistral:7b-instruct) |
| Embeddings | sentence-transformers |
| Vector DB | ChromaDB |
| Framework | LangChain |

## File Organization

```
src/
├── cli.py          # CLI entry point
├── embeddings/     # Document embedding
├── retrieval/      # Vector search
├── generation/     # LLM response generation
└── utils/          # Helpers
```

## Key Patterns

### Dependency Injection
All services receive dependencies via constructor, no global state.

### Async Where Possible
Use async/await for I/O operations, especially LLM calls.

## Need Help?

| Topic | Location |
|-------|----------|
| RAG pipeline | `.cursor/rules/rag-patterns.mdc` |
| CLI commands | `docs/features/cli/README.md` |
````

---

## Monorepo Root Template

For package or service monorepos. This goes at the repository root.

````markdown
# [Monorepo Name] - AI Agent Instructions

> Quick context for AI coding assistants

## Quick Start

```bash
# Install all dependencies
pnpm install

# Run all packages in dev mode
pnpm dev

# Run tests across all packages
pnpm test

# Build all packages
pnpm build
```

## Project Overview

[1-2 sentences about what this monorepo contains]

## Packages

| Package | Purpose | Location |
|---------|---------|----------|
| `web` | Frontend application | [`packages/web/`](packages/web/AGENTS.md) |
| `api` | Backend API server | [`packages/api/`](packages/api/AGENTS.md) |
| `shared` | Shared utilities | [`packages/shared/`](packages/shared/AGENTS.md) |

## Tech Stack (Shared)

| Category | Technology |
|----------|------------|
| Language | TypeScript |
| Package Manager | pnpm |
| Build Tool | Turborepo |
| Testing | Vitest |

## Repository Structure

```
├── packages/
│   ├── web/          # Frontend (see packages/web/AGENTS.md)
│   ├── api/          # Backend (see packages/api/AGENTS.md)
│   └── shared/       # Shared code (see packages/shared/AGENTS.md)
├── docs/             # Centralized documentation
└── .cursor/rules/    # Shared AI rules
```

## Cross-Package Patterns

### Shared Types
Import from `@repo/shared` — never duplicate types across packages.

### API Contracts
API types defined in `packages/shared/src/api/` — used by both web and api.

## Working in This Repo

1. **Single package work** — Read that package's AGENTS.md first
2. **Cross-package work** — Read this file + relevant package AGENTS.md files
3. **New package** — Create AGENTS.md in the new package folder

## Need Help?

| Topic | Location |
|-------|----------|
| Shared rules | `.cursor/rules/` |
| Package-specific | `packages/*/AGENTS.md` |
| Feature specs | `docs/specs/` |
| Decisions | `docs/decisions/` |
````

---

## Package Template

For individual packages within a monorepo. Place in each `packages/*/AGENTS.md`.

````markdown
# [Package Name] - AI Agent Instructions

> Part of [Monorepo Name] — see [root AGENTS.md](../../AGENTS.md) for overview

## Quick Start

```bash
# From repo root
pnpm --filter [package-name] dev
pnpm --filter [package-name] test
pnpm --filter [package-name] build

# Or from this directory
pnpm dev
```

## Package Purpose

[1-2 sentences about what this package does]

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Framework] |
| State | [State management] |
| Styling | [CSS solution] |

## File Organization

```
src/
├── components/     # UI components
├── hooks/          # Custom hooks
├── services/       # API calls
└── utils/          # Helpers
```

## Key Patterns

### [Pattern specific to this package]
[Description]

## Dependencies

| Depends On | For |
|------------|-----|
| `@repo/shared` | Types, utilities |
| `@repo/api` | API client (if applicable) |

## Need Help?

| Topic | Location |
|-------|----------|
| Monorepo overview | [../../AGENTS.md](../../AGENTS.md) |
| Shared patterns | `../../.cursor/rules/` |
| This package's features | `../../docs/features/[package]/` |
````

---

## Service Template

For individual services within a service monorepo. Place in each `services/*/AGENTS.md`.

````markdown
# [Service Name] Service - AI Agent Instructions

> Part of [System Name] — see [root AGENTS.md](../../AGENTS.md) for overview

## Quick Start

```bash
# Run this service
docker-compose up [service-name]

# Run with dependencies
docker-compose up [service-name] [dependency-service]

# Run tests
docker-compose run [service-name] npm test

# Local development (without Docker)
cd services/[service-name]
npm install && npm run dev
```

## Service Purpose

[1-2 sentences about what this service does]

## Tech Stack

| Category | Technology |
|----------|------------|
| Language | [Language] |
| Framework | [Framework] |
| Database | [Database if any] |
| Port | [Port number] |

## API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | `/health` | Health check |
| POST | `/api/[resource]` | [Purpose] |

## File Organization

```
src/
├── controllers/    # Request handlers
├── services/       # Business logic
├── models/         # Data models
└── utils/          # Helpers
```

## Key Patterns

### [Pattern specific to this service]
[Description]

## Service Dependencies

| Depends On | For |
|------------|-----|
| `postgres` | Data storage |
| `redis` | Caching |
| `auth-service` | Authentication |

## Environment Variables

| Variable | Purpose | Default |
|----------|---------|---------|
| `PORT` | Service port | `3000` |
| `DATABASE_URL` | DB connection | - |

## Need Help?

| Topic | Location |
|-------|----------|
| System overview | [../../AGENTS.md](../../AGENTS.md) |
| Shared patterns | `../../.cursor/rules/` |
| API contracts | `../../docs/features/api/` |
````

---

## Copy Paths

| Project Type | File | Location |
|--------------|------|----------|
| Single App | AGENTS.md | `/AGENTS.md` |
| Monorepo Root | AGENTS.md | `/AGENTS.md` |
| Package | AGENTS.md | `/packages/[name]/AGENTS.md` |
| Service | AGENTS.md | `/services/[name]/AGENTS.md` |
