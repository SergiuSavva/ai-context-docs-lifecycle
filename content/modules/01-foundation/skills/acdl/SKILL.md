---
name: acdl
description: Bootstrap and configure AI Context Docs Lifecycle. Covers AGENTS.md authoring, skill setup, and ongoing maintenance/diagnostics. Use when setting up ACDL, creating/updating AGENTS.md, or diagnosing AI quality problems.
---

# AI Context Docs Lifecycle

> **References:** AGENTS.md | @docs/ | .agents/skills/

## What AI Agents Need

AI agents write better code when they have six types of project knowledge:

| Knowledge | Why It Matters | Where It Lives |
|-----------|----------------|----------------|
| **Identity** | Stack, versions, conventions — prevents wrong framework/library usage | `AGENTS.md` (always loaded) |
| **Navigation** | Directory structure, key areas — prevents looking in wrong places | `AGENTS.md` (always loaded) |
| **Commands** | Exact runnable commands — prevents guessing `npm run` scripts | `AGENTS.md` + `docs/scripts.md` |
| **Boundaries** | What NOT to do — prevents costly mistakes before they happen | `AGENTS.md` (always loaded) |
| **Patterns** | How things are done HERE — prevents generic defaults | `.agents/skills/patterns/` (loaded per task) |
| **Deep context** | Architecture, data model, API surface — prevents wrong assumptions | `docs/` (loaded on demand) |

**Loading model**: `AGENTS.md` is always loaded (~500-700 tokens). Skills and docs load only when the task needs them.

**Core rule**: Stale docs are worse than no docs — see `load skill docs` for freshness rules.

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
4. **Detect signals** — which reference docs are needed (see `load skill docs` for signal detection table)

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

### Phase 4: Create and Suggest Next Steps

1. **Write AGENTS.md** — use the template, fill all sections, keep under 150 lines
2. **Write reference docs** — use `load skill docs` for templates and conventions
3. **Suggest next steps** based on project complexity:

| Situation | Suggest |
|-----------|---------|
| Simple app, solo dev | AGENTS.md + docs/ is sufficient |
| Undocumented code patterns | `load skill patterns` to discover and document them |
| Multi-feature work | `load skill feature` |
| Roadmap planning | `load skill project` |

### Bootstrap Templates

| Template | Path |
|----------|------|
| AGENTS.md (single app) | `.agents/skills/acdl/templates/AGENTS-single-app.md` |
| AGENTS.md (monorepo root) | `.agents/skills/acdl/templates/AGENTS-monorepo-root.md` |
| AGENTS.md (monorepo sub) | `.agents/skills/acdl/templates/AGENTS-monorepo-subproject.md` |
| Reference doc templates | `.agents/skills/docs/templates/docs/` |

---

## AGENTS.md Authoring

### Router Pattern

Keep AGENTS.md **compact (50-80 lines, 150 max)**. It's a router, not a manual.

```
AGENTS.md (always loaded, ~500-700 tokens)
    ↓ routes to
Skills (.agents/skills/) — on-demand, ~1,000-2,500 tokens each
    ↓ references
docs/ — detailed reference, variable tokens
```

### Essential Sections

Every AGENTS.md needs these six core sections:

| Section | What to Include |
|---------|-----------------|
| **Overview** | One sentence: what this project does |
| **Stack** | Tech + versions table (framework, language, DB, styling) |
| **Commands** | Build, test, lint, dev — exact runnable commands |
| **Structure** | Directory tree with key areas for routing |
| **Context Loading** | Task → doc/skill routing table |
| **Boundaries** | Always / Ask First / Never rules |

### What Goes Where

| Content | AGENTS.md | SKILL.md | docs/ |
|---------|-----------|----------|-------|
| Project overview, stack | Yes | No | No |
| Commands (exact syntax) | Yes | No | No |
| Boundaries | Yes | No | No |
| Skill routing table | Yes | No | No |
| Deep domain procedures | No | Yes | No |
| Architecture, data model | No | No | Yes |
| Decision records (ADRs) | No | No | Yes |

**Rule of thumb**: If it fits in one bullet point → AGENTS.md. If it needs code examples and multiple sections → skill. If it's reference content → docs/.

### Context Loading Table

Route tasks to the right context:

```markdown
## Context Loading

| Task | Read First |
|------|------------|
| {{task relevant to your project}} | @docs/{{relevant-doc}}.md |
| Writing or updating reference docs | load skill `docs` |
| Documenting codebase patterns | load skill `patterns` |
| Building a feature | load skill `feature` |
| Multi-feature planning | load skill `project` |
```

Only include entries for docs and skills that exist.

### Boundaries Format

```markdown
## Boundaries

### Always
- Run tests before committing
- Follow existing patterns in codebase

### Ask First
- Adding new dependencies
- Database schema changes

### Never
- Commit .env files or secrets
- Push directly to main
```

### Update Triggers

| Change | Update |
|--------|--------|
| New dependency / framework added | Stack table |
| New command added | Commands section |
| Directory structure changes | Structure section |
| New skill created | Context Loading table |
| New docs/ file added | Context Loading table |
| New boundary discovered (mistake happened) | Boundaries section |

Do **not** update AGENTS.md for every feature. Only update when project-level patterns change.

### AGENTS.md Anti-Patterns

| Anti-Pattern | Fix |
|--------------|-----|
| Vague persona ("helpful assistant") | Replace with specific stack and conventions |
| Missing commands | Add exact runnable commands early |
| No boundaries | Add Always / Ask First / Never |
| Generic tech ("React project") | Be specific ("React 18 + TypeScript 5.3") |
| All content inline (200+ lines) | Move detail to docs/ and skills |

---

## Configure for Your Project

### Identify Missing Context

Ask: "Where does the AI make wrong assumptions about your project?"

| AI Gets Wrong | Missing Context | Fix |
|---------------|-----------------|-----|
| Uses wrong framework patterns | Stack conventions not documented | `load skill patterns` to discover them |
| Guesses at commands | Commands not in AGENTS.md | Add verified commands |
| Ignores project conventions | No Boundaries section | Add Always / Ask First / Never |
| Generates generic code | No stack-specific skill | Create a skill with YOUR patterns |
| Makes architecture mistakes | No reference docs | `load skill docs` to create them |

### Write for AI, Not Humans

| Human Docs Say | AI Docs Should Say |
|----------------|--------------------|
| "Use the latest version" | "React 19.1, TypeScript 5.7" |
| "Run the build" | "`npm run build` (verified, package.json)" |
| "Follow best practices" | Concrete code example showing YOUR pattern |
| "Be careful with auth" | "Never: skip middleware in `api/` routes" |

---

## Maintenance & Diagnostics

### Maintenance Triggers

| What Changed | Update |
|--------------|--------|
| Feature shipped | Delete `specs/[feature]/`, update affected `docs/` |
| Architecture decision made | Create ADR (`load skill docs`) |
| Boundary violated (mistake happened) | Add to AGENTS.md Boundaries (Never) |
| **AI keeps making same mistake** | **Add to Boundaries or create a skill** |

### Warning Signs

- AGENTS.md over 150 lines → move content to docs/ or skills
- Reference doc not updated in months → `load skill docs` to audit
- Specs still in `specs/` after feature shipped → delete them
- AI keeps generating wrong patterns → `load skill patterns` to document
- AI agent not loading skills → check Context Loading routing in AGENTS.md

---

## When NOT to Use

| Instead of this skill... | Use |
|--------------------------|-----|
| Writing reference docs | `load skill docs` |
| Documenting code patterns | `load skill patterns` |
| Building a feature | `load skill feature` |
| Multi-feature planning | `load skill project` |

Use this skill for: initial ACDL setup, AGENTS.md authoring, ongoing maintenance, and diagnosing AI quality problems.

## Quick Checklist

- [ ] AGENTS.md exists with core sections (Overview, Stack, Commands, Structure, Context Loading, Boundaries)
- [ ] AGENTS.md stays under 150 lines (router, not manual)
- [ ] Context Loading table routes to all skills and docs
- [ ] Specs created before building, deleted after shipping
- [ ] AI mistakes are captured as Boundaries or skills (feedback loop)

## Related

- load skill `docs` — reference docs, ADRs, doc quality
- load skill `patterns` — codebase patterns and conventions
- load skill `feature` — spec-driven feature development
- load skill `project` — multi-feature planning
