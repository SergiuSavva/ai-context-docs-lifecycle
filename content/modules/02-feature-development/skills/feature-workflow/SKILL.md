---
name: feature-workflow
description: Feature workflow — Research, Plan, Implement, Verify with task tracking, parallel execution, and validation checkpoints. Also handles project state inspection and "what should I do next?" guidance. Use when building features, executing tasks, managing implementation progress, resuming work, or onboarding.
---

# Feature Workflow

## Project State Inspection

When resuming work, onboarding, or asked "what should I do next?", inspect state in this order:

```
1. Does AGENTS.md exist?
   ├─ NO  → Bootstrap it (load skill `acdl`)
   └─ YES → Continue

2. Does specs/ have active feature folders?
   ├─ NO  → Start a new feature (see Decision Tree) or Quick Flow for bug fixes
   └─ YES → Pick most recent, continue

3. Does the active spec have spec.md + tasks.md?
   ├─ Missing spec.md  → Create it (load skill `spec-writing`)
   ├─ Missing tasks.md → Create it from spec (load skill `spec-writing`)
   └─ Both exist → Check task progress

4. Task progress:
   ├─ All [x]/[S]     → Verify phase (see below)
   ├─ Any [B]         → Resolve blockers or mark [S] with justification
   ├─ Any [~]         → Continue that in-progress task
   └─ Otherwise       → Mark next pending task [~] and begin
```

**Report format:**

```
**Project State**:
- AGENTS.md: ✓ / ✗
- Active specs: [list or "none"]
- Current feature: [name] — Phase: Research / Plan / Implement / Verify
- Implementation phase: Phase N of M ({{phase name}})
- Task progress: X/Y (Z%)
- Blocked: [count] tasks

**Recommended Next Action**: [specific instruction]
```

### Recovery Scenarios

| Situation | Action |
|-----------|--------|
| Stale spec (code changed, spec not updated) | Update spec.md or delete if feature is done |
| Tasks 100% but no verification | Create verify-checklist.md before closeout |
| Spec folder exists after feature shipped | Delete spec folder, check if ADR is needed |
| Multiple active specs | Focus on one; list all and ask user which to continue |

---

## Four Phases

```
Research → Plan → Implement → Verify
(optional)  (required)  (required)  (required)
```

| Phase | Purpose | When |
|-------|---------|------|
| **Research** | Explore unknowns, evaluate options | Multiple approaches possible |
| **Plan** | Define what to build, break into tasks | Always (for features) |
| **Implement** | Execute step by step | Always |
| **Verify** | Confirm implementation matches spec | Always (after tasks complete) |

Each phase ends with a **user validation checkpoint** before proceeding.

---

## Decision Tree

```
Is this a bug fix?
├─ YES → Quick Flow: Find → Fix → Commit → Done (no docs)
└─ NO → Create specs/[feature-name]/spec.md + tasks.md

    Do I need to evaluate options?
    ├─ YES → Add research.md (Research phase)
    └─ NO → Continue

    Do I need architecture decisions?
    ├─ YES → Add design.md
    └─ NO → Continue

    Are there complex dependencies?
    ├─ YES → Add plan.md
    └─ NO → Continue

    Validate with user → Implement
```

---

## Before Starting

```
1. Does specs/[feature-name]/spec.md exist?
   ├─ YES → Read it
   └─ NO → Create it (load skill `spec-writing`), validate with user

2. Does specs/[feature-name]/tasks.md exist?
   ├─ YES → Find first non-complete task
   └─ NO → Create it from spec (load skill `spec-writing` for traceability)

3. Is there a task marked [~]?
   ├─ YES → Continue that task
   └─ NO → Mark next pending [~]
```

---

## Plan Verification Gate

Before marking any task `[~]`, verify the plan passes these checks:

1. **AC coverage** — every AC-XX in spec.md maps to at least one task
2. **Task atomicity** — each task is a single deliverable (one logical unit, not 5+ unrelated files)
3. **Dependency ordering** — no task references output from a later task; phases flow core → dependent
4. **Validation commands** — every phase validation has a concrete check (not "confirm it works")
5. **Scope alignment** — no task implements items listed as out-of-scope in spec.md

**Gate rule**: Do not start implementation until all 5 checks pass. Present the AC → task mapping to the user for confirmation.

```
Plan Verification:
- [ ] AC coverage: [AC-01 → T-01, T-02] [AC-02 → T-03] ...
- [ ] Task atomicity: each task is a single deliverable
- [ ] Dependencies flow forward (no backward references)
- [ ] Every phase validation has a concrete check command
- [ ] No task exceeds spec scope
```

---

## Task Markers

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress |
| `[x]` | Completed |
| `[B]` | Blocked (include reason) |
| `[S]` | Skipped (include reason) |

**Progress formula**: `(completed + skipped) / total * 100`

### Task Numbering

Number tasks sequentially with the `T-XX` prefix: `T-01`, `T-02`, etc. Group tasks under phase headings (Setup, Core Implementation, Testing, Documentation). Each task is a single checklist item with its marker and number:

```markdown
- [ ] T-01: Set up database schema
- [ ] T-02: Create API route stubs
```

### Sequential vs Parallel

- **Sequential (default)**: One `[~]` at a time across all tasks
- **Parallel (opt-in)**: Tasks grouped into waves (`### Wave N` headers). One `[~]` per wave. All tasks in Wave N must complete before Wave N+1 starts.
- **Safety check**: Before grouping tasks into a wave, verify no two tasks in the same wave modify the same file or shared state. See `tasks.md` Wave Grouping section for safe/unsafe criteria.

---

## During Implementation

1. **One `[~]` at a time** (sequential) or **one `[~]` per wave** (parallel)
2. **Update tasks.md after EACH task** — track progress continuously
3. **Commit after each task or wave** — not one giant commit at the end
4. **Calculate progress** after each update
5. **Tests must pass** before marking a task `[x]` — tests are part of the task, not a follow-up
6. **When blocked** — mark `[B]` with reason, ask user for help

### Phase Validation Gates

Tasks are grouped into **dependency-ordered phases** (core → dependent). Between phases:

1. **Complete all tasks** in the current phase
2. **Run the phase validation** (defined in tasks.md per phase — e.g., tests pass, output correct)
3. **Report results to user** and get confirmation before starting the next phase

```
Phase 1 tasks → Phase 1 validation → user confirms → Phase 2 tasks → ...
```

If validation fails, fix issues within the current phase before moving on. This prevents building on a broken foundation.

---

## Subagent Delegation (Optional)

For large features (>8 tasks) or when context becomes heavy, delegate work to fresh subagents instead of running everything in a single conversation.

| Agent | When to Spawn | Context It Receives |
|-------|---------------|---------------------|
| **Researcher** | Research phase; mid-implementation unknowns | spec.md + AGENTS.md + search scope description |
| **Executor** | Per task or wave during Implement phase | spec.md + specific task(s) from tasks.md + AGENTS.md |
| **Verifier** | Verify phase; phase validation gates | spec.md + tasks.md + verify-checklist.md template + AGENTS.md |

**When to delegate**:

```
Task count > 8 or conversation context feeling heavy?
├─ YES → Spawn Executor per task/wave, Verifier for gates
└─ NO  → Single-context execution (default, most features)
```

**Delegation protocol**:
1. Pass file paths to each subagent (let it read fresh, don't paste content)
2. Subagent completes work and writes a status summary as a comment in tasks.md
3. Orchestrator (main conversation) updates task markers based on results

**Tool-specific**: In Claude Code, use the Task tool. In Cursor, use separate Composer sessions. In other tools, start a new conversation with the listed files as context.

**Anti-pattern**: Never spawn an executor for a task that depends on output from an incomplete prior task. Sequential dependencies must remain sequential.

---

## Context Awareness

Long implementations consume context. Monitor and manage proactively.

**Warning signs**:
- Conversation exceeds ~30 back-and-forth exchanges
- Agent starts forgetting earlier decisions or repeating questions
- Responses become less specific or more generic

**Checkpoint protocol**:
1. Write a progress comment in tasks.md: completed tasks, current status, key decisions made, blockers
2. Consider subagent delegation if many tasks remain
3. Offer the user a fresh session: "Context is getting heavy. State is saved in tasks.md. We can continue or start fresh."

---

## Verify Phase (Definition of Done)

When all tasks are `[x]` or `[S]`, create `verify-checklist.md`. This checklist **is** the Definition of Done — a single artifact that gates closeout.

The checklist covers:

1. **Task Completion** — all tasks `[x]`/`[S]`, progress = 100%
2. **Acceptance Criteria** — each AC verified with concrete evidence
3. **Scope Check** — in-scope delivered, no out-of-scope creep
4. **Quality** — no linter errors, tests pass
5. **Stub Detection** — no TODOs, empty implementations, placeholder text, or unwired code
6. **Knowledge Persistence** — affected reference docs updated, ADR created if needed
7. **Human Approval** — user signs off

Do not proceed to closeout until all checks pass and the user approves.

```
Verification complete.

**Progress**: X/Y tasks (100%)
**Acceptance Criteria**: All pass / Issues found
**Stub Detection**: Clean / Issues found
**Doc Freshness**: Up to date / Updates needed
**Decision Record**: Created / Not needed

**Next steps**: Please review. After approval, I will close out.
```

---

## Doc Freshness Rule

After implementation, update any `docs/` files affected by the change (only applicable for docs that exist in the project):

| Change | Update (if doc exists) |
|--------|------------------------|
| Data schema/model change | `docs/data-model.md` |
| API/action surface change | `docs/api.md` |
| Architecture change | `docs/architecture.md` + create ADR |
| Auth flow change | `docs/auth.md` |

Not every project has every doc. Update only the docs your project maintains. Update docs in the same PR as the code change.

---

## Git Workflow (Recommended)

### Branch Naming

- `feat/<spec-name>` for features
- `fix/<spec-name>` for bug fixes

### Atomic Commits

One commit per completed task. Format:

```
type(scope): description

- T-XX: what was done
```

**Types**: `feat` (new feature), `fix` (bug fix), `test` (tests only), `refactor` (no behavior change), `chore` (config, deps, docs)

**Scope**: Feature name or module area. Example: `feat(auth): add JWT validation middleware`

### Commit Rules

- Commit after each task — never one giant commit at the end
- Every commit should leave the project in a working state (tests pass)
- Include task ID (T-XX) in commit body for traceability back to tasks.md
- Wave commits: one commit per wave is acceptable — list all task IDs in body
- Include `specs/` folder in branch; remove during closeout

---

## After Approval (Closeout)

1. Update affected reference docs in `docs/` (data-model, api, architecture, auth — only those that exist in the project)
2. Create ADR in `docs/decisions/` (if significant decision was made)
3. Update AGENTS.md (if new patterns, commands, or boundaries emerged)
4. Delete `specs/[feature-name]/` folder (specs are ephemeral)

---

## When NOT to Use

- **Bug fixes, typos, config changes** — use Quick Flow (Find → Fix → Commit)
- **Pure exploration / brainstorming** — no structured workflow needed
- **Single-file changes** that don't need acceptance criteria
- **Setting up ACDL for the first time** — load skill `acdl` instead

---

## Quick Checklist

- [ ] spec.md exists with problem, solution, acceptance criteria, and implementation phases
- [ ] tasks.md exists with dependency-ordered phases and T-XX numbered tasks
- [ ] User validated spec before implementation started
- [ ] One `[~]` at a time (or per wave if parallel)
- [ ] tasks.md updated after each completed task
- [ ] Each phase validated before starting the next
- [ ] verify-checklist.md completed (this is the Definition of Done)
- [ ] User approved the verify-checklist before closeout
- [ ] Spec folder deleted after feature approved

## Spec Templates

Templates live in `.agents/skills/feature-workflow/templates/`. When creating a new feature spec:

1. Copy `templates/spec.md` → `specs/<feature-name>/spec.md`
2. Copy `templates/tasks.md` → `specs/<feature-name>/tasks.md`
3. Add optional templates as needed: `research.md`, `plan.md`, `design.md`, `adr.md`, `verify-checklist.md`, `user-stories.md`

## Related Docs

- Spec files: @specs/[feature-name]/spec.md
- Task files: @specs/[feature-name]/tasks.md
- Decision records: @docs/decisions/
- load skill `spec-writing`
- load skill `testing` (for test strategy during Implement phase)
- load skill `debug-workflow` (for bugs discovered during implementation)
