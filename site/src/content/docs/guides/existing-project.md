---
title: Existing Project Guide
description: Add AI Context Docs Lifecycle to an existing codebase
head: []
---

Adding AI Context Docs Lifecycle to an existing codebase without disruption.

## Key Principle

**Document what IS, not what should be.**

For existing projects, your rules should capture existing patterns, not impose new ones. The goal is to help AI understand YOUR codebase.

---

## Overview

Adding the AI Context Docs Lifecycle methodology involves:

1. Assessing current state
2. Creating AGENTS.md based on existing code
3. Documenting existing patterns as rules
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

Create `/AGENTS.md` based on **ACTUAL** project state, not templates.

### Process

1. Read existing README.md
2. Examine folder structure
3. Check package.json/requirements.txt for stack
4. Look at existing code patterns

### Content

Base on [AGENTS.md template](../templates/agents-md/), but customize heavily:

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
touch .cursor/rules/00-index.mdc
```

### 3.2 Document Existing Patterns

**Critical:** Document what the code ACTUALLY does, not what you wish it did.

```markdown
# coding-patterns.mdc

## Naming Conventions
[What the project ACTUALLY uses, observed from code]

## Component Patterns
[How components ARE structured in this project]

## Import Patterns
[How imports ARE done in this project]
```

### Example: Discovering Patterns

Look at 3-5 similar files and document the common patterns:

```markdown
# Observed Patterns

## API Services
Looking at src/services/*.ts:
- All services are classes with static methods
- Methods return Promise<ApiResponse<T>>
- Errors are caught and wrapped in ApiError

## Components
Looking at src/components/**/*.tsx:
- Functional components with arrow syntax
- Props interface named [Component]Props
- Styles in separate .module.css file
```

---

## Step 4: Create Docs Structure (Priority 3)

### 4.1 Create minimal structure

```bash
mkdir -p docs/specs/_archive
mkdir -p docs/features
mkdir -p docs/decisions
```

### 4.2 Create docs/INDEX.md

Include links to **EXISTING** documentation plus new structure.

### 4.3 Create docs/TASKS.md

Start with **current work**, not historical tasks:

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

## Step 5: Adopt Workflow for NEW Work

From this point forward, use the full workflow:

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
- [ ] `docs/specs/` for new specs
- [ ] `docs/decisions/` for new ADRs

---

## What NOT to Do

❌ Don't reorganize existing code to match templates  
❌ Don't create docs for completed features retroactively  
❌ Don't change existing patterns to match examples  
❌ Don't create empty template files "for later"  

---

## Incremental Adoption Timeline

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

---

## Quick Start with AI

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology from https://sergiusavva.github.io/ai-context-docs-lifecycle to this existing project.

This is an existing [language/framework] project. 

1. Analyze the current codebase structure and patterns
2. Create AGENTS.md based on what actually exists
3. Document observed patterns in .cursor/rules/
4. Set up minimal docs/ structure

Don't change existing code or patterns - just document what IS.
```
