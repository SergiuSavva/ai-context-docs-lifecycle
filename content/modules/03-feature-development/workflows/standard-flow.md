# Standard Flow

> **For small-medium features and enhancements (< 5 files).**

---

## When to Use

| Trigger | Example |
|---------|---------|
| New component | "Add search filter to user list" |
| New endpoint | "Create GET /api/users/:id endpoint" |
| UI enhancement | "Add loading spinner to submit button" |
| Feature toggle | "Add dark mode toggle" |
| Small feature | "Add 'mark all as complete' to todo list" |

**Rule of thumb**: If it's not a bug fix AND doesn't need research, use Standard Flow.

---

## Process

```
1. Create feature-spec.md (problem + acceptance criteria)
2. Create tasks.md with checklist
3. Mark first task [~] and implement
4. Update tasks.md after each task
5. Verify acceptance criteria
6. Signal "Ready for review"
7. Archive or delete spec
```

---

## File Structure

```
docs/specs/<feature-name>/
├── feature-spec.md    # Requirements + acceptance criteria
└── tasks.md           # Implementation checklist
```

---

## AI Agent Instructions

### Context Loading Order

```markdown
1. AGENTS.md                              → Project context
2. docs/specs/<feature>/feature-spec.md   → Requirements
3. docs/specs/<feature>/tasks.md          → Current status
4. .cursor/rules/*.mdc                    → Coding patterns
```

### Before Starting

```markdown
AI MUST check:

1. Does feature-spec.md exist?
   ├─ YES → Read it, proceed
   └─ NO → Create it from template, ask user to review

2. Does tasks.md exist?
   ├─ YES → Find first uncompleted task
   └─ NO → Create it from feature-spec requirements

3. Is there a task marked [~]?
   ├─ YES → Continue that task
   └─ NO → Mark next pending task [~]
```

### During Implementation

```markdown
AI MUST follow these rules:

1. ONE task [~] at a time
   - Never have multiple tasks in progress

2. Update tasks.md after EACH task
   - Mark completed: [x]
   - Mark blocked: [B] with reason
   - Mark skipped: [S] with reason
   - Recalculate progress

3. Progress calculation
   progress = (completed + skipped) / total * 100
```

### When Blocked

```markdown
If blocked:
1. Mark task [B] with reason
2. Ask user for guidance
3. Do NOT skip to next task without acknowledgment
```

### Signaling Completion

```markdown
When all tasks are [x] or [S]:

1. Verify each acceptance criterion
2. Output completion signal:

"Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (X/Y)
- [x] Acceptance criteria verified
- [ ] Human review needed

**Acceptance Criteria Status**:
- AC-01: ✓ Implemented
- AC-02: ✓ Implemented

**Next steps**: Please review and provide feedback."
```

---

## Templates

### feature-spec.md

```markdown
# Feature: [Name]

## Problem
[1-2 sentences: What problem does this solve?]

## Solution
[1-2 sentences: How will we solve it?]

## Acceptance Criteria
- [ ] AC-01: [Criterion]
- [ ] AC-02: [Criterion]
- [ ] AC-03: [Criterion]

## Out of Scope
- [What we're NOT building]

## Tasks
See [tasks.md](./tasks.md)
```

### tasks.md

```markdown
# Tasks: [Feature Name]

## [Category 1]
- [ ] T-01: [Task description]
- [ ] T-02: [Task description]

## [Category 2]
- [ ] T-03: [Task description]
- [ ] T-04: [Task description]

---
**Progress**: 0/4 (0%)
**Blocked**: None
**In Progress**: None
```

---

## Definition of Done

### Auto-Verifiable (AI can confirm)

- [ ] All tasks completed `[x]` or skipped `[S]`
- [ ] No linter errors
- [ ] Progress = 100%

### Manual Verification (Human confirms)

- [ ] Acceptance criteria verified
- [ ] Code quality acceptable
- [ ] Feature README updated (if files added)
- [ ] AGENTS.md updated (if new patterns)

---

## When to Escalate to Complex Flow

Escalate if during implementation you discover:

- Research is needed (API docs, comparing options)
- More than 5 files affected
- Architecture decisions required
- External dependencies need evaluation

**Action**: Create research.md, add user-stories.md, switch to Complex Flow.

---

## After Completion

1. **Human reviews** implementation
2. **If approved**: Delete or archive spec folder
3. **If changes needed**: AI iterates, updates tasks

**Note**: Standard Flow does NOT require an ADR. Only create ADR if you made a significant decision with alternatives considered.
