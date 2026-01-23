# Spec: Methodology Update

## Problem

Current methodology uses arbitrary rules (file count thresholds, rigid flow names) that don't reflect actual complexity. Need to align docs with the new approach defined in `decisions/001-implementation-flow.md`.

## Solution

Update all methodology docs to reflect:
1. Three phases: Research → Plan → Implement (validate is within each phase)
2. Minimum required docs: `spec.md` + `tasks.md` (for any feature beyond bug fix)
3. Optional docs: `research.md`, `design.md`, `plan.md`, `user-stories.md`
4. AI decides which optional docs to create
5. Clear separation: `specs/` (ephemeral) vs `decisions/` (permanent)
6. Rename `feature-spec.md` → `spec.md`
7. Remove file-count thresholds

## Acceptance Criteria

- [x] AC-01: ADR updated with three phases and doc catalog
- [ ] AC-02: Module 3 README reflects three phases approach
- [ ] AC-03: All templates renamed (`feature-spec.md` → `spec.md`)
- [ ] AC-04: Add new `plan.md` template
- [ ] AC-05: Examples updated with new naming
- [ ] AC-06: Workflows updated (remove rigid rules, keep as guidance)
- [ ] AC-07: Main README updated
- [ ] AC-08: No references to "< 5 files" or "> 5 files" rules remain
- [ ] AC-09: Folder structure shows `specs/` and `decisions/` separation

## Out of Scope

- Module 5 (Project Planning) - keep as-is for now
- New features - this is a refactor only
