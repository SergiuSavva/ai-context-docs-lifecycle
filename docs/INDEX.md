# Project Documentation

> **Navigation hub for all documentation**

---

## Quick Links

| Need | Document |
|------|----------|
| Get started | [Quick Start](#quick-start) |
| Find a task | [TASKS.md](./TASKS.md) |
| Understand a feature | [Features](./features/) |
| Make a decision | [Decisions](./decisions/) |

---

## Quick Start

```bash
# 1. Clone and install
git clone [repo-url]
cd [project]
[install command]

# 2. Set up environment
cp .env.example .env.local
# Edit .env.local with your values

# 3. Start development
[dev command]

# 4. Run tests
[test command]
```

---

## Documentation Map

```
docs/
├── INDEX.md          ← You are here
├── TASKS.md          # Progress tracking
│
├── features/         # Feature documentation
│   ├── README.md    # Feature overview
│   ├── _templates/  # Templates for new features
│   └── [feature]/   # Per-feature docs
│
├── mvp/              # MVP specifications
│   └── README.md
│
├── decisions/        # Architecture Decision Records
│   └── README.md
│
└── phases/           # Development phases
    └── README.md
```

---

## For AI Agents

| Resource | Purpose |
|----------|---------|
| `/.cursor/rules/*.mdc` | Detailed patterns and rules |
| `/AGENTS.md` | Project overview |
| `/docs/AI_CONTEXT.md` | Context loading guide |

See `.cursor/rules/00-index.mdc` for rule organization.

---

## For Developers

### Architecture

- **Tech Stack**: [List your stack]
- **Patterns**: See `.cursor/rules/project-architecture.mdc`
- **Code Style**: See `.cursor/rules/coding-patterns.mdc`

### Development Workflow

1. Pick a task from [TASKS.md](./TASKS.md)
2. Read the feature docs in `features/[feature]/`
3. Implement following patterns in `.cursor/rules/`
4. Update task status when done

### Testing

- Unit tests: `[test command]`
- E2E tests: `[e2e command]`
- See `.cursor/rules/testing-strategy.mdc`

---

## Feature Status

| Feature | Status | Documentation |
|---------|--------|---------------|
| [Feature 1] | ✅ Complete | [Link](./features/feature-1/) |
| [Feature 2] | 🔄 In Progress | [Link](./features/feature-2/) |
| [Feature 3] | ⏳ Planned | [Link](./features/feature-3/) |

See [features/README.md](./features/README.md) for full feature index.

---

## Key Decisions

| ADR | Decision | Status |
|-----|----------|--------|
| [ADR-001](./decisions/001-example.md) | [Decision title] | Accepted |

See [decisions/README.md](./decisions/README.md) for all decisions.

---

## Contributing

1. Follow patterns in `.cursor/rules/`
2. Update docs when making changes
3. Keep TASKS.md current

---

*Last updated: [Date]*
