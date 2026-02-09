# Skill Routing Policy

> **Deterministic + score-based policy** for deciding when an AI agent should load a skill.

---

## Purpose

This policy defines a repeatable router for `SKILL.md` activation:

- Load skills when they materially improve correctness
- Skip skills when they add context noise
- Ask once when confidence is ambiguous

This guide applies to agents using Module 1 + Module 2 in this methodology.

---

## Inputs

The router should evaluate these inputs in order:

| Input | Source | Why it matters |
|------|--------|----------------|
| User intent | Current request | Primary signal for relevance |
| Local instruction hierarchy | Nearest `AGENTS.md` | Resolves project-specific precedence |
| Skill metadata | `SKILL.md` frontmatter (`name`, `description`) | Low-cost discovery |
| Task artifacts | Target files, directories, commands | Strong domain clues |
| Runtime signals | Errors/failures during execution | Triggers deferred skill activation |

---

## Hard Rules (No Scoring)

Apply these rules before scoring:

1. **Explicit invocation wins**
   - If the user explicitly names a skill, load it.
2. **Policy-forced routing wins**
   - If `AGENTS.md` maps the current task to a skill, load that skill.
3. **Explicit no-skill wins**
   - If the user says not to use skills, do not load any unless safety policy requires it.
4. **Instruction precedence**
   - The closest `AGENTS.md` to edited files has priority over higher-level docs.
5. **Bounded activation**
   - Load at most 2 skills initially; pull more only when needed.

---

## Scoring Model

If hard rules do not resolve routing, compute a score per candidate skill.

### Formula

`score = intent + artifact + stack + risk_reduction - ambiguity_penalty - scope_penalty`

Range: `0-100`

### Components

| Component | Range | Scoring rule |
|-----------|------:|--------------|
| Intent match | 0-40 | Semantic match between user request and skill `description` keywords |
| Artifact match | 0-20 | Target paths, changed files, and commands align to skill domain |
| Stack match | 0-15 | Skill domain matches project stack in local docs |
| Risk reduction | 0-15 | Skill likely prevents costly mistakes (DB, auth, migrations, release tasks) |
| Ambiguity penalty | 0 to -15 | Multiple similar skills score within 5 points |
| Scope penalty | 0 to -15 | Task is trivial/general and skill would add unnecessary context |

### Thresholds

| Score | Decision |
|------:|----------|
| `>= 70` | Auto-load top skill |
| `55-69` | Ask one clarification question, or defer-load after first failure |
| `< 55` | Do not load a skill initially |

### Tie-breakers

Use in this order:

1. Higher `Intent match`
2. Higher `Artifact match`
3. Smaller skill size (lower context cost)
4. More recent project usage for the same task type

### Default Configuration

```yaml
routing:
  max_initial_skills: 2
  tie_margin_points: 5
  thresholds:
    auto_load: 70
    clarify_or_defer: 55
  retry:
    enabled: true
    max_retries_after_skill_load: 1
```

---

## No-Skill Conditions

Do not load a skill when any of these are true:

- Task is generic editing, formatting, or summarization
- No candidate exceeds `55`
- Top candidates conflict and cannot be resolved with one clarification
- A skill is stale or contradicts current `AGENTS.md`/project docs
- The task can be completed safely with base instructions only

---

## Deferred Activation (Retry Loop)

Use a two-pass approach for ambiguous tasks:

1. Try execution without loading a skill.
2. If failure indicates a domain-specific gap, load the top candidate and retry once.

Failure patterns that justify deferred activation:

- Migration/schema errors -> `database`
- Test harness or Storybook mismatch -> `testing`
- Component/theming/accessibility drift -> `ui-components`
- Routing/layout/server action mismatch -> `nextjs-app-router`

---

## Pseudocode

```text
candidates = discover_skills_metadata()
hard = apply_hard_rules(user_request, agents_rules, constraints)

if hard.resolved:
  return hard.selection

scores = {}
for skill in candidates:
  scores[skill] = compute_score(skill)

top = max(scores)

if top.score >= 70:
  return load(top, limit=2)

if 55 <= top.score < 70:
  if can_ask_once:
    return ask_clarification(top, second_best)
  return defer_load(top)

return no_skill()
```

---

## Authoring Requirements for Better Routing

To improve router quality, every skill should have:

1. A precise `description` covering both "what it does" and "when to use it"
2. Domain keywords likely to appear in user requests
3. A short "when not to use this skill" section
4. A quick checklist to reduce execution drift
5. Links to related docs and neighboring skills

---

## Recommended Telemetry

Track these metrics per 100 tasks:

| Metric | Target |
|--------|-------:|
| Correct skill activation precision | `>= 0.85` |
| Missed-skill rate (false negatives) | `<= 0.10` |
| Unnecessary activation rate (false positives) | `<= 0.10` |
| Average skills loaded per task | `<= 1.4` |
| Clarification rate | `<= 0.20` |

Tune thresholds quarterly based on these measurements.

---

## Implementation Notes for This Repository

- Keep universal rules compact in `AGENTS.md`
- Keep deep domain procedures in `SKILL.md` files (Module 2 pattern)
- Route by task table first, then scoring fallback
- Prefer deferred activation over loading many skills upfront

---

## References

- [Module 2: Skills](../modules/02-skills/README.md)
- [AGENTS.md Best Practices](./agents-md-best-practices.md)
- [Agent Skills Specification](https://agentskills.io/specification)
- [Integrate Skills into Your Agent](https://agentskills.io/integrate-skills)
- [AGENTS.md](https://agents.md/)
- [OpenAI API reference: `tool_choice` modes](https://platform.openai.com/docs/api-reference/realtime-calls/accept-call)
- [OpenAI guide: latest model custom tool best practices](https://platform.openai.com/docs/guides/latest-model)
- [Anthropic tool definition best practices](https://platform.claude.com/docs/en/agents-and-tools/tool-use/implement-tool-use)
- [ReAct (arXiv:2210.03629)](https://arxiv.org/abs/2210.03629)
- [Toolformer (arXiv:2302.04761)](https://arxiv.org/abs/2302.04761)
