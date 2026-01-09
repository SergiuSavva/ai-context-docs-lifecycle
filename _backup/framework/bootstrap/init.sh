#!/bin/bash

# Docs-as-Code Framework - Bootstrap Script
# Usage: curl -sL [url] | bash
# Or: ./init.sh

set -e

echo "🚀 Initializing Docs-as-Code Framework..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Create directory structure
echo -e "${BLUE}Creating directory structure...${NC}"
mkdir -p docs/reference
mkdir -p docs/specs
mkdir -p docs/decisions
mkdir -p docs/_archive
mkdir -p .cursor/rules

echo "  ✅ docs/reference/"
echo "  ✅ docs/specs/"
echo "  ✅ docs/decisions/"
echo "  ✅ docs/_archive/"
echo "  ✅ .cursor/rules/"
echo ""

# Create minimal code-map.md
echo -e "${BLUE}Creating docs/reference/code-map.md...${NC}"
cat > docs/reference/code-map.md << 'EOF'
# Code Map

> **Purpose**: Help developers and AI agents navigate the codebase quickly.
> **Last Updated**: $(date +%Y-%m-%d)

---

## Entry Points

| Path | Purpose | When to Start Here |
|------|---------|-------------------|
| `[main entry]` | Application entry | Understanding app bootstrap |

---

## Directory Structure

```
project-root/
├── src/                  # Application code
├── tests/                # Test files
├── docs/                 # Documentation
└── [other]/              # [Purpose]
```

---

## Quick Find

| Looking For | Location |
|-------------|----------|
| Main entry | `[path]` |
| Configuration | `[path]` |
| Tests | `[path]` |

---

<!-- TODO: Fill in your project's structure -->
EOF
echo "  ✅ Created code-map.md"
echo ""

# Create minimal project rules
echo -e "${BLUE}Creating .cursor/rules/project.mdc...${NC}"
cat > .cursor/rules/project.mdc << 'EOF'
---
description: Project-specific rules for AI coding assistants
globs:
  - "**/*"
---

# Project Rules

## Project Context

<!-- TODO: Fill in your project details -->

**What this project is**: [Brief description]

**Tech Stack**:
- Language: [TypeScript/Python/Go/etc.]
- Framework: [Next.js/Django/etc.]
- Database: [PostgreSQL/etc.]

## Quick Start

```bash
# Install
[npm install / pip install -r requirements.txt / etc.]

# Run dev server
[npm run dev / python manage.py runserver / etc.]

# Run tests
[npm test / pytest / etc.]
```

## Key Patterns

### Imports
- Use path aliases where available
- Keep imports organized: external → internal → relative

### Naming
- Files: kebab-case (`user-service.ts`)
- Components/Classes: PascalCase (`UserService`)
- Functions/Variables: camelCase (`getUserById`)

## Current Work

**Active Spec**: `docs/specs/[your-current-spec]/spec.md`

---

<!-- TODO: Add project-specific patterns as they emerge -->
EOF
echo "  ✅ Created project.mdc"
echo ""

# Create ADR readme
echo -e "${BLUE}Creating docs/decisions/README.md...${NC}"
cat > docs/decisions/README.md << 'EOF'
# Architecture Decision Records

This directory contains Architecture Decision Records (ADRs).

## What is an ADR?

An ADR captures an important architectural decision along with its context and consequences.

## When to Write an ADR

Write an ADR when you:
- Change architecture boundaries
- Make a significant tradeoff
- Add major dependencies
- Override "obvious" patterns

## ADR Format

See `templates/adr.md` for the template.

## Current ADRs

| # | Title | Status | Date |
|---|-------|--------|------|
| - | (none yet) | - | - |

---

<!-- Update this table as you add ADRs -->
EOF
echo "  ✅ Created decisions/README.md"
echo ""

# Create .gitkeep files for empty directories
touch docs/specs/.gitkeep
touch docs/_archive/.gitkeep

# Summary
echo -e "${GREEN}✅ Framework initialized!${NC}"
echo ""
echo "Next steps:"
echo "  1. Edit docs/reference/code-map.md with your project structure"
echo "  2. Edit .cursor/rules/project.mdc with your patterns"
echo "  3. Create your first spec: mkdir docs/specs/$(date +%Y-%m-%d)-feature-name"
echo ""
echo "Files created:"
echo "  docs/"
echo "  ├── reference/"
echo "  │   └── code-map.md"
echo "  ├── specs/"
echo "  ├── decisions/"
echo "  │   └── README.md"
echo "  └── _archive/"
echo "  .cursor/rules/"
echo "  └── project.mdc"
echo ""
echo "📚 Read the full guide: docs/decisions/framework/README.md"

