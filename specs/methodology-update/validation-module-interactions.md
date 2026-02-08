# Validation: Module Interaction Diagrams

> How AI agents use each module — validated through real scenario walkthroughs.

---

## Module Overview (4 Modules)

```mermaid
flowchart TB
    subgraph M1["Module 1: Project Context"]
        A["AGENTS.md<br/>(always loaded)"]
        D["docs/<br/>(on-demand reference)"]
    end

    subgraph M2["Module 2: Skills"]
        S[".agents/skills/<br/>(on-demand patterns)"]
    end

    subgraph M3["Module 3: Feature Dev"]
        SP["specs/<br/>(ephemeral)"]
        W["Workflow:<br/>Research → Plan → Implement"]
    end

    subgraph M4["Module 4: Planning"]
        PL["PROJECT-PRD.md<br/>TASKS.md"]
    end

    A -->|"Context Loading table"| S
    A -->|"@docs/ references"| D
    S -->|"@docs/ cross-refs"| D
    A -->|"@specs/ references"| SP
    SP -->|"creates/updates"| D
    PL -->|"generates"| SP

    style M1 fill:#10b98120,stroke:#10b981
    style M2 fill:#3b82f620,stroke:#3b82f6
    style M3 fill:#f59e0b20,stroke:#f59e0b
    style M4 fill:#8b5cf620,stroke:#8b5cf6
```

---

## Scenario 1: New Feature ("Add task comments")

The most complete flow — touches all 4 modules.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant AI as AI Agent
    participant M1_A as Module 1<br/>AGENTS.md
    participant M2_S as Module 2<br/>Skills
    participant M1_D as Module 1<br/>docs/
    participant M3 as Module 3<br/>Feature Dev

    Dev->>AI: "Add comments to tasks"

    Note over AI,M1_A: Layer 1 — Always loaded
    AI->>M1_A: Read AGENTS.md (~300 tokens)
    M1_A-->>AI: Stack, conventions, boundaries,<br/>Context Loading table

    Note over AI,M3: Module 3 — Workflow triggers
    AI->>AI: Feature is non-trivial → create spec
    AI->>M3: Create specs/comments/spec.md
    AI->>M3: Create specs/comments/tasks.md

    Note over AI,M1_D: Layer 3 — Reference lookup
    AI->>M1_D: Read @docs/data-model.md
    M1_D-->>AI: Current schema, tables,<br/>relationships (ERD)
    AI->>M1_D: Read @docs/api.md
    M1_D-->>AI: Existing Server Actions,<br/>revalidation patterns

    Note over AI,M2_S: Layer 2 — Load relevant skills
    AI->>M2_S: Load skill: database
    M2_S-->>AI: Supabase patterns, migrations,<br/>RLS, React Query integration
    AI->>M2_S: Load skill: nextjs-app-router
    M2_S-->>AI: Server Actions patterns,<br/>page structure, error handling

    Note over AI: Implementation begins
    AI->>AI: Create migration (from database skill)
    AI->>AI: Add Server Action (from nextjs skill)
    AI->>AI: Build UI (conventions from AGENTS.md)

    Note over AI,M1_D: Update docs (Module 1)
    AI->>M1_D: Update docs/data-model.md<br/>(add comments table)
    AI->>M1_D: Update docs/api.md<br/>(add comment actions)

    Note over AI,M3: Complete workflow (Module 3)
    AI->>M3: Mark tasks complete in<br/>specs/comments/tasks.md
```

### Token Budget

| Step | Module | Tokens Loaded |
|------|--------|--------------|
| AGENTS.md | M1 | ~700 |
| data-model.md | M1 (docs) | ~1,150 |
| api.md | M1 (docs) | ~1,100 |
| database skill | M2 | ~1,750 |
| nextjs-app-router skill | M2 | ~1,620 |
| **Total** | | **~6,320** |

Only ~700 is always-on. The rest is task-relevant, loaded on-demand.
Old approach (14 always-on rules): **~5,000 tokens** loaded regardless of task relevance.

---

## Scenario 2: Bug Fix ("Task status not updating")

Lighter flow — skips Module 3 and Module 4.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant AI as AI Agent
    participant M1_A as Module 1<br/>AGENTS.md
    participant M2_S as Module 2<br/>Skills
    participant M1_D as Module 1<br/>docs/

    Dev->>AI: "Task status doesn't update<br/>after drag and drop"

    Note over AI,M1_A: Layer 1 — Always loaded
    AI->>M1_A: Read AGENTS.md
    M1_A-->>AI: Conventions: Server Actions for mutations,<br/>React Query for client state

    Note over AI,M1_D: Layer 3 — Targeted lookup
    AI->>M1_D: Read @docs/api.md
    M1_D-->>AI: updateTaskStatus action,<br/>revalidation: path + tag
    AI->>M1_D: Read @docs/decisions/002-react-query.md
    M1_D-->>AI: Why React Query, cache invalidation rules

    Note over AI,M2_S: Layer 2 — One skill needed
    AI->>M2_S: Load skill: database
    M2_S-->>AI: React Query mutation patterns,<br/>optimistic updates, query keys

    Note over AI: Fix the bug
    AI->>AI: Fix query invalidation<br/>in mutation handler

    Note over AI: No docs update needed<br/>(no schema/API change)
    Note over AI: No spec needed<br/>(simple bug fix)
```

### Token Budget

| Step | Module | Tokens Loaded |
|------|--------|--------------|
| AGENTS.md | M1 | ~700 |
| api.md | M1 (docs) | ~1,100 |
| ADR 002 | M1 (docs) | ~375 |
| database skill | M2 | ~1,750 |
| **Total** | | **~3,925** |

Only ~700 is always-on. Remaining ~3,225 loaded because it's relevant to the bug.

---

## Scenario 3: UI-Only Change ("Redesign task card")

Minimal flow — mostly Module 1 + one skill.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant AI as AI Agent
    participant M1_A as Module 1<br/>AGENTS.md
    participant M2_S as Module 2<br/>Skills
    participant M1_D as Module 1<br/>docs/

    Dev->>AI: "Redesign the task card<br/>with priority badges"

    Note over AI,M1_A: Layer 1 — Always loaded
    AI->>M1_A: Read AGENTS.md
    M1_A-->>AI: Conventions: shadcn/ui, semantic colors,<br/>Server Components by default

    Note over AI,M2_S: Layer 2 — UI skill
    AI->>M2_S: Load skill: ui-components
    M2_S-->>AI: shadcn/ui patterns, theming,<br/>layout components, accessibility

    Note over AI,M1_D: Layer 3 — Maybe needed
    AI->>M1_D: Read @docs/data-model.md
    M1_D-->>AI: Priority enum values:<br/>low, medium, high, urgent

    Note over AI: Build the component
    AI->>AI: Create TaskCard with<br/>Badge from shadcn/ui

    Note over AI: No docs update needed<br/>No spec needed
```

### Token Budget

| Step | Module | Tokens Loaded |
|------|--------|--------------|
| AGENTS.md | M1 | ~700 |
| ui-components skill | M2 | ~1,650 |
| data-model.md (partial) | M1 (docs) | ~1,150 |
| **Total** | | **~3,500** |

Only ~700 is always-on. Lightest coding scenario — one skill, one doc.

---

## Scenario 4: Project Setup (Day 1)

Module 1 setup, optionally Module 4.

```mermaid
sequenceDiagram
    actor Dev as Developer
    participant AI as AI Agent
    participant M1 as Module 1<br/>Project Context
    participant M2 as Module 2<br/>Skills
    participant M4 as Module 4<br/>Planning

    Dev->>AI: "Set up a new project<br/>using the ACDL methodology"

    Note over AI,M1: Module 1 — Bootstrap
    AI->>M1: Create AGENTS.md from template
    AI->>M1: Create docs/architecture.md
    AI->>M1: Create docs/data-model.md
    AI->>M1: Create docs/api.md
    AI->>M1: Create docs/auth.md

    Note over AI,M2: Module 2 — Add relevant skills
    AI->>M2: Create .agents/skills/ structure
    AI->>M2: Add skills matching tech stack
    AI->>AI: Skills reference @docs/ files

    Note over AI,M4: Module 4 — Optional planning
    Dev->>AI: "We need a roadmap too"
    AI->>M4: Create PROJECT-PRD.md
    AI->>M4: Create TASKS.md
    AI->>M4: Break PRD into task specs

    Note over AI: Project ready for development
```

---

## Scenario 5: Enterprise Planning (Module 4 → Module 3)

Shows how planning flows into feature development.

```mermaid
sequenceDiagram
    actor PM as PM / Dev
    participant AI as AI Agent
    participant M4 as Module 4<br/>Planning
    participant M3 as Module 3<br/>Feature Dev
    participant M1_A as Module 1<br/>AGENTS.md
    participant M2_S as Module 2<br/>Skills
    participant M1_D as Module 1<br/>docs/

    PM->>AI: "Plan Q2 features from PRD"

    Note over AI,M4: Module 4 — Planning
    AI->>M4: Read PROJECT-PRD.md
    AI->>M4: Break into tasks in TASKS.md
    M4-->>AI: Task list with priorities

    PM->>AI: "Implement: real-time notifications"

    Note over AI,M3: Module 3 — Feature workflow
    AI->>M3: Create specs/notifications/spec.md
    AI->>M3: Research phase → research.md
    AI->>M3: Plan phase → tasks.md

    Note over AI,M1_A: Module 1 — Context
    AI->>M1_A: Read AGENTS.md
    M1_A-->>AI: Structure, conventions

    Note over AI,M1_D: Module 1 — Reference
    AI->>M1_D: Read @docs/architecture.md
    M1_D-->>AI: Current system layers
    AI->>M1_D: Read @docs/data-model.md
    M1_D-->>AI: Tables for notifications

    Note over AI,M2_S: Module 2 — Skills
    AI->>M2_S: Load skill: database
    M2_S-->>AI: Supabase Realtime patterns
    AI->>M2_S: Load skill: nextjs-app-router
    M2_S-->>AI: Streaming, Suspense patterns

    Note over AI: Implement phase
    AI->>AI: Build feature using<br/>all loaded context

    Note over AI,M1_D: Update permanent docs
    AI->>M1_D: Update architecture.md<br/>(add realtime layer)
    AI->>M1_D: Create ADR:<br/>003-realtime-notifications.md
```

---

## Module Dependency Matrix

Which modules interact with which, and how:

```mermaid
flowchart LR
    subgraph "Always Active"
        M1["Module 1<br/>Project Context"]
    end

    subgraph "On-Demand"
        M2["Module 2<br/>Skills"]
        M3["Module 3<br/>Feature Dev"]
        M4["Module 4<br/>Planning"]
    end

    M1 -->|"routes to"| M2
    M1 -->|"references"| M3
    M2 -->|"reads from"| M1
    M3 -->|"updates"| M1
    M4 -->|"generates"| M3
    M3 -->|"uses"| M2

    style M1 fill:#10b981,color:#fff
    style M2 fill:#3b82f6,color:#fff
    style M3 fill:#f59e0b,color:#fff
    style M4 fill:#8b5cf6,color:#fff
```

| From → To | Relationship | Example |
|-----------|-------------|---------|
| M1 → M2 | **Routes** (Context Loading table) | "Building pages → load skill `nextjs-app-router`" |
| M1 → M3 | **References** (links to specs/) | "@specs/current-feature/" |
| M2 → M1 | **Reads** (cross-references docs) | Skill says "@docs/data-model.md" |
| M3 → M1 | **Updates** (new docs, ADRs) | Feature complete → update architecture.md |
| M4 → M3 | **Generates** (PRD → specs) | Break PRD task into specs/task-name/ |
| M3 → M2 | **Uses** (loads skills during implementation) | Implementing → load relevant skills |

---

## Interaction Frequency Per Module

```
Session Type          M1(Context)  M2(Skills)  M3(FeatureDev)  M4(Planning)
─────────────────────────────────────────────────────────────────────────────
Bug fix                  ██████       ████          ░░              ░░
UI change                ██████       ████          ░░              ░░
Small enhancement        ██████       ████          ████            ░░
New feature              ██████       ██████        ██████          ░░
Project setup            ██████       ████          ░░              ░░
Sprint planning          ████         ░░            ████            ██████
Architecture change      ██████       ██████        ██████          ░░

██████ = Always used    ████ = Usually used    ░░ = Rarely/never
```

### Key Insights

**Module 1 is always used** — it's the entry point for every interaction. This validates the decision to make it the most comprehensive module (absorbing Module 4's docs content).

**Module 2 is used in every coding task** — Skills provide the "how" that complements Module 1's "what."

**Module 3 is only for non-trivial features** — Simple bug fixes and UI tweaks skip it entirely.

**Module 4 is the rarest** — Only needed when planning from scratch or managing a backlog.

**The value is relevance, not raw token count.** Total session context (3,500-6,300 tokens) can exceed the old always-on rules (~5,000 tokens). The advantage is that:
- Only ~700 tokens are always-on (vs ~5,000)
- Every additional token loaded is directly relevant to the current task
- The AI doesn't wade through Supabase patterns when doing UI work, or testing patterns when writing migrations
- Relevant context > less irrelevant context

---

## Validation Checklist

- [x] Every scenario starts with Module 1 (AGENTS.md) — confirms it's the universal entry point
- [x] Skills load on-demand, never all at once — progressive disclosure works
- [x] Docs are referenced from both AGENTS.md and Skills — cross-referencing validated
- [x] Feature Dev (M3) creates/updates docs (M1) — docs stay fresh
- [x] Planning (M4) generates Feature Dev specs (M3) — clean pipeline
- [x] No circular dependencies between modules
- [x] Always-on context is only ~700 tokens (AGENTS.md) vs ~5,000 with old approach
- [x] Total session context (3,500-6,300) is all task-relevant — advantage is relevance, not raw count
- [x] Module 4 (old Reference Docs) content is naturally accessed via Module 1 — absorption validated

---

*Validated: 2026-02-08*
