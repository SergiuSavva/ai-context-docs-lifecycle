# Docs-as-Code Methodology

> Lifecycle rules + templates for documentation that stays useful for humans and AI.

---

## The Problem

Documentation usually fails because:
- **No lifecycle** — written once, never updated, drifts from reality
- **No structure** — scattered across wikis, READMEs, chat history
- **No workflow** — created after the fact, already outdated

Result: Developers don't trust docs. AI agents hallucinate. Knowledge is lost.

---

## The Solution

**Docs-as-Code** = Documentation that:
1. **Lives with code** — same repo, versioned, reviewed in PRs
2. **Has a lifecycle** — each doc type has clear create/update/archive rules
3. **Guides work** — specs drive implementation, not just record it

### Two Core Uses

| Use | How Docs Help |
|-----|---------------|
| **Understand** the system | Read reference docs, code-map, decisions |
| **Build** features | Follow specs, apply rules, update reference |

This works for **humans** and **AI agents** equally.

---

## The Documentation Lifecycle

Every document type has a clear lifecycle:

```
┌─────────────────────────────────────────────────────────────────────┐
│                     DOCUMENTATION LIFECYCLE                          │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  SPECS (Ephemeral)                                                   │
│  ┌────────┐    ┌───────────┐    ┌────────┐    ┌──────────┐         │
│  │ Draft  │ ──▶│ In Progress│ ──▶│  Done  │ ──▶│ Archived │         │
│  └────────┘    └───────────┘    └────────┘    └──────────┘         │
│                      │                │                              │
│                      │ guides         │ updates                      │
│                      ▼                ▼                              │
│  REFERENCE (Evergreen)                                               │
│  ┌─────────────────────────────────────────┐                        │
│  │  Always reflects current reality        │ ◀─── Must stay current │
│  │  (architecture, code-map, data model)   │                        │
│  └─────────────────────────────────────────┘                        │
│                      │                                               │
│                      │ follow                                        │
│                      ▼                                               │
│  RULES (Stable)                                                      │
│  ┌─────────────────────────────────────────┐                        │
│  │  Patterns for building                  │ ◀─── Evolve over time  │
│  │  (code style, architecture, testing)    │                        │
│  └─────────────────────────────────────────┘                        │
│                      │                                               │
│                      │ capture                                       │
│                      ▼                                               │
│  DECISIONS (Append-only)                                             │
│  ┌─────────────────────────────────────────┐                        │
│  │  Why we chose this approach             │ ◀─── Never delete      │
│  │  (ADRs with context + tradeoffs)        │      (supersede only)  │
│  └─────────────────────────────────────────┘                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Lifecycle Summary

| Type | Lifecycle | Update Rule |
|------|-----------|-------------|
| **Specs** | Draft → In Progress → Done → Archive | Archive after merge |
| **Reference** | Create → Update → (Deprecate) | Update when behavior changes |
| **Rules** | Create → Evolve | Update as patterns emerge |
| **Decisions** | Create → (Supersede) | Never edit, only add new |

---

## Quick Start (5 minutes)

### 1. Create the structure

```bash
mkdir -p docs/{reference,specs,decisions}
mkdir -p .cursor/rules  # or .ai-rules/ for other tools
```

### 2. Add the essential files

```bash
# Reference (current state)
touch docs/reference/architecture.md
touch docs/reference/code-map.md

# Your first spec (what to build next)
mkdir docs/specs/$(date +%Y-%m-%d)-initial-setup
touch docs/specs/$(date +%Y-%m-%d)-initial-setup/spec.md

# AI agent rules
touch .cursor/rules/project.mdc
```

### 3. Copy templates from `templates/` folder

### 4. Start building

---

## The Four Pillars

| Pillar | Purpose | Lifecycle | Location |
|--------|---------|-----------|----------|
| **Reference** | What the product *is* | Evergreen (always current) | `docs/reference/` |
| **Specs** | What we want to *change* | Ephemeral (archive after merge) | `docs/specs/` |
| **Rules** | How we *build* | Stable (update as patterns evolve) | `.cursor/rules/` |
| **Decisions** | Why we *decided* | Append-only (never delete) | `docs/decisions/` |

### Reference (The "Now")
- Describes current implementation
- **Must reflect `main` branch** at all times
- Includes: architecture, data model, code map, runbooks

### Specs (The "Next")
- Defines what should be built
- Has clear acceptance criteria
- **Ephemeral**: Archive or collapse into links after merge

### Rules (The "How")
- Guides both humans and AI to build consistently
- Domain-specific patterns and conventions
- Prefer enforceable rules over suggestions

### Decisions (The "Why")
- Captures architectural decisions and tradeoffs
- Append-only (supersede, never delete)
- Write when: architecture changes, tradeoffs made, dependencies added

---

## Adoption Levels

### Level 1: Minimal (Day 1)
```
docs/
├── README.md          # Project overview
└── reference/
    └── code-map.md    # Where to find what

.cursor/rules/
└── project.mdc        # Basic AI rules
```

**Effort**: 30 minutes  
**Value**: AI agents stop hallucinating project structure

### Level 2: Standard (Week 1)
```
docs/
├── README.md
├── reference/
│   ├── architecture.md
│   ├── code-map.md
│   └── data-model.md
├── specs/
│   └── YYYY-MM-DD-feature/
│       └── spec.md
└── decisions/
    └── ADR-001-*.md

.cursor/rules/
├── project.mdc
├── code-style.mdc
└── testing.mdc
```

**Effort**: Half day  
**Value**: Full spec-driven development with AI

### Level 3: Production (Month 1)
Add to Level 2:
```
docs/
├── reference/
│   ├── ...
│   └── runbooks/
│       └── feature-ops.md
├── specs/
│   └── ...
└── _archive/          # Completed specs
    └── ...

.cursor/rules/
├── project.mdc
├── architecture.mdc
├── code-style.mdc
├── testing.mdc
├── ui-patterns.mdc    # If frontend
└── api-patterns.mdc   # If backend
```

**Effort**: Ongoing refinement  
**Value**: Self-documenting codebase, zero onboarding friction

---

## Documentation for Building, Not Just Recording

**Traditional approach**: Build first, document later (if at all)
```
Code → Docs (afterthought) → Docs rot
```

**Docs-as-Code approach**: Document to guide building
```
Spec (what) → Rules (how) → Code → Reference (what was built)
     ↑                              │
     └──────────────────────────────┘
           informs future specs
```

### The Key Shift

| Traditional | Docs-as-Code |
|-------------|--------------|
| Docs record what was built | Docs guide what to build |
| Written after implementation | Written before implementation |
| Optional afterthought | Required workflow step |
| Gets outdated immediately | Stays current by design |

---

## The Workflow Loop

```
┌─────────────────────────────────────────────────────────────┐
│                                                              │
│   1. SPEC          2. RULES         3. IMPLEMENT            │
│   ┌─────────┐      ┌─────────┐      ┌─────────┐            │
│   │ Define  │ ───▶ │ Apply   │ ───▶ │ Code +  │            │
│   │ change  │      │ patterns│      │ Tests   │            │
│   └─────────┘      └─────────┘      └─────────┘            │
│        │                                  │                 │
│        │                                  ▼                 │
│        │           5. DECIDE        4. REVIEW               │
│        │           ┌─────────┐      ┌─────────┐            │
│        │           │ ADR if  │ ◀─── │ PR +    │            │
│        │           │ tradeoff│      │ CI      │            │
│        │           └─────────┘      └─────────┘            │
│        │                │                │                  │
│        │                ▼                ▼                  │
│        │           6. UPDATE REFERENCE                      │
│        │           ┌──────────────────────┐                │
│        │           │ Docs match reality   │                │
│        │           └──────────────────────┘                │
│        │                      │                            │
│        │                      ▼                            │
│        │           7. CLOSE SPEC                           │
│        │           ┌──────────────────────┐                │
│        └───────────│ Archive/collapse     │                │
│                    └──────────────────────┘                │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

---

## Definition of Done (PR Gate)

A change is "Done" when:

- [ ] **Spec satisfied** - All acceptance criteria met
- [ ] **Tests pass** - Unit/integration as appropriate
- [ ] **CI green** - Lint, typecheck, build, test
- [ ] **Reference updated** - If behavior changed, docs updated
- [ ] **ADR added** - If architectural decision made
- [ ] **Spec closed** - Archived or collapsed to links

> **Rule**: If APIs, events, schemas, or workflows change → Reference update is **mandatory**.

---

## When to Write What

### Write a Spec when:
- Adding a new feature
- Making non-trivial changes
- Anything that takes >2 hours

### Write an ADR when:
- Changing architecture boundaries
- Making tradeoffs (cost vs reliability, etc.)
- Adding significant dependencies
- Altering API contracts non-trivially

### Update Reference when:
- Any behavioral change merges
- New patterns established
- Existing docs become stale

### Don't Write Docs for:
- Trivial bug fixes
- Routine refactors
- Changes following established patterns

---

## AI Agent Operating Model

### What AI Agents Should Do

1. **Read First**: Spec → Rules → Reference → Existing ADRs
2. **Plan**: List files to change, tests to add, docs to update
3. **Implement**: Code + tests, run checks locally
4. **Report**: Map changes to acceptance criteria
5. **Update**: Reference + ADR (if architectural)
6. **Close**: Mark spec complete

### Agent Output Format

When completing work, AI should provide:

```markdown
## Changes Summary
- Added X to Y
- Modified Z

## Acceptance Criteria
- [x] AC1: Implemented in `file.ts`
- [x] AC2: Tested in `file.test.ts`

## Tests
- Added: `__tests__/feature.test.ts`
- Run: `npm test -- feature`

## Docs Updated
- `docs/reference/architecture.md` - Added new component

## ADR
- N/A (or link if created)

## Risks
- None (or list concerns)
```

---

## Hygiene Rules (Prevent Doc Rot)

1. **Every behavioral PR updates Reference** - No exceptions
2. **Specs don't accumulate** - Close on merge
3. **ADRs stay short** - Decision-shaped, not essays
4. **Quarterly review** - Archive stale docs
5. **Automate where possible** - Lint rules > written rules

---

## Files in This Methodology

| File | Purpose | Relationship |
|------|---------|--------------|
| `README.md` | **Source of truth** — full methodology | Primary reference |
| `QUICKREF.md` | One-page cheat sheet (print this!) | Links to README |
| `GLOSSARY.md` | Term definitions only | Links to README |
| `PRINCIPLES.md` | Deep dive into the "why" | Unique content |
| `IMPLEMENTATION.md` | Step-by-step adoption guide | Unique content |
| **Templates** | |
| `templates/spec.md` | Specification template |
| `templates/adr.md` | Architecture decision template |
| `templates/code-map.md` | Codebase navigation |
| `templates/feature-readme.md` | Feature documentation |
| `templates/runbook.md` | Operations guide |
| `templates/cursor-rules.mdc` | AI rules starter |
| `templates/pull_request_template.md` | PR with DoD checklist |
| `templates/changelog.md` | Release notes format |
| `templates/glossary.md` | Domain terms dictionary (template) |

---

## Attribution

This methodology builds on established practices:

| Source | What We Adopted |
|--------|-----------------|
| [Michael Nygard's ADRs](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions) | Decision record format |
| [Docs-as-Code](https://www.writethedocs.org/guide/docs-as-code/) | Documentation philosophy |
| [Keep a Changelog](https://keepachangelog.com/) | Changelog format |

**Original synthesis** (this framework's contribution):
- Four Pillars taxonomy (Specs / Reference / Rules / Decisions)
- Lifecycle model (ephemeral / evergreen / append-only)
- Ephemeral specs workflow + collapse pattern
- AI-human dual audience design
- Progressive adoption levels

---

**License**: MIT  
**Version**: 1.2.0

