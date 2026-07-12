# Restore design_reference/

The `design_reference/` folder contains static HTML/React prototypes, design-system tokens, icons, and the DS bundle. It is required for Phases 0–5.

## If this folder is missing

Copy the entire `design_reference/` directory from your Claude Design handoff package into:

```
docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/
```

Expected top-level contents:

```
design_reference/
├── index.html, menu.html, schedule.html, about.html, catering.html, contact.html
├── sections/*.jsx
├── shared/site-chrome.jsx, site.css
├── assets/icons/*.svg
└── _ds/terrible-gerald-s-design-system-.../
    ├── tokens/*.css
    ├── _ds_bundle.js
    ├── _ds_manifest.json
    └── readme.md
```

After restoring, verify:

```bash
ls docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/_ds/*/tokens/colors.css
ls docs/terriblegeralds-2_0/design_handoff_terrible_geralds_redesign/design_reference/assets/icons/logo-mark.svg
```

Then proceed with [BUILD_PLAN.md](./BUILD_PLAN.md) Phase 0.
