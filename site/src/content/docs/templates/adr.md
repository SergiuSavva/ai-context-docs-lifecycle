---
title: Architecture Decision Record
description: ADR template to capture WHY, not just what you decided
head: []
---

## Purpose

Architecture Decision Records capture significant technical decisions — the context, the options considered, and why you chose what you did.

**Location:** `docs/decisions/`

**Lifecycle:** Permanent record. Status may change (Accepted → Deprecated).

---

## Template

````markdown
# ADR-[XXX]: [Decision Title]

**Status:** Proposed | Accepted | Deprecated | Superseded by [ADR-XXX]

**Date:** [YYYY-MM-DD]

**Decision Makers:** [Names or roles]

---

## Context

[What is the issue that we're seeing that is motivating this decision?]

[What are the forces at play? Technical constraints? Business requirements?]

## Decision

[What is the change that we're proposing and/or doing?]

**We will [decision].**

## Consequences

### Positive

- [Benefit 1]
- [Benefit 2]

### Negative

- [Drawback 1]
- [Tradeoff 1]

### Neutral

- [Side effect that's neither good nor bad]

## Alternatives Considered

### Alternative 1: [Name]

[Description]

**Pros:**
- [Pro 1]

**Cons:**
- [Con 1]

**Why rejected:** [Reason]

### Alternative 2: [Name]

[Description]

**Why rejected:** [Reason]

## References

- [Link to relevant documentation]
- [Link to discussion/RFC]
- [Related ADR if applicable]
````

---

## When to Write an ADR

Write an ADR when making decisions that:

| Scenario | Example |
|----------|---------|
| Hard to reverse | Choosing a database |
| Significant cost | Adding a new service |
| Team-wide impact | Changing coding conventions |
| Multiple valid options | REST vs GraphQL |
| Frequently questioned | "Why did we use X?" |

---

## Example: Database Choice

````markdown
# ADR-001: PostgreSQL for Primary Database

**Status:** Accepted

**Date:** 2025-01-10

**Decision Makers:** Tech Lead, Backend Team

---

## Context

We need to choose a primary database for our e-commerce platform. Requirements:
- ACID compliance for order transactions
- Flexible schema for product attributes
- Good ecosystem and tooling
- Team familiarity

## Decision

**We will use PostgreSQL as our primary database.**

Specifically:
- PostgreSQL 15 on AWS RDS
- JSONB columns for flexible product attributes
- Read replicas for scaling reads

## Consequences

### Positive

- Strong ACID guarantees for order integrity
- JSONB provides schema flexibility
- Excellent ecosystem (ORMs, tools, hosting)
- Team has PostgreSQL experience

### Negative

- Horizontal scaling more complex than NoSQL
- JSONB queries can be slower than normalized columns

## Alternatives Considered

### Alternative 1: MongoDB

**Pros:** Native JSON, easier horizontal scaling

**Cons:** Weaker transactions, less team experience

**Why rejected:** Transaction guarantees critical for orders.

### Alternative 2: MySQL

**Pros:** Wide hosting support, team has some experience

**Cons:** JSON support less mature than PostgreSQL

**Why rejected:** PostgreSQL's JSONB better fits our needs.
````

---

## ADR Index Template

Keep an index in `docs/decisions/README.md`:

````markdown
# Architecture Decision Records

## Index

| ADR | Decision | Status | Date |
|-----|----------|--------|------|
| [ADR-001](ADR-001-postgresql.md) | PostgreSQL for database | Accepted | 2025-01-10 |
| [ADR-002](ADR-002-jwt-auth.md) | JWT for authentication | Accepted | 2025-01-12 |

## Status Legend

| Status | Meaning |
|--------|---------|
| **Proposed** | Under discussion |
| **Accepted** | Decision made |
| **Deprecated** | No longer applies |
| **Superseded** | Replaced by newer ADR |
````

---

## Tips

1. **Write early** — Capture context while it's fresh
2. **Keep it brief** — 1-2 pages max
3. **Focus on WHY** — The decision is secondary to the reasoning
4. **Include alternatives** — Shows due diligence
5. **Update status** — Mark deprecated/superseded when things change

---

## Copy Path

Create at: `/docs/decisions/ADR-XXX-title.md`
