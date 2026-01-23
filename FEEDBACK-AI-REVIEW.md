# AI Agent Review: AI Context Docs Lifecycle

> Feedback from an AI agent's perspective on the methodology and its practical application.

---

## What Works Well

### 1. The Router Pattern

The idea of keeping AGENTS.md compact (~50-80 lines) and dynamically loading detailed docs is genuinely useful. It solves a real token efficiency problem and mirrors how humans navigate codebases.

```
AGENTS.md (compact router) → @docs/architecture.md (loaded on demand)
```

This prevents context pollution and keeps AI responses focused.

### 2. Three-Tier Boundaries

The most valuable concept in the methodology:

| Tier | Purpose |
|------|---------|
| **Always** | Rules for consistency (tests, patterns, type safety) |
| **Ask First** | Escalation points requiring human decision |
| **Never** | Hard constraints that prevent destructive actions |

This gives AI clear decision-making guardrails without being overly restrictive. The escalation path is intuitive and matches how human developers think about risk.

### 3. Research-Backed Approach

Citing the GitHub analysis of 2,500+ repos adds credibility. The anti-patterns section (e.g., "Helpful assistant" persona is useless) reflects real lessons learned, not theoretical ideals.

### 4. Task Markers System

Simple, markdown-native progress tracking:

| Marker | Status |
|--------|--------|
| `[ ]` | Pending |
| `[~]` | In Progress (only ONE at a time) |
| `[x]` | Completed |
| `[B]` | Blocked |
| `[S]` | Skipped |

The "only one `[~]` at a time" rule prevents scattered work and makes progress visible.

### 5. "Update or Delete" Philosophy

This is the right mindset. Stale documentation actively harms AI output by providing outdated context. The three document lifecycles (ephemeral → evergreen → permanent) create clear ownership rules.

---

## What Doesn't Make Sense

### 1. The "5 Files" Threshold for Complex Flow

The decision tree uses file count as the primary heuristic:

```
Will this change more than 5 files?
├─ YES → Complex Flow
└─ NO → Standard Flow
```

**Problem**: File count doesn't correlate with complexity. A 3-file change to a payment system is more complex than a 10-file CSS refactor. The decision should focus on **risk and uncertainty**, not file count.

### 2. The `@path/to/file` Syntax

The Context Loading tables use:

```markdown
| Task | Read First |
|------|------------|
| Architecture | @docs/architecture.md |
```

This syntax works in Claude Code but isn't universal. Other tools use different discovery mechanisms. Users may think this is standard markdown syntax when it's tool-specific.

### 3. Module 5 (Project Planning) Feels Disconnected

PRD, BACKLOG, ROADMAP - these are human project management artifacts, not AI context files. It's unclear how an AI agent would meaningfully consume `ROADMAP.md` during implementation.

This module mixes two concerns:
- **AI context** (what the project is, how to work in it)
- **Human planning** (what features to build, in what order)

### 4. Templates Reference Non-Existent Files

The AGENTS.md template includes:

```markdown
| Task | Read First |
|------|------------|
| Architecture decisions | @docs/architecture.md |
| Component patterns | @docs/components.md |
```

But there's no guidance on creating these referenced files. Users copy the template and immediately have broken references.

---

## Suggested Improvements

### 1. Add a "Context Verification" Step

Before implementing, AI should verify it loaded the right context:

```markdown
## Pre-Work Checklist
- [ ] Confirmed workflow type (Quick/Standard/Complex)
- [ ] Loaded relevant docs from Context Loading table
- [ ] Understood boundaries for this area of code
- [ ] Checked for existing patterns to follow
```

### 2. Refine the Decision Tree

Replace file count with risk-based heuristics:

```
Does this require research or external knowledge?
├─ YES → Complex Flow
└─ NO → Does this touch critical paths (auth, payments, data)?
         ├─ YES → Complex Flow
         └─ NO → Is the change easily reversible?
                  ├─ NO → Standard Flow (with spec)
                  └─ YES → Quick Flow
```

**Triggers for Complex Flow**:
- Requires evaluating alternatives
- Touches security, payments, or user data
- Introduces new architectural patterns
- Has multiple valid implementation approaches
- Affects external integrations

### 3. Add a "Minimal Viable AGENTS.md"

The current template is ~76 lines with many placeholders. Create a 20-line "absolute minimum" version:

```markdown
# [Project Name]

## Commands
npm install && npm run dev   # Setup and run
npm test                     # Run tests

## Structure
src/           # Application code
tests/         # Test files

## Boundaries
### Always
- Run tests before committing

### Never
- Commit .env files
```

This lowers the adoption barrier significantly.

### 4. Visualize the Document Lifecycle

The ephemeral → evergreen → permanent distinction is valuable but buried in text. Add a diagram:

```
┌─────────────────────────────────────────────────────────────────┐
│                    DOCUMENT LIFECYCLE                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  EPHEMERAL (Specs)          EVERGREEN (Reference)    PERMANENT  │
│  ──────────────────         ───────────────────      ────────── │
│                                                                 │
│  feature-spec.md    ───→    AGENTS.md                ADRs       │
│  tasks.md                   Feature READMEs                     │
│  research.md                                                    │
│                                                                 │
│  Created: Start of feature  Updated: When facts change  Never   │
│  Deleted: After merge       Deleted: When obsolete      modify  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### 5. Make Examples Executable

The referenced examples (`examples/simple-todo/`, `examples/complex-auth/`) need complete walkthroughs:

- **Before**: Show initial state (empty spec)
- **During**: Show each step with actual file contents
- **After**: Show final state (archived spec, updated AGENTS.md)

Real examples demonstrate value better than templates.

### 6. Address the "Cold Start" Problem

How does an AI agent know to read AGENTS.md in the first place?

Add a section: **"How AI Agents Discover This File"**

| Tool | Discovery Mechanism |
|------|---------------------|
| Claude Code | Automatically reads AGENTS.md and CLAUDE.md from project root |
| Cursor | Reads `.cursor/rules/*.mdc` based on glob patterns |
| GitHub Copilot | Reads `.github/copilot-instructions.md` |
| Generic | User must explicitly reference the file |

### 7. Separate AI Context from Human Planning

Consider splitting Module 5 or reframing it:

**Option A**: Remove Module 5 from the AI-focused methodology
**Option B**: Reframe it as "AI-Readable Project State" with specific guidance on what AI can do with backlog/roadmap info

---

## Summary

| Aspect | Assessment |
|--------|------------|
| Core concepts | Solid - router pattern, boundaries, task markers |
| Practical value | High for Modules 1-4 |
| Main weakness | Mixes AI context with human project management |
| Adoption barrier | Could be lower with minimal templates |
| Decision heuristics | Need refinement (risk-based, not file-count-based) |

The methodology addresses real problems AI agents face: lack of context, inconsistent output, no workflow structure. The foundation is strong. Refinements would make it more practical and less theoretical.

---

*Review conducted by Claude (Opus 4.5) - January 2026*
