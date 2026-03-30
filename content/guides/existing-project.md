# Existing Project Setup

> **Adding to an existing codebase?** Follow this guide to integrate AI Context Docs Lifecycle. For the fastest path, see [Quick Start ->](../quick-start.md) first.

---

## Assessment: What Do You Have?

Before adding anything, check what exists:

| Check | If Exists | Action |
|-------|-----------|--------|
| README.md | Keep it | AGENTS.md supplements, doesn't replace |
| .cursor/rules/ | Review | Keep useful rules, add skills for deep patterns |
| docs/ folder | Review | Integrate reference doc structure |
| Existing specs | Keep | Add workflow to new specs |

## Recommended First Command

From project root:

```bash
npx @acdl/cli init
```

This installs methodology skills/templates directly into your project (`.agents/skills/...`) for guided setup.

If the installed assets already exist:

```bash
npx @acdl/cli init --force
```

---

## Minimal Integration

### Just Add AGENTS.md + docs/

If you only want AI context without changing your workflow:

1. Create `AGENTS.md` at project root from [Module 1 templates](../modules/01-foundation/README.md)
2. Create `docs/` with reference docs describing what exists
3. Done!

```
existing-project/
├── README.md          # Keep existing
├── AGENTS.md          # NEW — AI context (~80 lines)
├── docs/              # NEW — Reference docs (only what your project needs)
│   ├── {relevant docs}.md
│   └── decisions/
├── src/
└── ...
```

AI agents will read AGENTS.md first for context, then load docs/ on-demand.

---

## Standard Integration

### Step 1: Add AGENTS.md

Create at project root with:
- Your actual commands (dev, build, test)
- Your tech stack and versions
- Your file organization
- Your conventions (short, inline)
- Context Loading table pointing to docs/ (and skills if set up)
- Boundaries (always/ask/never)

### Step 2: Add Reference Docs

```bash
mkdir -p docs/decisions
```

Document what exists — only create docs that match your project:
- `docs/architecture.md` — if project has multiple layers or services
- `docs/data-model.md` — if project has a database
- `docs/api.md` — if project exposes or consumes APIs
- `docs/auth.md` — if project has authentication
- `docs/scripts.md` — if project has runnable commands

### Step 3: Add Skills (Optional)

For deep tech patterns that AI needs to follow:

```bash
mkdir -p .agents/skills
```

Create skills for your specific tech stack. See the [Skills Catalog](./skills-catalog.md).

**Tip**: If you have existing `.cursor/rules/`, you can keep them as lightweight bridges that point to skills for deeper content.

### Step 4: Add Feature Workflow

For new features going forward:

```bash
mkdir -p specs
```

Use Module 2's feature workflow (`load skill feature`) for new features only.

---

## Full Integration

### Step 1: Audit Existing Documentation

| Find | Action |
|------|--------|
| Architecture docs | Consolidate into `docs/architecture.md` (if applicable) |
| API docs | Consolidate into `docs/api.md` (if applicable) |
| Old specs | Move to `specs/_archive/` |
| Decision history | Convert to ADRs in `docs/decisions/` |

### Step 2: Document Existing Patterns

Review your codebase and document in AGENTS.md:
- Naming conventions actually used
- State management approach
- Error handling patterns
- Testing patterns

### Step 3: Create ADRs for Past Decisions

For significant past decisions, create ADRs:

```markdown
# ADR-001: {{Past Decision}}

**Status:** Accepted (historical)
**Date:** {{approximate date}}
**Context:** {{What led to this decision}}

## Decision
{{What was decided}}

## Rationale
{{Why, if known}}
```

---

## AI-Assisted Integration

Tell your AI assistant:

```
Integrate AI Context Docs Lifecycle into this existing project.

Read:
.agents/skills/acdl/SKILL.md

1. Analyze the current codebase structure
2. Create AGENTS.md reflecting actual patterns
3. Create docs/ with reference documentation
4. Optionally create .agents/skills/ for deep patterns

Don't modify existing code or documentation structure.
Focus on adding AI context alongside what exists.
```

If your tool cannot load skills by name, point it to `.agents/skills/acdl/SKILL.md`. If you are not using the CLI, replace that local path with the repository raw URL for `content/modules/01-foundation/skills/acdl/SKILL.md`.

---

## Handling Existing Patterns

### Different Naming Conventions?

Document what actually exists in AGENTS.md conventions:

```markdown
## Conventions
- **Naming** — camelCase (new code). Legacy code uses snake_case in some modules.
```

### Different Folder Structure?

Document actual structure in AGENTS.md, don't reorganize:

```markdown
## Structure
Note: Historical structure. New features go in `features/`.
```

### Incomplete Documentation?

Start fresh with AGENTS.md and docs/. Don't try to fix old docs.

---

## What NOT to Do

- Don't reorganize existing code to fit templates
- Don't delete existing documentation
- Don't convert all old specs to new format
- Don't create ADRs for trivial past decisions

---

## Gradual Adoption

You don't have to do everything at once:

### Week 1: Foundation
- Add AGENTS.md
- Create the reference docs that match your project (see [template catalog](../modules/01-foundation/README.md#choose-your-template))

### Week 2: Skills + New Features
- Add skills for your tech stack
- Use feature workflow (`load skill feature`) for NEW features only

### Month 1: Documentation
- Complete docs/ reference layer
- Document major past decisions as ADRs

### Ongoing
- Update AGENTS.md when patterns change
- Update docs/ when code changes
- Apply workflow to all new features

---

## Checklist

- [ ] AGENTS.md created (reflects actual project)
- [ ] docs/ with reference documentation
- [ ] docs/decisions/ for ADRs
- [ ] .agents/skills/ for deep patterns (optional)
- [ ] specs/ folder for new feature work
- [ ] Team knows to use workflow for new features

---

## Next Steps

- [Module 1: Foundation](../modules/01-foundation/README.md) — AGENTS.md + doc templates
- [Module 2: Dev Workflow](../modules/02-dev-workflow/README.md) — Feature workflow and skills
- [Getting Started](./getting-started.md) — Module overview
