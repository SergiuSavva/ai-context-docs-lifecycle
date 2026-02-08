# ADR-002: AGENTS.md Router Pattern with Dynamic Context Loading

## Status

**Accepted**

---

## Context

The project needed to define best practices for AGENTS.md files - the emerging standard for providing AI coding assistants with project context. Key questions:

1. **Monolithic vs Modular**: Should AGENTS.md contain all context inline, or reference external docs?
2. **Single App vs Monorepo**: How should the pattern differ for different project structures?
3. **Tool Compatibility**: How to support Cursor, Claude Code, GitHub Copilot, and other tools?

Research was conducted analyzing 2,500+ repositories and official documentation from:
- GitHub Blog (analysis of top AGENTS.md files)
- Official AGENTS.md specification (agents.md)
- Claude Code, Cursor, and Copilot documentation
- Datadog's monorepo patterns

---

## Decision

Adopt the **Router Pattern** for AGENTS.md files:

1. **Compact root file** (50-80 lines, 150 max) that routes to detailed docs
2. **Dynamic context loading** via `@path/to/file.md` references
3. **Three-tier boundaries** (Always / Ask First / Never)
4. **Separate templates** for single apps vs monorepos

### Template Structure

```
templates/
├── AGENTS-single-app.md        # Standard apps, libraries
├── AGENTS-monorepo-root.md     # Monorepo root (router)
└── AGENTS-monorepo-subproject.md  # Each package/service
```

---

## Rationale

### Research Findings

| Finding | Source |
|---------|--------|
| Files >150 lines have diminishing returns | GitHub Blog (2,500 repos) |
| Top files cover 6 areas: commands, testing, structure, style, git, boundaries | GitHub Blog |
| "Nearest file wins" enables monorepo support | AGENTS.md spec |
| Dynamic loading reduces token waste | Claude Code docs |

### Key Factors

1. **Token Efficiency**: Loading only relevant context improves AI response quality
2. **Maintainability**: Modular docs are easier to update than monolithic files
3. **Scalability**: Router pattern works from single apps to 100+ package monorepos
4. **Tool Agnostic**: AGENTS.md works with 20+ tools; tool-specific features go in `.cursor/rules/` etc.

---

## Consequences

### Positive

- **Better AI responses**: Less noise = more accurate output
- **Scales to any codebase**: From simple apps to large monorepos
- **Team ownership**: Different teams maintain their own subproject docs
- **Single source of truth**: AGENTS.md is universal; symlink for tool-specific needs
- **Progressive adoption**: Users can start minimal and add structure as needed

### Negative

- **More files to maintain**: Monorepos need AGENTS.md per package
- **Learning curve**: Users must understand the router pattern
- **Tool variation**: `@path` syntax works in Claude Code but not all tools

### Neutral

- **Migration needed**: Existing monolithic AGENTS.md files need restructuring
- **Documentation overhead**: Best practices guide needed to explain patterns

---

## Alternatives Considered

### 1. Monolithic AGENTS.md (All Content Inline)

**Description**: Single file containing all project context, patterns, and rules.

**Rejected because**:
- Wastes tokens on irrelevant context
- Breaks down at ~150 lines (signal buried in noise)
- Hard to maintain for large projects
- No team ownership model

### 2. Tool-Specific Files Only

**Description**: Use only `.cursor/rules/`, `CLAUDE.md`, `.github/copilot-instructions.md` etc.

**Rejected because**:
- Fragmentation: duplicate content across tool files
- No universal standard
- Teams using multiple tools need to sync content manually
- AGENTS.md is the emerging industry standard (Linux Foundation)

### 3. README.md as AI Context

**Description**: Put AI instructions in README.md instead of separate file.

**Rejected because**:
- Clutters human-focused documentation
- AGENTS.md spec explicitly separates concerns
- README for humans, AGENTS.md for AI agents

---

## Implementation

### Files Created

| File | Purpose |
|------|---------|
| `content/modules/01-project-context/templates/AGENTS-single-app.md` | Single app template |
| `content/modules/01-project-context/templates/AGENTS-monorepo-root.md` | Monorepo root template |
| `content/modules/01-project-context/templates/AGENTS-monorepo-subproject.md` | Subproject template |
| `content/guides/agents-md-best-practices.md` | Research-backed writing guide |
| `content/guides/tool-compatibility.md` | Multi-tool setup guide |
| `AGENTS.md` (project root) | Living example of router pattern |

### Files Modified

| File | Change |
|------|--------|
| `content/modules/01-project-context/README.md` | Template selection guide |
| `content/guides/README.md` | Added new guides |
| `.cursor/rules/00-index.mdc` | References AGENTS.md |
| `mkdocs.yml` | Added guides to navigation |

---

## References

- [GitHub Blog: Lessons from 2,500+ Repositories](https://github.blog/ai-and-ml/github-copilot/how-to-write-a-great-agents-md-lessons-from-over-2500-repositories/)
- [Official AGENTS.md Specification](https://agents.md/)
- [Datadog: Steering AI Agents in Monorepos](https://dev.to/datadog-frontend-dev/steering-ai-agents-in-monorepos-with-agentsmd-13g0)
- [Claude Code Memory Documentation](https://code.claude.com/docs/en/memory)
- [Builder.io: AGENTS.md Guide](https://www.builder.io/blog/agents-md)

---

## Metadata

- **Date**: 2026-01-21
- **Decision makers**: Project maintainers
- **Related feature**: Module 1 (Quick Start)
