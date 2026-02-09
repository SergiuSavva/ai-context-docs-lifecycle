# AGENTS.md Best Practices

> **Research-backed guide** for writing effective AGENTS.md files based on analysis of 2,500+ repositories.

---

## What is AGENTS.md?

A standardized markdown file that serves as **"a README for AI agents"**. It provides context and instructions that AI coding assistants need but would clutter a human-focused README.

**Supported by 20+ tools**: Cursor, Claude Code, GitHub Copilot, VS Code, Zed, OpenAI Codex, and more.

---

## The Router Pattern (Recommended)

Keep AGENTS.md **compact (50-80 lines, 150 max)** and reference detailed docs dynamically.

### Why?

| Monolithic (all-in-one) | Modular (router pattern) |
|------------------------|--------------------------|
| Wastes tokens on irrelevant context | Loads only what's needed |
| Hard to maintain | Team-owned sections |
| More noise = worse responses | Focused = accurate output |
| Breaks at ~150 lines | Scales to any codebase |

### Structure

```
project/
├── AGENTS.md                 # Compact router (50-80 lines, 150 max)
├── docs/
│   ├── architecture.md       # Detailed architecture
│   ├── testing.md            # Testing guidelines
│   └── api.md                # API patterns
└── .cursor/rules/            # Tool-specific rules
    ├── code-style.mdc
    └── doc-style.mdc
```

---

## Six Essential Areas

Top-performing AGENTS.md files cover:

| Area | What to Include |
|------|-----------------|
| **Commands** | Build, test, lint with exact flags |
| **Testing** | How to run, coverage requirements |
| **Project Structure** | Where files belong |
| **Code Style** | Key patterns (or reference to rules) |
| **Git Workflow** | Branch naming, commit format |
| **Boundaries** | What AI should never touch |

---

## Commands, References, and Skills

### How important is the `Commands` section?

High importance. Missing commands force AI to guess and guesses are often wrong.

Include at least:

- one install/setup command
- one local run command
- one test command
- one lint/typecheck command
- one build command

Keep this section short and executable. Prefer stable wrapper commands (for example `pnpm test`, `make test`, `just test`) over long one-off CLI flags.

### Should AGENTS.md reference docs or config files?

Use both, with clear roles:

- `AGENTS.md`: quick, runnable commands and routing hints
- docs in `docs/`: human explanation and workflow context
- config files (`package.json`, `Makefile`, `pyproject.toml`, etc.): machine source of truth

Practical rule: put the command in `AGENTS.md`, then point to the owning doc/config when details are needed.

### Should we include skill commands?

Usually no in the `Commands` section. Skill *invocation syntax* is tool-specific.

What to include instead:

- skill routing in `Context Loading` (when to read which skill)
- skill file paths (for example `@.agents/skills/database/SKILL.md`)

Put tool-specific invocation examples (for example slash commands or UI actions) in tool-specific rule/docs, not in universal AGENTS.md.

---

## Best Practices

### 1. Be Specific, Not Vague

```markdown
# Bad
You are a helpful coding assistant.

# Good
React 18 with TypeScript 5.3, Vite 5, and Tailwind CSS 3.4.
Components in src/components/, tests co-located as *.test.tsx.
```

### 2. Use Three-Tier Boundaries

```markdown
## Boundaries

### Always
- Run tests before committing
- Follow patterns in existing codebase

### Ask First
- Adding new dependencies
- Database schema changes

### Never
- Commit .env files or secrets
- Modify /generated directories
- Push directly to main
```

### 3. Put Commands Early with Full Syntax

```markdown
## Commands

```bash
pnpm install              # Install dependencies
pnpm dev                  # Start dev server (localhost:3000)
pnpm test                 # Run tests (must pass before commit)
pnpm test:watch           # Watch mode
pnpm lint                 # Lint (auto-fixes what it can)
pnpm build                # Production build
```
```

### 4. Use Dynamic Context Loading

```markdown
## Context Loading

Load based on your task:

| Task | Read First |
|------|------------|
| Architecture | @docs/architecture.md |
| Components | @docs/components.md |
| Code style | @.cursor/rules/code-style.mdc |
| Testing | @docs/testing.md |
```

The `@path/to/file` syntax works in Claude Code. Other tools use hierarchical discovery (nearest file wins).

### 5. Keep It Concise

- Aim for **50-80 lines (150 max)** in root AGENTS.md
- Move detailed content to referenced docs
- Every line should earn its place

---

## Anti-Patterns to Avoid

| Anti-Pattern | Why It's Bad |
|--------------|--------------|
| Vague personas | "Helpful assistant" gives no useful guidance |
| Missing commands | AI guesses wrong commands |
| No boundaries | Leads to destructive mistakes |
| Generic tech stack | "React project" vs "React 18 + TypeScript 5.3" |
| All content inline | Wastes tokens, buries signal |
| Theoretical ideals | Document real patterns from your codebase |

---

## Monorepo Support

Use **nested AGENTS.md files** - the nearest file to edited code takes precedence.

### Structure

```
monorepo/
├── AGENTS.md                    # Router (minimal, routes to subprojects)
├── packages/
│   ├── web/
│   │   ├── AGENTS.md           # Web-specific (React patterns)
│   │   └── .cursor/rules/      # Web-specific rules
│   ├── api/
│   │   ├── AGENTS.md           # API-specific (Go/Node patterns)
│   │   └── .cursor/rules/      # API-specific rules
│   └── shared/
│       └── AGENTS.md           # Shared libraries
├── services/
│   ├── auth-lambda/
│   │   └── AGENTS.md           # Lambda-specific
│   └── email-worker/
│       └── AGENTS.md           # Worker-specific
└── .cursor/rules/               # Global rules (inherited by all)
```

### Root AGENTS.md (Router Pattern)

The root file should be **minimal (50-80 lines)** - just routing:

```markdown
# Acme Monorepo

## Structure
- packages/web - React frontend
- packages/api - Go backend
- services/* - AWS Lambdas

## Subproject Routing

**Read the relevant AGENTS.md before working:**

| Working On | Read First |
|------------|------------|
| Web frontend | @packages/web/AGENTS.md |
| API backend | @packages/api/AGENTS.md |
| Shared libs | @packages/shared/AGENTS.md |
| Lambdas | @services/[name]/AGENTS.md |

## Global Boundaries
- Never modify another package without reading its AGENTS.md
- Use workspace dependencies, not external duplicates
```

### Subproject AGENTS.md

Each package/service gets its own detailed context:

```markdown
# packages/api

## Stack
Go 1.22, Chi router, PostgreSQL 16

## Commands
go run ./cmd/api        # Dev server
go test ./...           # Tests
make migrate            # Run migrations

## This Package's Patterns
- Handlers in /internal/handlers/
- Business logic in /internal/service/
- Repository pattern for DB access

## Dependencies
- @acme/shared - Common types
- @acme/auth - Auth utilities
```

### Key Principles

1. **Root = Router**: Minimal routing, not detailed content
2. **Subproject = Full Context**: Each package has complete instructions
3. **Nearest Wins**: AI uses closest AGENTS.md to current file
4. **Inheritance**: Global `.cursor/rules/` inherited by all packages

### Templates

Use the monorepo templates from Module 1:
- [Monorepo Root Template](../modules/01-project-context/templates/AGENTS-monorepo-root.md)
- [Subproject Template](../modules/01-project-context/templates/AGENTS-monorepo-subproject.md)

---

## Tool Compatibility

### The Fragmentation Problem

Every tool created its own format:

| Tool | File |
|------|------|
| Cursor | `.cursorrules` → `.cursor/rules/*.mdc` |
| Claude Code | `CLAUDE.md` + `.claude/rules/*.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Windsurf | `.windsurfrules` |
| Cline | `.clinerules` |

**AGENTS.md** emerged as a vendor-neutral standard (Linux Foundation, 2025).

### Two-Layer Architecture

```
┌─────────────────────────────────────────────────────┐
│  AGENTS.md (Universal)                              │
│  - Project facts, commands, boundaries              │
│  - Works with ANY AI tool                           │
└─────────────────────────────────────────────────────┘
                        │
                        ▼
┌─────────────────────────────────────────────────────┐
│  Tool-Specific Rules (Advanced Features)            │
│  .cursor/rules/*.mdc  - Glob patterns, auto-attach  │
│  .claude/rules/*.md   - Path-scoped rules           │
└─────────────────────────────────────────────────────┘
```

### Setup for Multiple Tools

```bash
# Create AGENTS.md as source of truth
# Then symlink/reference for other tools:

# Claude Code
ln -s AGENTS.md CLAUDE.md

# Or in CLAUDE.md:
# Read @AGENTS.md for project context.
```

---

## What Goes Where

| Content | AGENTS.md | Tool Rules |
|---------|-----------|------------|
| Project overview | Yes | No |
| Commands | Yes | No |
| Boundaries | Yes | No |
| Tech stack | Yes | No |
| Skill routing (what to load) | Yes | No |
| Skill invocation syntax (tool-specific) | No | Yes |
| **File-specific patterns** | No | Yes |
| **Auto-attach by glob** | No | Yes (Cursor) |
| **Activation modes** | No | Yes (Cursor) |

**AGENTS.md = What** (project facts)
**Rules = How** (tool-specific behavior)

---

## Example: Complete AGENTS.md

```markdown
# Acme E-commerce

> Next.js e-commerce platform with Stripe payments.

## Stack

| Tech | Version |
|------|---------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript 5.3 (strict) |
| Database | PostgreSQL 16 + Prisma |
| Payments | Stripe API |
| Styling | Tailwind CSS 3.4 |

## Commands

```bash
pnpm install          # Install deps
pnpm dev              # Dev server (localhost:3000)
pnpm test             # Run tests
pnpm db:migrate       # Run migrations
pnpm build            # Production build
```

## Structure

```
src/
├── app/              # Next.js App Router
├── components/       # React components
├── lib/              # Utilities
└── server/           # Server actions
```

## Context Loading

| Task | Read |
|------|------|
| Architecture | @docs/architecture.md |
| Components | @docs/components.md |
| Payments | @docs/stripe-integration.md |
| Code style | @.cursor/rules/code-style.mdc |

## Boundaries

### Always
- Run tests before committing
- Use Prisma for all DB queries

### Ask First
- Schema changes (requires migration)
- New dependencies

### Never
- Commit .env or API keys
- Direct SQL queries (use Prisma)
- Modify /prisma/migrations/ manually
```

---

## Key Insight

> "The best agent files grow through iteration, not upfront planning."

Start with a minimal AGENTS.md. When the AI makes a mistake, add a rule to prevent it. Your file evolves from real patterns, not theoretical ideals.

---

## Sources

- [GitHub Blog: Lessons from 2,500+ Repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Official AGENTS.md Site](https://agents.md/)
- [Builder.io: Improve AI Output](https://www.builder.io/blog/agents-md)
- [Datadog: Monorepo Patterns](https://dev.to/datadog-frontend-dev/steering-ai-agents-in-monorepos-with-agentsmd-13g0)
- [Claude Code Memory Docs](https://code.claude.com/docs/en/memory)

---

## See Also

- [Module 1: Project Context](../modules/01-project-context/README.md) - AGENTS.md + docs/ templates
- [Module 2: Skills](../modules/02-skills/README.md) - On-demand instruction packages
- [Getting Started Guide](./getting-started.md) - Choose your modules
