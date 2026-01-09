# MVP Specifications

## Overview

This directory contains lightweight "PRD-lite" specifications for MVP features. These are focused, actionable documents that provide just enough detail for implementation.

---

## What's a PRD-Lite?

A PRD-Lite is a lightweight specification that captures:
- **Problem** - What pain point are we solving?
- **Scope** - What's in/out?
- **Success Metrics** - How do we know it works?
- **Key Stories** - Main user scenarios
- **Technical Notes** - Implementation guidance (if needed)

It intentionally skips heavyweight sections like detailed wireframes, comprehensive edge cases, or extensive technical architecture.

---

## Specifications

| Spec | Feature | Status |
|------|---------|--------|
| [spec-template.md](./spec-template.md) | Template | - |

---

## PRD-Lite Template

```markdown
# Feature: [Name]

## Problem (1-2 sentences)
[What pain point does this solve?]

## Success Metrics
- [ ] [How we measure success]

## Scope

**In:**
- [What's included]

**Out:**
- [What's NOT included]

## Key User Stories
- As a [user], I want [goal] so that [benefit]

## Technical Approach (if non-obvious)
[Brief notes on implementation]

## Risks
- [Risk] → [Mitigation]
```

---

## When to Write a PRD-Lite

Write a PRD-Lite for:
- New MVP features
- Major changes to existing features
- Features with unclear scope

Skip it for:
- Bug fixes
- Minor enhancements
- Well-understood features

---

## Related Documents

- [Features Documentation](../features/)
- [Global Tasks](../TASKS.md)

---

*Template from [AI-First Dev Kit](https://github.com/YOUR_USERNAME/ai-first-dev-kit)*
