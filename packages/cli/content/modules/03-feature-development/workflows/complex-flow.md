# Complex Flow (Research Required)

> **For complex features** - includes Research phase with all optional docs.

---

## When to Use

| Trigger | Example |
|---------|---------|
| New system | "Implement authentication system" |
| External API | "Integrate Stripe payments" |
| Architecture change | "Migrate from REST to GraphQL" |
| Research needed | "Evaluate caching solutions" |
| Multiple approaches | "Choose between SSR and CSR" |

**Rule**: If you need to evaluate options before building, use Complex Flow.

---

## Three Phases

```
Research (required) → Plan (required) → Implement (required)
```

All phases include validation checkpoints with user.

---

## Phase 1: Research

Explore unknowns before committing to an approach.

### Create research.md

```
specs/[feature-name]/research.md
```

Must include:
- Problem statement
- Options evaluated (2+ alternatives)
- Pros/cons for each
- Recommendation with rationale

### AI Instructions

```
1. Document at least 2 alternatives
2. List pros/cons for each
3. Include relevant links/resources
4. Create diagrams if helpful
5. Make recommendation with rationale
6. VALIDATE with user before proceeding
```

**Do not proceed to Plan until research is approved.**

---

## Phase 2: Plan

Create comprehensive documentation.

### Required Docs

| Doc | Purpose |
|-----|---------|
| `spec.md` | What to build, acceptance criteria |
| `tasks.md` | Implementation checklist |

### Optional Docs (Recommended for Complex)

| Doc | Purpose | Add When |
|-----|---------|----------|
| `design.md` | Architecture, APIs, data models | System design needed |
| `plan.md` | Sequence, dependencies, risks | Complex dependencies |
| `user-stories.md` | Test scenarios (Given/When/Then) | User-facing feature |

### AI Instructions

```
1. Write clear problem statement
2. Define measurable acceptance criteria
3. Set explicit scope boundaries (In/Out)
4. Identify risks and mitigations
5. Break down into phased tasks
6. VALIDATE plan with user before implementing
```

---

## Phase 3: Implement

Execute with structured task tracking.

### AI Instructions

```
1. ONE task [~] at a time
2. Update tasks.md after EACH task
3. Work in dependency order (see plan.md)
4. Signal completion at milestones
5. Request human review at checkpoints
```

### Context Loading Order

```
1. AGENTS.md                    → Project context
2. specs/[feature]/research.md  → Research notes
3. specs/[feature]/spec.md      → Requirements
4. specs/[feature]/plan.md      → Dependencies
5. specs/[feature]/tasks.md     → Current status
6. Relevant skills              → Coding patterns (on-demand)
7. @docs/ references            → System knowledge (on-demand)
```

---

## Completion

When all tasks are done:

```
Ready for review. Implementation complete.

**DoD Checklist**:
- [x] All tasks completed (X/Y)
- [x] All acceptance criteria verified
- [x] Tests passing
- [ ] ADR needed: Yes/No
- [ ] AGENTS.md updates needed: [list sections]
- [ ] Human review needed

**Key Decisions Made**:
- [Decision 1]: [Brief rationale]

**Next steps**: Please review. After approval, I will create ADR.
```

---

## After Approval

### 1. Create ADR

```
docs/decisions/NNN-[decision-name].md
```

ADR captures:
- Why this approach was chosen
- What alternatives were rejected
- Trade-offs accepted

### 2. Update AGENTS.md

Add new patterns, update tech stack if needed.

### 3. Delete Spec Folder

```
specs/[feature-name]/ → deleted
```

Knowledge now lives in:
- `docs/decisions/` (permanent)
- `AGENTS.md` (evergreen)

---

## Definition of Done

### Auto-Verifiable

- [ ] All tasks `[x]` or `[S]`
- [ ] No blocked tasks remaining
- [ ] No linter errors

### Manual Verification

- [ ] All acceptance criteria verified
- [ ] Tests written and passing
- [ ] ADR created for key decisions
- [ ] AGENTS.md updated

---

## File Structure

```
specs/
└── [feature-name]/
    ├── research.md      # Required for complex
    ├── spec.md          # Required
    ├── tasks.md         # Required
    ├── design.md        # Recommended
    ├── plan.md          # Recommended
    └── user-stories.md  # Recommended

docs/decisions/
└── NNN-[decision].md    # Created after approval
```

---

## Checkpoints Summary

| After | Validate |
|-------|----------|
| Research | User approves approach |
| Plan | User approves spec |
| Implement | User reviews code |
| Completion | User approves for merge |
