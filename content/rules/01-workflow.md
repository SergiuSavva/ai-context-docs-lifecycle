<!-- site:
title: Development Workflow
description: Day-to-day prompts for building features with AI assistance
-->

# Required Workflow

> **For AI Agents**: Every project using this kit MUST follow this docs-as-code workflow.

---

## The Five-Step Workflow

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOCS-AS-CODE WORKFLOW                        │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│   1. SPEC FIRST        Write spec before any code              │
│         ↓                                                       │
│   2. RULES GUIDE       AI follows .cursor/rules/               │
│         ↓                                                       │
│   3. UPDATE DURING     Docs updated as code is written         │
│         ↓                                                       │
│   4. REVIEW TOGETHER   Code + docs reviewed in same PR         │
│         ↓                                                       │
│   5. ARCHIVE AFTER     Completed specs archived                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

---

## Step 1: Spec First

**Rule**: Never start building a feature without a specification.

### What to Write

For new features, create:

1. **PRD-lite spec** in `docs/specs/<feature>.md` (or `docs/specs/<phase>/<feature>.md` for phased projects)
   - Problem statement (1-2 sentences)
   - Success metrics
   - Scope (in/out)
   - Key user stories
   - Risks and mitigations

2. **Feature folder** in `docs/features/<feature>/`
   - `README.md` - Overview and code locations
   - `user-stories.md` - Detailed stories with acceptance criteria
   - `tasks.md` - Implementation checklist

### When to Skip

Skip detailed specs for:
- Bug fixes (just describe in commit/PR)
- Minor enhancements (< 1 hour work)
- Well-understood features with clear scope

### Definition of Done — Spec Ready

- [ ] Problem statement clearly defines the WHY
- [ ] Scope has explicit In/Out boundaries
- [ ] User stories have acceptance criteria (Given/When/Then)
- [ ] Tasks are broken down to actionable items
- [ ] Risks identified with mitigations
- [ ] Research completed (API docs, external refs gathered)
- [ ] Human has approved spec for implementation

---

## Step 2: Rules Guide

**Rule**: AI must read and follow `.cursor/rules/` before writing code.

### Loading Order

1. `00-index.mdc` - Understand which rules apply
2. Relevant rule files based on task
3. Feature-specific AGENTS.md (if exists)

### Rule Compliance

AI-generated code MUST:
- Follow naming conventions in rules
- Use specified folder structure
- Apply required patterns
- Avoid anti-patterns listed in rules

---

## Step 3: Update During

**Rule**: Documentation is updated AS code is written, not after.

### What to Update

| When | Update |
|------|--------|
| Creating files | Add to code touchpoints in feature README |
| Completing task | Check off in tasks.md |
| Making decision | Create/update ADR |
| Establishing pattern | Add to .cursor/rules/ |
| Changing architecture | Update AGENTS.md |

### AI Responsibility

When AI completes a task, it should:
1. Mark task complete in `docs/features/<feature>/tasks.md`
2. Update progress in `docs/TASKS.md`
3. Update code touchpoints if files added/moved
4. Note any decisions made

### Definition of Done — Implementation Ready for Review

- [ ] All tasks in tasks.md completed
- [ ] Code follows patterns in `.cursor/rules/`
- [ ] Tests written and passing
- [ ] No linter errors or warnings
- [ ] Code touchpoints updated in feature README
- [ ] AI signals ready for human review

---

## Step 4: Review Together

**Rule**: Code changes and documentation changes are reviewed in the same PR.

### PR Checklist

Every PR should include:

- [ ] Code changes
- [ ] Updated task checkboxes
- [ ] Updated code touchpoints (if structure changed)
- [ ] New ADR (if significant decision made)
- [ ] Updated AGENTS.md (if architecture changed)

### Review Focus

Reviewers check:
- Does code match spec?
- Are docs accurate?
- Are acceptance criteria met?
- Is progress tracking updated?

### Definition of Done — Ready to Complete

- [ ] All acceptance criteria verified and passing
- [ ] Code quality approved by human
- [ ] No outstanding feedback or iteration needed
- [ ] Human approves for merge

---

## Step 5: Archive After

**Rule**: Completed specs are archived, not deleted.

### When Complete

After feature is merged and verified:

1. Update feature status in `docs/features/README.md` to "Complete"
2. Update `docs/TASKS.md` to show 100%
3. Move PRD-lite to `docs/specs/_archive/` (optional)
4. Keep feature docs for reference

### What to Keep

- Feature documentation (README, user-stories)
- ADRs (permanent record)
- Rule files (stable reference)

### What to Archive

- PRD-lite specs (served their purpose)
- Outdated task lists (after completion)

### Definition of Done — Feature Complete

- [ ] Code merged to main branch
- [ ] Significant decisions extracted to ADRs
- [ ] REFERENCE docs updated with new system state
- [ ] Valuable diagrams preserved in docs
- [ ] Spec archived to `docs/specs/_archive/`
- [ ] AGENTS.md updated if architecture changed
- [ ] Feature status updated in `docs/features/README.md`

---

## Workflow by Scenario

### New Feature

```
1. Write PRD-lite spec → docs/specs/<feature>.md
2. Create feature docs → docs/features/<feature>/
3. Add tasks to TASKS.md
4. Build following rules
5. Update docs during build
6. Review code + docs together
7. Archive spec after completion
```

### Bug Fix

```
1. Describe in PR/commit (no spec needed)
2. Follow rules for code style
3. Update affected docs if behavior changed
4. Review and merge
```

### Refactor

```
1. Document reason in ADR if significant
2. Follow rules for code organization
3. Update code touchpoints in affected features
4. Update AGENTS.md if structure changed
```

### New Pattern

```
1. Implement pattern in code
2. Add pattern to relevant .cursor/rules/ file
3. Document in AGENTS.md if project-wide
4. AI follows pattern going forward
```

---

## Update Triggers Quick Reference

| Event | Update |
|-------|--------|
| New file created | Code touchpoints in feature README |
| Task done | Checkbox in tasks.md + TASKS.md |
| Decision made | ADR in docs/decisions/ |
| Pattern established | .cursor/rules/*.mdc |
| Architecture change | AGENTS.md |
| Feature complete | Status in docs/features/README.md |
| Spec done | Archive to docs/specs/_archive/ |
