# 2.0 Open Decisions

Stakeholder decisions required before certain phases. Update this file when resolved; reference the decision in the relevant phase PR.

---

## D1 — Contact UX: modal vs. dedicated page

**Status:** ⏳ Pending  
**Blocks:** Phase 3 (Contact implementation)  
**Raised in:** [CONTEXT.md](./design_handoff_terrible_geralds_redesign/CONTEXT.md)

| Option | Description | API impact |
|--------|-------------|------------|
| **A — Restyle modal (recommended)** | Keep the existing global contact modal; apply new DS form chrome, validation states, confirm panel | None — same `ContactSubmission` endpoint |
| **B — Dedicated `/contact` page** | New routed page per `contact.html` prototype; modal may remain for quick access or be removed | None — same endpoint |
| **C — Both** | Full `/contact` page plus a slim modal entry point | None |

**Default if no response before Phase 3:** Option A (restyle modal, no new route).

**Decision:** _TBD_  
**Decided by / date:** _TBD_

---

## D2 — Wall section: social feed vs. curated static

**Status:** ⏳ Pending  
**Blocks:** Phase 4 (Wall content model) and copy in Phase 2  
**Raised in:** [CONTEXT.md](./design_handoff_terrible_geralds_redesign/CONTEXT.md)

| Option | Description | Build impact |
|--------|-------------|--------------|
| **A — Curated static (recommended)** | Admin-managed `WallItem` CRUD or `SiteContent` keys; no live Instagram/TikTok pull | Small model + admin page in Phase 4 |
| **B — Static copy only** | Prototype hardcoded grid; remove "auto-syncs your Instagram" aspirational copy | No new model |
| **C — Live social feed** | Real third-party integration | Out of scope unless explicitly approved; new dependency + API keys |

**Default if no response before Phase 2:** Option B for layout (stub data); revisit before Phase 4.

**Decision:** _TBD_  
**Decided by / date:** _TBD_

---

## How to record a decision

1. Fill in **Decision** and **Decided by / date** above.
2. Change **Status** to ✅ Resolved.
3. Note the choice in the Phase 3/4 PR description.
4. If copy or routes change, update BUILD_PLAN phase prompt brackets accordingly.
