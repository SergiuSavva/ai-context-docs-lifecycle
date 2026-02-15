# Existing Project Setup

> **Adding to an existing codebase?** Follow this guide to integrate AI Context Docs Lifecycle.

---

## Assessment: What Do You Have?

Before adding anything, check what exists:

| Check | If Exists | Action |
|-------|-----------|--------|
| README.md | Keep it | AGENTS.md supplements, doesn't replace |
| .cursor/rules/ | Review | Keep useful rules, add skills for deep patterns |
| docs/ folder | Review | Integrate reference doc structure |
| Existing specs | Keep | Add workflow to new specs |

---

## Minimal Integration

### Just Add AGENTS.md + docs/

If you only want AI context without changing your workflow:

1. Create `AGENTS.md` at project root from [Module 1 templates](../modules/01-project-context/README.md)
2. Create `docs/` with reference docs describing what exists
3. Done!

```
existing-project/
├── README.md          # Keep existing
├── AGENTS.md          # NEW — AI context (~80 lines)
├── docs/              # NEW — Reference knowledge
│   ├── architecture.md
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
- Context Loading table pointing to docs/ and skills
- Boundaries (always/ask/never)

### Step 2: Add Reference Docs

```bash
mkdir -p docs/decisions
```

Document what exists:
- `docs/architecture.md` — Current system overview
- `docs/data-model.md` — Current database schema
- `docs/api.md` — Current API surface

### Step 3: Add Skills (Optional)

For deep tech patterns that AI needs to follow:

```bash
mkdir -p .agents/skills
```

Create skills for your specific tech stack. See [Module 2](../modules/02-skills/README.md).

**Tip**: If you have existing `.cursor/rules/`, you can keep them as lightweight bridges that point to skills for deeper content.

### Step 4: Add Feature Workflow

For new features going forward:

```bash
mkdir -p specs
```

Use [Module 3](../modules/03-feature-development/README.md) workflow for new features only.

---

## Full Integration

### Step 1: Audit Existing Documentation

| Find | Action |
|------|--------|
| Architecture docs | Consolidate into `docs/architecture.md` |
| API docs | Consolidate into `docs/api.md` |
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
# ADR-001: [Past Decision]

**Status:** Accepted (historical)
**Date:** [approximate date]
**Context:** [What led to this decision]

## Decision
[What was decided]

## Rationale
[Why, if known]
```

---

## AI-Assisted Integration

Tell your AI assistant:

```
Integrate AI Context Docs Lifecycle into this existing project.

1. Analyze the current codebase structure
2. Create AGENTS.md reflecting actual patterns
3. Create docs/ with reference documentation
4. Optionally create .agents/skills/ for deep patterns

Don't modify existing code or documentation structure.
Focus on adding AI context alongside what exists.
```

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
- Create docs/architecture.md

### Week 2: Skills + New Features
- Add skills for your tech stack
- Use Module 3 workflow for NEW features only

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

- [Module 3: Feature Development](../modules/03-feature-development/README.md) — Use for new features
- [Getting Started](./getting-started.md) — Module overview
