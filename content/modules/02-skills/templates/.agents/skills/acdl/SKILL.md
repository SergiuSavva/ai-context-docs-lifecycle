---
name: acdl
description: Bootstrap and configure AI Context Docs Lifecycle for any project. Guides AI agents through setup, daily usage, and doc maintenance to keep AI context effective. Use when setting up ACDL, improving AI output quality, or maintaining project documentation.
---

# AI Context Docs Lifecycle

> **References:** AGENTS.md | @docs/ | .agents/skills/

## What AI Agents Need

AI agents write better code when they have six types of project knowledge. Each maps to an ACDL doc type:

| Knowledge | Why It Matters | Where It Lives |
|-----------|----------------|----------------|
| **Identity** | Stack, versions, conventions — prevents wrong framework/library usage | `AGENTS.md` (always loaded) |
| **Navigation** | Directory structure, key areas — prevents looking in wrong places | `AGENTS.md` (always loaded) |
| **Commands** | Exact runnable commands — prevents guessing `npm run` scripts | `AGENTS.md` + `docs/scripts.md` |
| **Boundaries** | What NOT to do — prevents costly mistakes before they happen | `AGENTS.md` (always loaded) |
| **Patterns** | How things are done HERE — prevents generic defaults | `.agents/skills/` (loaded per task) |
| **Deep context** | Architecture, data model, API surface — prevents wrong assumptions | `docs/` (loaded on demand) |

**Loading model**: `AGENTS.md` is always loaded (~500-700 tokens). Skills and docs load only when the task needs them. This keeps the baseline small while making deep knowledge available.

**Core rule**: Stale docs are worse than no docs. Every doc is either current or deleted.

---

## Bootstrap Your Project

When asked to set up ACDL, follow these phases in order.

### Phase 0: Ask User

```
1. "Is this a monorepo or single app?"
   ├─ Single app → use AGENTS-single-app.md template
   └─ Monorepo  → use AGENTS-monorepo-root.md template
                   Ask: "Which folders should have their own AGENTS.md?"
```

### Phase 1: Detect

Scan the project before writing anything:

1. **Inventory existing docs** — mark each as keep / update / replace / delete
2. **Check AGENTS.md** — exists = update mode (preserve user sections), missing = create mode
3. **Detect stack** — read package manifests, config files, imports
4. **Detect signals** — which reference docs are needed:

| Signal | Detection | Creates |
|--------|-----------|---------|
| Multi-layer structure | Services, layers, microservices | `docs/architecture.md` |
| Database present | Migrations, schema, ORM, SQL | `docs/data-model.md` |
| API surface | `api/`, `routes/`, server actions | `docs/api.md` |
| Auth present | Middleware, providers, login flows | `docs/auth.md` |
| Runnable commands | Scripts, targets, task files | `docs/scripts.md` |

### Phase 2: Analyze

1. **Extract domain context** — architecture boundaries, data entities, API surface, auth flows
2. **Extract commands** and classify each:
   - **Verified**: explicit scripts from package.json / Makefile / taskfile
   - **Inferred**: framework defaults (mark as needing confirmation)

### Phase 3: Preview (Interactive)

Show the user what you'll create before writing:

```
"I analyzed your project.

Project type: [Single App / Monorepo] ([stack])

Proposed files:
- AGENTS.md (create / update)
- docs/architecture.md (create)
- docs/scripts.md (create)

Commands detected:
- `npm run dev` (verified, package.json)
- `npm run lint` (inferred, needs confirmation)

Proceed?"
```

**Wait for user confirmation before writing files.**

### Phase 4: Create and Suggest Modules

1. **Write AGENTS.md** — use the template, fill six sections (Overview, Stack, Commands, Structure, Context Loading, Boundaries), keep under 150 lines
2. **Write reference docs** — only for detected signals, use the reference doc templates
3. **Suggest next modules** based on project complexity:

| Situation | Suggest | Why |
|-----------|---------|-----|
| Simple app, solo dev | Module 1 only | AGENTS.md + docs/ is sufficient |
| Specific stack patterns | Add Module 2 | Deep coding patterns via skills |
| Multi-feature work | Add Module 3 | Structured spec/task workflows |
| Roadmap planning | Add Module 4 | PRD, backlog, release management |

### Bootstrap Templates

| Template | Path (relative to `.acdl/content/modules/`) |
|----------|------|
| AGENTS.md (single app) | `01-project-context/templates/AGENTS-single-app.md` |
| AGENTS.md (monorepo root) | `01-project-context/templates/AGENTS-monorepo-root.md` |
| AGENTS.md (monorepo sub) | `01-project-context/templates/AGENTS-monorepo-subproject.md` |
| Reference docs | `01-project-context/templates/docs/` |

> **Detailed reference**: For full detection heuristics and output scenarios, read the bootstrap workflow in Module 1.

---

## Configure for Your Project

After bootstrap, help the developer tailor ACDL to their specific project.

### Identify Missing Context

Ask: "Where does the AI make wrong assumptions about your project?" Each answer reveals missing context:

| AI Gets Wrong | Missing Context | Fix |
|---------------|-----------------|-----|
| Uses wrong framework patterns | Stack conventions not documented | Add patterns to a skill |
| Guesses at commands | Commands not in AGENTS.md | Add verified commands |
| Ignores project conventions | No Boundaries section | Add Always / Ask First / Never |
| Generates generic code | No stack-specific skill | Create a skill with YOUR patterns |
| Makes architecture mistakes | No reference docs | Create relevant docs/ files |

### Write for AI, Not Humans

AI agents need different information than human readers:

| Human Docs Say | AI Docs Should Say |
|----------------|--------------------|
| "Use the latest version" | "React 19.1, TypeScript 5.7" |
| "Run the build" | "`npm run build` (verified, package.json)" |
| "Follow best practices" | Concrete code example showing YOUR pattern |
| "Be careful with auth" | "Never: skip middleware in `api/` routes" |

### Set Up Skills

When the same explanation keeps coming up, capture it as a skill:

1. Copy methodology skills to `.agents/skills/`
   - `feature-workflow`, `agents-md`, `spec-writing`, `doc-writing`, `acdl` — provided methodology skills
2. Identify stack areas that need deep patterns (database, testing, UI, framework)
3. Create stack skills using the skill template
4. Add routing entries to AGENTS.md Context Loading table:

```markdown
| Task | Read First |
|------|------------|
| Database queries | load skill `database` |
| Writing tests | load skill `testing` |
| UI components | load skill `ui-components` |
```

### Set Up Feature Workflow (Module 3)

If the project needs structured feature development:

```
Bug fix?
├─ YES → Quick Flow (no docs needed)
└─ NO → Create specs/[feature]/
    ├─ Need research? → Complex Flow (research.md + spec.md + tasks.md)
    └─ No research   → Standard Flow (spec.md + tasks.md)
```

For workflow execution: `load skill feature-workflow`
For spec quality: `load skill spec-writing`

---

## Daily Workflow

How ACDL integrates into day-to-day development:

```
Starting work?
├─ AGENTS.md loads automatically (identity, navigation, boundaries)
├─ Check specs/ for active features with in-progress tasks
└─ Load relevant skills when task matches a context loading entry

Building a feature?
├─ Bug fix → just fix it, no docs needed
├─ Feature → load skill feature-workflow
│   ├─ Create specs/[feature]/spec.md + tasks.md
│   ├─ ONE task [~] at a time, update tasks.md after each
│   └─ Signal completion when done
└─ Need research first? → Add research.md before spec

Shipping code?
├─ Update any docs/ files affected by the change
├─ Create ADR in docs/decisions/ if significant decision was made
├─ Update AGENTS.md if new project-level patterns emerged
└─ Delete specs/[feature]/ folder after approval (specs are ephemeral)
```

### What Goes Where

| Content | Location | Rule |
|---------|----------|------|
| Project identity, stack, commands | `AGENTS.md` | Fits in one bullet → AGENTS.md |
| Deep domain patterns with code | `.agents/skills/` | Needs code examples → skill |
| Architecture, data model, API | `docs/` | Reference content → docs/ |
| Significant technical choices | `docs/decisions/` | Permanent record → ADR |
| Feature requirements and tasks | `specs/` | Ephemeral → delete after shipping |

---

## Maintenance Triggers

Update docs when these things happen:

| What Changed | Update |
|--------------|--------|
| Added/changed dependency | AGENTS.md Stack table |
| New command or script | AGENTS.md Commands + `docs/scripts.md` |
| Directory restructured | AGENTS.md Structure section |
| Created new skill | AGENTS.md Context Loading table |
| New docs/ file added | AGENTS.md Context Loading table |
| Feature shipped | Delete `specs/[feature]/`, update affected `docs/` |
| Architecture decision made | Create ADR in `docs/decisions/` |
| Boundary violated (mistake happened) | Add to AGENTS.md Boundaries (Never) |
| **AI keeps making same mistake** | **Add to Boundaries or create a skill** |

The last row closes the feedback loop: bad AI output is a signal to improve your docs, not to re-explain.

### Warning Signs

- AGENTS.md over 150 lines → move content to docs/ or skills
- Reference doc not updated in months → verify it's still accurate or delete
- Specs still in `specs/` after feature shipped → delete them
- Skills with no code examples → add concrete patterns from YOUR codebase
- AI agent not loading skills → check Context Loading routing in AGENTS.md

---

## Skill Routing

| Task | Skill |
|------|-------|
| Create/update AGENTS.md | `load skill agents-md` |
| Write spec or acceptance criteria | `load skill spec-writing` |
| Build a feature (workflow + tasks) | `load skill feature-workflow` |
| Stack-specific patterns | `load skill [your-stack-skill]` |
| Set up or maintain ACDL | This skill |

## Templates Quick Reference

**Read the template before creating any doc.**

| Template | Path |
|----------|------|
| Skill template | `02-skills/templates/.agents/skills/skill-template/SKILL.md` |
| spec.md | `03-feature-development/templates/spec.md` |
| tasks.md | `03-feature-development/templates/tasks.md` |
| research.md | `03-feature-development/templates/research.md` |
| design.md | `03-feature-development/templates/design.md` |
| plan.md | `03-feature-development/templates/plan.md` |
| ADR template | `01-project-context/templates/docs/decisions/adr.md` |

## Quick Checklist

- [ ] AGENTS.md exists with six sections (Overview, Stack, Commands, Structure, Context Loading, Boundaries)
- [ ] AGENTS.md stays under 150 lines (router, not manual)
- [ ] Reference docs in docs/ are current (or deleted)
- [ ] Skills have concrete code examples from YOUR project (not generic)
- [ ] Context Loading table in AGENTS.md routes to all skills and docs
- [ ] Specs created before building, deleted after shipping
- [ ] ADRs created for significant decisions
- [ ] AI mistakes are captured as Boundaries or skills (feedback loop)

## Related Docs

- load skill `doc-writing`
- load skill `agents-md`
- load skill `feature-workflow`
- load skill `spec-writing`
