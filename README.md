# AI-First Development Kit

> **A methodology reference for AI-assisted software development**

🌐 **Live Site:** [https://ai-first-dev-kit.github.io](https://ai-first-dev-kit.github.io)

---

## What is This?

A documentation site with instructions and templates to help you apply the AI-First Dev Kit methodology to your own projects — with help from your AI coding assistant.

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

## Site Structure

```
ai-first-dev-kit.github.io/
├── /                     # Landing page
├── /quick-start/         # 5-minute setup guide
├── /templates/           # Copy-paste templates
│   ├── /agents-md/       # AGENTS.md template
│   ├── /cursor-rules/    # Cursor rules templates
│   ├── /prd-lite/        # PRD-lite spec template
│   ├── /feature-docs/    # Feature documentation
│   ├── /adr/             # Architecture decisions
│   └── /project-structure/ # Required structure
├── /guides/              # Step-by-step guides
│   ├── /new-project/     # Starting from scratch
│   └── /existing-project/ # Adding to existing code
└── /methodology/         # Full methodology deep-dive
```

---

## The Three Pillars

| Pillar | Purpose | Lifecycle |
|--------|---------|-----------|
| **SPECS** | What to build | Ephemeral (archive when done) |
| **RULES** | How to build | Stable (rarely changes) |
| **REFERENCE** | What exists | Evergreen (always current) |

---

## Required Project Structure

After applying the kit, your project will have:

```
your-project/
├── AGENTS.md                    # Root AI context
├── .cursor/rules/
│   └── 00-index.mdc            # Rule index
└── docs/
    ├── INDEX.md                # Navigation
    ├── TASKS.md                # Progress tracking
    ├── specs/                  # Feature specifications
    ├── features/               # Feature documentation
    └── decisions/              # Architecture decisions
```

---

## Development

### Local Development

```bash
# Install dependencies
npm install

# Run local server
npm run dev

# Open http://localhost:4321
```

### Build

```bash
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
