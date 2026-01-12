---
title: New Project Guide
description: Set up AI Context Docs Lifecycle for a brand new project
head: []
---

Setting up AI Context Docs Lifecycle for a brand new project from scratch.

## Overview

For new projects, you have a clean slate. Set up the ideal structure from day one.

**Steps:**
1. Create required folder structure
2. Set up AGENTS.md
3. Create initial cursor rules
4. Set up documentation structure
5. Establish the workflow

---

## Step 1: Create Required Structure

Based on [Project Structure template](../templates/project-structure/):

```bash
# Create documentation folders
mkdir -p docs/specs/_archive
mkdir -p docs/features
mkdir -p docs/decisions

# Create cursor rules folder
mkdir -p .cursor/rules

# Create required files
touch AGENTS.md
touch .cursor/rules/00-index.mdc
touch docs/INDEX.md
touch docs/TASKS.md
```

---

## Step 2: Create AGENTS.md

Create `/AGENTS.md` using [AGENTS.md template](../templates/agents-md/).

**Customize with:**
- Actual project name
- Real quick start commands
- Actual tech stack
- Real file organization

```markdown
# [Project Name] - AI Agent Instructions

## Quick Start
npm install
npm run dev
npm test

## Project Overview
[What this project does]

## Tech Stack
- Language: [X]
- Framework: [X]
- Database: [X]

## File Organization
[Actual structure]

## Key Patterns
[Important conventions]

## Need Help?
- Architecture: .cursor/rules/project-architecture.mdc
- Patterns: .cursor/rules/coding-patterns.mdc
```

---

## Step 3: Create Cursor Rules

### 3.1 Create 00-index.mdc (REQUIRED)

Create `/.cursor/rules/00-index.mdc` using [Cursor Rules template](../templates/cursor-rules/).

This file MUST exist and list all other rules.

### 3.2 Create Project-Specific Rules (Optional)

Based on project needs, create additional rules:

| If project has... | Create... |
|-------------------|-----------|
| Specific architecture | `project-architecture.mdc` |
| Code conventions | `coding-patterns.mdc` |
| Data fetching patterns | `state-management.mdc` |
| Testing requirements | `testing-strategy.mdc` |

---

## Step 4: Create Documentation Structure

### 4.1 Create docs/INDEX.md

Use [Docs Index template](../templates/docs-index/).

### 4.2 Create docs/TASKS.md

```markdown
# [Project Name] - Task Index

## Quick Summary
| Feature | Status | Tasks | Done | Progress |
|---------|--------|-------|------|----------|
| [Initial setup] | In Progress | 5 | 0 | 0% |

## Status Legend
| Symbol | Meaning |
|--------|---------|
| ⏳ | Not Started |
| 🔄 | In Progress |
| ✅ | Complete |
```

---

## Step 5: Verify Setup

Run this checklist:

- [ ] `AGENTS.md` exists at root with project-specific content
- [ ] `.cursor/rules/00-index.mdc` exists
- [ ] `docs/INDEX.md` exists
- [ ] `docs/TASKS.md` exists
- [ ] `docs/specs/README.md` exists
- [ ] `docs/decisions/README.md` exists

---

## Step 6: Establish Workflow

From now on, follow this workflow:

### Before building a feature:

1. Write PRD-lite spec in `docs/specs/<feature>.md`
2. Create feature docs in `docs/features/<feature>/`
3. Add tasks to `docs/TASKS.md`

### While building:

1. Follow `.cursor/rules/` patterns
2. Update docs as code is written
3. Check off completed tasks

### After completing:

1. Update feature status
2. Archive specs to `docs/specs/_archive/`
3. Add new patterns to rules if discovered

---

## Final Structure

After setup, project should look like:

```
project/
├── AGENTS.md                    # ✅ Root AI context
├── .cursor/
│   └── rules/
│       └── 00-index.mdc        # ✅ Rule index
├── docs/
│   ├── INDEX.md                # ✅ Navigation
│   ├── TASKS.md                # ✅ Progress
│   ├── specs/
│   │   └── _archive/           # ✅ Completed specs
│   ├── features/               # ✅ Feature docs
│   └── decisions/              # ✅ ADRs
└── [project source code]
```

---

## Quick Start with AI

Instead of manual setup, tell your AI:

```
Apply the AI Context Docs Lifecycle methodology from https://sergiusavva.github.io/ai-context-docs-lifecycle to this project.

This is a new [language/framework] project. Set up:
1. AGENTS.md with our actual tech stack
2. .cursor/rules/00-index.mdc
3. docs/ structure with INDEX.md and TASKS.md

My tech stack: [list your technologies]
```

---

## Next Steps

1. Start your first feature using the workflow
2. Create ADRs for major technology decisions
3. Add project-specific rules as patterns emerge
4. Keep AGENTS.md updated as project evolves
