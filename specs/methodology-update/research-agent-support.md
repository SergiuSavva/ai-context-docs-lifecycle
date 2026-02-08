# Research: AI Agent Support for Rules and Skills

> Which AI coding agents support **Rules** (persistent project instructions) and **Skills** (reusable on-demand capabilities)?

---

## Problem Statement

Module 2 (Coding Standards) provides Cursor-specific `.mdc` rules. To make the methodology more universal, we need to understand which agents support Rules and Skills, what file formats they use, and where the industry is converging.

---

## Findings

### Rules Support

Every major AI coding agent now supports project-level instruction files. The mechanisms differ but the concept is the same: persistent guidance that shapes AI behavior.

| Agent | Rule File(s) | Location | Glob/Path Matching | Character Limit |
|-------|-------------|----------|-------------------|-----------------|
| **Cursor** | `.mdc` files | `.cursor/rules/` | Yes (frontmatter globs) | None documented |
| **Claude Code** | `CLAUDE.md` | Project root + `~/.claude/` | Hierarchical (nearest file wins) | None documented |
| **GitHub Copilot** | `copilot-instructions.md`, `*.instructions.md` | `.github/`, `.github/instructions/` | Yes (path-specific files) | None documented |
| **Windsurf** | `.windsurfrules`, `context.md` | Project root, `.windsurf/` | Yes (glob patterns) | 6,000/file, 12,000 total |
| **Cline** | `.md` files | `.clinerules/` | No (toggleable on/off) | None documented |
| **OpenCode** | `AGENTS.md` | Project root + `~/.config/opencode/` | No | None documented |
| **Aider** | `CONVENTIONS.md` | Project root | No (loaded via `/read`) | None documented |
| **OpenAI Codex** | `AGENTS.md` | Project root | Hierarchical (child dirs) | None documented |
| **JetBrains Junie** | `guidelines.md`, `AGENTS.md` | `.junie/`, project root | No | None documented |
| **Gemini Code Assist** | `styleguide.md`, `config.yaml` | `.gemini/` | Yes (config.yaml globs) | None documented |

#### Convergence Pattern

Two standards are emerging:
1. **`AGENTS.md`** — Adopted by OpenCode, OpenAI Codex, JetBrains Junie, GitHub Copilot (agent mode). Universal, tool-agnostic.
2. **Tool-specific files** — `.cursor/rules/`, `.clinerules/`, `.windsurfrules`, `CLAUDE.md`. Richer features (globs, toggles) but lock-in.

Most agents that support `AGENTS.md` also fall back to `CLAUDE.md` for compatibility.

#### Global vs Project Rules

| Scope | Support |
|-------|---------|
| **Project rules** (committed to repo) | All agents |
| **Global/personal rules** (user-level) | Cursor, Claude Code, Windsurf, Cline, OpenCode, Aider |

#### Instruction Adherence

| Category | Agents | Adherence |
|----------|--------|-----------|
| Terminal-based | Claude Code, OpenCode | Strong — explicit context management |
| IDE-based | Cursor, Copilot, Windsurf | Variable — degrades in long sessions |
| Toggleable | Cline | Manual control per session |

---

### Skills Support

Skills are a newer concept: **on-demand reusable instruction packages** that load only when relevant, preserving context tokens.

| Agent | Skills Support | File Format | Locations | Invocation |
|-------|---------------|-------------|-----------|------------|
| **Cursor** | Yes (v2.4, Jan 2026) | `SKILL.md` | `.cursor/skills/`, `~/.cursor/skills/` | `@skill-name` |
| **Claude Code** | Yes | `SKILL.md` | `.claude/skills/`, `~/.claude/skills/` | `/skill-name` (slash command) |
| **GitHub Copilot** | Preview | `SKILL.md` | `.github/skills/`, `~/.copilot/skills/` | Auto-discovered |
| **Cline** | Yes (v3.48, Jan 2026) | `SKILL.md` | `.cline/skills/`, `~/.cline/skills/` | Auto-discovered |
| **OpenCode** | Yes | `SKILL.md` | `.opencode/skills/`, `~/.config/opencode/skills/` | Via `skill` tool |
| **Windsurf** | Yes | Markdown files | Via UI or manual | Auto/manual invocation |
| **OpenAI Codex** | Yes | `SKILL.md` | Documented in Codex docs | Via commands |
| **Aider** | No evidence | N/A | N/A | N/A |
| **JetBrains Junie** | No evidence | N/A | N/A | N/A |
| **Gemini Code Assist** | No evidence | N/A | N/A | N/A |

#### The Agent Skills Open Standard

An open standard (`agentskills.io`) has emerged, maintained by Anthropic under Apache 2.0:

- **Format**: `SKILL.md` with YAML frontmatter (`name`, `description`)
- **Progressive disclosure**: Agents load only name + description at startup; full instructions on activation
- **Portable**: Same skill works across Cursor, Claude Code, Cline, OpenCode, Copilot
- **Structure**: `<skill-name>/SKILL.md` + optional `docs/`, `scripts/`, `assets/`

```
.cursor/skills/       # or .claude/skills/, .agents/skills/
└── my-skill/
    ├── SKILL.md       # Required: frontmatter + instructions
    ├── docs/          # Optional: additional context
    └── scripts/       # Optional: executable scripts
```

#### Rules vs Skills

| Aspect | Rules | Skills |
|--------|-------|--------|
| **Loading** | Always active (or glob-matched) | On-demand when relevant |
| **Purpose** | Code style, conventions, boundaries | Workflows, procedures, domain expertise |
| **Context cost** | Always consumed | Only when activated |
| **Scope** | Project-wide standards | Task-specific capabilities |
| **Scalability** | Few rules (context pressure) | Many skills (lazy loading) |

---

## Comparison Matrix

| Criteria | AGENTS.md | Tool-specific rules | Agent Skills |
|----------|-----------|-------------------|--------------|
| Portability | Universal | Single tool | Cross-platform standard |
| Feature richness | Basic | Rich (globs, toggles) | Rich (scripts, docs) |
| Adoption | Growing fast | Established | Emerging (Jan 2026) |
| Glob matching | No | Most tools | N/A (on-demand) |
| Community ecosystem | PRPM (7,500+ packages) | Tool-specific | `agentskills.io` |
| Version control friendly | Yes | Yes | Yes |

---

## Recommendation

**For the methodology (this project):**

1. **Replace tool-specific rules with Skills** (Module 2) — `.mdc` rules are Cursor-only and always consume context. Skills (`SKILL.md`) load on-demand, work across 6+ agents, and scale better as projects grow.

2. **Inline short conventions in AGENTS.md** — Rules like "use camelCase" or "Server Components by default" belong in the always-loaded AGENTS.md, not in separate files. This replaces the need for `code-style.mdc` and `doc-style.mdc`.

3. **Use `AGENTS.md` as the universal entry point** — Every agent supports it natively or via fallback. It routes to Skills (on-demand patterns) and docs/ (reference knowledge) through progressive disclosure.

4. **Keep tool-specific rules optional** — Teams committed to one tool can still use `.mdc`, `.clinerules`, etc. as lightweight bridges that point to Skills (e.g., a 3-line `.mdc` that says "load skill `database`").

**Rationale**:
- `AGENTS.md` is the universal baseline — works in 6+ agents today
- Skills are the converging standard for reusable domain knowledge
- Progressive disclosure (AGENTS.md → Skills → Docs) keeps token cost low (~2,500-3,200 per session vs ~5,000+ with always-on rules)
- Tool-specific rules remain available as optional enhancements, not requirements

---

## Key Takeaways

1. **Rules are universal** — every agent supports some form of project instructions
2. **Skills are converging** — `SKILL.md` open standard adopted by 6+ agents in early 2026
3. **`AGENTS.md` is the portable baseline** — supported natively or via fallback by most agents
4. **No agent supports everything** — teams using multiple tools need a layered approach

---

## Resources

- Agent Skills Specification: https://agentskills.io/specification
- PRPM Rules Registry: https://prpm.dev/
- Cursor Rules: https://cursor.com/docs/context/skills
- Claude Code Skills: https://docs.claude.com/en/docs/claude-code/slash-commands
- Cline Rules: https://docs.cline.bot/features/cline-rules
- OpenCode Rules: https://opencode.ai/docs/rules/
- Aider Conventions: https://aider.chat/docs/usage/conventions.html
- Copilot Instructions: https://docs.github.com/copilot/customizing-copilot/adding-custom-instructions-for-github-copilot
- Windsurf Rules: https://docs.windsurf.com/windsurf/cascade/skills
- Gemini Code Assist: https://developers.google.com/gemini-code-assist/docs/customize-gemini-behavior-github
- JetBrains Junie: https://www.jetbrains.com/help/junie/customize-guidelines.html

---

*Researched: 2026-02-08*
*Status: Draft*
