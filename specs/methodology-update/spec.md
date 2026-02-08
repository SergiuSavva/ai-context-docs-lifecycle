# Spec: Methodology Update

## Problem

Current methodology uses arbitrary rules (file count thresholds, rigid flow names) that don't reflect actual complexity. Need to align docs with the new approach and restructure modules around the three-layer architecture (AGENTS.md + Skills + Docs).

## Solution

Update all methodology docs to reflect:
1. Three phases: Research → Plan → Implement (validate is within each phase)
2. Minimum required docs: `spec.md` + `tasks.md` (for any feature beyond bug fix)
3. Optional docs: `research.md`, `design.md`, `plan.md`, `user-stories.md`
4. AI decides which optional docs to create
5. Clear separation: `specs/` (ephemeral) vs `docs/decisions/` (permanent)
6. Rename `feature-spec.md` → `spec.md`
7. Remove file-count thresholds
8. Consolidate 5 modules into 4 (see `design-module-restructure.md`)

## Acceptance Criteria

### Original (Workflow Update)

- [x] AC-01: ADR updated with three phases and doc catalog
- [x] AC-02: Module 3 README reflects three phases approach
- [x] AC-03: All templates renamed (`feature-spec.md` → `spec.md`)
- [x] AC-04: Add new `plan.md` template
- [x] AC-05: Examples updated with new naming
- [x] AC-06: Workflows updated (remove rigid rules, keep as guidance)
- [x] AC-07: Main README updated
- [x] AC-08: No references to "< 5 files" or "> 5 files" rules remain
- [x] AC-09: Folder structure shows `specs/` and `docs/decisions/` separation

### Module Restructure

- [x] AC-10: Module 4 (Reference Docs) content absorbed into Module 1 (Project Context)
- [x] AC-11: Module 2 rewritten for Skills (SKILL.md standard)
- [x] AC-12: Module 5 renumbered to Module 4
- [x] AC-13: Module overview page updated (4 modules)
- [x] AC-14: Adoption path diagram updated
- [x] AC-15: Demo example (demo-taskflow) referenced from Module 1
- [x] AC-16: SKILL.md template created
- [x] AC-17: All `.mdc` rule references updated or removed
- [x] AC-18: Main README reflects new module structure
- [x] AC-19: Tool compatibility section in Module 1

## Out of Scope

- New features — this is a refactor only
