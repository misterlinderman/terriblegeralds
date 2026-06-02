# Versioning

This project follows [Semantic Versioning 2.0.0](https://semver.org/).

## Current version

**0.1.0** — Initial MERN scaffold with admin CRUD and public React pages migrated from Astro static export.

## Version locations

| File | Field |
|------|-------|
| `package.json` | `"version"` |
| `client/package.json` | `"version"` |
| `server/package.json` | `"version"` |
| `CHANGELOG.md` | Release notes |

Keep all three `package.json` version fields in sync when bumping releases.

## Bump guidelines

| Change type | Version bump | Examples |
|-------------|--------------|----------|
| Breaking API or env changes | MAJOR | Auth model overhaul, route renames |
| New features (admin resource, page) | MINOR | Image upload, email notifications |
| Bug fixes, copy, styling | PATCH | FAQ typo, CSS fix |

## Release process

1. Update `CHANGELOG.md` under `[Unreleased]` → new version section
2. Bump version in root, `client/`, and `server/` `package.json`
3. Commit: `release: v0.2.0`
4. Tag: `git tag v0.2.0`
5. Push tag; Vercel/Railway deploy from `main`

## Pre-1.0 policy

While `< 1.0.0`, MINOR bumps may include small breaking changes to admin APIs. Document any breaking change in `CHANGELOG.md`.

## Git tags

Recommended format: `vMAJOR.MINOR.PATCH` (e.g. `v0.1.0`)

GitHub Releases can mirror tags with notes copied from `CHANGELOG.md`.
