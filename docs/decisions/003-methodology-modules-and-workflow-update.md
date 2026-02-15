# ADR-003: Methodology Modules and Workflow Update

## Status

**Accepted**

---

## Context

The methodology evolved from an earlier model that mixed tool-specific rules, file-count heuristics, and less explicit separation between temporary feature planning artifacts and permanent project knowledge.

Key issues identified:

1. **Complexity mismatch**: File-count triggers did not reliably represent feature complexity.
2. **Portability limits**: Cursor-specific rule emphasis reduced cross-agent compatibility.
3. **Structure drift**: Module boundaries did not map cleanly to how AI context is actually loaded.
4. **Naming inconsistency**: `feature-spec.md` naming conflicted with the intended minimal standard.

---

## Decision

Adopt the updated methodology baseline with the following decisions:

1. **Three-phase feature flow**: `Research -> Plan -> Implement`, with validation checkpoints inside each phase.
2. **Minimum feature docs**: `spec.md` + `tasks.md` for non-bug-fix feature work.
3. **Optional planning docs**: `research.md`, `design.md`, `plan.md`, `user-stories.md` created only when needed.
4. **Naming standard**: Use `spec.md` (replace `feature-spec.md`).
5. **Module architecture**: Consolidate to 4 modules:
   - Module 1: Project Context (`AGENTS.md` + `docs/`)
   - Module 2: Skills (`.agents/skills/`, `SKILL.md`)
   - Module 3: Feature Development (workflows + specs)
   - Module 4: Project Planning (optional project-level planning artifacts)
6. **Docs lifecycle boundary**:
   - `specs/` = ephemeral feature artifacts
   - `docs/decisions/` = permanent decision records
7. **Tool-specific rules stance**: Tool-specific files (including `.mdc`) are optional integration bridges, not required methodology.

---

## Rationale

1. **Better decision quality**: Complexity is determined by uncertainty and architecture impact, not file count.
2. **Higher interoperability**: `AGENTS.md` + `SKILL.md` patterns work across multiple AI coding agents.
3. **Cleaner context loading**: Always-on context stays compact; deep guidance loads on demand.
4. **Lower maintenance cost**: Clear document lifecycle boundaries reduce stale documentation risk.
5. **Clearer onboarding**: Four modules and unified naming are easier to teach and adopt.

---

## Consequences

### Positive

- More consistent feature execution with explicit phase boundaries.
- Better cross-tool compatibility with less lock-in.
- Simpler mental model for users and contributors.
- Stronger alignment between templates, examples, and workflow docs.

### Negative

- Existing legacy artifacts required migration and terminology cleanup.
- Teams relying only on tool-native rules need a small adaptation step.

### Neutral

- Optional tool-specific bridges remain available for teams that prefer them.

---

## Implementation

### Key Outcomes

| Area | Outcome |
|------|---------|
| Workflow model | Three phases adopted across feature-development docs |
| Templates | `spec.md` baseline and `plan.md` template added |
| Modules | 5-module shape consolidated into 4 modules |
| Skills | Dedicated Skills module and `SKILL.md` template added |
| Examples | Module examples aligned with updated naming and flow |
| Compatibility | Tool compatibility guidance included in module documentation |

### Follow-up Convention

- Keep legacy terminology only where needed as historical context.
- Keep `.mdc` guidance explicitly marked as optional bridge behavior.

---

## References

- `docs/decisions/001-implementation-flow.md`
- `docs/decisions/002-agents-md-router-pattern.md`
- `content/modules/README.md`
- `content/modules/01-project-context/README.md`
- `content/modules/02-skills/README.md`
- `content/modules/03-feature-development/README.md`
- `README.md`

---

## Metadata

- **Date**: 2026-02-11
- **Decision makers**: Project maintainers
- **Related feature**: Methodology update and module restructure
