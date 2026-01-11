---
title: Prompt Library
description: Ready-to-use prompts for AI-First Development
head: []
---

Copy, paste, and customize these prompts for your AI assistant.

## Setup Prompts

### Quick Setup (Minimal)

```
Set up AI-First Dev Kit for this project:

1. Create folders: .cursor/rules, docs/specs/_archive, docs/features, docs/decisions
2. Create AGENTS.md with: quick start commands, tech stack table, file organization
3. Create .cursor/rules/00-index.mdc with empty rules table

Use actual values from package.json and the codebase - no placeholders.
```

### Full Setup (Comprehensive)

```
Apply AI-First Dev Kit methodology to this project:

1. Analyze: Read package.json, scan src/ for structure, identify patterns
2. Create structure:
   - AGENTS.md (root context)
   - .cursor/rules/00-index.mdc (rule index)
   - docs/INDEX.md (navigation)
   - docs/TASKS.md (progress tracking)
   - docs/specs/README.md
   - docs/features/README.md
   - docs/decisions/README.md

3. Populate AGENTS.md with real values from actual codebase.

Reference: https://ai-first-dev-kit.github.io/methodology/
```

### Monorepo Setup

```
Set up AI-First Dev Kit for this monorepo:

1. Detect type: Check for packages/, apps/, services/, workspace configs
2. Create root AGENTS.md listing all packages/services
3. Create AGENTS.md in each package/service
4. Create shared docs/ structure at root

Each package AGENTS.md should be self-contained.
```

---

## Specification Prompts

### Create PRD-lite Spec

```
Create a PRD-lite spec for [FEATURE NAME]:

File: docs/specs/[feature-name].md

Include:
- Problem statement (1-2 sentences)
- Success metrics
- Scope: In/Out
- Key user stories (Given/When/Then)
- Technical approach (if non-obvious)
- Risks and mitigations

Keep it minimal.
```

### Create Feature Documentation

```
Create feature documentation for [FEATURE NAME]:

Create docs/features/[feature-name]/ with:
1. README.md - Overview, goals, code locations
2. user-stories.md - Stories with acceptance criteria
3. tasks.md - Implementation checklist

Base on spec: docs/specs/[feature-name].md
```

### Create ADR

```
Create an ADR for: [DECISION TOPIC]

File: docs/decisions/[NNN]-[decision-title].md

Include:
- Status: Proposed
- Context: What problem requires this decision?
- Decision: What we chose
- Consequences: Positive and negative
- Alternatives Considered
```

---

## Development Prompts

### Implement Feature

```
Implement [FEATURE NAME]:

1. Read spec: docs/specs/[feature-name].md
2. Check stories: docs/features/[feature-name]/user-stories.md
3. Follow tasks: docs/features/[feature-name]/tasks.md

For each task:
- Implement following project patterns
- Write tests for acceptance criteria
- Update checkbox when complete

Run tests before marking complete.
```

### Add New Pattern

```
Create a new rule for [PATTERN NAME]:

1. Check if pattern exists in .cursor/rules/
2. If new, create .cursor/rules/[pattern-name].mdc
3. Update .cursor/rules/00-index.mdc to include it
```

### Fix Bug

```
Fix bug: [BUG DESCRIPTION]

1. Reproduce the issue
2. Identify root cause
3. Check for related ADRs in docs/decisions/
4. Fix following project patterns
5. Add test to prevent regression
```

---

## Maintenance Prompts

### Update Documentation

```
Update docs for completed feature [FEATURE NAME]:

1. Archive spec: Move to docs/specs/_archive/
2. Update docs/TASKS.md: Mark as Done
3. Update AGENTS.md if new patterns emerged
4. Create ADR if significant decisions were made
```

### Verify Setup

```
Verify AI-First Dev Kit setup:

Check:
1. AGENTS.md exists with real values
2. .cursor/rules/00-index.mdc exists
3. docs/ structure complete
4. Commands actually work

Report any issues.
```

---

## Quick Reference

| Task | Prompt |
|------|--------|
| New feature | "Create PRD-lite spec for [feature]" |
| Start building | "Implement [feature] following docs/specs/[feature].md" |
| Track progress | "Update TASKS.md with current progress" |
| Record decision | "Create ADR for choosing [X] over [Y]" |
| New pattern | "Add rule for [pattern] to .cursor/rules/" |
| Complete feature | "Archive spec and update docs for [feature]" |
| Health check | "Verify AI-First Dev Kit setup" |

---

## Tips

### Be Specific
- Bad: "Set up the project"
- Good: "Create AGENTS.md with Next.js commands from package.json"

### Reference Existing Docs
- Bad: "Build the auth feature"
- Good: "Implement auth following docs/specs/authentication.md"

### Request Real Values
- Bad: "Create config file"
- Good: "Create config using actual values - no placeholders"
