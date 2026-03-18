---
name: testing
description: Test strategy and quality — behavior-driven tests, TDD guidance, test quality checks, and anti-patterns. Use when writing tests, reviewing test quality, or deciding test strategy for a feature.
---

# Testing

## Core Principle

**Test behavior, not implementation.** A good test breaks when the feature breaks. A bad test breaks when code is refactored but behavior is unchanged.

---

## The Mirror Test

If your test file is a line-by-line mirror of your implementation — same functions, same order, testing the same internals — the tests will pass even when the feature is broken. They're testing that the code exists, not that it works.

| Bad (implementation-coupled) | Good (behavior-focused) |
|------------------------------|------------------------|
| Assert function calls internal helper | Assert function returns expected output |
| Mock every dependency | Mock only external boundaries (DB, API, filesystem) |
| Test private methods directly | Test through public API |
| Assert exact HTML/DOM structure | Assert visible text, user interactions, accessibility |
| Mirror source file structure in test | Test user scenarios end-to-end |

**Fix**: Write tests from the user's perspective. What does the user see, click, or receive? Test that.

---

## When to Use TDD

TDD (Red-Green-Refactor) improves quality in specific situations, not universally:

| Use TDD | Skip TDD |
|---------|----------|
| Well-defined inputs/outputs (pure functions, APIs) | Exploratory / prototype code |
| Bug fixes (failing test = guaranteed regression coverage) | UI layout and styling |
| Complex business logic with edge cases | Glue code and thin wrappers |
| Data transformations, parsing, formatting | Configuration changes |
| Validation rules and algorithms | Initial spike / proof of concept |
| State machines and workflows | One-off scripts |

**Heuristic**: Can you write `expect(fn(input)).toBe(output)` before writing `fn`? Yes → TDD. No → write tests after.

### TDD Flow

```
RED:    Write a failing test describing expected behavior
        Run it — it MUST fail
        Commit: test(scope): add failing test for [feature]

GREEN:  Write the minimum code to make the test pass
        Run it — it MUST pass
        Commit: feat(scope): implement [feature]

REFACTOR (optional): Clean up while keeping tests green
        Commit: refactor(scope): clean up [feature]
```

---

## Test Categories

| Category | What It Tests | Speed | When to Write |
|----------|--------------|-------|---------------|
| **Unit** | Single function/component in isolation | Fast (ms) | Every task that adds logic |
| **Integration** | Multiple units working together | Medium (s) | Phase validation gates |
| **E2E** | Full user workflow through the system | Slow (s-min) | Per acceptance criterion |

**Rule of thumb**: Many unit tests, fewer integration tests, minimal E2E. But one well-placed integration test is worth more than ten fragile unit tests.

---

## Test Quality Checks

### Coverage (Necessary but Not Sufficient)

- [ ] New code has test coverage
- [ ] Critical paths have integration tests
- [ ] Edge cases are explicitly tested (empty, null, boundary, error)

### Quality (More Important Than Coverage)

- [ ] Tests fail when behavior changes (not just on refactor)
- [ ] Tests are independent (no shared mutable state between tests)
- [ ] Test names describe behavior: `should [expected] when [condition]`
- [ ] No production logic in tests (no `if` statements, no complex setup)
- [ ] Assertions are specific (`toBe(42)`, not `toBeTruthy()`)
- [ ] Error cases tested, not just happy paths

---

## Anti-Patterns

| Anti-Pattern | Why It's Bad | Fix |
|--------------|-------------|-----|
| Testing implementation details | Breaks on refactor, passes on bugs | Test inputs → outputs |
| `toBeTruthy()` / `!= null` | Passes for wrong reasons | Assert specific expected values |
| Copy-paste production logic into test | Test mirrors bugs in the code | Use independently calculated expected values |
| No error case tests | Happy path works, errors crash | Test: empty, null, boundary, unauthorized, timeout |
| Shared mutable state between tests | Flaky, order-dependent failures | Reset state in beforeEach/setup |
| Testing only sunny-day scenarios | Misses real-world failures | Add adversarial inputs, edge cases, concurrent access |
| Giant test setup (50+ lines) | Hard to read, fragile, hides intent | Extract test helpers, use factories, simplify scenarios |

---

## Integration with Feature Workflow

Tests are part of every implementation phase, not a separate phase at the end:

| Workflow Phase | Testing Activity |
|----------------|-----------------|
| **Plan** | Identify which ACs need unit, integration, or E2E tests |
| **Implement** | Write tests alongside or before code (each task includes its tests) |
| **Phase Validation** | Integration tests confirm the phase works end-to-end |
| **Verify** | Full test suite passes, AC coverage confirmed, stub detection clean |

**Rule**: A task is not `[x]` (complete) unless its tests pass. Tests are part of the task, not a separate follow-up task (unless the task is explicitly "add integration tests for Phase N").

---

## When NOT to Use

- **Prototype / spike code** — test after validating the approach
- **Configuration-only changes** — manual verification is sufficient
- **Documentation changes** — no code to test
- **One-off scripts** — disposable by nature

---

## Quick Checklist

- [ ] Tests verify behavior, not implementation
- [ ] No mirroring of production code in test assertions
- [ ] Edge cases covered: empty, null, boundary, error, unauthorized
- [ ] Tests are independent (no shared mutable state)
- [ ] Test names describe expected behavior
- [ ] New features have tests written alongside (not bolted on after)
- [ ] Phase validations have integration tests
- [ ] TDD used where appropriate (well-defined inputs/outputs, bug fixes)

---

## Related Docs

- load skill `feature-workflow` (for task execution with tests)
- load skill `spec-writing` (for acceptance criteria that drive test cases)
- load skill `debug-workflow` (for writing regression tests after bug fixes)
