# Implementation Guide

> **Step-by-step guide to adopting the methodology in your project.**

---

## Prerequisites

Before starting:
- [ ] Git repository initialized
- [ ] Basic project structure exists
- [ ] You have at least one feature to document

---

## Phase 1: Foundation (30 minutes)

### Step 1: Create Directory Structure

```bash
# Create documentation directories
mkdir -p docs/reference
mkdir -p docs/specs
mkdir -p docs/decisions
mkdir -p docs/_archive

# Create rules directory (for Cursor or other AI tools)
mkdir -p .cursor/rules
# Or use a generic name:
# mkdir -p .ai-rules
```

### Step 2: Create Code Map

Create `docs/reference/code-map.md`:

```bash
cp templates/code-map.md docs/reference/code-map.md
```

Fill in:
- [ ] Entry points (main files)
- [ ] Directory structure overview
- [ ] Key modules (2-3 most important)
- [ ] Quick Find table

**Time**: 15 minutes

### Step 3: Create Initial Rules File

Create `.cursor/rules/project.mdc`:

```bash
cp templates/cursor-rules.mdc .cursor/rules/project.mdc
```

Fill in:
- [ ] Project description (1-2 sentences)
- [ ] Tech stack list
- [ ] Quick start commands
- [ ] 3-5 most important patterns

**Time**: 15 minutes

### Checkpoint
You now have:
```
docs/
├── reference/
│   └── code-map.md        ✅
├── specs/                  (empty)
├── decisions/              (empty)
└── _archive/               (empty)

.cursor/rules/
└── project.mdc            ✅
```

**Value unlocked**: AI agents can now navigate your codebase and follow basic patterns.

---

## Phase 2: First Spec (20 minutes)

### Step 4: Create Your First Spec

Pick your next feature/task and create a spec:

```bash
# Create dated folder
mkdir -p docs/specs/$(date +%Y-%m-%d)-[feature-name]

# Copy template
cp templates/spec.md docs/specs/$(date +%Y-%m-%d)-[feature-name]/spec.md
```

Fill in:
- [ ] Why (1-2 sentences)
- [ ] What (scope bullets)
- [ ] Acceptance criteria (3-5 testable items)
- [ ] Doc impact (what needs updating after)

### Step 5: Link Spec to Rules

Add to your `.cursor/rules/project.mdc`:

```markdown
## Current Work

**Active Spec**: `docs/specs/YYYY-MM-DD-feature/spec.md`
```

### Checkpoint
```
docs/
├── reference/
│   └── code-map.md        ✅
├── specs/
│   └── YYYY-MM-DD-feature/
│       └── spec.md        ✅
├── decisions/
└── _archive/

.cursor/rules/
└── project.mdc            ✅ (updated with current spec)
```

**Value unlocked**: You can now tell AI "implement the current spec" and it knows what to do.

---

## Phase 3: First Complete Cycle (1-2 hours)

### Step 6: Implement with Spec

Work through the spec, checking off acceptance criteria as you go.

### Step 7: Update Reference

After implementation, update `code-map.md` if structure changed:

```markdown
### [New Module Name]

**Location**: `path/to/new/`
**Purpose**: [What it does]
```

### Step 8: Close the Spec

Option A - Archive:
```bash
mv docs/specs/YYYY-MM-DD-feature docs/_archive/
```

Option B - Collapse to links:
```markdown
# [Feature Name] Spec

**Status**: ✅ Completed (YYYY-MM-DD)

- **PR**: #XXX
- **Docs**: [Updated code-map.md](../reference/code-map.md)
```

### Step 9: Create ADR (If Applicable)

Did you make an architectural decision? If yes:

```bash
cp templates/adr.md docs/decisions/ADR-001-[decision-name].md
```

Fill in Context, Decision, Alternatives, Consequences.

### Checkpoint
You've completed one full cycle:
```
Spec → Implement → Update Reference → Close Spec → (ADR if needed)
```

---

## Phase 4: Expand Rules (Ongoing)

As you develop, extract patterns into rules:

### When to Add a Rule

| Situation | Action |
|-----------|--------|
| Repeated the same pattern 3+ times | Extract to rule |
| AI generated code you had to fix | Add "don't do X" rule |
| New team member asked how to do X | Document the answer |
| Linter can't catch a pattern | Document it |

### Rule File Organization

As rules grow, split into files:

```
.cursor/rules/
├── 00-index.mdc           # Overview + when to load what
├── project.mdc            # General project context
├── code-style.mdc         # Naming, formatting patterns
├── architecture.mdc       # Structure, dependencies
├── testing.mdc            # Test patterns
└── [domain].mdc           # Domain-specific rules
```

### Example Rule Evolution

**Week 1** (in project.mdc):
```markdown
## Patterns
- Use path aliases: `@/` not `../`
```

**Month 1** (split to code-style.mdc):
```markdown
# Code Style Rules

## Imports

### Path Aliases
ALWAYS use path aliases. NEVER use relative imports deeper than one level.

✅ Good:
```typescript
import { Button } from '@/components/ui/button'
```

❌ Bad:
```typescript
import { Button } from '../../../components/ui/button'
```

**Why**: Easier refactoring, cleaner diffs, consistent imports.

**Enforcement**: ESLint rule `no-restricted-imports` (see eslint.config.js)
```

---

## Phase 5: Production Readiness (When Going Live)

### Step 10: Add Runbooks

For each feature in production:

```bash
cp templates/runbook.md docs/reference/runbooks/[feature]-runbook.md
```

Fill in:
- [ ] Health checks
- [ ] Common issues + resolutions
- [ ] Rollback procedures

### Step 11: Document Architecture

Create `docs/reference/architecture.md`:

```markdown
# Architecture Overview

## System Diagram
[ASCII art or link to diagram]

## Components
| Component | Purpose | Technology |
|-----------|---------|------------|
| [Name] | [Purpose] | [Tech] |

## Data Flow
[How data moves through the system]

## External Dependencies
[What we depend on]
```

### Step 12: Set Up Maintenance

Add to your calendar/process:
- [ ] Monthly: Review code-map accuracy
- [ ] Quarterly: Archive stale specs
- [ ] Per release: Update changelog

---

## Quick Reference

### File Locations

| Document Type | Location |
|---------------|----------|
| Current state docs | `docs/reference/` |
| Change specs | `docs/specs/YYYY-MM-DD-slug/` |
| Decisions | `docs/decisions/ADR-NNN-*.md` |
| Old specs | `docs/_archive/` |
| AI rules | `.cursor/rules/` |

### Workflow Summary

```
1. SPEC      → docs/specs/YYYY-MM-DD-feature/spec.md
2. RULES     → .cursor/rules/*.mdc (load relevant rules)
3. IMPLEMENT → Code + tests
4. REVIEW    → PR + CI
5. REFERENCE → Update docs/reference/ if behavior changed
6. DECIDE    → Add ADR if architectural decision
7. CLOSE     → Archive or collapse spec
```

### Definition of Done

Before merging:
- [ ] Spec acceptance criteria met
- [ ] Tests added/updated
- [ ] CI passes
- [ ] Reference docs updated (if behavior changed)
- [ ] ADR added (if decision made)
- [ ] Spec marked complete

---

## Troubleshooting

### "My docs are already out of date"

Start fresh with code-map.md. Document what exists **now**, not what docs say.

### "I don't know what patterns to document"

Wait. Document patterns after you've repeated them 3+ times.

### "AI keeps ignoring my rules"

- Make rules more specific (examples help)
- Add "Why" explanations
- Move critical rules to top of file

### "Specs feel like overhead"

Write smaller specs. A 10-line spec is better than no spec:

```markdown
# Add logout button

## Done When
- [ ] Logout button visible when logged in
- [ ] Clicking logs out and redirects to home
- [ ] Session cleared
```

### "When should I write an ADR?"

If you're unsure, you probably don't need one. ADRs are for:
- Decisions you'll question in 6 months
- Tradeoffs with real consequences
- Patterns that override "obvious" choices

---

## Next Steps

After completing this guide:

1. **Read**: `PRINCIPLES.md` - Understand the "why"
2. **Customize**: Templates to fit your project
3. **Iterate**: Add rules as patterns emerge
4. **Share**: Use this framework on your next project

---

## Examples

See the `examples/` folder for:
- Next.js project setup
- Python API setup
- Minimal setup (just the essentials)

