# Existing Project Setup

> **Adding to an existing codebase?** Follow this guide to integrate AI Context Docs Lifecycle.

---

## Assessment: What Do You Have?

Before adding anything, check what exists:

| Check | If Exists | Action |
|-------|-----------|--------|
| README.md | Keep it | AGENTS.md supplements, doesn't replace |
| .cursor/rules/ | Review | Merge or replace rules |
| docs/ folder | Review | Integrate new structure |
| Existing specs | Keep | Add workflow to new specs |

---

## Minimal Integration (5 minutes)

### Just Add AGENTS.md

If you only want AI context without changing your workflow:

1. Create `AGENTS.md` at project root
2. Fill in from [Module 1 templates](../modules/01-quick-start/README.md#templates)
3. Done!

```
existing-project/
├── README.md          # Keep existing
├── AGENTS.md          # NEW - AI context
├── src/
└── ...
```

AI agents will read AGENTS.md first for context.

---

## Standard Integration (20 minutes)

### Step 1: Add AGENTS.md

Create at project root with:
- Your actual Quick Start commands
- Your tech stack
- Your file organization
- Your key patterns
- Known gotchas

### Step 2: Add Cursor Rules

```bash
mkdir -p .cursor/rules
```

Add from Module 2 and 3:
- `code-style.mdc` - Customized for your stack
- `doc-style.mdc` - Your doc standards
- `feature-workflow.mdc` - Feature workflow

**Tip**: If you already have `.cursor/rules/`, review existing rules and merge.

### Step 3: Add Docs Structure

If you don't have a `docs/` folder:

```bash
mkdir -p docs/{specs,features,decisions}
```

If you have existing docs, add these folders alongside.

### Step 4: Create INDEX.md

Add `docs/INDEX.md` that links to:
- Your existing documentation
- New feature docs
- Decision records

---

## Full Integration (1 hour)

### Step 1: Audit Existing Documentation

| Find | Action |
|------|--------|
| Architecture docs | Link from AGENTS.md |
| API docs | Link from INDEX.md |
| Old specs | Move to `docs/specs/_archive/` |
| Decision history | Convert to ADRs |

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

## Status
Accepted (historical)

## Context
[What led to this decision]

## Decision
[What was decided]

## Rationale
[Why, if known]
```

### Step 4: Document Key Features

For existing features, create minimal READMEs:

```
docs/features/
├── auth/
│   └── README.md
├── payments/
│   └── README.md
└── ...
```

Include:
- What the feature does
- Key files (code touchpoints)
- How it works (brief)

---

## AI-Assisted Integration

Tell your AI assistant:

```
Integrate AI Context Docs Lifecycle into this existing project.

1. Analyze the current codebase structure
2. Create AGENTS.md reflecting actual patterns
3. Add .cursor/rules/ with appropriate conventions
4. Set up docs/ structure for new features

Don't modify existing code or documentation structure.
Focus on adding AI context alongside what exists.
```

---

## Handling Existing Patterns

### Different Naming Conventions?

Document what actually exists in `code-style.mdc`:

```yaml
# Note: This project uses mixed conventions (historical)
# New code should follow these patterns:
```

### Different Folder Structure?

Document actual structure in AGENTS.md, don't reorganize:

```markdown
## File Organization

Note: Historical structure. New features go in `features/`.

```

### Incomplete Documentation?

Start fresh with AGENTS.md. Don't try to fix old docs.

---

## What NOT to Do

- ❌ Don't reorganize existing code to fit templates
- ❌ Don't delete existing documentation
- ❌ Don't convert all old specs to new format
- ❌ Don't create ADRs for trivial past decisions

---

## Gradual Adoption

You don't have to do everything at once:

### Week 1: Foundation
- Add AGENTS.md
- Add basic cursor rules

### Week 2: New Features
- Use Module 3 workflow for NEW features only
- Don't retrofit existing features

### Month 1: Documentation
- Create feature READMEs for key features
- Document major past decisions as ADRs

### Ongoing
- Update AGENTS.md when patterns change
- Apply workflow to all new features
- Document decisions as they happen

---

## Checklist

- [ ] AGENTS.md created (reflects actual project)
- [ ] .cursor/rules/ added with relevant rules
- [ ] docs/ structure created (alongside existing)
- [ ] INDEX.md links old and new docs
- [ ] Team knows to use workflow for new features

---

## Next Steps

- [Module 3: Feature Development](../modules/03-feature-development/README.md) - Use for new features
- [Getting Started](./getting-started.md) - Module overview
