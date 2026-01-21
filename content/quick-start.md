# Quick Start

Get AI context for your project in 5 minutes. Choose your setup level:

## Option 1: Minimal (5 minutes)

Just need AI context? Use **Module 1** only.

### Step 1: Copy AGENTS.md

Create `AGENTS.md` at your project root with:

```markdown
# [Project Name] - AI Agent Instructions

> Quick context for AI coding assistants.

---

## Quick Start

```bash
# Install
npm install

# Dev
npm run dev

# Test
npm test
```

---

## Project Overview

[1-2 sentences: What does this project do?]

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Your framework] |
| Language | [Your language] |
| Database | [Your database] |

---

## File Organization

```
src/
├── components/    # UI components
├── lib/          # Utilities
└── app/          # Routes/pages
```

---

## Key Patterns

- [Pattern 1]
- [Pattern 2]
```

### Step 2: Done!

AI agents will read this file automatically and have context about your project.

---

## Option 2: Standard (30 minutes)

Want workflows for building features? Add **Modules 1 + 2 + 3**.

### Step 1: Create Structure

```bash
mkdir -p .cursor/rules
mkdir -p docs/{specs,features,decisions}
```

### Step 2: Add Files

| File | Purpose |
|------|---------|
| `AGENTS.md` | AI context (from Module 1) |
| `.cursor/rules/code-style.mdc` | Code conventions |
| `.cursor/rules/doc-style.mdc` | Doc standards |
| `.cursor/rules/feature-workflow.mdc` | Workflow guidance |

### Step 3: Customize

Edit each `.mdc` file to match your project's conventions.

---

## Option 3: AI-Assisted Setup

Tell your AI assistant:

```
Apply the AI Context Docs Lifecycle methodology to this project.

Read the guide at:
https://github.com/SergiuSavva/ai-context-docs-lifecycle/content/guides/getting-started.md

Set up:
1. AGENTS.md with project context
2. .cursor/rules/ with coding standards
3. docs/ folder structure

My tech stack is: [YOUR TECH STACK]
```

The AI will:

1. Analyze your project
2. Create appropriate structure
3. Fill in project-specific details

---

## What You Get

### Module 1: Quick Start

```
project/
└── AGENTS.md    # AI reads this first
```

### Modules 1 + 2 + 3

```
project/
├── AGENTS.md
├── .cursor/rules/
│   ├── code-style.mdc
│   ├── doc-style.mdc
│   └── feature-workflow.mdc
└── docs/
    ├── specs/           # Feature specifications
    ├── features/        # Feature documentation
    └── decisions/       # ADRs
```

---

## Three Workflow Tracks

Once set up, use these workflows for building features:

| Flow | Use For | Templates |
|------|---------|-----------|
| **Quick** | Bug fixes, config changes | None |
| **Standard** | Small features (< 5 files) | feature-spec, tasks |
| **Complex** | Large features, research needed | All templates |

### Decision Tree

```
Does this require research or evaluating alternatives?
├─ YES → Complex Flow
└─ NO → Will this change more than 5 files?
         ├─ YES → Complex Flow
         └─ NO → Is this a bug fix, typo, or config change?
                  ├─ YES → Quick Flow
                  └─ NO → Standard Flow
```

---

## Common Prompts

| Task | Prompt |
|------|--------|
| **New feature** | "Create feature spec for [feature] in docs/specs/" |
| **Start building** | "Implement the feature in docs/specs/[feature]/" |
| **Track progress** | "Update tasks.md with current progress" |
| **Record decision** | "Create ADR for choosing [X] over [Y]" |
| **Complete feature** | "Archive spec and update docs for [feature]" |

---

## Next Steps

- [View all modules](modules/README.md) — Browse templates and examples
- [New project guide](guides/new-project.md) — Detailed setup walkthrough
- [Existing project guide](guides/existing-project.md) — Add to existing code

---

## Alternative: Manual Download

If your AI can't access URLs, download templates from:

**GitHub**: [github.com/SergiuSavva/ai-context-docs-lifecycle/content/modules/](https://github.com/SergiuSavva/ai-context-docs-lifecycle/tree/main/content/modules/)

Then paste the relevant templates into your project.
