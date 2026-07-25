# Hero video (local only)

Drop the official hero reel here for local dev and preview builds. Files in this folder are **not committed** to git.

## Default filename

```
terrible-geralds-hero-260725-1.mp4
```

The Vite dev server serves this at `/media/hero/terrible-geralds-hero-260725-1.mp4`. Production builds copy any `.mp4` / `.webm` here into `client/dist/media/hero/` when present.

## Override URL

Optional in `client/.env`:

```
VITE_HERO_VIDEO_URL=/media/hero/your-file.mp4
```

Admin-managed hero upload (Phase 4+) will replace this local-only workflow.
