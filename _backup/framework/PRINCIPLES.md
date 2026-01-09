# Methodology Principles

> The "why" behind every recommendation.

---

## Core Idea

**Docs-as-Code** means:
1. Documentation lives **with** code (same repo, versioned, reviewed)
2. Documentation has a **lifecycle** (create, update, archive)
3. Documentation enables **understanding** and **building**

### The Goal

Documentation that:
- **Humans** can read to understand the system and build features
- **AI agents** can read to understand the system and build features
- **Stays current** because it has a lifecycle, not just a creation date

---

## Principle 1: Documentation Has a Lifecycle

### The Problem
Documentation without a lifecycle:
- Gets written once, never updated
- Accumulates (old specs alongside new)
- Drifts from reality
- Becomes untrusted, then ignored

### The Solution
Every document type has an explicit lifecycle:

| Type | Create | Update | Archive |
|------|--------|--------|---------|
| **Reference** | When system is built | When behavior changes | When feature deprecated |
| **Specs** | Before building | During development | After merge |
| **Rules** | When patterns emerge | As patterns evolve | When obsolete |
| **Decisions** | When decision made | Never (append new) | Never (history) |

### The Key Insight
**Specs are ephemeral** — they exist to guide work, then they're done.
**Reference is evergreen** — it must always reflect current reality.
**Decisions are permanent** — history of why, never deleted.

---

## Principle 2: Repository as Shared Understanding

### The Problem
Knowledge lives in:
- People's heads (lost when they leave)
- Chat history (scattered, unsearchable)
- Verbal explanations (repeated endlessly)

Neither humans nor AI can efficiently access scattered knowledge.

### The Solution
Repository = Code + Documentation + Rules + Decisions = **Shared Understanding**

```
┌─────────────────────────────────────────┐
│              Repository                  │
├─────────────────────────────────────────┤
│  Code        → What the system DOES     │
│  Reference   → What the system IS       │
│  Specs       → What we're BUILDING      │
│  Rules       → HOW we build             │
│  Decisions   → WHY we chose this        │
└─────────────────────────────────────────┘
         ↓                    ↓
      Human                  AI
    understands           understands
```

### Implication
Anything you'd explain verbally should be written down. The cost of writing is paid once; the value is realized every time someone (human or AI) needs that context.

---

## Principle 3: Two Types of Documentation

### The Insight
Documentation serves two fundamentally different purposes:

| Type 1: Forward-Looking | Type 2: Backward-Looking |
|------------------------|-------------------------|
| What **should be** built | What **was** built |
| Evolves during development | Append-only after completion |
| Specs, tasks, plans | Changelogs, ADRs, runbooks |
| Can be wrong (it's a plan) | Must be accurate (it's a record) |

### Why This Matters
Mixing these types causes confusion:
- "Is this doc current or aspirational?"
- "Can I trust this reflects reality?"
- "Should I update this or is it historical?"

### Application
- **Type 1 (Specs)**: Live in `docs/specs/`, clearly marked as "Draft" or "In Progress"
- **Type 2 (Records)**: Live in `docs/decisions/`, `docs/reference/`, never edited retroactively

---

## Principle 4: Specs Are Ephemeral

### The Anti-Pattern
```
docs/
├── feature-auth-spec-v1.md
├── feature-auth-spec-v2-final.md
├── feature-auth-spec-v2-final-REAL.md
├── feature-auth-spec-v3-approved.md    # Which one is current??
```

Specs that live forever become:
- Outdated (reality drifts)
- Confusing (multiple versions)
- Ignored (no one trusts them)

### The Pattern
Specs have a **lifecycle**:

```
Draft → In Progress → Done → Archived/Collapsed
```

After merge:
1. **Archive**: Move to `_archive/` for historical reference
2. **Collapse**: Replace content with links to PR, ADR, and updated Reference

### Example Collapse
```markdown
# Auth Feature Spec

**Status**: ✅ Completed

- **PR**: #123
- **ADR**: [ADR-005: Auth Strategy](../decisions/ADR-005.md)
- **Docs**: [Authentication Guide](../reference/auth.md)
- **Shipped**: 2025-01-02
```

---

## Principle 5: Rules Over Advice

### The Problem
Documentation often gives advice:
> "Consider using TypeScript for better type safety."
> "Try to keep functions small."
> "It's recommended to write tests."

Advice is:
- Ambiguous (how small? what tests?)
- Unenforceable (suggestions get ignored)
- Inconsistently applied (depends on who reads it)

### The Solution
Write **enforceable rules**:

```markdown
# ❌ Advice
"Consider using path aliases for cleaner imports."

# ✅ Rule
"ALWAYS use `@/` path aliases. NEVER use relative imports deeper than one level."

# ✅✅ Enforceable Rule (best)
"Use `@/` path aliases. ESLint rule `no-relative-imports` enforces this."
```

### Hierarchy of Enforcement

| Level | Example | Reliability |
|-------|---------|-------------|
| **Automated** | ESLint, TypeScript, CI checks | 100% enforced |
| **Templated** | PR templates, file generators | 90% enforced |
| **Documented** | Written rules in `.cursor/rules/` | 70% enforced |
| **Verbal** | "We usually do X" | 30% enforced |

**Implication**: Invest in automation. Every rule that can be a lint check should be.

---

## Principle 6: Decisions Need Context

### The Problem
Six months from now:
> "Why did we use PostgreSQL instead of MongoDB?"
> "Why is auth handled this weird way?"
> "Who decided to split this into microservices?"

Without recorded decisions:
- New team members question everything
- Teams re-debate settled issues
- Bad patterns propagate (no one remembers why the good pattern was chosen)

### The Solution: ADRs
Architecture Decision Records capture:
- **Context**: What situation prompted the decision?
- **Decision**: What did we decide?
- **Alternatives**: What else did we consider?
- **Consequences**: What trade-offs did we accept?

### When to Write an ADR
Write one when you:
- Change system boundaries or integration patterns
- Make a trade-off (cost vs. reliability, speed vs. correctness)
- Add significant dependencies or platforms
- Override a previous decision

### When NOT to Write an ADR
Skip for:
- Routine refactors
- Bug fixes
- Following established patterns
- Decisions that are easily reversible

---

## Principle 7: Reference Must Stay Current

### The Fundamental Rule
> **Reference documentation must reflect the `main` branch.**

Stale docs are worse than no docs:
- They mislead developers
- AI generates wrong code based on them
- Trust in all documentation erodes

### Enforcement Mechanisms

1. **PR Requirement**: Every behavioral change must update relevant Reference
2. **Staleness Reviews**: Monthly/quarterly review for drift
3. **Ownership**: Each Reference doc has an owner
4. **Last Updated**: Every doc shows last update date

### Practical Check
Before merging a PR, ask:
> "If someone reads only the docs tomorrow, will they understand what this PR changed?"

If no → update the docs.

---

## Principle 8: Progressive Disclosure

### The Problem
A 50-page architecture document is never read. A 500-line rules file is skimmed at best.

### The Solution
Layer documentation by depth:

```
Level 1: README.md (30 seconds)
    ↓
Level 2: QUICKSTART.md (5 minutes)
    ↓
Level 3: Reference docs (30 minutes)
    ↓
Level 4: Deep-dive references (as needed)
```

### For AI Agents
Provide a clear loading order:

```markdown
# AI Agent: Start Here

1. Read: `AGENTS.md` (project context)
2. Read: `.cursor/rules/project.mdc` (how we build)
3. Read: `docs/reference/code-map.md` (where things are)
4. Then: Relevant feature docs as needed
```

---

## Principle 9: Specs Drive Implementation

### The Workflow
```
Spec (what) → Rules (how) → Code (implementation) → Tests (verification)
```

Not:
```
Code → Docs (rationalization) → Tests (afterthought)
```

### Why Spec-First
1. **Clarity**: Forces you to think before coding
2. **Alignment**: Everyone agrees on what "done" means
3. **AI Efficiency**: AI can implement against clear criteria
4. **Testability**: Acceptance criteria become test cases

### Minimal Spec
Even a simple spec beats no spec:

```markdown
# Add Dark Mode Toggle

## What
- Toggle in settings to switch light/dark theme
- Persist preference in localStorage

## Done When
- [ ] Toggle visible in settings
- [ ] Theme changes immediately on toggle
- [ ] Preference persists across sessions
```

---

## Principle 10: Documentation Is a Product

### The Mindset Shift
Documentation isn't a chore to check off. It's a product with users:

| User | Need |
|------|------|
| New developer | Onboard quickly |
| AI agent | Understand context |
| Future you | Remember why |
| Stakeholders | Track progress |

### Quality Criteria
Good documentation:
- **Findable**: Clear navigation, search-friendly
- **Accurate**: Reflects reality
- **Useful**: Answers real questions
- **Maintained**: Updated with changes

### Anti-Patterns
- Documentation written once, never updated
- Docs that duplicate code comments
- Wall-of-text without structure
- Aspirational docs that don't match reality

---

## Principle 11: Start Small, Grow Organically

### The Anti-Pattern
Day 1: "Let's set up comprehensive documentation!"
*Creates 20 empty template files*
Day 30: All files still empty or outdated

### The Pattern
Start with what you need **today**:

**Week 1**: README + code-map + one rule file
**Month 1**: Add specs as you build features
**Month 3**: ADRs for decisions you've made
**Ongoing**: Grow docs with the codebase

### The Test
> "Is this doc solving a problem I have right now?"

If yes → write it.
If no → skip it until you need it.

---

## Summary

### The Core Three

| # | Principle | Key Insight |
|---|-----------|-------------|
| 1 | **Lifecycle** | Every doc type has create/update/archive rules |
| 2 | **Shared Understanding** | Repo = code + docs (humans & AI read both) |
| 3 | **Two Types** | Specs (forward-looking) vs Records (backward-looking) |

### The Practices

| # | Principle | One-liner |
|---|-----------|-----------|
| 4 | Specs Are Ephemeral | Archive or collapse after merge |
| 5 | Rules Over Advice | Enforceable > suggested |
| 6 | Decisions Need Context | ADRs capture "why" |
| 7 | Reference Stays Current | Must reflect main branch |
| 8 | Progressive Disclosure | Layer docs by depth |
| 9 | Specs Drive Implementation | Define before building |
| 10 | Docs Are a Product | Has users, needs quality |
| 11 | Start Small | Grow organically |

---

**Next**: See `IMPLEMENTATION.md` for practical adoption guide.

