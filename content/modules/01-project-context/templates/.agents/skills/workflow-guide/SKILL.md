---
name: workflow-guide
description: Inspect project state and recommend the next workflow action. Use when resuming work, onboarding, or asking "what should I do next?"
---

# Workflow Guide

> Adaptive guidance that inspects your project and tells you what to do next.

## How to Use

When activated, inspect the project state in this order, then recommend the next action.

---

## State Inspection

### Step 1: Check AGENTS.md

```
Does AGENTS.md exist at the project root?
├─ NO  → Recommend: Bootstrap AGENTS.md
│        "Run the ACDL bootstrap workflow to create AGENTS.md."
│        load skill `acdl`
└─ YES → Continue to Step 2
```

### Step 2: Check Active Specs

```
Does a specs/ folder exist with active feature folders?
├─ NO  → Recommend: Start a new feature or Quick Flow
│        "No active features. Create specs/[feature-name]/spec.md to start,
│         or use Quick Flow for bug fixes."
│        load skill `feature-workflow`
└─ YES → Pick the most recent spec folder, continue to Step 3
```

### Step 3: Check Spec Completeness

```
Does the active spec folder have spec.md?
├─ NO  → Recommend: Create spec.md
│        "Spec folder exists but has no spec.md. Create one with problem,
│         solution, and acceptance criteria."
│        load skill `spec-writing`
└─ YES → Continue

Does the active spec folder have tasks.md?
├─ NO  → Recommend: Create tasks.md
│        "Spec exists but no task breakdown. Create tasks.md from the spec."
└─ YES → Continue to Step 4
```

### Step 4: Check Task Progress

```
Read tasks.md and check marker states:

All tasks [x] or [S]?
├─ YES → Does verify-checklist.md exist?
│        ├─ NO  → Recommend: Run verification
│        │        "All tasks complete. Create verify-checklist.md and
│        │         cross-reference each acceptance criterion."
│        └─ YES → Is checklist all passing?
│                 ├─ YES → Recommend: Closeout
│                 │        "Verification passed. Delete spec folder,
│                 │         create ADR if needed, update AGENTS.md."
│                 └─ NO  → Recommend: Fix verification issues
│                          "Verification found issues. Fix them before closeout."
│
Any tasks [B]?
├─ YES → Recommend: Resolve blockers
│        "Tasks are blocked: [list blocked tasks and reasons].
│         Resolve blockers or mark [S] with justification."
│
Any tasks [~]?
├─ YES → Recommend: Continue in-progress task
│        "Task [T-XX] is in progress. Continue from where you left off."
│
Otherwise:
└─ Recommend: Start next pending task
   "Next pending task: [T-XX description]. Mark it [~] and begin."
```

---

## Recovery Scenarios

| Situation | Recommendation |
|-----------|----------------|
| Stale spec (code changed but spec not updated) | Update spec.md to reflect current state, or delete if feature is done |
| Missing AGENTS.md but project has code | Run bootstrap workflow to generate AGENTS.md from existing codebase |
| Tasks 100% but no verification | Create verify-checklist.md before closeout |
| Spec folder exists after feature shipped | Closeout was incomplete — delete spec folder, check if ADR is needed |
| Multiple active specs | Focus on one at a time; list all and ask user which to continue |

---

## Output Format

When reporting project state, use this structure:

```
**Project State**:
- AGENTS.md: ✓ Exists / ✗ Missing
- Active specs: [list or "none"]
- Current feature: [name] or "none"
- Phase: Research / Plan / Implement / Verify / Closeout
- Task progress: X/Y (Z%)
- Blocked: [count] tasks

**Recommended Next Action**:
[Specific action with concrete instructions]
```

---

## When NOT to Use

- During active implementation (load `feature-workflow` instead)
- When writing spec content (load `spec-writing` instead)
- When setting up ACDL for the first time (load `acdl` instead)

---

## Quick Checklist

- [ ] Inspected AGENTS.md presence
- [ ] Checked specs/ for active features
- [ ] Read tasks.md progress state
- [ ] Checked for verify-checklist.md
- [ ] Provided specific, actionable recommendation

## Related Docs

- load skill `feature-workflow`
- load skill `acdl`
- load skill `spec-writing`
