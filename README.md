# AI-First Development Kit

> **A methodology reference for AI-assisted software development**

🌐 **Live Site:** [https://ai-first-dev-kit.github.io](https://ai-first-dev-kit.github.io)

---

## What is This?

A methodology + documentation site that helps you apply AI-First development practices to your projects — with help from your AI coding assistant.

### The Problem

AI coding assistants lack memory and context about YOUR project:
- Generic, inconsistent code
- Constant re-explaining
- Contradictory suggestions

### The Solution

**Documentation as AI memory.** This kit provides:
- **Templates** — Copy-paste ready files for AGENTS.md, cursor rules, specs, and more
- **Guides** — Step-by-step instructions for new and existing projects
- **Methodology** — The three pillars: Specs, Rules, Reference

---

## Repository Structure

```
ai-first-dev-kit/
├── content/              # 📁 Raw methodology content (for AI agents)
│   ├── templates/        #    Copy-paste templates
│   ├── guides/           #    Step-by-step guides
│   └── rules/            #    Required rules
├── site/                 # 🌐 Documentation website (Astro + Starlight)
│   ├── src/
│   └── package.json
├── METHODOLOGY.md        # Full methodology explanation
└── README.md             # This file
```

### Two Ways to Use

| Use Case | Access |
|----------|--------|
| **AI agents reading raw files** | `content/` folder |
| **Humans browsing docs** | [ai-first-dev-kit.github.io](https://ai-first-dev-kit.github.io) |

---

## Quick Start

### Option 1: AI-Assisted Setup (Recommended)

Tell your AI coding assistant:

```
Apply the AI-First Dev Kit methodology from https://ai-first-dev-kit.github.io to this project.

Read the quick-start guide and set up the required structure.
```

Your AI will:
1. Read the methodology from the site
2. Analyze your project
3. Create customized files (AGENTS.md, cursor rules, docs structure)

### Option 2: Manual Setup

1. Visit [ai-first-dev-kit.github.io](https://ai-first-dev-kit.github.io)
2. Browse [Templates](https://ai-first-dev-kit.github.io/templates/)
3. Copy templates to your project
4. Customize for your tech stack

---

## The Three Pillars

| Pillar | Purpose | Lifecycle |
|--------|---------|-----------|
| **SPECS** | What to build | Ephemeral (archive when done) |
| **RULES** | How to build | Stable (rarely changes) |
| **REFERENCE** | What exists | Evergreen (always current) |

---

## Content Overview

### Templates (`content/templates/`)

| Template | Purpose |
|----------|---------|
| `AGENTS.md` | Root AI context file |
| `prd-lite.md` | Lightweight feature spec |
| `feature-readme.md` | Feature documentation |
| `user-stories.md` | Acceptance criteria |
| `tasks.md` | Implementation checklist |
| `adr.md` | Architecture decisions |
| `cursor-rules/` | AI behavior rules |

### Guides (`content/guides/`)

| Guide | When to Use |
|-------|-------------|
| `new-project.md` | Starting from scratch |
| `existing-project.md` | Adding to existing code |

### Rules (`content/rules/`)

| Rule | Purpose |
|------|---------|
| `00-structure.md` | Required folder structure |
| `01-workflow.md` | Development workflow |
| `02-code-style.md` | Code style principles |

---

## Development

### Local Development

```bash
cd site
npm install
npm run dev
# Open http://localhost:4321
```

### Build

```bash
cd site
npm run build
```

### Deployment

The site auto-deploys to GitHub Pages on push to `main` via GitHub Actions.

---

## Tech Stack

- **[Astro](https://astro.build)** — Static site generator
- **[Starlight](https://starlight.astro.build)** — Documentation theme
- **GitHub Pages** — Hosting
- **GitHub Actions** — CI/CD

---

## Tool Agnostic

While examples use Cursor's `.mdc` format, the methodology works with any AI tool:

| Tool | Configuration |
|------|---------------|
| **Cursor** | `.cursor/rules/*.mdc` |
| **Claude Code** | `CLAUDE.md` |
| **GitHub Copilot** | `.github/copilot-instructions.md` |
| **Any AI** | Standard `.md` files |

---

## Contributing

Contributions welcome:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

Ideas:
- Additional templates for specific stacks
- Improved guides
- Translations

---

## License

MIT License — Use freely in your projects.
