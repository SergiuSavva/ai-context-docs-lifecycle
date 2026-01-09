# Architecture Decision Records (ADRs)

## Overview

Architecture Decision Records capture important architectural decisions made during the project, including the context, decision, and consequences.

---

## ADR Index

| ADR | Title | Status | Date |
|-----|-------|--------|------|
| [001](./001-template.md) | Template ADR | Template | - |

---

## ADR Status Values

| Status | Meaning |
|--------|---------|
| **Proposed** | Under discussion |
| **Accepted** | Decision made and in effect |
| **Deprecated** | No longer applies |
| **Superseded** | Replaced by another ADR |

---

## Creating a New ADR

1. Copy `001-template.md` to `XXX-title.md`
2. Fill in the template
3. Add to index above
4. Get review/approval
5. Update status to Accepted

---

## ADR Template

```markdown
# ADR-XXX: [Title]

> **Status:** Proposed | Accepted | Deprecated | Superseded
> **Date:** YYYY-MM-DD
> **Decision Makers:** [Names/roles]

## Context
[What is the issue or decision we need to make?]

## Decision
[What is the decision?]

## Consequences

### Positive
- [Benefit]

### Negative
- [Drawback]

## Alternatives Considered
[What other options were evaluated?]
```

---

## When to Write an ADR

Write an ADR when:
- Choosing a technology/framework
- Establishing a pattern/convention
- Making a significant trade-off
- Changing a previous decision

---

*Template from [AI-First Dev Kit](https://github.com/YOUR_USERNAME/ai-first-dev-kit)*
