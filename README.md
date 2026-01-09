# AI-First Development Kit

> **A battle-tested methodology for AI-assisted software development**

Transform how you build software with AI coding assistants. This kit provides a structured, lightweight approach that gives AI tools (Cursor, GitHub Copilot, Claude, etc.) the context they need to be genuinely useful.

---

## 🎯 The Problem

AI coding assistants are powerful, but they often:
- Generate generic, boilerplate code that doesn't fit your patterns
- Forget project context between conversations
- Produce inconsistent styles and architectures
- Require constant correction and hand-holding

**The root cause?** AI lacks context about YOUR project.

---

## 💡 The Solution

**AI-First Development Kit** provides:

```
┌─────────────────────────────────────────────────────────────┐
│  Your Project + AI-First Kit                                │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  📁 .cursor/rules/     → Domain-specific patterns           │
│  📁 docs/features/     → Structured feature documentation   │
│  📁 docs/mvp/          → Lightweight specifications         │
│  📄 AGENTS.md          → Quick AI context at every level    │
│  📄 docs/TASKS.md      → Progress tracking                  │
│                                                             │
│  = AI that understands YOUR project                         │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Quick Start

### Option 1: Use as Template (Recommended)

```bash
# Clone the template
git clone https://github.com/YOUR_USERNAME/ai-first-dev-kit.git my-project
cd my-project

# Remove template git history
rm -rf .git
git init

# Customize for your project
# Edit AGENTS.md with your project details
# Edit .cursor/rules/*.mdc with your patterns
```

### Option 2: Add to Existing Project

```bash
# Copy the structure
cp -r ai-first-dev-kit/.cursor your-project/
cp -r ai-first-dev-kit/docs your-project/
cp ai-first-dev-kit/AGENTS.md your-project/

# Customize for your needs
```

---

## 📁 Kit Structure

```
your-project/
├── .cursor/
│   └── rules/                    # AI behavior rules (.mdc files)
│       ├── 00-index.mdc         # Master index - load first
│       ├── project-architecture.mdc
│       ├── coding-patterns.mdc
│       ├── state-management.mdc
│       ├── testing-strategy.mdc
│       └── documentation.mdc
│
├── docs/
│   ├── INDEX.md                  # Human navigation hub
│   ├── TASKS.md                  # Global task tracking
│   ├── features/                 # Feature documentation
│   │   ├── README.md
│   │   ├── _templates/          # Documentation templates
│   │   └── <feature>/           # Per-feature docs
│   ├── mvp/                      # Lightweight specs
│   └── decisions/                # ADRs (Architecture Decision Records)
│
└── AGENTS.md                     # Root AI context
```

---

## 🧠 Core Concepts

### 1. The Mental Model

```
┌─────────────────────────────────────────┐
│           You (Product Owner)            │
│  • Vision • Priorities • Decisions       │
│  • What to build & Why                   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│        AI (Intelligent Executor)         │
│  • Implementation • Patterns • Tests     │
│  • How to build it well                  │
│  • Guided by rules & specs               │
└─────────────────────────────────────────┘
```

You provide vision. AI provides execution. Rules ensure quality.

### 2. Rules Over Prompts

Instead of repeating instructions in every prompt:

```
❌ "Remember to use TypeScript strict mode, path aliases with @/, 
   functional components, React Query for data fetching..."
```

Define once in `.cursor/rules/`:

```markdown
# coding-patterns.mdc
- TypeScript strict mode ON
- Use `@/` path aliases, NEVER relative imports
- Functional components with hooks ONLY
- React Query for all data fetching
```

AI loads these rules automatically.

### 3. AGENTS.md - Context at Every Level

**Root AGENTS.md** - Project overview for AI:
```markdown
# MyProject - AI Agent Instructions

## Quick Start
- Install: `npm install`
- Dev: `npm run dev`

## Tech Stack
- Next.js 15, TypeScript, Tailwind CSS

## Architecture
- Server components by default
- Feature-based organization

## Need Help?
- Architecture: `.cursor/rules/project-architecture.mdc`
- Patterns: `.cursor/rules/coding-patterns.mdc`
```

**Feature-level AGENTS.md** - Specific context:
```markdown
# Feature: Authentication

## Files
- `app/(auth)/` - Auth routes
- `features/auth/` - Auth components & hooks

## Patterns
- Use Supabase SSR auth
- Protected routes via middleware
```

### 4. PRD-Lite - Just Enough Specification

Full PRDs are often overkill. Use this lightweight template:

```markdown
# Feature: [Name]

## Problem (1-2 sentences)
What pain point does this solve?

## Success Metrics
- [ ] Metric 1
- [ ] Metric 2

## Scope
**In:** X, Y, Z
**Out:** A, B, C

## Key User Stories
- As a [user], I want to...

## Technical Approach (if non-obvious)
Brief notes on implementation

## Risks
- Risk 1 → Mitigation
```

---

## 📋 What's Included

### Rule Templates (`.cursor/rules/`)

| File | Purpose |
|------|---------|
| `00-index.mdc` | Master index - tells AI which rules to load |
| `project-architecture.mdc` | Project structure, routing, conventions |
| `coding-patterns.mdc` | Code style, TypeScript, React patterns |
| `state-management.mdc` | Data fetching, caching, state decisions |
| `testing-strategy.mdc` | Test philosophy, tools, patterns |
| `documentation.mdc` | Doc maintenance guidelines |

### Documentation Templates (`docs/`)

| File | Purpose |
|------|---------|
| `INDEX.md` | Navigation hub for humans |
| `TASKS.md` | Task tracking with progress |
| `features/README.md` | Feature documentation overview |
| `features/_templates/` | Templates for new features |
| `decisions/` | Architecture Decision Records |

### Feature Documentation Structure

Each feature gets its own folder:

```
docs/features/<feature-name>/
├── README.md              # Overview, goals, code locations
├── user-stories.md        # User stories + acceptance criteria
├── tasks.md               # Implementation checklist
└── test-scenarios.feature # Gherkin test scenarios (optional)
```

---

## 🔧 Customization Guide

### Step 1: Edit AGENTS.md

Replace the template content with your project specifics:

```markdown
# [Your Project Name] - AI Agent Instructions

## Quick Start
- Install: `[your install command]`
- Dev: `[your dev command]`

## Tech Stack
[List your actual stack]

## File Organization
[Show your directory structure]
```

### Step 2: Customize Rules

Edit `.cursor/rules/*.mdc` files to match your patterns:

- **project-architecture.mdc** - Your file structure, routing
- **coding-patterns.mdc** - Your code style, conventions
- **state-management.mdc** - How you handle data
- **testing-strategy.mdc** - Your testing approach

### Step 3: Set Up Feature Docs

For each major feature:

1. Create `docs/features/<feature-name>/`
2. Copy templates from `docs/features/_templates/`
3. Fill in your feature details

### Step 4: Maintain TASKS.md

Keep a global task index:

```markdown
## Quick Summary

| Feature | Status | Tasks | Done | Progress |
|---------|--------|-------|------|----------|
| Auth    | ✅ Done | 10 | 10 | 100% |
| Search  | 🔄 WIP | 15 | 8 | 53% |
| Booking | ⏳ Next | 20 | 0 | 0% |
```

---

## 🆚 Comparison with Other Approaches

| Approach | Best For | Complexity | This Kit |
|----------|----------|------------|----------|
| **No structure** | Prototypes | Low | ❌ AI lacks context |
| **Full PRDs** | Enterprise, compliance | High | ❌ Overkill for most |
| **BMAD Method** | Unclear requirements | High | ❌ Too much ceremony |
| **OpenSpec** | Team coordination | Medium | ⚠️ Generic |
| **AI-First Kit** | Clear vision, efficient execution | Low | ✅ Sweet spot |

---

## 💡 Best Practices

### Do

- ✅ Update rules when you establish new patterns
- ✅ Keep AGENTS.md current with major changes
- ✅ Use task tracking for complex features
- ✅ Write user stories for non-trivial features
- ✅ Document decisions in `docs/decisions/`

### Don't

- ❌ Over-document - rules should fit one screen
- ❌ Duplicate info between docs and rules
- ❌ Create rules for hypothetical scenarios
- ❌ Let docs get stale - update or delete

---

## 🤝 Contributing

This kit emerged from real-world experience building production applications. Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

### Ideas for Contribution

- Stack-specific templates (Rails, Django, Go)
- Integration with specific AI tools
- Improved templates and examples
- Documentation improvements

---

## 📄 License

MIT License - Use freely in your projects.

---

## 🙏 Credits

Built from lessons learned building real products with AI assistance. Inspired by (but simpler than):

- [BMAD Method](https://github.com/bmad-method) - Role-based AI development
- [OpenSpec](https://github.com/openspec) - Spec-driven development
- Enterprise development best practices

---

**Ready to supercharge your AI-assisted development?** Clone this repo and start building! 🚀
