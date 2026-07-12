# 2.0 Development Workflow

Branch and PR conventions for the front-end redesign. **Do not merge v2 work into `main` until Phase 5 is complete and the client signs off.**

## Branch model

```
main                    ← production (current site); protected during v2 build
  └── v2/integration    ← long-lived integration branch; all phase work merges here
        ├── v2/phase-0-setup
        ├── v2/phase-1-ds-foundation
        ├── v2/phase-2-home
        ├── v2/phase-3-secondary-pages
        ├── v2/phase-4-content-model
        └── v2/phase-5-qa-cleanup
```

| Branch | Purpose | Merges into |
|--------|---------|-------------|
| `main` | Production deploys (Vercel + Railway) | — |
| `v2/integration` | Accumulates completed phases | `main` (once, at launch) |
| `v2/phase-N-*` | Single-phase feature work | `v2/integration` |

## Per-phase workflow

1. **Resolve decision gates** — see [DECISIONS.md](./DECISIONS.md) before Phase 3 (Contact) and Phase 4 (Wall).
2. **Branch from integration:**
   ```bash
   git checkout v2/integration
   git pull origin v2/integration
   git checkout -b v2/phase-N-short-name
   ```
3. **Implement** using the phase prompt in [BUILD_PLAN.md](./design_handoff_terrible_geralds_redesign/BUILD_PLAN.md). Attach:
   - `AGENTS.md`, `.cursorrules`
   - `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/CONTEXT.md`
   - `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/ARCHITECTURE.md`
   - Phase-specific `design_reference/*` files named in BUILD_PLAN
4. **Verify locally:** `npm run lint`, `npm run build`, manual spot-check in dev server.
5. **Open PR:** base = `v2/integration`, compare = `v2/phase-N-*`.
6. **Merge** when the phase "Done when" checklist in BUILD_PLAN passes.
7. **Delete** the phase branch after merge.

## Pull request template

Use this title format:

```
v2 phase N: <short description>
```

PR body:

```markdown
## Phase
Phase N — <name from BUILD_PLAN>

## Summary
- …

## Done-when checklist
- [ ] … (copy from BUILD_PLAN phase)

## Decisions
- Contact UX: modal / page / N/A this phase
- Wall: curated / static / N/A this phase

## Test plan
- [ ] `npm run lint` clean
- [ ] `npm run build` clean
- [ ] Dev server — no console errors on affected routes
- [ ] …

## Screenshots
(optional — 1920 / 640 / 375 if visual phase)
```

## Deployment during v2

| Branch | Deploy target |
|--------|---------------|
| `main` | Production (unchanged current site) |
| `v2/integration` | Vercel preview deploys (if enabled on branch) |
| `v2/phase-*` | PR preview URLs only |

No Railway/env changes are expected for this redesign. Flag any env drift in the PR description.

## Launch (Phase 5 → main)

1. Complete Phase 5 QA checklist in BUILD_PLAN.
2. Client sign-off on preview URL for `v2/integration`.
3. Open PR: `v2/integration` → `main`.
4. After merge: bump version to `0.2.0` per [VERSIONING.md](../VERSIONING.md), update CHANGELOG, tag release.
5. Verify Vercel + Railway production deploys.
6. Keep `v2/integration` branch for a week, then delete.

## Parallel work rules

- One active phase branch at a time unless phases are explicitly independent (they are not — follow order 0→5).
- Admin CMS changes (Phase 4) may be split into one PR per new model (`v2/phase-4-catering-tiers`, etc.) as long as each merges to `v2/integration` in BUILD_PLAN order.
- Hotfixes to production: branch from `main`, merge to `main`, then cherry-pick or merge `main` into `v2/integration` to stay current.

## Cursor session context

Every v2 session should include:

1. `AGENTS.md`
2. `.cursorrules` (includes Brand design system section)
3. `docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/BUILD_PLAN.md` (relevant phase)
4. Phase-specific `design_reference/` attachments
