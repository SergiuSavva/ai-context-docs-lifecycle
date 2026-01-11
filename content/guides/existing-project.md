# Applying AI-First Dev Kit to an Existing Project

> **For AI Agents**: Follow these steps when adding the kit to an existing codebase.

---

## Overview

Adding the AI-First Dev Kit to an existing project involves:

1. Assessing current state
2. Adding missing required files
3. Creating AGENTS.md based on existing code
4. Setting up documentation incrementally
5. Adopting the workflow gradually

---

## Step 1: Assess Current State

### Check what exists

```
Does project have...?

[ ] .cursor/rules/ folder
[ ] Any AGENTS.md or similar AI context file
[ ] docs/ folder
[ ] README.md with project info
[ ] Architecture documentation
```

### Understand the codebase

Before creating docs, understand:

- What framework/language is used?
- What's the folder structure?
- What are the main features?
- What patterns are already in use?
- What testing approach exists?

---

## Step 2: Create AGENTS.md (Priority 1)

Create `/AGENTS.md` based on ACTUAL project state, not templates.

### Process

1. Read existing README.md
2. Examine folder structure
3. Check package.json/requirements.txt for stack
4. Look at existing code patterns

### Content

```markdown
# [Actual Project Name] - AI Agent Instructions

## Quick Start
[Actual commands from package.json/Makefile/README]

## Project Overview
[What the project actually does]

## Tech Stack
[Actual technologies from dependencies]

## File Organization
[Actual folder structure]

## Key Patterns
[Patterns observed in existing code]

## Need Help?
[Links to existing docs or new .cursor/rules/]
```

---

## Step 3: Create Cursor Rules (Priority 2)

### 3.1 Create 00-index.mdc (REQUIRED)

```bash
mkdir -p .cursor/rules
```

Create `/.cursor/rules/00-index.mdc` listing rules that will exist.

### 3.2 Document Existing Patterns

Instead of using example templates directly, **document actual patterns**:

```markdown
# coding-patterns.mdc

## Naming Conventions
[What the project ACTUALLY uses, observed from code]

## Component Patterns
[How components ARE structured in this project]

## Import Patterns
[How imports ARE done in this project]
```

### Key principle: Describe what IS, not what SHOULD BE

The goal is to help AI understand existing patterns, not impose new ones.

---

## Step 4: Create Docs Structure (Priority 3)

### 4.1 Create minimal structure

```bash
mkdir -p docs/specs/_archive
mkdir -p docs/features
mkdir -p docs/decisions
```

### 4.2 Create docs/INDEX.md

Include links to any EXISTING documentation plus new structure.

### 4.3 Create docs/TASKS.md

Start with current work, not historical tasks:

```markdown
# [Project] - Task Index

## Current Work
| Feature | Status | Notes |
|---------|--------|-------|
| [Current feature] | In Progress | [Notes] |

## Upcoming
[What's planned next]
```

---

## Step 5: Document Existing Features (Optional)

For major existing features, create minimal docs:

```
docs/features/[feature]/
└── README.md    # Just overview and code locations
```

Don't retroactively create user stories or tasks for completed features.

---

## Step 6: Adopt Workflow for NEW Work

From this point forward, follow `rules/01-workflow.md`:

### For new features:
1. Write PRD-lite spec first
2. Create feature docs
3. Build following documented patterns
4. Update docs during development

### For bug fixes:
1. Just fix (no spec needed)
2. Follow existing patterns
3. Update docs if behavior changes

### For refactoring:
1. Create ADR if significant
2. Update affected docs
3. Update AGENTS.md if structure changes

---

## Migration Checklist

### Minimum viable setup (do first):

- [ ] `AGENTS.md` at root describing actual project
- [ ] `.cursor/rules/00-index.mdc` exists
- [ ] At least one rule file documenting key patterns

### Full setup (do incrementally):

- [ ] `docs/INDEX.md` navigation
- [ ] `docs/TASKS.md` for current work
- [ ] `docs/features/` for feature documentation
- [ ] `docs/specs/` for new specs (with optional phase subfolders)
- [ ] `docs/decisions/` for new ADRs

---

## Common Scenarios

### Project has existing README but no AGENTS.md

1. Keep README.md for humans
2. Create AGENTS.md for AI with:
   - Quick commands (from README)
   - Technical details (more detailed than README)
   - Pattern references

### Project has some docs but scattered

1. Create `docs/INDEX.md` linking to existing docs
2. Don't move existing docs initially
3. Gradually consolidate as you update them

### Project has many patterns not documented

1. Start with AGENTS.md covering main patterns
2. Create rule files as you encounter pattern questions
3. Add patterns when AI generates inconsistent code

### Project uses different folder structure

1. Document ACTUAL structure, don't change it
2. Use rules to tell AI where things go in THIS project
3. Adapt examples to match project conventions

---

## What NOT to Do

- Don't reorganize existing code to match examples
- Don't create docs for completed features retroactively
- Don't change existing patterns to match templates
- Don't create empty template files "for later"

---

## Incremental Adoption

### Week 1: Minimum Setup
- Create AGENTS.md
- Create 00-index.mdc
- Create one pattern rule file

### Week 2-4: Documentation
- Add docs/INDEX.md
- Add docs/TASKS.md for current sprint
- Document patterns as questions arise

### Ongoing: Full Workflow
- Use specs for new features
- Create ADRs for decisions
- Keep docs updated with changes
