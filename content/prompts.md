# AI Prompt Library

> Ready-to-use prompts for AI-First Development. Copy, paste, and customize.

---

## Setup Prompts

### 1. Quick Setup (Minimal)

```
Set up AI-First Dev Kit for this project:

1. Create folders: .cursor/rules, docs/specs/_archive, docs/features, docs/decisions
2. Create AGENTS.md with: quick start commands, tech stack table, file organization
3. Create .cursor/rules/00-index.mdc with empty rules table

Use actual values from package.json and the codebase - no placeholders.
```

### 2. Full Setup (Comprehensive)

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

3. Populate AGENTS.md with real values:
   - Actual commands from package.json scripts
   - Real tech stack from dependencies
   - Current file organization
   - Patterns observed in the code

Reference: https://ai-first-dev-kit.github.io/methodology/
```

### 3. Monorepo Setup

```
Set up AI-First Dev Kit for this monorepo:

1. Detect type: Check for packages/, apps/, services/, workspace configs
2. Create root AGENTS.md listing all packages/services
3. Create AGENTS.md in each package/service with:
   - Package-specific quick start
   - Local dependencies
   - Package-specific patterns
4. Create shared docs/ structure at root

Each package AGENTS.md should be self-contained for that package.
```

---

## Specification Prompts

### Create PRD-lite Spec

```
Create a PRD-lite spec for [FEATURE NAME]:

File: docs/specs/[feature-name].md

Include:
- Problem statement (1-2 sentences)
- Success metrics (how we know it works)
- Scope: In/Out (explicit boundaries)
- Key user stories (Given/When/Then format)
- Technical approach (if non-obvious)
- Risks and mitigations

Keep it minimal - only what's needed to build.
```

### Create Feature Documentation

```
Create feature documentation for [FEATURE NAME]:

Create docs/features/[feature-name]/ with:

1. README.md
   - Overview and goals
   - Code locations (files, folders)
   - Key components
   - Dependencies

2. user-stories.md
   - User stories with acceptance criteria
   - Given/When/Then format
   - Checkboxes for completion

3. tasks.md
   - Implementation tasks
   - Checkboxes for progress
   - Grouped by phase if complex

Base on spec: docs/specs/[feature-name].md
```

### Create ADR (Architecture Decision Record)

```
Create an ADR for: [DECISION TOPIC]

File: docs/decisions/[NNN]-[decision-title].md

Include:
- Status: Proposed
- Context: What problem requires this decision?
- Decision: What we chose
- Consequences: Positive and negative
- Alternatives Considered: What was rejected and why

Number sequentially based on existing ADRs.
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
- Update task checkbox when complete
- Update TASKS.md progress

Run tests before marking complete.
```

### Add New Pattern

```
Create a new rule for [PATTERN NAME]:

1. Check if pattern exists in .cursor/rules/
2. If new, create .cursor/rules/[pattern-name].mdc:

---
description: [When this rule applies]
globs: ["**/*.[ext]"]
alwaysApply: false
---

# [Pattern Name]

## Conventions
[Your patterns here]

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
6. If significant decision made, create ADR
```

---

## Maintenance Prompts

### Update Documentation

```
Update docs for completed feature [FEATURE NAME]:

1. Archive spec: Move docs/specs/[feature].md to docs/specs/_archive/
2. Update docs/TASKS.md: Mark feature as Done
3. Update docs/features/[feature]/tasks.md: All checkboxes checked
4. Update AGENTS.md if new patterns emerged
5. Create ADR if significant decisions were made
```

### Audit Documentation

```
Audit project documentation:

Check for:
- Stale specs still in docs/specs/ (should be archived)
- TASKS.md accuracy vs actual progress
- AGENTS.md reflects current architecture
- Missing ADRs for significant decisions
- Unused rules in .cursor/rules/

Report findings and suggest fixes.
```

### Verify Setup

```
Verify AI-First Dev Kit setup:

Check:
1. AGENTS.md exists and has real values (not placeholders)
2. .cursor/rules/00-index.mdc exists
3. docs/ structure: INDEX.md, TASKS.md, specs/, features/, decisions/
4. Tech stack matches package.json
5. Commands in AGENTS.md actually work

Report any issues found.
```

---

## Quick Commands

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
- Good: "Create config using actual values from .env.example - no placeholders"

### Chain Prompts
For complex tasks, break into steps:
1. First: "Create spec for [feature]"
2. Then: "Create feature docs based on that spec"
3. Then: "Implement following the docs"
4. Finally: "Archive spec and update progress"
