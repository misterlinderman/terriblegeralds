# Terrible Gerald's 2.0 — Front-End Redesign

This folder is the home for the **Season 3 · Vol. 6** public-site redesign. Production (`main`) stays on the current legacy-branded site until Phase 5 sign-off; all implementation work lands on the `v2/integration` branch first.

## Start here

| Document | Purpose |
|----------|---------|
| [WORKFLOW.md](./WORKFLOW.md) | Branch strategy, PR conventions, phase checklist |
| [DECISIONS.md](./DECISIONS.md) | Open stakeholder decisions (Contact UX, Wall section) |
| [design_handoff_terrible_geralds_redesign/BUILD_PLAN.md](./design_handoff_terrible_geralds_redesign/BUILD_PLAN.md) | Six phased build plan with paste-ready Cursor prompts |
| [design_handoff_terrible_geralds_redesign/CONTEXT.md](./design_handoff_terrible_geralds_redesign/CONTEXT.md) | Repo state, content-model gaps, non-goals |
| [design_handoff_terrible_geralds_redesign/ARCHITECTURE.md](./design_handoff_terrible_geralds_redesign/ARCHITECTURE.md) | Target file layout and porting notes |
| [design_handoff_terrible_geralds_redesign/README.md](./design_handoff_terrible_geralds_redesign/README.md) | Design tokens, screens, assets, fidelity spec |

## Scope

- **In scope:** Public marketing UI — tokens, components, pages, scroll reveal, forms (visual layer)
- **Out of scope:** Admin CMS behavior, Auth0, MongoDB schema for existing models, hosting/CI changes
- **Version target:** `0.2.0` minor release when merged to `main` (see [VERSIONING.md](../VERSIONING.md))

## Quick start (Phase 0)

```bash
git fetch origin
git checkout v2/integration          # or: git checkout -b v2/integration main
git checkout -b v2/phase-0-setup
```

Open `BUILD_PLAN.md` → Phase 0 → paste the Cursor prompt. Attach `CONTEXT.md`, `ARCHITECTURE.md`, and the relevant `design_reference/` files for each phase.

## design_reference/

The `design_reference/` subtree holds static HTML/React prototypes, DS tokens, and icons. If missing locally, restore it from the Claude Design handoff package into:

`docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/`

See [design_handoff_terrible_geralds_redesign/RESTORE_DESIGN_REFERENCE.md](./design_handoff_terrible_geralds_redesign/RESTORE_DESIGN_REFERENCE.md).
