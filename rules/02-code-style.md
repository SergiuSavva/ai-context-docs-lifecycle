# Required Code Style

> **For AI Agents**: Apply these principles when generating or reviewing code. Always follow language-specific best practices and conventions.

---

## Core Quality Principles

| Keyword | Description |
|---------|-------------|
| **Robust** | Handle edge cases, validate inputs, graceful error handling |
| **Reliable** | Consistent behavior, predictable outcomes, well-tested |
| **Maintainable** | Easy to read, modify, and extend by others |
| **Minimalistic** | No over-engineering, only necessary complexity |
| **Flexible** | Adapts to changing requirements without major rewrites |
| **Testable** | Code structured for easy unit and integration testing |

---

## Code Style Directives

| Directive | Meaning |
|-----------|---------|
| **Self-documenting** | Names reveal intent |
| **Explicit over implicit** | No magic, clear data flow |
| **Fail fast** | Validate early, fail loudly |
| **Defensive** | Assume inputs can be wrong |
| **Idiomatic** | Follow language conventions |
| **Consistent** | Same patterns throughout codebase |

---

## Principles in Practice

### Robust

- Validate inputs at boundaries
- Handle edge cases explicitly
- Fail gracefully with useful errors

### Reliable

- Predictable behavior, no surprises
- Well-tested with clear contracts
- No hidden side effects

### Maintainable

- Clear structure and naming
- Small, focused functions
- Comments explain "why", code explains "what"

### Minimalistic

- Solve current problems, not hypothetical ones
- No premature abstraction
- Simple solutions first

### Flexible

- Composition over inheritance
- Easy to modify without breaking other code
- Configuration over hardcoding

### Testable

- Pure functions where possible
- Dependencies injectable
- Clear inputs and outputs

---

## Classic Principles Reference

| Acronym | Meaning | Related To |
|---------|---------|------------|
| **DRY** | Don't Repeat Yourself | Maintainable |
| **YAGNI** | You Aren't Gonna Need It | Minimalistic |
| **SRP** | Single Responsibility Principle | Maintainable |
| **OCP** | Open/Closed Principle | Flexible |
| **SoC** | Separation of Concerns | Maintainable |

---

## Quick Reference

When writing code, ask:

1. **Robust?** — What if this input is missing/invalid?
2. **Reliable?** — Is the behavior predictable?
3. **Maintainable?** — Will someone else understand this?
4. **Minimalistic?** — Am I solving a real problem or a hypothetical one?
5. **Flexible?** — Can this change without breaking other code?
6. **Testable?** — Can I write a unit test for this?
